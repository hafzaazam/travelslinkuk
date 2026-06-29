import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, GitCompare, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Eyebrow } from "@/components/site/Eyebrow";
import { COUNTRIES, type Country } from "@/data/countries";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Visas & Countries — Travel Links Solution" },
      {
        name: "description",
        content:
          "Compare visa types, requirements, processing times and benefits across destinations side-by-side. Pick up to 3 countries to compare.",
      },
      { property: "og:title", content: "Compare Visas & Countries — Travel Links Solution" },
      {
        property: "og:description",
        content:
          "Side-by-side visa comparison across 25+ destinations — processing time, fees, requirements, pros and cons.",
      },
      { property: "og:url", content: "https://travelslinkuk.lovable.app/compare" },
    ],
    links: [{ rel: "canonical", href: "https://travelslinkuk.lovable.app/compare" }],
  }),
  component: ComparePage,
});

const MAX_SLOTS = 3;

function ComparePage() {
  const [visaFilter, setVisaFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>(["germany", "france", "italy"]);

  const visaTypeOptions = useMemo(() => {
    const set = new Set<string>();
    COUNTRIES.forEach((c) => c.visas.forEach((v) => set.add(v.type)));
    return Array.from(set).sort();
  }, []);

  const eligibleCountries = useMemo(
    () =>
      visaFilter === "all"
        ? COUNTRIES
        : COUNTRIES.filter((c) => c.visas.some((v) => v.type === visaFilter)),
    [visaFilter]
  );

  const effectiveSelected = useMemo(
    () =>
      visaFilter === "all"
        ? selected
        : selected.filter((slug) =>
            COUNTRIES.find((c) => c.slug === slug)?.visas.some((v) => v.type === visaFilter)
          ),
    [selected, visaFilter]
  );

  const countries = useMemo(
    () =>
      effectiveSelected
        .map((slug) => COUNTRIES.find((c) => c.slug === slug))
        .filter((c): c is Country => !!c),
    [effectiveSelected]
  );

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_SLOTS) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const allVisaTypes = useMemo(() => {
    if (visaFilter !== "all") return [visaFilter];
    const set = new Set<string>();
    countries.forEach((c) => c.visas.forEach((v) => set.add(v.type)));
    return Array.from(set);
  }, [countries, visaFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-[#04081a] via-[#0a1340] to-[#04081a] text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
              <GitCompare className="h-3.5 w-3.5" /> Compare Tool
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
              Compare <span className="text-gradient-brand">visas & countries</span> side-by-side
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80">
              Pick up to {MAX_SLOTS} destinations to compare processing times, fees, visa types, requirements and benefits at a glance.
            </p>
          </div>
        </section>

        {/* Picker */}
        <section className="py-12 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-7xl">
            {/* Visa type filter */}
            <div className="rounded-2xl border border-border bg-white/70 backdrop-blur p-5 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <Eyebrow label="Step 1 — Choose visa" />
                  <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold">
                    Which visa are you comparing?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick a visa type to filter destinations and update the table automatically.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setVisaFilter("all")}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                      visaFilter === "all"
                        ? "bg-gradient-brand text-white border-transparent shadow-soft"
                        : "bg-white border-border text-foreground/80 hover:border-primary/40"
                    }`}
                  >
                    All visas
                  </button>
                  {visaTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setVisaFilter(type)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                        visaFilter === type
                          ? "bg-gradient-brand text-white border-transparent shadow-soft"
                          : "bg-white border-border text-foreground/80 hover:border-primary/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <Eyebrow label="Step 2 — Pick destinations" />
                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
                  Select up to {MAX_SLOTS} countries
                </h2>
                {visaFilter !== "all" && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Showing {eligibleCountries.length} destinations offering{" "}
                    <span className="font-semibold text-foreground">{visaFilter}</span>.
                  </p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {effectiveSelected.length} / {MAX_SLOTS} selected
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {eligibleCountries.map((c) => {
                const isOn = effectiveSelected.includes(c.slug);
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => toggle(c.slug)}
                    className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                      isOn
                        ? "bg-gradient-brand text-white border-transparent shadow-soft"
                        : "bg-white border-border text-foreground/80 hover:border-primary/40 hover:-translate-y-0.5"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${c.code}.png`}
                      alt=""
                      className="h-4 w-6 object-cover rounded-sm"
                      loading="lazy"
                    />
                    {c.name}
                    {isOn && <X className="h-3.5 w-3.5 opacity-80" />}
                  </button>
                );
              })}
              {eligibleCountries.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No destinations currently list this visa type.
                </p>
              )}
            </div>
          </div>
        </section>


        {/* Comparison table */}
        <section className="py-16 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {countries.length === 0 ? (
              <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-card">
                <p className="text-muted-foreground">Select at least one country above to start comparing.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-card">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="bg-gradient-soft">
                      <th className="p-5 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground w-44">
                        Attribute
                      </th>
                      {countries.map((c) => (
                        <th key={c.slug} className="p-5 align-bottom">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://flagcdn.com/w80/${c.code}.png`}
                              alt={`${c.name} flag`}
                              className="h-8 w-12 object-cover rounded-md shadow-soft"
                              loading="lazy"
                            />
                            <div>
                              <div className="font-display text-base font-bold text-foreground">{c.name}</div>
                              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                {c.tagline}
                              </div>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    <Row label="Capital" values={countries.map((c) => c.capital)} />
                    <Row label="Currency" values={countries.map((c) => c.currency)} />
                    <Row label="Language" values={countries.map((c) => c.language)} />
                    <Row label="Processing time" values={countries.map((c) => c.processingTime)} highlight />

                    <tr>
                      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Visa types offered
                      </td>
                      {countries.map((c) => (
                        <td key={c.slug} className="p-5 align-top">
                          <ul className="space-y-2">
                            {allVisaTypes.map((type) => {
                              const has = c.visas.some((v) => v.type === type);
                              return (
                                <li key={type} className="flex items-start gap-2 text-sm">
                                  <span
                                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                                      has ? "bg-emerald-500/15 text-emerald-600" : "bg-rose-500/10 text-rose-500"
                                    }`}
                                  >
                                    {has ? (
                                      <Check className="h-3 w-3" strokeWidth={3} />
                                    ) : (
                                      <X className="h-3 w-3" strokeWidth={3} />
                                    )}
                                  </span>
                                  <span className={has ? "text-foreground" : "text-muted-foreground/60 line-through"}>
                                    {type}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Key benefits
                      </td>
                      {countries.map((c) => (
                        <td key={c.slug} className="p-5 align-top">
                          <ul className="space-y-2">
                            {c.benefits.slice(0, 4).map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
                                <span className="text-foreground/80 leading-snug">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Documents required
                      </td>
                      {countries.map((c) => (
                        <td key={c.slug} className="p-5 align-top">
                          <div className="text-2xl font-display font-bold text-primary">
                            {c.requirements.length}
                          </div>
                          <div className="text-xs text-muted-foreground">items in checklist</div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Pros
                      </td>
                      {countries.map((c) => (
                        <td key={c.slug} className="p-5 align-top">
                          <ul className="space-y-1.5">
                            {c.pros.map((p, i) => (
                              <li key={i} className="text-sm text-foreground/80 leading-snug">• {p}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Things to consider
                      </td>
                      {countries.map((c) => (
                        <td key={c.slug} className="p-5 align-top">
                          <ul className="space-y-1.5">
                            {c.cons.map((p, i) => (
                              <li key={i} className="text-sm text-foreground/80 leading-snug">• {p}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-5" />
                      {countries.map((c) => (
                        <td key={c.slug} className="p-5">
                          <Link
                            to="/countries/$slug"
                            params={{ slug: c.slug }}
                            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                          >
                            View {c.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function Row({ label, values, highlight }: { label: string; values: string[]; highlight?: boolean }) {
  return (
    <tr>
      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`p-5 align-top text-sm ${
            highlight ? "font-display text-base font-semibold text-foreground" : "text-foreground/85"
          }`}
        >
          {v}
        </td>
      ))}
    </tr>
  );
}
