import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

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
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(60% 60% at 20% 0%, hsl(var(--primary)/0.10), transparent 60%), radial-gradient(50% 50% at 90% 20%, hsl(var(--primary)/0.08), transparent 60%)",
            }}
          />
          <div className="container mx-auto px-4 pt-28 pb-12 sm:pt-32 sm:pb-16">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
                {eyebrow}
              </span>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {intro}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Last updated: {updated}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <nav className="flex flex-col gap-1.5 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="prose prose-sm sm:prose-base max-w-none">
              <div className="space-y-10">
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="flex items-baseline gap-3 text-xl font-bold text-foreground sm:text-2xl">
                      <span className="text-xs font-semibold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </h2>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {s.body}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
