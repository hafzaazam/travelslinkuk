import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check, Clock, Coins, Globe2, Info, Landmark, MapPin, Sparkles, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { CountryChecklist } from "@/components/site/CountryChecklist";
import { CurrencyRate } from "@/components/site/CurrencyRate";
import { Eyebrow } from "@/components/site/Eyebrow";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import travelSuitcase from "@/assets/travel-suitcase.png.asset.json";

export const Route = createFileRoute("/countries/$slug")({
  loader: ({ params }) => {
    const country = getCountryBySlug(params.slug);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.country;
    const title = c
      ? `${c.name} Visa from UK — Travel Links Solution`
      : "Country Visa — Travel Links Solution";
    const description = c
      ? `Apply for a ${c.name} visa with Travel Links Solution. ${c.tagline}. End-to-end documentation, submission and interview prep from our UK consultants.`
      : "Visa services for 25+ destinations.";
    const ogImage = c ? `https://flagcdn.com/w1280/${c.code}.png` : undefined;
    const canonical = c ? `https://travelslinkuk.lovable.app/countries/${c.slug}` : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(ogImage ? [{ property: "og:image", content: ogImage }, { name: "twitter:image", content: ogImage }] : []),
      ],
      links: canonical ? [{ rel: "canonical", href: canonical }] : [],
    };
  },
  component: CountryPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Country not found</h1>
        <p className="mt-2 text-muted-foreground">We don't yet have a page for this destination.</p>
        <Link to="/countries" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="h-4 w-4" /> Browse all countries
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <button onClick={reset} className="mt-4 text-primary font-semibold">Try again</button>
      </div>
    </div>
  ),
});

function CountryPage() {
  const { country } = Route.useLoaderData();

  const otherCountries = COUNTRIES.filter((c) => c.slug !== country.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#04081a] via-[#0a1340] to-[#04081a] text-white">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(https://flagcdn.com/w1280/${country.code}.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04081a] via-[#04081a]/70 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Link
              to="/countries"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> All countries
            </Link>

            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <span className="inline-block rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
                  {country.tagline}
                </span>
                <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {country.name} <span className="text-gradient-brand">Visa</span> Services
                </h1>
                <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">
                  {country.intro}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    hash="contact"
                    className="group relative inline-flex items-center gap-2 h-12 px-6 text-sm font-semibold rounded-full bg-gradient-brand shadow-glow overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-20px_rgba(61,99,255,0.65)] active:translate-y-0"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 blur-md opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[400%]"
                    />
                    <span className="relative">Apply for {country.name} visa</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href="tel:+447879465341"
                    className="group inline-flex items-center gap-2 h-12 px-6 text-sm font-semibold rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(56,216,232,0.5)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_var(--brand-cyan)] transition-transform group-hover:scale-150" />
                    Free Consultation
                  </a>
                </div>
              </div>

              <div className="hidden lg:block relative w-[280px] aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 shadow-glow">
                <img
                  src={`https://flagcdn.com/w1280/${country.code}.png`}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>


        {/* About the country */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div>
              <Eyebrow label="About the country" icon={Info} />
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                Get to know {country.name}
              </h2>
            </div>
            <div className="rounded-3xl bg-white border border-border p-7 shadow-card">
              <p className="text-base text-foreground/90 leading-relaxed">{country.about}</p>
              <CurrencyRate currency={country.currency} />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="relative inline-flex p-[1.5px] rounded-full bg-gradient-brand">
                <span className="inline-flex items-center gap-3 rounded-full bg-white/85 backdrop-blur-2xl border border-white/80 px-5 py-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] leading-none bg-gradient-brand bg-clip-text text-transparent">
                    Why visit
                  </span>
                  <span className="w-px h-3 bg-primary/15" />
                  <ArrowRight className="h-3 w-3 text-brand-cyan" strokeWidth={2.5} />
                </span>
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                Benefits of a {country.name} visa
              </h2>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {country.benefits.map((b: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white border border-border p-5 shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-white shadow-soft">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa types */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Visa Categories
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                {country.name} visa types we handle
              </h2>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.visas.map((v: { type: string; description: string }) => (
                <div
                  key={v.type}
                  className="group rounded-3xl bg-white border border-border p-7 shadow-card hover:shadow-glow hover:-translate-y-1 hover:border-primary/30 transition-all"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-soft">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{v.type}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  <Link
                    to="/"
                    hash="contact"
                    className="group/btn mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    Enquire <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                What you'll need
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                Documents & requirements
              </h2>
              <p className="mt-4 text-muted-foreground">
                We give you a precise document checklist, review every item, and submit a fully prepared file — so nothing slows your application down.
              </p>
              <img
                src={travelSuitcase.url}
                alt="Travel suitcase and airplane illustration"
                className="mt-8 w-full max-w-sm mx-auto lg:mx-0"
                loading="lazy"
              />
            </div>


            <CountryChecklist slug={country.slug} items={country.requirements} />

          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                At a glance
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                {country.name} visa — pros & cons
              </h2>
              <p className="mt-4 text-muted-foreground">
                A balanced view of what to expect when applying for and using a {country.name} visa.
              </p>
            </div>
            <div className="mt-10 grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-white border border-border p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ThumbsUp className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">Pros</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {country.pros.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white border border-border p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-500/10 text-rose-600">
                    <ThumbsDown className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">Things to consider</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {country.cons.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500/15 text-rose-600">
                        <X className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Other destinations */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Other Destinations
                </span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
                  Explore more countries
                </h2>
              </div>
              <Link
                to="/countries"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                View all <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {otherCountries.map((c) => (
                <Link
                  key={c.slug}
                  to="/countries/$slug"
                  params={{ slug: c.slug }}
                  className="group overflow-hidden rounded-2xl bg-white border border-border shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-20 overflow-hidden">
                    <img
                      src={`https://flagcdn.com/w640/${c.code}.png`}
                      alt={`${c.name} flag`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-display text-sm font-semibold">{c.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
