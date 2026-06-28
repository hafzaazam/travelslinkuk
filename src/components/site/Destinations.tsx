import { SectionHeading } from "./Section";

const DEST = [
  { name: "Europe", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80", tag: "Schengen Area" },
  { name: "Canada", img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80", tag: "Express Entry" },
  { name: "USA", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1200&q=80", tag: "Study & Work" },
  { name: "Australia", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80", tag: "Skilled Migration" },
  { name: "New Zealand", img: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=80", tag: "Work & Study" },
  { name: "Asia", img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=80", tag: "Tourist & Business" },
];

export function Destinations() {
  return (
    <section className="bg-gradient-soft py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured Destinations"
          title={<>Where will your <span className="text-gradient-brand">next journey</span> begin?</>}
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEST.map((d) => (
            <a
              key={d.name}
              href="#contact"
              className="group relative h-72 overflow-hidden rounded-3xl shadow-card hover:shadow-glow transition"
            >
              <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-aqua">{d.tag}</span>
                <h3 className="mt-1 font-display text-2xl font-bold">{d.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
