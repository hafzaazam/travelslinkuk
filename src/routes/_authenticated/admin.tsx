import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Star, Mail, Phone, Trash2, Check, X, LogOut, RefreshCw,
  Download, Search, MessageSquare, Users, ShieldCheck, Home,
  LayoutDashboard, ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Travel Links Solution" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab = "dashboard" | "contacts" | "reviews" | "subscribers";

type Contact = {
  id: string; name: string; email: string; phone: string | null;
  subject: string | null; message: string; status: string; created_at: string;
};
type Review = {
  id: string; name: string; country: string | null; rating: number;
  comment: string; approved: boolean; created_at: string;
};
type Subscriber = { id: string; email: string; unsubscribed: boolean; created_at: string };

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setUserEmail(u.user?.email ?? null);
      if (!u.user) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data && !error);
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen grid place-items-center bg-secondary/40">
        <div className="text-sm text-muted-foreground">Checking access…</div>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-secondary/40 px-5">
        <div className="max-w-md text-center rounded-3xl border border-border bg-white p-8 shadow-card">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 font-display text-xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as <span className="font-medium">{userEmail}</span>, but this account
            doesn't have admin permission yet. Ask another admin to grant you the role.
          </p>
          <div className="mt-6 flex gap-2 justify-center">
            <button onClick={signOut} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold">
              Sign out
            </button>
            <Link to="/" className="rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white">
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="h-3 w-3" /> Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <Home className="h-3.5 w-3.5" /> Site
            </Link>
            <span className="hidden md:inline text-xs text-muted-foreground">{userEmail}</span>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="flex gap-1 -mb-px">
            {([
              ["contacts", MessageSquare, "Contacts"],
              ["reviews", Star, "Reviews"],
              ["subscribers", Users, "Subscribers"],
            ] as const).map(([key, Icon, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition ${
                  tab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {tab === "contacts" && <ContactsPanel />}
        {tab === "reviews" && <ReviewsPanel />}
        {tab === "subscribers" && <SubscribersPanel />}
      </main>
    </div>
  );
}

/* ----------- Contacts ----------- */
function ContactsPanel() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) toast.error("Failed to load contacts");
    else setItems((data ?? []) as Contact[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) return toast.error("Could not update");
    setItems((p) => p.map((c) => (c.id === id ? { ...c, status } : c)));
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error("Could not delete");
    setItems((p) => p.filter((c) => c.id !== id));
    toast.success("Deleted");
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);
  const counts = useMemo(() => ({
    all: items.length,
    new: items.filter((i) => i.status === "new").length,
    read: items.filter((i) => i.status === "read").length,
    archived: items.filter((i) => i.status === "archived").length,
  }), [items]);

  return (
    <div>
      <PanelHeader title="Contact submissions" onRefresh={load} count={filtered.length}>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "new", "read", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                filter === s ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s} <span className="opacity-60">({counts[s]})</span>
            </button>
          ))}
        </div>
      </PanelHeader>

      {loading ? <SkeletonRows /> : filtered.length === 0 ? <EmptyState label="No submissions yet" /> : (
        <div className="grid gap-3">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{c.name}</h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 hover:text-primary"><Mail className="h-3 w-3" /> {c.email}</a>
                    {c.phone && <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 hover:text-primary"><Phone className="h-3 w-3" /> {c.phone}</a>}
                    <span>{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {c.status !== "read" && (
                    <button onClick={() => updateStatus(c.id, "read")} title="Mark read" className="rounded-lg border border-border bg-white p-2 hover:bg-secondary">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {c.status !== "archived" && (
                    <button onClick={() => updateStatus(c.id, "archived")} title="Archive" className="rounded-lg border border-border bg-white p-2 hover:bg-secondary text-xs font-semibold">
                      Archive
                    </button>
                  )}
                  <button onClick={() => remove(c.id)} title="Delete" className="rounded-lg border border-destructive/30 bg-white p-2 hover:bg-destructive/10 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {c.subject && <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.subject}</div>}
              <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------- Reviews ----------- */
function ReviewsPanel() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) toast.error("Failed to load reviews");
    else setItems((data ?? []) as Review[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const setApproved = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
    if (error) return toast.error("Could not update");
    setItems((p) => p.map((r) => (r.id === id ? { ...r, approved } : r)));
    toast.success(approved ? "Review approved" : "Review hidden");
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return toast.error("Could not delete");
    setItems((p) => p.filter((r) => r.id !== id));
    toast.success("Deleted");
  };

  const filtered = items.filter((r) => filter === "all" ? true : filter === "pending" ? !r.approved : r.approved);
  const counts = useMemo(() => ({
    all: items.length,
    pending: items.filter((i) => !i.approved).length,
    approved: items.filter((i) => i.approved).length,
  }), [items]);

  return (
    <div>
      <PanelHeader title="Customer reviews" onRefresh={load} count={filtered.length}>
        <div className="flex flex-wrap gap-1.5">
          {(["pending", "approved", "all"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                filter === s ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s} <span className="opacity-60">({counts[s]})</span>
            </button>
          ))}
        </div>
      </PanelHeader>

      {loading ? <SkeletonRows /> : filtered.length === 0 ? <EmptyState label="No reviews here" /> : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{r.name}</h3>
                  {r.country && <div className="text-xs text-muted-foreground">{r.country}</div>}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < r.rating ? "fill-brand-aqua text-brand-aqua" : "text-border"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm whitespace-pre-wrap">{r.comment}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
                <div className="flex gap-1.5">
                  {r.approved ? (
                    <button onClick={() => setApproved(r.id, false)} className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary">
                      <X className="h-3.5 w-3.5" /> Unapprove
                    </button>
                  ) : (
                    <button onClick={() => setApproved(r.id, true)} className="inline-flex items-center gap-1 rounded-lg bg-gradient-brand px-2.5 py-1.5 text-xs font-semibold text-white">
                      <Check className="h-3.5 w-3.5" /> Approve
                    </button>
                  )}
                  <button onClick={() => remove(r.id)} className="rounded-lg border border-destructive/30 bg-white p-2 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------- Subscribers ----------- */
function SubscribersPanel() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) toast.error("Failed to load subscribers");
    else setItems((data ?? []) as Subscriber[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) return toast.error("Could not delete");
    setItems((p) => p.filter((s) => s.id !== id));
    toast.success("Deleted");
  };

  const filtered = q ? items.filter((s) => s.email.toLowerCase().includes(q.toLowerCase())) : items;

  const exportCsv = () => {
    const rows = [["email", "subscribed_at", "unsubscribed"]];
    filtered.forEach((s) => rows.push([s.email, s.created_at, String(s.unsubscribed)]));
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PanelHeader title="Newsletter subscribers" onRefresh={load} count={filtered.length}>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search email…"
              className="rounded-lg border border-border bg-white pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </PanelHeader>

      {loading ? <SkeletonRows /> : filtered.length === 0 ? <EmptyState label="No subscribers yet" /> : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Subscribed</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">
                    {s.email}
                    {s.unsubscribed && <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">unsubscribed</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(s.id)} className="rounded-lg border border-destructive/30 bg-white p-2 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ----------- Shared ----------- */
function PanelHeader({ title, count, onRefresh, children }: { title: string; count: number; onRefresh: () => void; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <p className="text-xs text-muted-foreground">{count} {count === 1 ? "entry" : "entries"}</p>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <button onClick={onRefresh} title="Refresh" className="rounded-lg border border-border bg-white p-2 hover:bg-secondary">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-primary/10 text-primary",
    read: "bg-secondary text-muted-foreground",
    archived: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map[status] ?? "bg-secondary"}`}>
      {status}
    </span>
  );
}
function SkeletonRows() {
  return (
    <div className="grid gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 rounded-2xl bg-white/60 border border-border animate-pulse" />
      ))}
    </div>
  );
}
function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
