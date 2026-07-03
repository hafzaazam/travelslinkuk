import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff, Search, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const emptyForm = (): Partial<BlogPost> => ({
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  author: "Travel Links Solution",
  tags: [],
  published: false,
  published_at: null,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editor, setEditor] = useState<{ open: boolean; post: Partial<BlogPost> | null }>({
    open: false,
    post: null,
  });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setPosts((data as BlogPost[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s) ||
        (p.excerpt ?? "").toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
    );
  }, [posts, q]);

  const togglePublish = async (p: BlogPost) => {
    const next = !p.published;
    const { error } = await supabase
      .from("blog_posts")
      .update({
        published: next,
        published_at: next ? p.published_at ?? new Date().toISOString() : p.published_at,
      })
      .eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success(next ? "Post published" : "Post unpublished");
    load();
  };

  const remove = async (p: BlogPost) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Post deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Create articles, manage drafts, and publish stories that live at <code>/blog</code>.
          </p>
        </div>
        <button
          onClick={() => setEditor({ open: true, post: emptyForm() })}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-card"
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, slug, tag…"
            className="w-full rounded-xl border border-border bg-white pl-9 pr-3 py-2 text-sm"
          />
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              {q ? "No posts match your search." : "No blog posts yet — write your first article."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 py-3">
                {p.cover_image ? (
                  <img
                    src={p.cover_image}
                    alt=""
                    className="h-12 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-12 w-16 grid place-items-center rounded-lg bg-secondary text-muted-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{p.title || "(untitled)"}</p>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.published ? "Live" : "Draft"}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    /blog/{p.slug} · updated {new Date(p.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {p.published && (
                    <a
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View
                    </a>
                  )}
                  <button
                    onClick={() => togglePublish(p)}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary"
                  >
                    {p.published ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" /> Publish
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setEditor({ open: true, post: p })}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => remove(p)}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editor.open && editor.post && (
        <PostEditor
          initial={editor.post}
          onClose={() => setEditor({ open: false, post: null })}
          onSaved={() => {
            setEditor({ open: false, post: null });
            load();
          }}
        />
      )}
    </div>
  );
}

function PostEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: Partial<BlogPost>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<BlogPost>>({ ...initial });
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState((initial.tags ?? []).join(", "));
  const isEdit = !!initial.id;

  const save = async () => {
    if (!form.title?.trim()) return toast.error("Title is required");
    const slug = form.slug?.trim() || slugify(form.title);
    if (!slug) return toast.error("Slug is required");

    setSaving(true);
    const tags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      slug,
      title: form.title.trim(),
      excerpt: form.excerpt?.trim() || null,
      content: form.content ?? "",
      cover_image: form.cover_image?.trim() || null,
      author: form.author?.trim() || null,
      tags,
      published: !!form.published,
      published_at:
        form.published && !form.published_at ? new Date().toISOString() : form.published_at ?? null,
    };

    const { error } = isEdit
      ? await supabase.from("blog_posts").update(payload).eq("id", initial.id!)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(isEdit ? "Post updated" : "Post created");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-3 md:p-6 overflow-y-auto">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="font-display text-lg font-bold">
            {isEdit ? "Edit post" : "New post"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <div className="space-y-3">
            <Field label="Title">
              <input
                required
                value={form.title ?? ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: isEdit ? f.slug : slugify(title),
                  }));
                }}
                className="input"
              />
            </Field>
            <Field label="Slug" hint="Used in the URL: /blog/your-slug">
              <input
                value={form.slug ?? ""}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                className="input"
              />
            </Field>
            <Field label="Excerpt" hint="Short summary shown on the blog index and social cards.">
              <textarea
                rows={2}
                value={form.excerpt ?? ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Cover image URL">
              <input
                value={form.cover_image ?? ""}
                onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                className="input"
                placeholder="https://…"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Author">
                <input
                  value={form.author ?? ""}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Tags" hint="Comma separated">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="input"
                  placeholder="visa, uk, tips"
                />
              </Field>
            </div>
            <Field
              label="Content"
              hint="Plain text or basic HTML. Line breaks are preserved."
            >
              <textarea
                rows={12}
                value={form.content ?? ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="input font-mono text-xs"
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published (visible on the site)
            </label>
          </div>

          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Live preview
            </p>
            <article className="rounded-xl bg-white p-5 shadow-card">
              {form.cover_image && (
                <img
                  src={form.cover_image}
                  alt=""
                  className="mb-4 aspect-[16/9] w-full rounded-lg object-cover"
                />
              )}
              <div className="mb-2 flex flex-wrap gap-1.5">
                {tagInput
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                    >
                      {t}
                    </span>
                  ))}
              </div>
              <h1 className="font-display text-2xl font-bold leading-tight">
                {form.title || "Post title"}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                By {form.author || "Author"} ·{" "}
                {new Date(form.published_at ?? Date.now()).toLocaleDateString()}
              </p>
              {form.excerpt && (
                <p className="mt-3 text-sm text-muted-foreground">{form.excerpt}</p>
              )}
              <div
                className="prose prose-sm mt-4 max-w-none whitespace-pre-wrap text-sm"
                dangerouslySetInnerHTML={{
                  __html: form.content ?? "<em>Content preview…</em>",
                }}
              />
            </article>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save post"}
          </button>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        .input:focus { outline: 2px solid hsl(var(--primary) / 0.4); outline-offset: 1px; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}
