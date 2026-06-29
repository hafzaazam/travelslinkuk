import { useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { Reveal } from "./Reveal";
import { Calendar, FileText, Printer, ShieldCheck, ArrowUpRight } from "lucide-react";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (h.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return pct;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (!ids.length) return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join("|")]);
  return active;
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  const progress = useScrollProgress();
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);
  const articleRef = useRef<HTMLElement>(null);
  const [readMin, setReadMin] = useState<number>(0);

  useEffect(() => {
    const text = articleRef.current?.innerText ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setReadMin(Math.max(1, Math.round(words / 220)));
  }, [sections]);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Scroll progress bar */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent print:hidden"
      >
        <div
          className="h-full bg-gradient-brand shadow-glow transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          {/* ambient gradient blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-pulse" />
            <div
              className="absolute -top-20 right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-brand-cyan/20 blur-3xl animate-pulse"
              style={{ animationDelay: "1.2s" }}
            />
            <div className="absolute inset-0 bg-gradient-soft opacity-70" />
            {/* subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--brand-deep) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-deep) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage:
                  "radial-gradient(ellipse at top, black 40%, transparent 75%)",
              }}
            />
          </div>

          <div className="container mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-soft backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {eyebrow}
                </span>
                <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                  <span className="text-gradient-brand">{title}</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                  {intro}
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 py-1.5 backdrop-blur">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Updated <strong className="font-semibold text-foreground">{updated}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 py-1.5 backdrop-blur">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    {readMin} min read
                  </span>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-white px-3 py-1.5 font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow print:hidden"
                  >
                    <Printer className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    Print / Save PDF
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* gradient divider */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
        </section>

        {/* CONTENT */}
        <section className="relative container mx-auto px-4 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr]">
            {/* SIDEBAR / TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start print:hidden">
              <div className="rounded-2xl border border-border bg-white/70 p-4 shadow-card backdrop-blur">
                <p className="mb-3 flex items-center gap-2 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-px w-5 bg-gradient-brand" />
                  On this page
                </p>
                <nav className="flex flex-col gap-1 text-sm">
                  {sections.map((s, i) => {
                    const isActive = active === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                          isActive
                            ? "bg-primary/10 text-foreground shadow-soft"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold transition-all",
                            isActive
                              ? "bg-gradient-brand text-white shadow-glow"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary",
                          ].join(" ")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{s.title}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow animate-pulse" />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Progress chip */}
                <div className="mt-4 rounded-xl border border-border bg-gradient-soft p-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Reading progress</span>
                    <span className="text-primary">{Math.round(progress)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-brand transition-[width] duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* ARTICLE */}
            <article
              ref={articleRef}
              className="prose prose-sm sm:prose-base max-w-none"
            >
              <div className="space-y-6 sm:space-y-7">
                {sections.map((s, i) => (
                  <Reveal key={s.id} delay={i * 60} direction="up">
                    <section
                      id={s.id}
                      className={[
                        "group relative scroll-mt-28 overflow-hidden rounded-3xl border bg-white p-6 sm:p-8 transition-all",
                        "border-border shadow-card hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow",
                        active === s.id
                          ? "ring-1 ring-primary/30 shadow-glow"
                          : "",
                      ].join(" ")}
                    >
                      {/* accent bar */}
                      <span
                        aria-hidden
                        className="absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-brand opacity-60 transition-opacity group-hover:opacity-100"
                      />
                      {/* corner glow */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15"
                      />

                      <header className="flex flex-wrap items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-xs font-bold text-white shadow-glow transition-transform group-hover:scale-110 group-hover:rotate-[-4deg]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                          {s.title}
                        </h2>
                        <a
                          href={`#${s.id}`}
                          aria-label={`Link to ${s.title}`}
                          className="ml-auto inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-muted-foreground opacity-0 transition hover:border-primary/40 hover:text-primary group-hover:opacity-100 print:hidden"
                        >
                          Link
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </header>

                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                        {s.body}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              {/* Bottom CTA */}
              <Reveal direction="up">
                <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-brand p-7 sm:p-9 text-white shadow-glow print:hidden">
                  <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                        Questions?
                      </div>
                      <div className="mt-1 font-display text-xl font-bold sm:text-2xl">
                        Talk to a senior consultant — free 20-minute call.
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
                    >
                      Contact us
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
