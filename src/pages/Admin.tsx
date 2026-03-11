import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useAdminData } from "@/hooks/useAdminData";
import { useApp } from "@/contexts/AppContext";
import {
  Briefcase, FileText, Users, BarChart3, Plus, Pencil, Trash2,
  ToggleLeft, ToggleRight, AlertTriangle, ChevronLeft, RefreshCw,
  Target, Flame, Zap, Flag, Loader2, Globe, X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Section = "opportunities" | "feed" | "spotlights" | "missions" | "quests" | "skills" | "analytics";

const sectionConfig = [
  { id: "opportunities" as Section, label: "Opportunities", icon: Briefcase },
  { id: "feed" as Section, label: "Feed Posts", icon: FileText },
  { id: "spotlights" as Section, label: "Spotlights", icon: Users },
  { id: "missions" as Section, label: "Missions", icon: Target },
  { id: "quests" as Section, label: "Quests", icon: Flame },
  { id: "skills" as Section, label: "Skills", icon: Zap },
  { id: "analytics" as Section, label: "Analytics", icon: BarChart3 },
];

const ALL_CAREER_FAMILIES = [
  "technology", "design", "science", "business", "engineering", "health",
  "law", "media", "education", "environment", "finance", "arts",
  "social-work", "architecture", "sports", "agriculture", "hospitality",
];

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAdminCheck();
  const { user } = useApp();
  const {
    opportunities, feedPosts, spotlights, loading,
    upsertOpportunity, deleteOpportunity,
    upsertFeedPost, deleteFeedPost,
    upsertSpotlight, deleteSpotlight,
    fetchAll,
  } = useAdminData();

  const [section, setSection] = useState<Section>("opportunities");
  const [editingOpp, setEditingOpp] = useState<any | null>(null);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editingSpot, setEditingSpot] = useState<any | null>(null);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) { navigate("/auth"); return null; }
  if (!isAdmin) { navigate("/feed"); return null; }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
          <p className="text-[10px] text-muted-foreground">SpringBoard Management</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sectionConfig.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                section === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <s.icon size={16} /> {s.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={() => navigate("/feed")} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ChevronLeft size={14} /> Back to app
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl">
          {section === "opportunities" && (
            <OpportunitiesManager data={opportunities} editing={editingOpp} setEditing={setEditingOpp} onSave={upsertOpportunity} onDelete={deleteOpportunity} />
          )}
          {section === "feed" && (
            <FeedManager data={feedPosts} editing={editingPost} setEditing={setEditingPost} onSave={upsertFeedPost} onDelete={deleteFeedPost} />
          )}
          {section === "spotlights" && (
            <SpotlightsManager data={spotlights} editing={editingSpot} setEditing={setEditingSpot} onSave={upsertSpotlight} onDelete={deleteSpotlight} />
          )}
          {section === "missions" && <MissionsManager />}
          {section === "quests" && <QuestsMonitor />}
          {section === "skills" && <SkillsManager />}
          {section === "analytics" && <AnalyticsDashboard />}
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════
// CAREER FAMILY MULTI-SELECT
// ═══════════════════════════════════════
function CareerFamilySelect({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const toggle = (f: string) => {
    onChange(value.includes(f) ? value.filter((x) => x !== f) : [...value, f]);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none text-left flex items-center gap-2"
      >
        <Globe size={12} className="text-muted-foreground shrink-0" />
        <span className="truncate">
          {value.length === 0 ? "Universal (all careers)" : `${value.length} families`}
        </span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-lg shadow-lg p-2 max-h-48 overflow-auto">
          {ALL_CAREER_FAMILIES.map((f) => (
            <label key={f} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted/50 cursor-pointer">
              <input type="checkbox" checked={value.includes(f)} onChange={() => toggle(f)} className="accent-primary" />
              <span className="text-xs text-foreground capitalize">{f}</span>
            </label>
          ))}
          <button onClick={() => { onChange([]); setOpen(false); }} className="w-full mt-1 text-[10px] text-muted-foreground hover:text-foreground py-1">
            Clear all (universal)
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// OPPORTUNITIES MANAGER (with sub-tabs)
// ═══════════════════════════════════════
function OpportunitiesManager({ data, editing, setEditing, onSave, onDelete }: any) {
  const [subTab, setSubTab] = useState<"listings" | "archived" | "sources" | "scrape-log">("listings");

  const activeData = data.filter((o: any) => !o.is_archived);
  const archivedData = data.filter((o: any) => o.is_archived);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Opportunities</h2>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 flex-wrap">
        {([
          { id: "listings" as const, label: "Listings" },
          { id: "archived" as const, label: `Archived (${archivedData.length})` },
          { id: "sources" as const, label: "Scrape Sources" },
          { id: "scrape-log" as const, label: "Scrape Log" },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${subTab === t.id ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === "listings" && (
        <OpportunitiesListings data={activeData} editing={editing} setEditing={setEditing} onSave={onSave} onDelete={onDelete} />
      )}
      {subTab === "archived" && (
        <ArchivedListings data={archivedData} onSave={onSave} onDelete={onDelete} />
      )}
      {subTab === "sources" && <ScrapeSourcesManager />}
      {subTab === "scrape-log" && <ScrapeLogView />}
    </div>
  );
}

function OpportunitiesListings({ data, editing, setEditing, onSave, onDelete }: any) {
  const [editFamiliesId, setEditFamiliesId] = useState<string | null>(null);
  const [editFamiliesValue, setEditFamiliesValue] = useState<string[]>([]);

  const emptyOpp = {
    title: "", organisation: "", type: "internship", description: "", location: "Global",
    country: "", city: "", min_grade: 9, max_grade: 12, application_url: "", deadline: "",
    duration: "", career_family: "", career_family_ids: [], is_remote: false, is_active: true, is_link_dead: false,
  };
  const deadLinks = data.filter((o: any) => o.is_link_dead);

  const startEditFamilies = (opp: any) => {
    setEditFamiliesId(opp.id);
    setEditFamiliesValue(opp.career_family_ids || []);
  };

  const saveFamilies = async () => {
    if (!editFamiliesId) return;
    await onSave({ id: editFamiliesId, career_family_ids: editFamiliesValue });
    setEditFamiliesId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.length} total · {deadLinks.length} dead links</p>
        <button onClick={() => setEditing(emptyOpp)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          <Plus size={16} /> Add Opportunity
        </button>
      </div>

      {editing && (
        <OppForm data={editing} onSave={async (d: any) => { const ok = await onSave(d); if (ok) setEditing(null); }} onCancel={() => setEditing(null)} />
      )}

      {deadLinks.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
          <p className="text-sm font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle size={14} /> {deadLinks.length} dead link(s) found
          </p>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Title</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Type</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Families</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Grade</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Active</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((opp: any) => (
              <tr key={opp.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-foreground">{opp.title}</p>
                  <p className="text-[10px] text-muted-foreground">{opp.organisation} {opp.source === "firecrawl" ? "· 🤖" : ""}</p>
                </td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{opp.type}</td>
                <td className="px-4 py-2.5">
                  {editFamiliesId === opp.id ? (
                    <div className="flex items-center gap-1">
                      <CareerFamilySelect value={editFamiliesValue} onChange={setEditFamiliesValue} />
                      <button onClick={saveFamilies} className="p-1 rounded bg-primary/10 text-primary text-[10px] font-bold px-2">Save</button>
                      <button onClick={() => setEditFamiliesId(null)} className="p-1"><X size={12} className="text-muted-foreground" /></button>
                    </div>
                  ) : (
                    <button onClick={() => startEditFamilies(opp)} className="text-[10px] text-muted-foreground hover:text-primary">
                      {(opp.career_family_ids && opp.career_family_ids.length > 0)
                        ? (opp.career_family_ids as string[]).join(", ")
                        : "🌐 Universal"}
                    </button>
                  )}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{opp.min_grade}–{opp.max_grade}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => onSave({ id: opp.id, is_active: !opp.is_active })}>
                    {opp.is_active ? <ToggleRight size={20} className="text-primary" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
                  </button>
                </td>
                <td className="px-4 py-2.5 flex gap-1">
                  <button onClick={() => setEditing(opp)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => { if (confirm("Delete?")) onDelete(opp.id); }} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No opportunities yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OppForm({ data, onSave, onCancel }: any) {
  const [form, setForm] = useState({ ...data, career_family_ids: data.career_family_ids || [] });
  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-4">
      <h3 className="font-bold text-foreground">{form.id ? "Edit" : "Add"} Opportunity</h3>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Title" value={form.title} onChange={(v) => set("title", v)} />
        <Input label="Organisation" value={form.organisation} onChange={(v) => set("organisation", v)} />
        <Select label="Type" value={form.type} options={["internship","competition","program","volunteering","scholarship","workshop"]} onChange={(v) => set("type", v)} />
        <Input label="Location" value={form.location} onChange={(v) => set("location", v)} />
        <Input label="Country" value={form.country} onChange={(v) => set("country", v)} />
        <Input label="City" value={form.city} onChange={(v) => set("city", v)} />
        <Input label="Min Grade" value={form.min_grade} type="number" onChange={(v) => set("min_grade", parseInt(v))} />
        <Input label="Max Grade" value={form.max_grade} type="number" onChange={(v) => set("max_grade", parseInt(v))} />
        <Input label="Application URL" value={form.application_url} onChange={(v) => set("application_url", v)} />
        <Input label="Deadline (YYYY-MM-DD)" value={form.deadline || ""} onChange={(v) => set("deadline", v || null)} />
        <Input label="Duration" value={form.duration} onChange={(v) => set("duration", v)} />
        <div>
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Career Families</label>
          <CareerFamilySelect value={form.career_family_ids} onChange={(v) => set("career_family_ids", v)} />
        </div>
      </div>
      <textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Description"
        className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[80px]" />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.is_remote} onChange={(e) => set("is_remote", e.target.checked)} className="accent-primary" /> Remote
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="accent-primary" /> Active
        </label>
        <label className="flex items-center gap-2 text-sm text-destructive">
          <input type="checkbox" checked={form.is_link_dead} onChange={(e) => set("is_link_dead", e.target.checked)} className="accent-destructive" /> Dead Link
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCRAPE SOURCES MANAGER
// ═══════════════════════════════════════
function ScrapeSourcesManager() {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newSource, setNewSource] = useState({ name: "", url: "", scrape_strategy: "scrape", default_type: "internship" });
  const [scraping, setScraping] = useState(false);

  const fetchSources = async () => {
    setLoading(true);
    const { data } = await supabase.from("opportunity_sources").select("*").order("name");
    setSources(data || []);
    setLoading(false);
  };

  useState(() => { fetchSources(); });

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("opportunity_sources").update({ is_active: !current } as any).eq("id", id);
    toast.success(current ? "Source disabled" : "Source enabled");
    fetchSources();
  };

  const addSource = async () => {
    if (!newSource.name || !newSource.url) { toast.error("Name and URL required"); return; }
    const { error } = await supabase.from("opportunity_sources").insert(newSource as any);
    if (error) { toast.error(error.message); return; }
    toast.success("Source added!");
    setAdding(false);
    setNewSource({ name: "", url: "", scrape_strategy: "scrape", default_type: "internship" });
    fetchSources();
  };

  const deleteSource = async (id: string) => {
    if (!confirm("Delete this source?")) return;
    await supabase.from("opportunity_sources").delete().eq("id", id);
    toast.success("Source deleted");
    fetchSources();
  };

  const runScrapeNow = async () => {
    setScraping(true);
    try {
      const { data, error } = await supabase.functions.invoke("scrape-opportunities", { body: {} });
      if (error) throw error;
      toast.success(`Scrape complete: ${data?.total_new_listings || 0} new listings`);
      fetchSources();
    } catch (err: any) {
      toast.error(err.message || "Scrape failed");
    }
    setScraping(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{sources.length} sources</p>
        <div className="flex gap-2">
          <button onClick={() => setAdding(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            <Plus size={16} /> Add Source
          </button>
          <button onClick={runScrapeNow} disabled={scraping} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold">
            {scraping ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Run Scrape Now
          </button>
        </div>
      </div>

      {adding && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={newSource.name} onChange={(v) => setNewSource({ ...newSource, name: v })} />
            <Input label="URL" value={newSource.url} onChange={(v) => setNewSource({ ...newSource, url: v })} />
            <Select label="Strategy" value={newSource.scrape_strategy} options={["scrape", "crawl"]} onChange={(v) => setNewSource({ ...newSource, scrape_strategy: v })} />
            <Select label="Default Type" value={newSource.default_type} options={["internship","competition","program","volunteering","scholarship","workshop","mixed"]} onChange={(v) => setNewSource({ ...newSource, default_type: v })} />
          </div>
          <div className="flex gap-2">
            <button onClick={addSource} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Add</button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Name</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Type</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Strategy</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Last Scraped</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Count</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Active</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s: any) => (
              <tr key={s.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-foreground">{s.name}</p>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline truncate block max-w-[200px]">{s.url}</a>
                </td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{s.default_type}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{s.scrape_strategy}</td>
                <td className="px-4 py-2.5 text-[10px] text-muted-foreground">
                  {s.last_scraped_at ? new Date(s.last_scraped_at).toLocaleDateString() : "Never"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{s.last_scraped_count || 0}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => toggleActive(s.id, s.is_active)}>
                    {s.is_active ? <ToggleRight size={20} className="text-primary" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
                  </button>
                </td>
                <td className="px-4 py-2.5">
                  <button onClick={() => deleteSource(s.id)} className="p-1.5 rounded hover:bg-destructive/10">
                    <Trash2 size={14} className="text-destructive" />
                  </button>
                </td>
              </tr>
            ))}
            {sources.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No sources configured</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SCRAPE LOG VIEW
// ═══════════════════════════════════════
function ScrapeLogView() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("scrape_log").select("*").order("run_at", { ascending: false }).limit(50);
      setLogs(data || []);
      setLoading(false);
    })();
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{logs.length} runs logged</p>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Run Date</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Sources</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">New Listings</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Failed</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log: any) => {
              const failed = (log.failed_sources as string[]) || [];
              return (
                <tr key={log.id} className={`border-t border-border ${failed.length > 0 ? "bg-destructive/5" : ""}`}>
                  <td className="px-4 py-2.5 text-foreground">
                    {new Date(log.run_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{log.sources_processed}</td>
                  <td className="px-4 py-2.5 font-bold text-primary">{log.total_new_listings}</td>
                  <td className="px-4 py-2.5">
                    {failed.length === 0 ? (
                      <span className="text-[10px] text-muted-foreground">None</span>
                    ) : (
                      <span className="text-[10px] text-destructive">{failed.join(", ")}</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {logs.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No scrape runs yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MISSIONS MANAGER
// ═══════════════════════════════════════
function MissionsManager() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "live">("pending");
  const [editing, setEditing] = useState<any | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genFamily, setGenFamily] = useState("");

  const fetchMissions = async () => {
    setLoading(true);
    const { data } = await supabase.from("missions").select("*").order("created_at", { ascending: false });
    setMissions(data || []);
    setLoading(false);
  };

  useState(() => { fetchMissions(); });

  const pending = missions.filter((m) => !m.reviewed_by_admin);
  const live = missions.filter((m) => m.is_active && m.reviewed_by_admin);
  const displayed = tab === "pending" ? pending : live;

  const emptyMission = {
    title: "", description: "", task: "", mission_type: "do", career_id: "", family_id: "",
    estimated_minutes: 5, xp_reward: 10, is_active: false, reviewed_by_admin: false,
  };

  const saveMission = async (m: any) => {
    if (m.id) {
      const { error } = await supabase.from("missions").update(m as any).eq("id", m.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("missions").insert(m as any);
      if (error) { toast.error(error.message); return; }
    }
    toast.success("Mission saved!");
    setEditing(null);
    fetchMissions();
  };

  const approveMission = async (id: string) => {
    await supabase.from("missions").update({ reviewed_by_admin: true, is_active: true } as any).eq("id", id);
    toast.success("Mission approved & live!");
    fetchMissions();
  };

  const deleteMission = async (id: string) => {
    if (!confirm("Delete this mission?")) return;
    await supabase.from("missions").delete().eq("id", id);
    toast.success("Deleted");
    fetchMissions();
  };

  const generateMissions = async () => {
    if (!genFamily) { toast.error("Select a career family"); return; }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-missions", {
        body: { career_family: genFamily },
      });
      if (error) throw error;
      toast.success(`Generated ${data?.count || 0} missions!`);
      fetchMissions();
    } catch (err: any) {
      toast.error(err.message || "Generation failed");
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Missions Manager</h2>
          <p className="text-sm text-muted-foreground">{pending.length} pending · {live.length} live</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setEditing(emptyMission)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            <Plus size={16} /> Write Mission
          </button>
        </div>
      </div>

      {/* Generate batch */}
      <div className="bg-card border border-border rounded-lg p-4 flex items-end gap-3">
        <div className="flex-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Generate missions for career family</label>
          <input value={genFamily} onChange={(e) => setGenFamily(e.target.value)} placeholder="e.g. creative-design"
            className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5" />
        </div>
        <button onClick={generateMissions} disabled={generating} className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold flex items-center gap-2">
          {generating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Generate
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["pending", "live"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === t ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"}`}>
            {t === "pending" ? `Pending Review (${pending.length})` : `Live (${live.length})`}
          </button>
        ))}
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-foreground">{editing.id ? "Edit" : "Write"} Mission</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Career Family" value={editing.family_id} onChange={(v) => setEditing({ ...editing, family_id: v })} />
            <Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Input label="Task (one sentence)" value={editing.task} onChange={(v) => setEditing({ ...editing, task: v })} />
            <Select label="Type" value={editing.mission_type} options={["do","observe","reflect","share"]} onChange={(v) => setEditing({ ...editing, mission_type: v })} />
            <Input label="Est. Minutes" value={editing.estimated_minutes} type="number" onChange={(v) => setEditing({ ...editing, estimated_minutes: parseInt(v) || 5 })} />
            <Input label="XP Reward" value={editing.xp_reward} type="number" onChange={(v) => setEditing({ ...editing, xp_reward: parseInt(v) || 10 })} />
          </div>
          <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[60px]" />
          <div className="flex gap-2">
            <button onClick={() => saveMission(editing)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Title</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Type</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">XP</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Family</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((m: any) => (
              <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5 font-medium text-foreground">{m.title}</td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{m.mission_type}</td>
                <td className="px-4 py-2.5 text-primary font-bold">{m.xp_reward}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{m.family_id || "—"}</td>
                <td className="px-4 py-2.5 flex gap-1">
                  {tab === "pending" && (
                    <button onClick={() => approveMission(m.id)} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">Approve</button>
                  )}
                  <button onClick={() => setEditing(m)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => deleteMission(m.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No missions here</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// QUESTS MONITOR
// ═══════════════════════════════════════
function QuestsMonitor() {
  const [quests, setQuests] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"quests" | "logs">("quests");
  const [filterFamily, setFilterFamily] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [generating, setGenerating] = useState(false);

  const currentWeek = (() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
  })();

  const fetchQuests = async () => {
    setLoading(true);
    const [qRes, lRes] = await Promise.all([
      supabase.from("quests").select("*").order("created_at", { ascending: false }),
      supabase.from("quest_generation_log").select("*").order("generated_at", { ascending: false }).limit(50),
    ]);
    setQuests(qRes.data || []);
    setLogs(lRes.data || []);
    setLoading(false);
  };

  useState(() => { fetchQuests(); });

  const filtered = quests.filter((q) => {
    if (filterFamily && q.family_id !== filterFamily) return false;
    if (filterGrade && q.grade_band !== filterGrade) return false;
    return true;
  });

  const thisWeekQuests = filtered.filter((q) => q.week_number === currentWeek);

  const flagQuest = async (id: string) => {
    await supabase.from("quests").update({ flagged: true } as any).eq("id", id);
    toast.success("Quest flagged & hidden from students");
    fetchQuests();
  };

  const deleteQuest = async (id: string) => {
    if (!confirm("Permanently delete this quest?")) return;
    await supabase.from("quests").delete().eq("id", id);
    toast.success("Quest deleted");
    fetchQuests();
  };

  const runGeneration = async () => {
    setGenerating(true);
    try {
      const { error } = await supabase.functions.invoke("generate-weekly-quests", {});
      if (error) throw error;
      toast.success("Generation triggered!");
      fetchQuests();
    } catch (err: any) {
      toast.error(err.message || "Generation failed");
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Quests Monitor</h2>
          <p className="text-sm text-muted-foreground">Week {currentWeek} · {thisWeekQuests.length} quests this week</p>
        </div>
        <button onClick={runGeneration} disabled={generating} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold">
          {generating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Run Generation
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab("quests")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "quests" ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"}`}>
          Quests ({quests.length})
        </button>
        <button onClick={() => setTab("logs")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "logs" ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"}`}>
          Generation Log ({logs.length})
        </button>
      </div>

      {tab === "quests" && (
        <div className="flex gap-3">
          <input value={filterFamily} onChange={(e) => setFilterFamily(e.target.value)} placeholder="Filter by family_id"
            className="bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none" />
          <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}
            className="bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none">
            <option value="">All grades</option>
            <option value="9-10">9-10</option>
            <option value="11-12">11-12</option>
            <option value="university-1-2">University 1-2</option>
          </select>
        </div>
      )}

      {tab === "quests" ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Family</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Grade</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Type</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Flagged</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {(thisWeekQuests.length > 0 ? thisWeekQuests : filtered).map((q: any) => (
                <tr key={q.id} className={`border-t border-border hover:bg-muted/30 ${q.flagged ? "bg-destructive/5" : ""}`}>
                  <td className="px-4 py-2.5 text-muted-foreground">{q.family_id || "—"}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{q.grade_band}</td>
                  <td className="px-4 py-2.5 font-medium text-foreground">{q.title}</td>
                  <td className="px-4 py-2.5 capitalize text-muted-foreground">{q.quest_type}</td>
                  <td className="px-4 py-2.5">
                    {q.flagged && <Flag size={14} className="text-destructive" />}
                  </td>
                  <td className="px-4 py-2.5 flex gap-1">
                    {!q.flagged && (
                      <button onClick={() => flagQuest(q.id)} className="p-1.5 rounded hover:bg-destructive/10" title="Flag">
                        <Flag size={14} className="text-muted-foreground" />
                      </button>
                    )}
                    <button onClick={() => deleteQuest(q.id)} className="p-1.5 rounded hover:bg-destructive/10">
                      <Trash2 size={14} className="text-destructive" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No quests found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Family</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Grade</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Week</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Status</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Error</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any) => (
                <tr key={log.id} className={`border-t border-border ${log.status === "failed" ? "bg-destructive/5" : ""}`}>
                  <td className="px-4 py-2.5 text-muted-foreground">{log.career_family_id}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{log.grade_band}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{log.week_number}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${log.status === "success" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[10px] text-destructive">{log.error_message || "—"}</td>
                  <td className="px-4 py-2.5 text-[10px] text-muted-foreground">{new Date(log.generated_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No generation logs yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SKILLS MANAGER
// ═══════════════════════════════════════
function SkillsManager() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genFamily, setGenFamily] = useState("");

  const fetchPrompts = async () => {
    setLoading(true);
    const { data } = await supabase.from("skill_prompts").select("*").order("family_id").order("skill_name").order("level").order("sort_order");
    setPrompts(data || []);
    setLoading(false);
  };

  useState(() => { fetchPrompts(); });

  const emptyPrompt = {
    family_id: "", career_id: "", skill_name: "", level: 1, prompt_text: "",
    prompt_format: "write", estimated_minutes: 10, xp_reward: 15, sort_order: 0, is_active: false,
  };

  const savePrompt = async (p: any) => {
    if (p.id) {
      const { error } = await supabase.from("skill_prompts").update(p as any).eq("id", p.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("skill_prompts").insert(p as any);
      if (error) { toast.error(error.message); return; }
    }
    toast.success("Saved!");
    setEditing(null);
    fetchPrompts();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("skill_prompts").update({ is_active: !current } as any).eq("id", id);
    fetchPrompts();
  };

  const deletePrompt = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("skill_prompts").delete().eq("id", id);
    toast.success("Deleted");
    fetchPrompts();
  };

  const generateSkillPrompts = async () => {
    if (!genFamily) { toast.error("Select a career family"); return; }
    setGenerating(true);
    try {
      const { error } = await supabase.functions.invoke("generate-skill-prompts", {
        body: { career_family: genFamily },
      });
      if (error) throw error;
      toast.success("Skill prompts generated!");
      fetchPrompts();
    } catch (err: any) {
      toast.error(err.message || "Generation failed");
    }
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Skills Manager</h2>
          <p className="text-sm text-muted-foreground">{prompts.length} prompts</p>
        </div>
        <button onClick={() => setEditing(emptyPrompt)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          <Plus size={16} /> Add Prompt
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 flex items-end gap-3">
        <div className="flex-1">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Generate skill prompts for family</label>
          <input value={genFamily} onChange={(e) => setGenFamily(e.target.value)} placeholder="e.g. creative-design"
            className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5" />
        </div>
        <button onClick={generateSkillPrompts} disabled={generating} className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold flex items-center gap-2">
          {generating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Generate
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-foreground">{editing.id ? "Edit" : "Add"} Skill Prompt</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Career Family" value={editing.family_id} onChange={(v) => setEditing({ ...editing, family_id: v })} />
            <Input label="Skill Name" value={editing.skill_name} onChange={(v) => setEditing({ ...editing, skill_name: v })} />
            <Select label="Level" value={String(editing.level)} options={["1","2","3"]} onChange={(v) => setEditing({ ...editing, level: parseInt(v) })} />
            <Select label="Format" value={editing.prompt_format} options={["write","observe","analyse"]} onChange={(v) => setEditing({ ...editing, prompt_format: v })} />
            <Input label="Est. Minutes" value={editing.estimated_minutes} type="number" onChange={(v) => setEditing({ ...editing, estimated_minutes: parseInt(v) || 10 })} />
            <Input label="XP Reward" value={editing.xp_reward} type="number" onChange={(v) => setEditing({ ...editing, xp_reward: parseInt(v) || 15 })} />
          </div>
          <textarea value={editing.prompt_text} onChange={(e) => setEditing({ ...editing, prompt_text: e.target.value })} placeholder="Prompt text"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[80px]" />
          <div className="flex gap-2">
            <button onClick={() => savePrompt(editing)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Family</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Skill</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Level</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Format</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Active</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((p: any) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5 text-muted-foreground">{p.family_id}</td>
                <td className="px-4 py-2.5 font-medium text-foreground">{p.skill_name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{p.level}</td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{p.prompt_format}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => toggleActive(p.id, p.is_active)}>
                    {p.is_active ? <ToggleRight size={20} className="text-primary" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
                  </button>
                </td>
                <td className="px-4 py-2.5 flex gap-1">
                  <button onClick={() => setEditing(p)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => deletePrompt(p.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {prompts.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No skill prompts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// FEED POSTS MANAGER
// ═══════════════════════════════════════
function FeedManager({ data, editing, setEditing, onSave, onDelete }: any) {
  const emptyPost = { title: "", career_family: "", content_type: "article", body_markdown: "", author: "", image_url: "", is_active: true };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Feed Content Manager</h2>
          <p className="text-sm text-muted-foreground">{data.length} posts</p>
        </div>
        <button onClick={() => setEditing(emptyPost)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          <Plus size={16} /> Add Post
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-foreground">{editing.id ? "Edit" : "Add"} Post</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Input label="Author" value={editing.author} onChange={(v) => setEditing({ ...editing, author: v })} />
            <Select label="Type" value={editing.content_type} options={["article","interview","spotlight","update","quest-nudge"]} onChange={(v) => setEditing({ ...editing, content_type: v })} />
            <Input label="Career Family" value={editing.career_family} onChange={(v) => setEditing({ ...editing, career_family: v })} />
            <Input label="Image URL" value={editing.image_url} onChange={(v) => setEditing({ ...editing, image_url: v })} />
          </div>
          <textarea value={editing.body_markdown} onChange={(e) => setEditing({ ...editing, body_markdown: e.target.value })} placeholder="Body (Markdown)"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[120px] font-mono" />
          <div className="flex gap-2">
            <button onClick={async () => { const ok = await onSave(editing); if (ok) setEditing(null); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Title</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Type</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Author</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Active</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((post: any) => (
              <tr key={post.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5 font-medium text-foreground">{post.title}</td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{post.content_type}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{post.author || "—"}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => onSave({ id: post.id, is_active: !post.is_active })}>
                    {post.is_active ? <ToggleRight size={20} className="text-primary" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
                  </button>
                </td>
                <td className="px-4 py-2.5 flex gap-1">
                  <button onClick={() => setEditing(post)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => { if (confirm("Delete?")) onDelete(post.id); }} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No feed posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SPOTLIGHTS MANAGER
// ═══════════════════════════════════════
function SpotlightsManager({ data, editing, setEditing, onSave, onDelete }: any) {
  const emptySpot = { name: "", role: "", organisation: "", backstory: "", photo_url: "", is_featured: false };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Person Spotlights</h2>
          <p className="text-sm text-muted-foreground">{data.length} spotlights</p>
        </div>
        <button onClick={() => setEditing(emptySpot)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          <Plus size={16} /> Add Spotlight
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-foreground">{editing.id ? "Edit" : "Add"} Spotlight</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Input label="Role" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
            <Input label="Organisation" value={editing.organisation} onChange={(v) => setEditing({ ...editing, organisation: v })} />
            <Input label="Photo URL" value={editing.photo_url} onChange={(v) => setEditing({ ...editing, photo_url: v })} />
          </div>
          <textarea value={editing.backstory} onChange={(e) => setEditing({ ...editing, backstory: e.target.value })} placeholder="Backstory"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[100px]" />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="accent-primary" />
            Featured (pinned on Mondays)
          </label>
          <div className="flex gap-2">
            <button onClick={async () => { const ok = await onSave(editing); if (ok) setEditing(null); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((spot: any) => (
          <div key={spot.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {spot.photo_url && <img src={spot.photo_url} alt={spot.name} className="w-full h-40 object-cover" />}
            <div className="p-4 space-y-1">
              <p className="font-bold text-foreground">{spot.name}</p>
              <p className="text-xs text-muted-foreground">{spot.role} · {spot.organisation}</p>
              {spot.is_featured && <span className="inline-block px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">Featured</span>}
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{spot.backstory}</p>
              <div className="flex gap-1 pt-2">
                <button onClick={() => setEditing(spot)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                <button onClick={() => { if (confirm("Delete?")) onDelete(spot.id); }} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">No spotlights yet</p>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════
function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Analytics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Signups", value: "—", desc: "Last 30 days" },
          { label: "Assessment Rate", value: "—", desc: "Completion %" },
          { label: "DAU", value: "—", desc: "Daily active users" },
          { label: "Top Career", value: "—", desc: "Most popular path" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground">{stat.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
        <BarChart3 size={32} className="mx-auto mb-2 opacity-40" />
        <p className="text-sm">Connect PostHog or analytics provider to see live data here</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SHARED FORM COMPONENTS
// ═══════════════════════════════════════
function Input({ label, value, onChange, type = "text" }: { label: string; value: any; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <input type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5" />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
