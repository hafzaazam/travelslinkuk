import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check, Clock, Coins, GitCompare, Globe2, Info, Landmark, MapPin, Sparkles, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { CountryChecklist } from "@/components/site/CountryChecklist";
import { CurrencyRate } from "@/components/site/CurrencyRate";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BlurImage } from "@/components/site/BlurImage";
import { COUNTRIES, getCountryBySlug, type Country } from "@/data/countries";
import travelSuitcase from "@/assets/travel-suitcase.png.asset.json";

function countryFaqs(c: Country) {
  const visaList = c.visas.map((v) => v.type).join(", ");
  return [
    { q: `How long does a ${c.name} visa take to process?`, a: `${c.name} visa processing usually takes ${c.processingTime}. We share an accurate timeline for your specific case during the free consultation.` },
    { q: `What visa types can I apply for in ${c.name}?`, a: `Travel Links Solution helps with the following ${c.name} visa categories: ${visaList}.` },
    { q: `What documents do I need for a ${c.name} visa?`, a: `Core documents include ${c.requirements.slice(0, 4).join(", ")} and more. We send a tailored checklist after assessing your profile.` },
    { q: `Can Travel Links Solution apply for my ${c.name} visa from the UK?`, a: `Yes. Our Northampton-based consultants handle end-to-end ${c.name} applications for UK residents — from documentation and appointment booking to interview prep.` },
    { q: `What is the official language and currency of ${c.name}?`, a: `${c.name}'s capital is ${c.capital}. The official language is ${c.language} and the currency is ${c.currency}.` },
  ];
}

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
    const canonical = c ? `https://travellinks.uk/countries/${c.slug}` : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Travel Links Solution" },
        ...(canonical ? [{ property: "og:url", content: canonical }] : []),
        ...(ogImage ? [{ property: "og:image", content: ogImage }, { name: "twitter:image", content: ogImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: canonical ? [{ rel: "canonical", href: canonical }] : [],
      scripts: c
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "TouristDestination",
                    "@id": `${canonical}#destination`,
                    name: c.name,
                    description: c.about || c.intro || c.tagline,
                    url: canonical,
                    image: ogImage,
                    touristType: ["Tourists", "Families", "Business travellers", "Students"],
                  },
                  {
                    "@type": "Service",
                    "@id": `${canonical}#service`,
                    serviceType: `${c.name} visa consultancy`,
                    name: `${c.name} Visa Services`,
                    url: canonical,
                    areaServed: { "@type": "Country", name: "United Kingdom" },
                    provider: { "@id": "https://travellinks.uk/#organization" },
                    hasOfferCatalog: {
                      "@type": "OfferCatalog",
                      name: `${c.name} Visa Types`,
                      itemListElement: c.visas.map((v) => ({
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: v.type, description: v.description },
                      })),
                    },
                  },
                  {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                      { "@type": "ListItem", position: 1, name: "Home", item: "https://travellinks.uk/" },
                      { "@type": "ListItem", position: 2, name: "Countries", item: "https://travellinks.uk/countries" },
                      { "@type": "ListItem", position: 3, name: c.name, item: canonical },
                    ],
                  },
                  {
                    "@type": "FAQPage",
                    mainEntity: countryFaqs(c).map((f: { q: string; a: string }) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  },
                ],
              }),
            },
          ]
        : [],
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
                    <span className="relative">Consult for {country.name} visa</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/compare"
                    className="group inline-flex items-center gap-2 h-12 px-6 text-sm font-semibold rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(56,216,232,0.5)]"
                  >
                    <GitCompare className="h-4 w-4 text-brand-cyan" />
                    Compare countries
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
                <BlurImage
                  src={`https://flagcdn.com/w1280/${country.code}.png`}
                  placeholder={`https://flagcdn.com/w20/${country.code}.png`}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
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
              <Eyebrow label="Why visit" />
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
              <Eyebrow label="Visa Categories" icon={MapPin} />
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
              <Eyebrow label="What you'll need" icon={Check} />
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
                loading="lazy" decoding="async"
              />
            </div>


            <CountryChecklist slug={country.slug} items={country.requirements} />

          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <Eyebrow label="At a glance" />
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

        {/* FAQ */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-3xl">
            <Eyebrow label="FAQ" icon={Info} />
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              {country.name} visa — common questions
            </h2>
            <dl className="mt-10 space-y-4">
              {countryFaqs(country).map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                  <dt className="font-display font-semibold text-base">{f.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Other destinations */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <Eyebrow label="Other Destinations" icon={Globe2} />
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
                    <BlurImage
                      src={`https://flagcdn.com/w640/${c.code}.png`}
                      placeholder={`https://flagcdn.com/w20/${c.code}.png`}
                      alt={`${c.name} flag`}
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
