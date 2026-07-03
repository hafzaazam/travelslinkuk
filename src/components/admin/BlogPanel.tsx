import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Plus, Pencil, Trash2, Save, X, Eye, EyeOff, Search, FileText, ExternalLink,
  Bold, Italic, Heading1, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon,
  List, ListOrdered, Quote, Code, Minus, Lock, Unlock, Clock, Copy, Upload, Loader2,
} from "lucide-react";

const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10; // 10 years

async function uploadBlogImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
  if (file.size > 8 * 1024 * 1024) throw new Error("Image must be under 8 MB");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from("blog-images").upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (upErr) throw upErr;
  const { data, error } = await supabase.storage.from("blog-images").createSignedUrl(path, SIGNED_URL_TTL);
  if (error || !data?.signedUrl) throw error ?? new Error("Failed to create signed URL");
  return data.signedUrl;
}
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
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
};

const emptyForm = (): Partial<BlogPost> => ({
  slug: "", title: "", excerpt: "", content: "", cover_image: "",
  author: "Travel Links Solution", tags: [], published: false, published_at: null,
  meta_title: "", meta_description: "", meta_keywords: "",
  og_image: "", canonical_url: "", noindex: false,
});

function slugify(s: string) {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 220)) };
}

const DRAFT_KEY = (id?: string) => `blog-draft:${id ?? "new"}`;

export function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [editor, setEditor] = useState<{ open: boolean; post: Partial<BlogPost> | null }>({
    open: false, post: null,
  });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setPosts((data as BlogPost[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter === "published" && !p.published) return false;
      if (filter === "draft" && p.published) return false;
      if (!s) return true;
      return (
        p.title.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s) ||
        (p.excerpt ?? "").toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
      );
    });
  }, [posts, q, filter]);

  const counts = useMemo(() => ({
    all: posts.length,
    published: posts.filter((p) => p.published).length,
    draft: posts.filter((p) => !p.published).length,
  }), [posts]);

  const togglePublish = async (p: BlogPost) => {
    const next = !p.published;
    const { error } = await supabase.from("blog_posts").update({
      published: next,
      published_at: next ? p.published_at ?? new Date().toISOString() : p.published_at,
    }).eq("id", p.id);
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

  const duplicate = async (p: BlogPost) => {
    const base = `${p.slug}-copy`;
    let slug = base; let i = 2;
    while (posts.some((x) => x.slug === slug)) { slug = `${base}-${i++}`; }
    const { error } = await supabase.from("blog_posts").insert({
      slug, title: `${p.title} (copy)`, excerpt: p.excerpt, content: p.content,
      cover_image: p.cover_image, author: p.author, tags: p.tags,
      published: false, published_at: null,
    });
    if (error) return toast.error(error.message);
    toast.success("Post duplicated as draft");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Write in Markdown with a live preview that matches the public site.
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
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, slug, tag…"
              className="w-full rounded-xl border border-border bg-white pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <div className="inline-flex rounded-xl border border-border bg-secondary/40 p-0.5 text-xs font-semibold">
            {(["all", "published", "draft"] as const).map((k) => (
              <button
                key={k} onClick={() => setFilter(k)}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  filter === k ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                {k} <span className="opacity-60">({counts[k]})</span>
              </button>
            ))}
          </div>
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
            {filtered.map((p) => {
              const rt = readingTime(p.content);
              return (
                <li key={p.id} className="flex flex-wrap items-center gap-3 py-3">
                  {p.cover_image ? (
                    <img src={p.cover_image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                  ) : (
                    <div className="h-12 w-16 grid place-items-center rounded-lg bg-secondary text-muted-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold">{p.title || "(untitled)"}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {p.published ? "Live" : "Draft"}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      /blog/{p.slug} · {rt.minutes} min read · updated {new Date(p.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {p.published && (
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary">
                        <ExternalLink className="h-3.5 w-3.5" /> View
                      </a>
                    )}
                    <button onClick={() => togglePublish(p)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary">
                      {p.published ? <><EyeOff className="h-3.5 w-3.5" /> Unpublish</> : <><Eye className="h-3.5 w-3.5" /> Publish</>}
                    </button>
                    <button onClick={() => duplicate(p)}
                      title="Duplicate as draft"
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setEditor({ open: true, post: p })}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold hover:bg-secondary">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => remove(p)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {editor.open && editor.post && (
        <PostEditor
          initial={editor.post}
          onClose={() => setEditor({ open: false, post: null })}
          onSaved={() => { setEditor({ open: false, post: null }); load(); }}
        />
      )}
    </div>
  );
}

/* ---------- Editor ---------- */

function PostEditor({
  initial, onClose, onSaved,
}: {
  initial: Partial<BlogPost>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!initial.id;
  const draftKey = DRAFT_KEY(initial.id);

  const [form, setForm] = useState<Partial<BlogPost>>(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        try {
          const cached = JSON.parse(raw);
          if (confirmRestore(cached)) return { ...initial, ...cached };
        } catch { /* ignore */ }
      }
    }
    return { ...initial };
  });
  const [saving, setSaving] = useState(false);
  const [tags, setTags] = useState<string[]>(initial.tags ?? []);
  const [tagDraft, setTagDraft] = useState("");
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Autosave draft to localStorage
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ ...form, tags }));
        setSavedAt(new Date());
      } catch { /* ignore */ }
    }, 600);
    return () => clearTimeout(t);
  }, [form, tags, draftKey]);

  const rt = readingTime(form.content ?? "");
  const titleLen = (form.title ?? "").length;
  const excerptLen = (form.excerpt ?? "").length;

  const insertMd = (before: string, after = "", placeholder = "") => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const value = ta.value;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    setForm((f) => ({ ...f, content: next }));
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + before.length + selected.length + after.length;
      ta.setSelectionRange(start + before.length, pos - after.length);
    });
  };

  const insertBlock = (block: string) => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const value = ta.value;
    const needsNl = start > 0 && value[start - 1] !== "\n" ? "\n" : "";
    const next = value.slice(0, start) + needsNl + block + "\n" + value.slice(start);
    setForm((f) => ({ ...f, content: next }));
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + needsNl.length + block.length + 1;
      ta.setSelectionRange(pos, pos);
    });
  };

  const addTag = (raw: string) => {
    const t = raw.trim().replace(/,$/, "");
    if (!t) return;
    if (!tags.includes(t)) setTags([...tags, t]);
    setTagDraft("");
  };

  const onTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      if (tagDraft.trim()) { e.preventDefault(); addTag(tagDraft); }
    } else if (e.key === "Backspace" && !tagDraft && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault(); save();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault(); insertMd("**", "**", "bold");
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
      e.preventDefault(); insertMd("*", "*", "italic");
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const url = prompt("Link URL"); if (url) insertMd("[", `](${url})`, "text");
    }
  };

  const save = async () => {
    if (!form.title?.trim()) return toast.error("Title is required");
    const slug = form.slug?.trim() || slugify(form.title);
    if (!slug) return toast.error("Slug is required");

    setSaving(true);
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
      meta_title: form.meta_title?.trim() || null,
      meta_description: form.meta_description?.trim() || null,
      meta_keywords: form.meta_keywords?.trim() || null,
      og_image: form.og_image?.trim() || null,
      canonical_url: form.canonical_url?.trim() || null,
      noindex: !!form.noindex,
    };

    const { error } = isEdit
      ? await supabase.from("blog_posts").update(payload).eq("id", initial.id!)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) return toast.error(error.message);
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
    toast.success(isEdit ? "Post updated" : "Post created");
    onSaved();
  };

  const discardDraft = () => {
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setForm({ ...initial });
    setTags(initial.tags ?? []);
    toast.success("Draft discarded");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-0 md:p-4 overflow-y-auto" onKeyDown={onKeyDown}>
      <div className="mx-auto max-w-6xl rounded-none md:rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-white/95 backdrop-blur px-4 py-2.5">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-base font-bold">
              {isEdit ? "Edit post" : "New post"}
            </h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              form.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              {form.published ? "Live" : "Draft"}
            </span>
            {savedAt && (
              <span className="hidden sm:inline text-[11px] text-muted-foreground">
                Draft autosaved · {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:inline-flex rounded-lg border border-border bg-secondary/40 p-0.5 text-xs font-semibold">
              <button onClick={() => setTab("write")}
                className={`px-2.5 py-1 rounded-md ${tab === "write" ? "bg-white shadow-sm" : "text-muted-foreground"}`}>
                Write
              </button>
              <button onClick={() => setTab("preview")}
                className={`px-2.5 py-1 rounded-md ${tab === "preview" ? "bg-white shadow-sm" : "text-muted-foreground"}`}>
                Preview
              </button>
            </div>
            <label className="flex items-center gap-1.5 text-xs font-semibold">
              <input type="checkbox" checked={!!form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Publish
            </label>
            <button onClick={save} disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
              <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main column: title + content editor */}
          <div className="p-4 md:p-5 space-y-3 min-w-0">
            {/* Title */}
            <div>
              <input
                value={form.title ?? ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: slugLocked ? f.slug : slugify(title) }));
                }}
                placeholder="Post title"
                className="w-full font-display text-2xl font-bold outline-none placeholder:text-muted-foreground/40"
              />
              <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span>/blog/</span>
                  <input
                    value={form.slug ?? ""}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="rounded border border-border bg-white px-1.5 py-0.5 text-[11px]"
                  />
                  <button
                    onClick={() => setSlugLocked((s) => !s)}
                    title={slugLocked ? "Slug locked — won't auto-update" : "Auto-updating from title"}
                    className="rounded p-1 hover:bg-secondary"
                  >
                    {slugLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                  </button>
                </div>
                <span className={titleLen > 60 ? "text-amber-600" : ""}>{titleLen}/60 for SEO</span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 rounded-lg border border-border bg-secondary/30 p-1">
              <ToolBtn onClick={() => insertMd("## ", "", "Heading")} title="Heading 2"><Heading2 className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertMd("### ", "", "Subheading")} title="Heading 3"><Heading3 className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertMd("# ", "", "Title")} title="Heading 1"><Heading1 className="h-4 w-4" /></ToolBtn>
              <Divider />
              <ToolBtn onClick={() => insertMd("**", "**", "bold")} title="Bold (Ctrl+B)"><Bold className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertMd("*", "*", "italic")} title="Italic (Ctrl+I)"><Italic className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertMd("`", "`", "code")} title="Inline code"><Code className="h-4 w-4" /></ToolBtn>
              <Divider />
              <ToolBtn onClick={() => {
                const url = prompt("Link URL"); if (url) insertMd("[", `](${url})`, "link text");
              }} title="Link (Ctrl+K)"><LinkIcon className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => {
                const url = prompt("Image URL"); if (!url) return;
                const alt = prompt("Alt text (optional)") ?? "";
                insertBlock(`![${alt}](${url})`);
              }} title="Image"><ImageIcon className="h-4 w-4" /></ToolBtn>
              <Divider />
              <ToolBtn onClick={() => insertMd("- ", "", "item")} title="Bullet list"><List className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertMd("1. ", "", "item")} title="Numbered list"><ListOrdered className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertMd("> ", "", "quote")} title="Quote"><Quote className="h-4 w-4" /></ToolBtn>
              <ToolBtn onClick={() => insertBlock("---")} title="Divider"><Minus className="h-4 w-4" /></ToolBtn>
            </div>

            {/* Content (write/preview) */}
            {tab === "write" ? (
              <textarea
                ref={contentRef}
                rows={22}
                value={form.content ?? ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your story in Markdown…&#10;&#10;## Heading&#10;- Bullet&#10;**Bold** *italic* [link](https://…) ![image](https://…)"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 font-mono text-[13px] leading-relaxed focus:outline-2 focus:outline-primary/40"
              />
            ) : (
              <div className="rounded-xl border border-border bg-white p-5 min-h-[440px]">
                <MarkdownPreview form={form} tags={tags} />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {rt.minutes} min read · {rt.words} words</span>
              <span>Markdown supported (GFM). Ctrl+B bold · Ctrl+I italic · Ctrl+K link · Ctrl+S save</span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="border-t md:border-t-0 md:border-l border-border bg-secondary/20 p-4 space-y-4">
            <Section title="Cover image">
              {form.cover_image ? (
                <div className="relative group">
                  <img src={form.cover_image} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" />
                  <button onClick={() => setForm({ ...form, cover_image: "" })}
                    className="absolute top-1.5 right-1.5 rounded-full bg-white/90 p-1 opacity-0 group-hover:opacity-100 transition">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="aspect-[16/9] w-full rounded-lg border border-dashed border-border grid place-items-center text-muted-foreground">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
              <input
                value={form.cover_image ?? ""}
                onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                placeholder="https://images.unsplash.com/…"
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
              />
            </Section>

            <Section title="Excerpt" hint={`${excerptLen}/160`}>
              <textarea
                rows={3}
                value={form.excerpt ?? ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Short summary for the blog index and social cards."
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs"
              />
            </Section>

            <Section title="Tags">
              <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-white p-1.5 focus-within:outline focus-within:outline-2 focus-within:outline-primary/40">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {t}
                    <button onClick={() => setTags(tags.filter((x) => x !== t))} className="opacity-60 hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <input
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  onKeyDown={onTagKey}
                  onBlur={() => tagDraft.trim() && addTag(tagDraft)}
                  placeholder={tags.length ? "" : "visa, uk, tips…"}
                  className="flex-1 min-w-[80px] bg-transparent px-1 text-xs outline-none"
                />
              </div>
            </Section>

            <Section title="Author">
              <input
                value={form.author ?? ""}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
              />
            </Section>

            {/* SEO */}
            <div className="rounded-xl border border-border bg-white p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">SEO & social</span>
                <span className="text-[10px] text-muted-foreground">Overrides defaults</span>
              </div>

              <Section title="Meta title" hint={`${(form.meta_title ?? "").length}/60`}>
                <input
                  value={form.meta_title ?? ""}
                  onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                  placeholder={form.title || "Falls back to post title"}
                  className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
                />
              </Section>

              <Section title="Meta description" hint={`${(form.meta_description ?? "").length}/160`}>
                <textarea
                  rows={3}
                  value={form.meta_description ?? ""}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  placeholder={form.excerpt || "Falls back to excerpt"}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs"
                />
              </Section>

              <Section title="Keywords" hint="Comma separated">
                <input
                  value={form.meta_keywords ?? ""}
                  onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                  placeholder="uk visa, immigration, study visa"
                  className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
                />
              </Section>

              <Section title="Social share image">
                {(form.og_image || form.cover_image) && (
                  <img src={form.og_image || form.cover_image!} alt=""
                    className="mb-2 aspect-[1.91/1] w-full rounded-lg object-cover" />
                )}
                <input
                  value={form.og_image ?? ""}
                  onChange={(e) => setForm({ ...form, og_image: e.target.value })}
                  placeholder="Optional — defaults to cover image"
                  className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
                />
              </Section>

              <Section title="Canonical URL">
                <input
                  value={form.canonical_url ?? ""}
                  onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                  placeholder={`https://travellinks.uk/blog/${form.slug || "…"}`}
                  className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
                />
              </Section>

              <label className="flex items-start gap-2 text-xs">
                <input type="checkbox" checked={!!form.noindex} className="mt-0.5"
                  onChange={(e) => setForm({ ...form, noindex: e.target.checked })} />
                <span>
                  <span className="font-semibold">Hide from search engines</span>
                  <span className="block text-[11px] text-muted-foreground">Adds noindex, nofollow meta tag.</span>
                </span>
              </label>

              {/* Google preview */}
              <div className="rounded-lg border border-border bg-secondary/20 p-3">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Google preview</p>
                <p className="truncate text-[11px] text-emerald-800">
                  travellinks.uk › blog › {form.slug || "…"}
                </p>
                <p className="truncate text-sm text-blue-700 hover:underline cursor-default">
                  {form.meta_title || form.title || "Post title"}
                </p>
                <p className="line-clamp-2 text-xs text-neutral-700">
                  {form.meta_description || form.excerpt || "Add a meta description to control how this post looks in search results."}
                </p>
              </div>
            </div>

            {isEdit && (
              <Section title="Draft">
                <button onClick={discardDraft}
                  className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                  Discard unsaved changes
                </button>
              </Section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function confirmRestore(cached: Partial<BlogPost>) {
  if (!cached?.title && !cached?.content) return false;
  return confirm("Restore your unsaved draft for this post?");
}

function ToolBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} title={title}
      className="rounded p-1.5 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm">
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-0.5 h-4 w-px bg-border" />;
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function MarkdownPreview({ form, tags }: { form: Partial<BlogPost>; tags: string[] }) {
  return (
    <article>
      {form.cover_image && (
        <img src={form.cover_image} alt="" className="mb-4 aspect-[16/9] w-full rounded-lg object-cover" />
      )}
      <div className="mb-2 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{t}</span>
        ))}
      </div>
      <h1 className="font-display text-2xl font-bold leading-tight">{form.title || "Post title"}</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        By {form.author || "Author"} · {new Date(form.published_at ?? Date.now()).toLocaleDateString()}
      </p>
      {form.excerpt && <p className="mt-3 text-sm text-muted-foreground">{form.excerpt}</p>}
      <div className="prose prose-sm mt-4 max-w-none prose-img:rounded-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {form.content || "_Start writing to see the preview…_"}
        </ReactMarkdown>
      </div>
    </article>
  );
}
