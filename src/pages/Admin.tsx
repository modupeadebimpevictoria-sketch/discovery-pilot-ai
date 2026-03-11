import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useAdminData } from "@/hooks/useAdminData";
import { useApp } from "@/contexts/AppContext";
import {
  Briefcase, FileText, Users, BarChart3, Plus, Pencil, Trash2,
  ToggleLeft, ToggleRight, AlertTriangle, ChevronLeft, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

type Section = "opportunities" | "feed" | "spotlights" | "analytics";

const sectionConfig = [
  { id: "opportunities" as Section, label: "Opportunities", icon: Briefcase },
  { id: "feed" as Section, label: "Feed Posts", icon: FileText },
  { id: "spotlights" as Section, label: "Spotlights", icon: Users },
  { id: "analytics" as Section, label: "Analytics", icon: BarChart3 },
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

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (!isAdmin) {
    navigate("/feed");
    return null;
  }

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
                section === s.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <s.icon size={16} />
              {s.label}
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
            <OpportunitiesManager
              data={opportunities}
              editing={editingOpp}
              setEditing={setEditingOpp}
              onSave={upsertOpportunity}
              onDelete={deleteOpportunity}
            />
          )}
          {section === "feed" && (
            <FeedManager
              data={feedPosts}
              editing={editingPost}
              setEditing={setEditingPost}
              onSave={upsertFeedPost}
              onDelete={deleteFeedPost}
            />
          )}
          {section === "spotlights" && (
            <SpotlightsManager
              data={spotlights}
              editing={editingSpot}
              setEditing={setEditingSpot}
              onSave={upsertSpotlight}
              onDelete={deleteSpotlight}
            />
          )}
          {section === "analytics" && <AnalyticsDashboard />}
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════
// OPPORTUNITIES MANAGER
// ═══════════════════════════════════════
function OpportunitiesManager({ data, editing, setEditing, onSave, onDelete }: any) {
  const emptyOpp = {
    title: "", organisation: "", type: "internship", description: "", location: "Global",
    country: "", city: "", min_grade: 9, max_grade: 12, application_url: "", deadline: "",
    duration: "", career_family: "", is_remote: false, is_active: true, is_link_dead: false,
  };

  const deadLinks = data.filter((o: any) => o.is_link_dead);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Opportunities Manager</h2>
          <p className="text-sm text-muted-foreground">{data.length} total · {deadLinks.length} dead links</p>
        </div>
        <button
          onClick={() => setEditing(emptyOpp)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
        >
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
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Grade</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Location</th>
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Active</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((opp: any) => (
              <tr key={opp.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-foreground">{opp.title}</p>
                  <p className="text-[10px] text-muted-foreground">{opp.organisation}</p>
                </td>
                <td className="px-4 py-2.5 capitalize text-muted-foreground">{opp.type}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{opp.min_grade}–{opp.max_grade}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{opp.country || opp.location}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => onSave({ id: opp.id, is_active: !opp.is_active })}>
                    {opp.is_active ? <ToggleRight size={20} className="text-primary" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
                  </button>
                </td>
                <td className="px-4 py-2.5 flex gap-1">
                  <button onClick={() => setEditing(opp)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => { if (confirm("Delete this opportunity?")) onDelete(opp.id); }} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No opportunities yet — add your first one above</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OppForm({ data, onSave, onCancel }: any) {
  const [form, setForm] = useState(data);
  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-4">
      <h3 className="font-bold text-foreground">{form.id ? "Edit" : "Add"} Opportunity</h3>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Title" value={form.title} onChange={(v) => set("title", v)} />
        <Input label="Organisation" value={form.organisation} onChange={(v) => set("organisation", v)} />
        <Select label="Type" value={form.type} options={["internship","shadowing","competition","program","virtual"]} onChange={(v) => set("type", v)} />
        <Input label="Location" value={form.location} onChange={(v) => set("location", v)} />
        <Input label="Country" value={form.country} onChange={(v) => set("country", v)} />
        <Input label="City" value={form.city} onChange={(v) => set("city", v)} />
        <Input label="Min Grade" value={form.min_grade} type="number" onChange={(v) => set("min_grade", parseInt(v))} />
        <Input label="Max Grade" value={form.max_grade} type="number" onChange={(v) => set("max_grade", parseInt(v))} />
        <Input label="Application URL" value={form.application_url} onChange={(v) => set("application_url", v)} />
        <Input label="Deadline (YYYY-MM-DD)" value={form.deadline || ""} onChange={(v) => set("deadline", v || null)} />
        <Input label="Duration" value={form.duration} onChange={(v) => set("duration", v)} />
        <Input label="Career Family" value={form.career_family} onChange={(v) => set("career_family", v)} />
      </div>
      <textarea
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        placeholder="Description"
        className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[80px]"
      />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.is_remote} onChange={(e) => set("is_remote", e.target.checked)} className="accent-primary" />
          Remote
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="accent-primary" />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm text-destructive">
          <input type="checkbox" checked={form.is_link_dead} onChange={(e) => set("is_link_dead", e.target.checked)} className="accent-destructive" />
          Dead Link
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
          <textarea
            value={editing.body_markdown}
            onChange={(e) => setEditing({ ...editing, body_markdown: e.target.value })}
            placeholder="Body (Markdown)"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[120px] font-mono"
          />
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
                  <button onClick={() => { if (confirm("Delete this post?")) onDelete(post.id); }} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No feed posts yet — create your first one</td></tr>
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
          <textarea
            value={editing.backstory}
            onChange={(e) => setEditing({ ...editing, backstory: e.target.value })}
            placeholder="Backstory"
            className="w-full bg-muted/30 rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:border-primary outline-none min-h-[100px]"
          />
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
// ANALYTICS (placeholder)
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
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-foreground border border-border focus:border-primary outline-none mt-0.5"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
