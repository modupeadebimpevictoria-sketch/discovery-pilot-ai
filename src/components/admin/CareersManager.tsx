import { useState, useRef, useEffect } from "react";
import { useAdminCareers, type DbCareer, type EnrichmentIssue } from "@/hooks/useAdminCareers";
import {
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight, RefreshCw,
  Loader2, Check, X, ChevronRight, GripVertical, Upload,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { careerListings, careerFamilies } from "@/data/careerFamilies";
import { careers as detailedCareers } from "@/data/careers";

const ALL_CAREER_FAMILIES = [
  "creative-design", "media-content", "entertainment-performance", "technology",
  "product-tech", "healthcare-medicine", "mental-health", "science-research",
  "environment-sustainability", "engineering-architecture", "trades-technical",
  "business-entrepreneurship", "finance-investment", "marketing-communications",
  "law-justice", "education-academia", "social-impact", "government-public-service",
  "international-development", "travel-hospitality", "food-culinary", "sport-fitness",
  "animals-nature", "space-future-tech", "beauty-wellness", "real-estate-property",
];

const SALARY_REGIONS = [
  { code: "NG", label: "Nigeria", currency: "NGN", symbol: "₦" },
  { code: "KE", label: "Kenya", currency: "KES", symbol: "KSh" },
  { code: "GH", label: "Ghana", currency: "GHS", symbol: "GH₵" },
  { code: "ZA", label: "South Africa", currency: "ZAR", symbol: "R" },
  { code: "GLOBAL", label: "Global / USD", currency: "USD", symbol: "$" },
];

const JOB_ZONES = [
  { value: 1, label: "1 – Little preparation needed" },
  { value: 2, label: "2 – Some preparation" },
  { value: 3, label: "3 – Medium preparation" },
  { value: 4, label: "4 – Considerable preparation" },
  { value: 5, label: "5 – Extensive preparation" },
];

function formatSalaryLabel(min: number, max: number, symbol: string): string {
  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return String(n);
  };
  if (!min && !max) return "";
  return `${symbol}${fmt(min)}–${symbol}${fmt(max)}/yr`;
}

export default function CareersManager() {
  const { careers, issues, loading, fetchAll, upsertCareer, softDeleteCareer, approveSyncUpdate, rejectSyncUpdate, resolveIssue, updateIssueNotes } = useAdminCareers();
  const [tab, setTab] = useState<"careers" | "issues">("careers");
  const [editing, setEditing] = useState<Partial<DbCareer> | null>(null);
  const [scrollToField, setScrollToField] = useState<string | null>(null);
  const [syncingOnet, setSyncingOnet] = useState(false);
  const [syncingProspects, setSyncingProspects] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [syncProgress, setSyncProgress] = useState("");
  const [fixingPhotos, setFixingPhotos] = useState(false);
  const [photoProgress, setPhotoProgress] = useState("");
  const [enrichingSkills, setEnrichingSkills] = useState(false);
  const [skillProgress, setSkillProgress] = useState("");

  const handleFixAllPhotos = async () => {
    if (!confirm("This will regenerate keywords and fetch new Unsplash photos for ALL active careers. This may take a few minutes. Continue?")) return;
    setFixingPhotos(true);
    const batchSize = 20;
    // Count total active careers
    const { count } = await supabase.from("careers" as any).select("id", { count: "exact", head: true }).eq("is_active", true).eq("is_deleted", false);
    const total = count || 0;
    let processed = 0;
    let totalSucceeded = 0;
    let totalFailed = 0;

    for (let offset = 0; offset < total; offset += batchSize) {
      setPhotoProgress(`Fixing ${offset + 1}–${Math.min(offset + batchSize, total)} / ${total}...`);
      try {
        const { data, error } = await supabase.functions.invoke("fill-unsplash-keywords", {
          body: { batch_size: batchSize, offset },
        });
        if (error) throw error;
        totalSucceeded += data.succeeded || 0;
        totalFailed += data.failed || 0;
        processed += data.total || 0;
      } catch (err: any) {
        toast.error(`Batch at offset ${offset} failed: ${err.message}`);
        totalFailed += batchSize;
      }
    }

    setPhotoProgress(`Done: ${totalSucceeded} updated, ${totalFailed} failed out of ${total}`);
    toast.success(`Photos fixed: ${totalSucceeded}/${total}`);
    fetchAll();
    setFixingPhotos(false);
  };

  const handleSeedFromHardcoded = async () => {
    if (!confirm(`This will insert ~${careerListings.length} careers from hardcoded data. Existing careers with matching titles will be skipped. Continue?`)) return;
    setSeeding(true);
    setSyncProgress("Seeding careers from hardcoded data...");

    // Build a map of detailed career data by id
    const detailMap = new Map(detailedCareers.map((c) => [c.id, c]));

    // Map category to family_id
    const categoryToFamilyMap: Record<string, string> = {
      Technology: "technology",
      Healthcare: "healthcare-medicine",
      Business: "business-entrepreneurship",
      "Creative Arts": "creative-design",
      Engineering: "engineering-architecture",
      Science: "science-research",
      Sports: "sport-fitness",
      Media: "media-content",
      Environment: "environment-sustainability",
      Government: "government-public-service",
    };

    // Get existing career titles to skip duplicates
    const { data: existing } = await supabase.from("careers" as any).select("title");
    const existingTitles = new Set((existing || []).map((c: any) => c.title.toLowerCase()));

    // Get family emojis
    const familyEmojis = new Map(careerFamilies.map((f) => [f.id, f.emoji]));

    let inserted = 0;
    let skipped = 0;
    const batchSize = 50;

    // Build rows
    const rows = careerListings
      .filter((l) => !existingTitles.has(l.title.toLowerCase()))
      .map((listing) => {
        const detail = detailMap.get(listing.id);
        const emoji = detail?.emoji || familyEmojis.get(listing.familyId) || "💼";
        const isEmerging = listing.growthTag?.includes("Emerging") || false;

        const row: any = {
          title: listing.title,
          slug: listing.id,
          family_id: listing.familyId,
          description: listing.description,
          emoji,
          salary_range: listing.salaryRange,
          growth_tag: listing.growthTag || null,
          search_terms: listing.searchTerms,
          is_emerging: isEmerging,
          is_active: true,
        };

        // Enrich from detailed data if available
        if (detail) {
          row.recommended_subjects = detail.recommendedSubjects;
          row.description_full = detail.description;
          row.day_in_the_life = detail.dailyLife;
        }

        return row;
      });

    skipped = careerListings.length - rows.length;

    // Insert in batches
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      setSyncProgress(`Inserting careers ${i + 1}–${Math.min(i + batchSize, rows.length)} of ${rows.length}...`);
      const { error } = await supabase.from("careers" as any).insert(batch);
      if (error) {
        console.error("Batch insert error:", error.message);
        toast.error(`Batch failed at row ${i}: ${error.message}`);
      } else {
        inserted += batch.length;
      }
    }

    setSyncProgress(`Done: ${inserted} inserted, ${skipped} skipped (already exist)`);
    toast.success(`Seeded ${inserted} careers into the database`);
    fetchAll();
    setSeeding(false);
  };

  const handleBulkSyncOnet = async () => {
    setSyncingOnet(true);
    setSyncProgress("Starting O*NET sync...");
    try {
      const { data, error } = await supabase.functions.invoke("enrich-careers-onet", { body: {} });
      if (error) throw error;
      setSyncProgress(`Done: ${data.succeeded}/${data.total} enriched, ${data.failed} failed`);
      toast.success(`O*NET sync complete: ${data.succeeded} careers enriched`);
      fetchAll();
    } catch (err: any) {
      toast.error(`O*NET sync failed: ${err.message}`);
      setSyncProgress("");
    } finally {
      setSyncingOnet(false);
    }
  };

  const handleBulkSyncProspects = async () => {
    setSyncingProspects(true);
    setSyncProgress("Starting Prospects sync...");
    try {
      const { data, error } = await supabase.functions.invoke("enrich-careers-prospects", { body: {} });
      if (error) throw error;
      setSyncProgress(`Done: ${data.succeeded}/${data.total} enriched, ${data.failed} failed`);
      toast.success(`Prospects sync complete: ${data.succeeded} careers enriched`);
      fetchAll();
    } catch (err: any) {
      toast.error(`Prospects sync failed: ${err.message}`);
      setSyncProgress("");
    } finally {
      setSyncingProspects(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }

  const openEditScrolled = (career: DbCareer, field: string) => {
    setEditing(career);
    setScrollToField(field);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Careers Manager</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleBulkSyncOnet}
            disabled={syncingOnet || syncingProspects}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 text-accent-foreground text-xs font-semibold hover:bg-accent/30 disabled:opacity-50"
          >
            <RefreshCw size={14} className={syncingOnet ? "animate-spin" : ""} /> Sync from O*NET
          </button>
          <button
            onClick={handleBulkSyncProspects}
            disabled={syncingOnet || syncingProspects}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 text-accent-foreground text-xs font-semibold hover:bg-accent/30 disabled:opacity-50"
          >
            <RefreshCw size={14} className={syncingProspects ? "animate-spin" : ""} /> Sync from Prospects
          </button>
          {careers.length < 50 && (
            <button
              onClick={handleSeedFromHardcoded}
              disabled={seeding || syncingOnet || syncingProspects}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 disabled:opacity-50"
            >
              <Upload size={14} className={seeding ? "animate-pulse" : ""} /> Seed from data
            </button>
          )}
          <button
            onClick={handleFixAllPhotos}
            disabled={fixingPhotos || syncingOnet || syncingProspects || enrichingSkills}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 text-accent-foreground text-xs font-semibold hover:bg-accent/30 disabled:opacity-50"
          >
            <RefreshCw size={14} className={fixingPhotos ? "animate-spin" : ""} /> Fix All Career Photos
          </button>
          <button
            onClick={handleEnrichSkills}
            disabled={fixingPhotos || syncingOnet || syncingProspects || enrichingSkills}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 text-accent-foreground text-xs font-semibold hover:bg-accent/30 disabled:opacity-50"
          >
            <RefreshCw size={14} className={enrichingSkills ? "animate-spin" : ""} /> Enrich Skill Explanations
          </button>
          {skillProgress && <span className="text-xs text-muted-foreground">{skillProgress}</span>}
          <button
            onClick={() => setEditing({
              title: "", family_id: "", description: "", emoji: "💼",
              is_emerging: false, is_active: true, salary_context: {},
              skills: [], work_values: [], recommended_subjects: [],
              riasec_profile: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
            })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
          >
            <Plus size={16} /> Add Career
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setTab("careers")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "careers" ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"}`}>
          Careers ({careers.length})
        </button>
        <button onClick={() => setTab("issues")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "issues" ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"}`}>
          Enrichment Issues ({issues.length})
        </button>
      </div>

      {(syncProgress || photoProgress) && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          {(syncingOnet || syncingProspects || fixingPhotos) && <Loader2 size={14} className="animate-spin" />}
          {syncProgress || photoProgress}
        </div>
      )}

      {editing && (
        <CareerForm
          data={editing}
          scrollToField={scrollToField}
          onSave={async (d) => {
            const id = await upsertCareer(d);
            if (id) {
              if (!d.id) {
                setEditing({ ...d, id });
              } else {
                setEditing(null);
              }
            }
          }}
          onCancel={() => { setEditing(null); setScrollToField(null); }}
          onSyncComplete={(updatedData) => {
            setEditing(updatedData);
            fetchAll();
          }}
        />
      )}

      {tab === "careers" && !editing && (
        <>
          <PendingSyncSection
            careers={careers.filter((c) => c.sync_approval_status === "pending" && c.pending_sync_data)}
            onApprove={approveSyncUpdate}
            onReject={rejectSyncUpdate}
          />
          <CareersTable
            careers={careers}
            onEdit={(c) => setEditing(c)}
            onEditField={openEditScrolled}
            onDelete={async (c) => {
              if (confirm(`This will permanently remove "${c.title}" from students. The record will be kept but marked as deleted. Continue?`)) {
                await softDeleteCareer(c.id);
              }
            }}
          />
        </>
      )}

      {tab === "issues" && (
        <IssuesTable issues={issues} onResolve={resolveIssue} onUpdateNotes={updateIssueNotes} />
      )}
    </div>
  );
}

// ═══════════════════════════
// PENDING SYNC REVIEW
// ═══════════════════════════
function PendingSyncSection({ careers, onApprove, onReject }: {
  careers: DbCareer[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  if (careers.length === 0) return null;

  return (
    <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
        ⚠️ Pending O*NET Updates ({careers.length})
      </h3>
      <p className="text-xs text-muted-foreground">
        These careers were manually edited. The O*NET sync has new data waiting for your approval.
      </p>
      {careers.map((c) => {
        const pending = c.pending_sync_data || {};
        const changedKeys = Object.keys(pending).filter((k) => k !== "updated_at" && k !== "onet_last_updated");
        return (
          <div key={c.id} className="border border-border rounded-lg p-3 space-y-2 bg-card">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground text-sm">{c.emoji} {c.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onApprove(c.id)}
                  className="px-3 py-1 rounded text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Apply Update
                </button>
                <button
                  onClick={() => onReject(c.id)}
                  className="px-3 py-1 rounded text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20"
                >
                  Keep Mine
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-muted-foreground block mb-1">Your Current Version</span>
                {changedKeys.slice(0, 6).map((key) => (
                  <div key={key} className="flex gap-1 py-0.5">
                    <span className="text-muted-foreground w-28 shrink-0 truncate">{key}:</span>
                    <span className="text-foreground truncate">{JSON.stringify((c as any)[key])?.slice(0, 60)}</span>
                  </div>
                ))}
              </div>
              <div>
                <span className="font-semibold text-muted-foreground block mb-1">Incoming O*NET Update</span>
                {changedKeys.slice(0, 6).map((key) => (
                  <div key={key} className="flex gap-1 py-0.5">
                    <span className="text-muted-foreground w-28 shrink-0 truncate">{key}:</span>
                    <span className="text-primary truncate">{JSON.stringify(pending[key])?.slice(0, 60)}</span>
                  </div>
                ))}
              </div>
            </div>
            {changedKeys.length > 6 && (
              <p className="text-[10px] text-muted-foreground">+ {changedKeys.length - 6} more fields</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════
// CAREERS TABLE
// ═══════════════════════════
function StatusIndicator({ ok, onClick }: { ok: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-bold ${ok ? "text-primary" : "text-destructive cursor-pointer hover:underline"}`}
    >
      {ok ? "✓" : "✗"}
    </button>
  );
}

function CareersTable({ careers, onEdit, onEditField, onDelete }: {
  careers: DbCareer[];
  onEdit: (c: DbCareer) => void;
  onEditField: (c: DbCareer, field: string) => void;
  onDelete: (c: DbCareer) => void;
}) {
  const active = careers.filter((c) => c.is_active && !c.is_deleted);

  return (
    <div className="border border-border rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Title</th>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Family</th>
            <th className="px-3 py-2 text-muted-foreground font-medium text-center">Emerging</th>
            <th className="px-3 py-2 text-muted-foreground font-medium text-center">O*NET</th>
            <th className="px-3 py-2 text-muted-foreground font-medium text-center">Prospects</th>
            <th className="px-3 py-2 text-muted-foreground font-medium text-center">Salary</th>
            <th className="px-3 py-2 text-muted-foreground font-medium text-center">Photo</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {active.map((c) => (
            <tr key={c.id} className="border-t border-border hover:bg-muted/30">
              <td className="px-3 py-2 font-medium text-foreground">{c.emoji} {c.title}</td>
              <td className="px-3 py-2 text-muted-foreground capitalize text-xs">{c.family_id || "—"}</td>
              <td className="px-3 py-2 text-center">
                {c.is_emerging ? <ToggleRight size={18} className="text-primary mx-auto" /> : <ToggleLeft size={18} className="text-muted-foreground mx-auto" />}
              </td>
              <td className="px-3 py-2 text-center">
                <StatusIndicator ok={!!c.riasec_profile} onClick={!c.riasec_profile ? () => onEditField(c, "onet") : undefined} />
              </td>
              <td className="px-3 py-2 text-center">
                <StatusIndicator ok={!!c.what_they_do_teen} onClick={!c.what_they_do_teen ? () => onEditField(c, "prospects") : undefined} />
              </td>
              <td className="px-3 py-2 text-center">
                <StatusIndicator
                  ok={!!c.salary_context && Object.keys(c.salary_context).length > 0}
                  onClick={(!c.salary_context || Object.keys(c.salary_context).length === 0) ? () => onEditField(c, "salary") : undefined}
                />
              </td>
              <td className="px-3 py-2 text-center">
                <StatusIndicator ok={!!c.unsplash_photo_url} onClick={!c.unsplash_photo_url ? () => onEditField(c, "identity") : undefined} />
              </td>
              <td className="px-3 py-2 flex gap-1">
                <button onClick={() => onEdit(c)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                <button onClick={() => onDelete(c)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
              </td>
            </tr>
          ))}
          {active.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No careers yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════
// ISSUES TABLE
// ═══════════════════════════
function IssuesTable({ issues, onResolve, onUpdateNotes }: {
  issues: EnrichmentIssue[];
  onResolve: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}) {
  return (
    <div className="border border-border rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Career</th>
            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Issue</th>
            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Date</th>
            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Notes</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {issues.map((iss) => (
            <tr key={iss.id} className="border-t border-border hover:bg-muted/30">
              <td className="px-4 py-2.5 font-medium text-foreground">{iss.career_title || "—"}</td>
              <td className="px-4 py-2.5 text-xs text-destructive font-mono">{iss.issue}</td>
              <td className="px-4 py-2.5 text-xs text-muted-foreground">{new Date(iss.logged_at).toLocaleDateString()}</td>
              <td className="px-4 py-2.5">
                <input
                  defaultValue={iss.notes || ""}
                  onBlur={(e) => onUpdateNotes(iss.id, e.target.value)}
                  className="w-full bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                  placeholder="Add notes..."
                />
              </td>
              <td className="px-4 py-2.5">
                <button onClick={() => onResolve(iss.id)} className="px-3 py-1 rounded text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20">
                  Mark resolved
                </button>
              </td>
            </tr>
          ))}
          {issues.length === 0 && (
            <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No unresolved issues 🎉</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════
// CAREER FORM
// ═══════════════════════════
function CareerForm({ data, scrollToField, onSave, onCancel, onSyncComplete }: {
  data: Partial<DbCareer>;
  scrollToField: string | null;
  onSave: (d: Partial<DbCareer>) => void;
  onCancel: () => void;
  onSyncComplete?: (updatedData: Partial<DbCareer>) => void;
}) {
  const [form, setForm] = useState<any>({
    ...data,
    riasec_profile: data.riasec_profile || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    skills: data.skills || [],
    work_values: data.work_values || [],
    salary_context: data.salary_context || {},
    recommended_subjects: data.recommended_subjects || [],
    role_models: data.role_models || [],
  });
  const [riasecOverride, setRiasecOverride] = useState<{ primary: boolean; secondary: boolean }>({ primary: false, secondary: false });
  const [newSubject, setNewSubject] = useState("");
  const [newWorkValue, setNewWorkValue] = useState("");
  const [syncingOnetInline, setSyncingOnetInline] = useState(false);
  const [syncingProspectsInline, setSyncingProspectsInline] = useState(false);

  const handleSyncOnetInline = async () => {
    if (!form.id) { toast.error("Save the career first before syncing"); return; }
    setSyncingOnetInline(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("enrich-careers-onet", { body: { career_id: form.id } });
      if (error) throw error;
      if (result.failed > 0) throw new Error("Enrichment failed — check enrichment issues tab");
      toast.success("O*NET data synced ✓");
      // Reload career data
      const { data: updated } = await supabase.from("careers" as any).select("*").eq("id", form.id).single();
      if (updated) {
        setForm(updated);
        onSyncComplete?.(updated as any);
      }
    } catch (err: any) {
      toast.error(`O*NET sync failed: ${err.message}`);
    } finally {
      setSyncingOnetInline(false);
    }
  };

  const handleSyncProspectsInline = async () => {
    if (!form.id) { toast.error("Save the career first before syncing"); return; }
    setSyncingProspectsInline(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("enrich-careers-prospects", { body: { career_id: form.id } });
      if (error) throw error;
      if (result.failed > 0) throw new Error("Enrichment failed — check enrichment issues tab");
      toast.success("Prospects data synced ✓");
      const { data: updated } = await supabase.from("careers" as any).select("*").eq("id", form.id).single();
      if (updated) {
        setForm(updated);
        onSyncComplete?.(updated as any);
      }
    } catch (err: any) {
      toast.error(`Prospects sync failed: ${err.message}`);
    } finally {
      setSyncingProspectsInline(false);
    }
  };

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    identity: useRef<HTMLDivElement>(null),
    onet: useRef<HTMLDivElement>(null),
    prospects: useRef<HTMLDivElement>(null),
    salary: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (scrollToField && sectionRefs[scrollToField]?.current) {
      setTimeout(() => sectionRefs[scrollToField]?.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
  }, [scrollToField]);

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  // Auto-compute RIASEC primary/secondary
  const riasec = form.riasec_profile || {};
  const sortedRiasec = Object.entries(riasec).sort(([, a], [, b]) => (b as number) - (a as number));
  const autoPrimary = sortedRiasec[0]?.[0] || "";
  const autoSecondary = sortedRiasec[1]?.[0] || "";
  const displayPrimary = riasecOverride.primary ? form.riasec_primary : autoPrimary;
  const displaySecondary = riasecOverride.secondary ? form.riasec_secondary : autoSecondary;

  // Salary helpers
  const getSalaryRegion = (code: string) => {
    const ctx = form.salary_context || {};
    return ctx[code] || { min: 0, max: 0 };
  };
  const setSalaryRegion = (code: string, field: string, value: number) => {
    const region = SALARY_REGIONS.find((r) => r.code === code)!;
    const current = getSalaryRegion(code);
    const updated = { ...current, [field]: value, currency: region.currency };
    const newMin = field === "min" ? value : current.min || 0;
    const newMax = field === "max" ? value : current.max || 0;
    updated.label = formatSalaryLabel(newMin, newMax, region.symbol);
    updated.source = current.source || (code === "GLOBAL" ? "O*NET" : "Manual");
    set("salary_context", { ...form.salary_context, [code]: updated });
  };

  const addSkill = () => {
    const skills = [...(form.skills || []), { name: "", importance: 50 }];
    set("skills", skills);
  };
  const updateSkill = (i: number, field: string, value: any) => {
    const skills = [...(form.skills || [])];
    skills[i] = { ...skills[i], [field]: value };
    set("skills", skills);
  };
  const removeSkill = (i: number) => {
    const skills = [...(form.skills || [])];
    skills.splice(i, 1);
    set("skills", skills);
  };

  const addSubject = () => {
    if (!newSubject.trim()) return;
    set("recommended_subjects", [...(form.recommended_subjects || []), newSubject.trim()]);
    setNewSubject("");
  };
  const removeSubject = (i: number) => {
    const subs = [...(form.recommended_subjects || [])];
    subs.splice(i, 1);
    set("recommended_subjects", subs);
  };

  const addWorkValue = () => {
    if (!newWorkValue.trim()) return;
    set("work_values", [...(form.work_values || []), newWorkValue.trim()]);
    setNewWorkValue("");
  };
  const removeWorkValue = (i: number) => {
    const vals = [...(form.work_values || [])];
    vals.splice(i, 1);
    set("work_values", vals);
  };

  // Role Models helpers
  const addRoleModel = () => {
    const models = [...(form.role_models || []), { name: "", title: "", company: "", journeyFact: "", quote: "", photoUrl: "" }];
    set("role_models", models);
  };
  const updateRoleModel = (i: number, field: string, value: string) => {
    const models = [...(form.role_models || [])];
    models[i] = { ...models[i], [field]: value };
    set("role_models", models);
  };
  const removeRoleModel = (i: number) => {
    const models = [...(form.role_models || [])];
    models.splice(i, 1);
    set("role_models", models);
  };

  const handleSave = async () => {
    if (!form.title?.trim()) { toast.error("Title is required"); return; }
    if (!form.family_id) { toast.error("Career family is required"); return; }
    const payload = {
      ...form,
      riasec_primary: displayPrimary,
      riasec_secondary: displaySecondary,
    };
    onSave(payload);

    // Also save salary via edge function if career has an id and salary data
    if (form.id && form.salary_context && Object.keys(form.salary_context).length > 0) {
      // Build salary payload with only regions that have min or max set
      const salaryPayload: Record<string, any> = {};
      for (const [code, data] of Object.entries(form.salary_context as Record<string, any>)) {
        if (data.min || data.max) {
          salaryPayload[code] = data;
        }
      }
      if (Object.keys(salaryPayload).length > 0) {
        try {
          await supabase.functions.invoke("update-career-salaries", {
            body: { career_id: form.id, salary: salaryPayload },
          });
        } catch (err: any) {
          console.error("Salary save via edge function failed:", err.message);
        }
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-6 max-h-[80vh] overflow-auto">
      <div className="flex items-center justify-between sticky top-0 bg-card z-10 pb-2 border-b border-border">
        <h3 className="font-bold text-foreground">{form.id ? "Edit" : "Add"} Career</h3>
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
        </div>
      </div>

      {/* Identity Section */}
      <div ref={sectionRefs.identity} className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Identity</h4>
        <div className="grid grid-cols-2 gap-3">
          <FormInput label="Title *" value={form.title} onChange={(v) => set("title", v)} />
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Career Family *</label>
            <select
              value={form.family_id}
              onChange={(e) => set("family_id", e.target.value)}
              className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5"
            >
              <option value="">Select family...</option>
              {ALL_CAREER_FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 col-span-2">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={form.is_emerging || false} onChange={(e) => set("is_emerging", e.target.checked)} className="accent-primary" />
              Emerging career
            </label>
          </div>
          <FormInput label="Unsplash keyword" value={form.unsplash_keyword || ""} onChange={(v) => set("unsplash_keyword", v)} placeholder="e.g. architect working blueprints" />
          <FormInput label="Unsplash photo URL" value={form.unsplash_photo_url || ""} onChange={(v) => set("unsplash_photo_url", v)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <FormInput label="O*NET code" value={form.onet_code || ""} onChange={(v) => set("onet_code", v)} placeholder="e.g. 17-1011.00" />
            </div>
            {form.onet_code && (
              <button
                onClick={handleSyncOnetInline}
                disabled={syncingOnetInline}
                className="px-2 py-1.5 rounded text-[10px] font-semibold bg-accent/20 text-accent-foreground hover:bg-accent/30 whitespace-nowrap flex items-center gap-1 disabled:opacity-50"
              >
                {syncingOnetInline ? <Loader2 size={10} className="animate-spin" /> : <ChevronRight size={10} />}
                {syncingOnetInline ? "Syncing..." : "Sync from O*NET →"}
              </button>
            )}
          </div>
          <div className="flex items-end gap-2" ref={sectionRefs.prospects}>
            <div className="flex-1">
              <FormInput label="Prospects slug" value={form.prospects_slug || ""} onChange={(v) => set("prospects_slug", v)} placeholder="e.g. architect" />
            </div>
            {form.prospects_slug && (
              <button
                onClick={handleSyncProspectsInline}
                disabled={syncingProspectsInline}
                className="px-2 py-1.5 rounded text-[10px] font-semibold bg-accent/20 text-accent-foreground hover:bg-accent/30 whitespace-nowrap flex items-center gap-1 disabled:opacity-50"
              >
                {syncingProspectsInline ? <Loader2 size={10} className="animate-spin" /> : <ChevronRight size={10} />}
                {syncingProspectsInline ? "Syncing..." : "Sync from Prospects →"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Descriptions</h4>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Teen description (shown in app)</label>
          <textarea
            value={form.what_they_do_teen || ""}
            onChange={(e) => set("what_they_do_teen", e.target.value)}
            placeholder="What does this career actually involve, in plain language a 15-year-old would connect with?"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[80px] mt-0.5"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Day in the life</label>
          <textarea
            value={form.day_in_the_life || ""}
            onChange={(e) => set("day_in_the_life", e.target.value)}
            placeholder="3–5 sentences about a typical day"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[80px] mt-0.5"
          />
        </div>
        <FormInput
          label="Day in the Life video URL (YouTube / Vimeo)"
          value={form.day_in_life_video_url || ""}
          onChange={(v) => set("day_in_life_video_url", v)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Full description</label>
          <textarea
            value={form.description_full || ""}
            onChange={(e) => set("description_full", e.target.value)}
            placeholder="Longer adult-level text from Prospects"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[80px] mt-0.5"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Entry requirements</label>
          <textarea
            value={form.entry_requirements || ""}
            onChange={(e) => set("entry_requirements", e.target.value)}
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[60px] mt-0.5"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Career progression</label>
          <textarea
            value={form.career_path || ""}
            onChange={(e) => set("career_path", e.target.value)}
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[60px] mt-0.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Be Inspired video URL (YouTube / Vimeo)"
            value={form.encouragement_video_url || ""}
            onChange={(v) => set("encouragement_video_url", v)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <FormInput
            label="Encouragement figure name"
            value={form.encouragement_figure || ""}
            onChange={(v) => set("encouragement_figure", v)}
            placeholder="e.g. Andrew Ng"
          />
        </div>
      </div>

      {/* Structured Data Section */}
      <div ref={sectionRefs.onet} className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Structured Data (O*NET)</h4>

        {/* RIASEC */}
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">RIASEC Scores</label>
          <div className="grid grid-cols-6 gap-2 mt-1">
            {["R", "I", "A", "S", "E", "C"].map((letter) => (
              <div key={letter}>
                <label className="text-[10px] font-bold text-center block text-foreground">{letter}</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={riasec[letter] || 0}
                  onChange={(e) => set("riasec_profile", { ...riasec, [letter]: parseInt(e.target.value) || 0 })}
                  className="w-full bg-muted/30 rounded px-2 py-1 text-sm text-center text-foreground border border-border focus:border-primary outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">RIASEC Primary</label>
            <div className="flex items-center gap-2 mt-0.5">
              <input
                value={displayPrimary}
                readOnly={!riasecOverride.primary}
                onChange={(e) => set("riasec_primary", e.target.value)}
                className="flex-1 bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border outline-none"
              />
              <button
                onClick={() => setRiasecOverride((p) => ({ ...p, primary: !p.primary }))}
                className="px-2 py-1 rounded text-[10px] font-semibold bg-muted text-muted-foreground hover:text-foreground"
              >
                {riasecOverride.primary ? "Auto" : "Override"}
              </button>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">RIASEC Secondary</label>
            <div className="flex items-center gap-2 mt-0.5">
              <input
                value={displaySecondary}
                readOnly={!riasecOverride.secondary}
                onChange={(e) => set("riasec_secondary", e.target.value)}
                className="flex-1 bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border outline-none"
              />
              <button
                onClick={() => setRiasecOverride((p) => ({ ...p, secondary: !p.secondary }))}
                className="px-2 py-1 rounded text-[10px] font-semibold bg-muted text-muted-foreground hover:text-foreground"
              >
                {riasecOverride.secondary ? "Auto" : "Override"}
              </button>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Skills (up to 8)</label>
          <div className="space-y-2 mt-1">
            {(form.skills || []).map((skill: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={skill.name}
                  onChange={(e) => updateSkill(i, "name", e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 bg-muted/30 rounded px-2 py-1 text-sm text-foreground border border-border focus:border-primary outline-none"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={skill.importance}
                  onChange={(e) => updateSkill(i, "importance", parseInt(e.target.value) || 0)}
                  className="w-16 bg-muted/30 rounded px-2 py-1 text-sm text-center text-foreground border border-border focus:border-primary outline-none"
                />
                <button onClick={() => removeSkill(i)} className="p-1 hover:bg-destructive/10 rounded"><X size={12} className="text-destructive" /></button>
              </div>
            ))}
            {(form.skills || []).length < 8 && (
              <button onClick={addSkill} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Plus size={12} /> Add skill
              </button>
            )}
          </div>
        </div>

        {/* Work Values */}
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Work Values (up to 5)</label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(form.work_values || []).map((val: string, i: number) => (
              <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs text-foreground">
                {val}
                <button onClick={() => removeWorkValue(i)}><X size={10} className="text-muted-foreground hover:text-destructive" /></button>
              </span>
            ))}
          </div>
          {(form.work_values || []).length < 5 && (
            <div className="flex gap-1 mt-1">
              <input
                value={newWorkValue}
                onChange={(e) => setNewWorkValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addWorkValue())}
                placeholder="Type and press Enter"
                className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
              />
            </div>
          )}
        </div>

        {/* Job outlook + zone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Job Outlook</label>
            <select
              value={form.growth_outlook || ""}
              onChange={(e) => set("growth_outlook", e.target.value || null)}
              className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5"
            >
              <option value="">Not set</option>
              <option value="Bright">Bright</option>
              <option value="Average">Average</option>
              <option value="Below Average">Below Average</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Job Zone</label>
            <select
              value={form.job_zone || ""}
              onChange={(e) => set("job_zone", e.target.value ? parseInt(e.target.value) : null)}
              className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5"
            >
              <option value="">Not set</option>
              {JOB_ZONES.map((jz) => <option key={jz.value} value={jz.value}>{jz.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Salary Section */}
      <div ref={sectionRefs.salary} className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Salary by Region</h4>
        <div className="space-y-2">
          {SALARY_REGIONS.map((region) => {
            const data = getSalaryRegion(region.code);
            const preview = formatSalaryLabel(data.min || 0, data.max || 0, region.symbol);
            return (
              <div key={region.code} className="grid grid-cols-5 gap-2 items-center">
                <span className="text-xs font-medium text-foreground">{region.label}</span>
                <input
                  type="number"
                  value={data.min || ""}
                  onChange={(e) => setSalaryRegion(region.code, "min", parseInt(e.target.value) || 0)}
                  placeholder="Min"
                  className="bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                />
                <input
                  type="number"
                  value={data.max || ""}
                  onChange={(e) => setSalaryRegion(region.code, "max", parseInt(e.target.value) || 0)}
                  placeholder="Max"
                  className="bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                />
                <span className="text-[10px] text-muted-foreground">{region.currency}</span>
                <span className="text-xs font-semibold text-primary truncate">{preview || "—"}</span>
              </div>
            );
          })}
          <p className="text-[10px] text-muted-foreground">Global/USD is auto-filled from O*NET wages when synced</p>
        </div>
      </div>

      {/* Required Subjects */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Required Subjects</h4>
        <div className="flex flex-wrap gap-1.5">
          {(form.recommended_subjects || []).map((sub: string, i: number) => (
            <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs text-foreground">
              {sub}
              <button onClick={() => removeSubject(i)}><X size={10} className="text-muted-foreground hover:text-destructive" /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
            placeholder="Type subject and press Enter"
            className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
          />
        </div>
      </div>

      {/* Meet the People (Role Models) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Meet the People</h4>
        <p className="text-[10px] text-muted-foreground">Add role models / industry people shown on the career detail page.</p>
        <div className="space-y-3">
          {(form.role_models || []).map((rm: any, i: number) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2 bg-muted/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Person {i + 1}</span>
                <button onClick={() => removeRoleModel(i)} className="p-1 hover:bg-destructive/10 rounded"><X size={12} className="text-destructive" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={rm.name || ""}
                  onChange={(e) => updateRoleModel(i, "name", e.target.value)}
                  placeholder="Name"
                  className="bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                />
                <input
                  value={rm.title || ""}
                  onChange={(e) => updateRoleModel(i, "title", e.target.value)}
                  placeholder="Job title"
                  className="bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                />
                <input
                  value={rm.company || ""}
                  onChange={(e) => updateRoleModel(i, "company", e.target.value)}
                  placeholder="Company / Organisation"
                  className="bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                />
                <input
                  value={rm.photoUrl || ""}
                  onChange={(e) => updateRoleModel(i, "photoUrl", e.target.value)}
                  placeholder="Photo URL"
                  className="bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none"
                />
              </div>
              <textarea
                value={rm.journeyFact || ""}
                onChange={(e) => updateRoleModel(i, "journeyFact", e.target.value)}
                placeholder="Their journey / backstory"
                className="w-full bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none min-h-[40px]"
              />
              <textarea
                value={rm.quote || ""}
                onChange={(e) => updateRoleModel(i, "quote", e.target.value)}
                placeholder="Inspirational quote"
                className="w-full bg-muted/30 rounded px-2 py-1 text-xs text-foreground border border-border focus:border-primary outline-none min-h-[40px]"
              />
            </div>
          ))}
          <button onClick={addRoleModel} className="text-xs text-primary hover:underline flex items-center gap-1">
            <Plus size={12} /> Add person
          </button>
        </div>
      </div>

      {/* Bottom save */}
      <div className="flex gap-2 sticky bottom-0 bg-card pt-3 border-t border-border">
        <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: any; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5"
      />
    </div>
  );
}
