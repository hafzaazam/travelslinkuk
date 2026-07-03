import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GitCompare } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { BlurImage } from "@/components/site/BlurImage";
import { COUNTRIES } from "@/data/countries";

export const Route = createFileRoute("/countries/")({
  head: () => ({
    meta: [
      { title: "Visa Services by Country — Travel Links Solution" },
      {
        name: "description",
        content:
          "Browse visa services for 25+ destinations. UK-based consultants handling tourist, family and business visa applications end-to-end.",
      },
      { property: "og:title", content: "Visa Services by Country — Travel Links Solution" },
      {
        property: "og:description",
        content: "Browse visa services for 25+ destinations across Europe, Americas, Asia and beyond.",
      },
      { property: "og:url", content: "https://travellinks.uk/countries" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png" },
      { property: "og:image:alt", content: "Visa services by country — Travel Links Solution" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Visa Services by Country — Travel Links Solution" },
      { name: "twitter:description", content: "Browse visa services for 25+ destinations across Europe, Americas, Asia and beyond." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/countries" }],
  }),
  component: CountriesIndex,
});

function CountriesIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-[#04081a] via-[#0a1340] to-[#04081a] text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="inline-block rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
              Countries We Serve
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
              Visa services for <span className="text-gradient-brand">25+ destinations</span> worldwide
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80">
              Tourist, family and business visa support for destinations across Europe, the Americas, Asia-Pacific and beyond — all handled by UK-based consultants.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/compare"
                className="group inline-flex items-center gap-2 h-12 px-6 text-sm font-semibold rounded-full bg-gradient-brand shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-20px_rgba(61,99,255,0.65)]"
              >
                <GitCompare className="h-4 w-4" />
                Compare countries
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </section>

        {/* Grid */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {COUNTRIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/countries/$slug"
                  params={{ slug: c.slug }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-32 overflow-hidden">
                    <BlurImage
                      src={`https://flagcdn.com/w640/${c.code}.png`}
                      srcSet={`https://flagcdn.com/w640/${c.code}.png 1x, https://flagcdn.com/w1280/${c.code}.png 2x`}
                      placeholder={`https://flagcdn.com/w20/${c.code}.png`}
                      alt={`${c.name} flag`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {c.code}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-display text-base font-semibold text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{c.tagline}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      View details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition" />
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
