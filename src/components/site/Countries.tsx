import { SectionHeading } from "./Section";

const COUNTRIES: [string, string, string][] = [
  ["Germany", "de", "Study · Work · Family"],
  ["France", "fr", "Tourist · Student"],
  ["Netherlands", "nl", "Work · Student"],
  ["Switzerland", "ch", "Work · Visit"],
  ["Iceland", "is", "Tourist · Work"],
  ["Sweden", "se", "Student · PR"],
  ["Portugal", "pt", "Residency · Visit"],
  ["Greece", "gr", "Tourist · Golden Visa"],
  ["Austria", "at", "Student · Work"],
  ["Italy", "it", "Tourist · Student"],
  ["USA", "us", "B1/B2 · F1 · Work"],
  ["Canada", "ca", "Express Entry · Study"],
  ["Australia", "au", "Skilled · Student"],
  ["Morocco", "ma", "Tourist · Business"],
  ["New Zealand", "nz", "Work · Study"],
  ["Ireland", "ie", "Student · Work"],
  ["Japan", "jp", "Tourist · Work"],
  ["South Africa", "za", "Tourist · Business"],
  ["Turkey", "tr", "Tourist · Residency"],
  ["Singapore", "sg", "Work · Business"],
  ["Malaysia", "my", "Tourist · MM2H"],
  ["Thailand", "th", "Tourist · Education"],
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

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 lg:px-12 pb-6 [scrollbar-width:thin]">
          {COUNTRIES.map(([name, code, types]) => (
            <a
              key={name}
              href="#contact"
              className="group relative shrink-0 snap-start w-[260px] overflow-hidden rounded-2xl bg-white border border-border shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
            >
              {/* flag banner */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={`https://flagcdn.com/w640/${code}.png`}
                  srcSet={`https://flagcdn.com/w640/${code}.png 1x, https://flagcdn.com/w1280/${code}.png 2x`}
                  alt={`${name} flag`}
                  loading="lazy"
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
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                  Apply
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-4 text-xs text-muted-foreground text-center">
          ← Scroll horizontally to explore all 22 destinations →
        </div>
      </div>
    </section>
  );
}
