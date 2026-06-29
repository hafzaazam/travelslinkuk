import { Link } from "@tanstack/react-router";
import { SectionHeading } from "./Section";
import { BlurImage } from "./BlurImage";


const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");


const COUNTRIES: [string, string, string][] = [
  ["Germany", "de", "Tourist · Family"],
  ["France", "fr", "Tourist · Family"],
  ["Netherlands", "nl", "Tourist · Business"],
  ["Switzerland", "ch", "Tourist · Visit"],
  ["Iceland", "is", "Tourist · Visit"],
  ["Sweden", "se", "Tourist · Family"],
  ["Portugal", "pt", "Tourist · Visit"],
  ["Greece", "gr", "Tourist · Family"],
  ["Austria", "at", "Tourist · Business"],
  ["Italy", "it", "Tourist · Family"],
  ["USA", "us", "B1/B2 · Family"],
  ["Canada", "ca", "Tourist · Family"],
  ["Australia", "au", "Tourist · Family"],
  ["Morocco", "ma", "Tourist · Business"],
  ["New Zealand", "nz", "Tourist · Visit"],
  ["Ireland", "ie", "Tourist · Family"],
  ["Japan", "jp", "Tourist · Business"],
  ["South Africa", "za", "Tourist · Business"],
  ["Turkey", "tr", "Tourist · Family"],
  ["Singapore", "sg", "Tourist · Business"],
  ["Malaysia", "my", "Tourist · Business"],
  ["Thailand", "th", "Tourist · Family"],
];

export function Countries() {
  return (
    <section id="countries" className="bg-gradient-soft py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Countries We Serve"
          title={<>Visas for <span className="text-gradient-brand">25+ destinations</span> worldwide</>}
          description="From Schengen to North America and Asia-Pacific — we guide you through every requirement, document and interview."
        />
      </div>

      <div className="mt-14 relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--surface-soft)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--surface-soft)] to-transparent z-10" />

        <div className="group/marquee overflow-hidden">
          <div className="flex gap-5 w-max marquee-track px-6 lg:px-12 pb-6">
            {[...COUNTRIES, ...COUNTRIES].map(([name, code, types], i) => (
              <Link
                key={`${name}-${i}`}
                to="/countries/$slug"
                params={{ slug: toSlug(name) }}
                aria-label={`${name} visa services`}
                className="group relative shrink-0 w-[260px] overflow-hidden rounded-2xl bg-white border border-border shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
              >
                <div className="relative h-32 overflow-hidden">
                  <BlurImage
                    src={`https://flagcdn.com/w640/${code}.png`}
                    srcSet={`https://flagcdn.com/w640/${code}.png 1x, https://flagcdn.com/w1280/${code}.png 2x`}
                    placeholder={`https://flagcdn.com/w20/${code}.png`}
                    alt={`${name} flag`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {code}
                  </div>
                </div>

                <div className="p-5">
                  <div className="font-display text-base font-semibold text-foreground">{name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{types}</div>
                </div>

                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-12 flex justify-center px-5 lg:px-8">
        <Link
          to="/countries"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-white shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
        >
          Browse all countries
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
