import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./Section";

const COUNTRIES = [
  ["Germany", "🇩🇪", "Study · Work · Family"],
  ["France", "🇫🇷", "Tourist · Student"],
  ["Netherlands", "🇳🇱", "Work · Student"],
  ["Switzerland", "🇨🇭", "Work · Visit"],
  ["Iceland", "🇮🇸", "Tourist · Work"],
  ["Sweden", "🇸🇪", "Student · PR"],
  ["Portugal", "🇵🇹", "Residency · Visit"],
  ["Greece", "🇬🇷", "Tourist · Golden Visa"],
  ["Austria", "🇦🇹", "Student · Work"],
  ["Italy", "🇮🇹", "Tourist · Student"],
  ["USA", "🇺🇸", "B1/B2 · F1 · Work"],
  ["Canada", "🇨🇦", "Express Entry · Study"],
  ["Australia", "🇦🇺", "Skilled · Student"],
  ["Morocco", "🇲🇦", "Tourist · Business"],
  ["New Zealand", "🇳🇿", "Work · Study"],
  ["Ireland", "🇮🇪", "Student · Work"],
  ["Japan", "🇯🇵", "Tourist · Work"],
  ["South Africa", "🇿🇦", "Tourist · Business"],
  ["Turkey", "🇹🇷", "Tourist · Residency"],
  ["Singapore", "🇸🇬", "Work · Business"],
  ["Malaysia", "🇲🇾", "Tourist · MM2H"],
  ["Thailand", "🇹🇭", "Tourist · Education"],
];

export function Countries() {
  return (
    <section id="countries" className="bg-gradient-soft py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Countries We Serve"
          title={<>Visas for <span className="text-gradient-brand">25+ destinations</span> worldwide</>}
          description="From Schengen to North America and Asia-Pacific — we guide you through every requirement, document and interview."
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {COUNTRIES.map(([name, flag, types]) => (
            <a
              key={name}
              href="#contact"
              className="group relative overflow-hidden rounded-2xl bg-white border border-border p-5 shadow-card hover:shadow-glow transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition" />
              <div className="text-4xl">{flag}</div>
              <div className="mt-3 font-display text-base font-semibold text-foreground">{name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{types}</div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                Apply
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
