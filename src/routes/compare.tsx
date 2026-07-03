import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, GitCompare, Sparkles, Loader2, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Eyebrow } from "@/components/site/Eyebrow";
import { COUNTRIES, type Country } from "@/data/countries";
import { suggestBestCountry } from "@/lib/compare-ai.functions";

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
      { property: "og:url", content: "https://travellinks.uk/compare" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/3c87610d-e03b-4302-b077-b7b31f0027e7/why-us-plane.png" },
      { property: "og:image:alt", content: "Compare visas & countries — Travel Links Solution" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/3c87610d-e03b-4302-b077-b7b31f0027e7/why-us-plane.png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Compare Visas & Countries — Travel Links Solution" },
      { name: "twitter:description", content: "Side-by-side visa comparison across 25+ destinations — processing time, fees, requirements, pros and cons." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/compare" }],
  }),
  component: ComparePage,
});

const MAX_SLOTS = 3;

type CostTier = "Affordable" | "Moderate" | "Expensive" | "Very Expensive";

type CountryProfile = {
  currencyPerGBP: string; // approx units per £1 GBP
  costTier: CostTier;
  dailyBudget: string; // mid-range traveller, per day
  lifestyle: string;
  medical: string; // healthcare quality / traveller note
  safety: string;
  bestSeason: string;
};

// Indicative, editorial values for at-a-glance comparison.
const PROFILES: Record<string, CountryProfile> = {
  germany:      { currencyPerGBP: "≈ €1.17", costTier: "Moderate",       dailyBudget: "£90 – £150",  lifestyle: "Orderly, cultured, great public transport", medical: "Excellent — EHIC/GHIC accepted",   safety: "Very safe",   bestSeason: "May – Sep" },
  france:       { currencyPerGBP: "≈ €1.17", costTier: "Expensive",      dailyBudget: "£110 – £180", lifestyle: "Romantic, café culture, fashion-forward",   medical: "Excellent — world-class hospitals", safety: "Safe, watch pickpockets", bestSeason: "Apr – Oct" },
  netherlands:  { currencyPerGBP: "≈ €1.17", costTier: "Expensive",      dailyBudget: "£110 – £170", lifestyle: "Bike-friendly, liberal, design-led",        medical: "Excellent universal system",        safety: "Very safe",   bestSeason: "Apr – Sep" },
  switzerland:  { currencyPerGBP: "≈ CHF 1.10", costTier: "Very Expensive", dailyBudget: "£180 – £300", lifestyle: "Alpine, punctual, premium quality",      medical: "World-class, costly without insurance", safety: "Extremely safe", bestSeason: "Jun – Sep / Dec – Mar" },
  iceland:      { currencyPerGBP: "≈ ISK 175", costTier: "Very Expensive", dailyBudget: "£170 – £280", lifestyle: "Outdoorsy, small-town, nature-first",    medical: "Excellent public healthcare",       safety: "Extremely safe", bestSeason: "Jun – Aug / Sep – Mar (auroras)" },
  sweden:       { currencyPerGBP: "≈ SEK 13",  costTier: "Expensive",      dailyBudget: "£120 – £200", lifestyle: "Minimalist, sustainable, design-led",    medical: "Excellent universal system",        safety: "Very safe",   bestSeason: "May – Sep" },
  portugal:     { currencyPerGBP: "≈ €1.17",   costTier: "Affordable",     dailyBudget: "£70 – £120",  lifestyle: "Relaxed coastal, foodie, sunny",         medical: "Good public + private hospitals",   safety: "Very safe",   bestSeason: "Apr – Oct" },
  greece:       { currencyPerGBP: "≈ €1.17",   costTier: "Affordable",     dailyBudget: "£70 – £130",  lifestyle: "Island life, Mediterranean cuisine",     medical: "Good in cities, varies on islands", safety: "Safe",        bestSeason: "May – Oct" },
  austria:      { currencyPerGBP: "≈ €1.17",   costTier: "Moderate",       dailyBudget: "£100 – £160", lifestyle: "Classical music, alpine, café culture",   medical: "Excellent universal system",        safety: "Very safe",   bestSeason: "May – Sep / Dec – Mar" },
  italy:        { currencyPerGBP: "≈ €1.17",   costTier: "Moderate",       dailyBudget: "£90 – £160",  lifestyle: "Food, art, family-oriented, lively",      medical: "Very good public hospitals",        safety: "Safe, watch pickpockets", bestSeason: "Apr – Jun / Sep – Oct" },
  usa:          { currencyPerGBP: "≈ $1.27",   costTier: "Expensive",      dailyBudget: "£130 – £230", lifestyle: "Big, varied — cities to wilderness",      medical: "World-class but very expensive — insurance essential", safety: "Varies by city/area", bestSeason: "Year-round (region dependent)" },
  canada:       { currencyPerGBP: "≈ C$1.73",  costTier: "Moderate",       dailyBudget: "£100 – £170", lifestyle: "Outdoorsy, multicultural, friendly",      medical: "Excellent — traveller insurance advised", safety: "Very safe", bestSeason: "Jun – Sep / Dec – Mar (ski)" },
  australia:    { currencyPerGBP: "≈ A$1.94",  costTier: "Expensive",      dailyBudget: "£110 – £190", lifestyle: "Outdoor, beach, laid-back",               medical: "Excellent — Medicare reciprocity for UK", safety: "Very safe", bestSeason: "Sep – Nov / Mar – May" },
  morocco:      { currencyPerGBP: "≈ MAD 12.6", costTier: "Affordable",    dailyBudget: "£40 – £90",   lifestyle: "Vibrant souks, desert, riads",            medical: "Adequate in cities, basic elsewhere", safety: "Generally safe", bestSeason: "Mar – May / Sep – Nov" },
  "new-zealand":{ currencyPerGBP: "≈ NZ$2.10", costTier: "Expensive",      dailyBudget: "£110 – £180", lifestyle: "Adventure, nature, small-population calm",medical: "Excellent — insurance recommended", safety: "Very safe",   bestSeason: "Dec – Feb / Jun – Aug (ski)" },
  ireland:      { currencyPerGBP: "≈ €1.17",   costTier: "Expensive",      dailyBudget: "£100 – £170", lifestyle: "Pub culture, green countryside, friendly", medical: "Good public + private hospitals",  safety: "Very safe",   bestSeason: "May – Sep" },
  japan:        { currencyPerGBP: "≈ ¥193",    costTier: "Moderate",       dailyBudget: "£90 – £160",  lifestyle: "Ultra-modern + traditional, polite, safe",medical: "Excellent — cash-up-front common",  safety: "Extremely safe", bestSeason: "Mar – May / Oct – Nov" },
  "south-africa":{ currencyPerGBP: "≈ R23",    costTier: "Affordable",     dailyBudget: "£50 – £110",  lifestyle: "Safari, wine country, coastal cities",    medical: "Good private hospitals in cities",  safety: "Caution in some urban areas", bestSeason: "May – Sep (safari)" },
  turkey:       { currencyPerGBP: "≈ ₺42",     costTier: "Affordable",     dailyBudget: "£40 – £90",   lifestyle: "Bazaars, beaches, rich history",          medical: "Good private hospitals, popular medical tourism", safety: "Generally safe", bestSeason: "Apr – Jun / Sep – Oct" },
  singapore:    { currencyPerGBP: "≈ S$1.71",  costTier: "Expensive",      dailyBudget: "£110 – £190", lifestyle: "Clean, modern, food paradise",            medical: "World-class — major medical hub",   safety: "Extremely safe", bestSeason: "Feb – Apr" },
  malaysia:     { currencyPerGBP: "≈ RM5.6",   costTier: "Affordable",     dailyBudget: "£40 – £90",   lifestyle: "Multicultural, tropical, foodie",         medical: "Very good private — medical tourism hub", safety: "Safe", bestSeason: "Mar – Oct" },
  thailand:     { currencyPerGBP: "≈ ฿44",     costTier: "Affordable",     dailyBudget: "£35 – £80",   lifestyle: "Beaches, temples, street food, nightlife", medical: "Excellent private hospitals — medical tourism leader", safety: "Generally safe", bestSeason: "Nov – Mar" },
};

const COST_TIER_STYLE: Record<CostTier, string> = {
  "Affordable":     "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "Moderate":       "bg-amber-500/10 text-amber-700 border-amber-500/20",
  "Expensive":      "bg-orange-500/10 text-orange-700 border-orange-500/20",
  "Very Expensive": "bg-rose-500/10 text-rose-700 border-rose-500/20",
};

function ComparePage() {
  const [visaFilter, setVisaFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>(["germany", "france", "italy"]);
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>("");
  const runSuggest = useServerFn(suggestBestCountry);


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
                      loading="lazy" decoding="async"
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
                              loading="lazy" decoding="async"
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
                    <Row
                      label="Currency value (per £1 GBP)"
                      values={countries.map((c) => PROFILES[c.slug]?.currencyPerGBP ?? "—")}
                      highlight
                    />
                    <tr>
                      <td className="p-5 align-top text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Cost level
                      </td>
                      {countries.map((c) => {
                        const tier = PROFILES[c.slug]?.costTier;
                        return (
                          <td key={c.slug} className="p-5 align-top">
                            {tier ? (
                              <span
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${COST_TIER_STYLE[tier]}`}
                              >
                                {tier}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    <Row
                      label="Daily budget (mid-range)"
                      values={countries.map((c) => PROFILES[c.slug]?.dailyBudget ?? "—")}
                    />
                    <Row label="Language" values={countries.map((c) => c.language)} />
                    <Row label="Processing time" values={countries.map((c) => c.processingTime)} highlight />
                    <Row label="Lifestyle" values={countries.map((c) => PROFILES[c.slug]?.lifestyle ?? "—")} />
                    <Row label="Healthcare / medical" values={countries.map((c) => PROFILES[c.slug]?.medical ?? "—")} />
                    <Row label="Safety" values={countries.map((c) => PROFILES[c.slug]?.safety ?? "—")} />
                    <Row label="Best season to visit" values={countries.map((c) => PROFILES[c.slug]?.bestSeason ?? "—")} />


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

            {/* AI Suggestion */}
            {countries.length > 0 && (
              <div className="mt-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-fuchsia-500/5 p-6 sm:p-8 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white shadow-soft">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <Eyebrow label="AI Suggestion" />
                      <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold">
                        Which country fits you best?
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                        Let AI weigh up the destinations you've selected
                        {visaFilter !== "all" ? ` for the ${visaFilter}` : ""} and recommend a top pick.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={aiLoading}
                    onClick={async () => {
                      setAiLoading(true);
                      setAiError("");
                      setAiSuggestion("");
                      try {
                        const payload = {
                          visaType: visaFilter,
                          countries: countries.map((c) => ({
                            name: c.name,
                            slug: c.slug,
                            processingTime: c.processingTime,
                            currency: c.currency,
                            visas: c.visas.map((v) => v.type),
                            pros: c.pros,
                            cons: c.cons,
                            profile: PROFILES[c.slug],
                          })),
                        };
                        const result = await runSuggest({ data: payload });
                        setAiSuggestion(result.suggestion);
                      } catch (e) {
                        setAiError(e instanceof Error ? e.message : "Something went wrong.");
                      } finally {
                        setAiLoading(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Get AI recommendation
                      </>
                    )}
                  </button>
                </div>

                {(aiSuggestion || aiError) && (
                  <div className="mt-6 rounded-2xl border border-border bg-white p-5 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {aiError ? (
                      <span className="text-rose-600">{aiError}</span>
                    ) : (
                      aiSuggestion
                    )}
                  </div>
                )}
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
