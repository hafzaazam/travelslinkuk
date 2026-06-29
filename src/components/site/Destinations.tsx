import { Link } from "@tanstack/react-router";
import { SectionHeading } from "./Section";
import { Reveal } from "./Reveal";

const DEST = [
  { name: "Europe", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80", tag: "Schengen Area", to: "/countries" as const, slug: undefined },
  { name: "Canada", img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80", tag: "Tourist Visa", to: "/countries/$slug" as const, slug: "canada" },
  { name: "USA", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1200&q=80", tag: "B1/B2 Visa", to: "/countries/$slug" as const, slug: "usa" },
  { name: "Australia", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80", tag: "Tourist Visa", to: "/countries/$slug" as const, slug: "australia" },
  { name: "New Zealand", img: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=80", tag: "Visitor Visa", to: "/countries/$slug" as const, slug: "new-zealand" },
  { name: "Asia", img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=80", tag: "Tourist & Business", to: "/countries" as const, slug: undefined },
];

function onTilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
  el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
}
function onTiltReset(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.setProperty("--ry", `0deg`);
  el.style.setProperty("--rx", `0deg`);
}

export function Destinations() {
  return (
    <section className="bg-gradient-soft py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Destinations"
            title={<>Where will your <span className="text-gradient-brand">next journey</span> begin?</>}
          />
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
          {DEST.map((d, idx) => {
            const className =
              "group relative block h-72 overflow-hidden rounded-3xl shadow-card hover:shadow-glow transition-shadow tilt-3d will-change-transform";
            const inner = (
              <>
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white" style={{ transform: "translateZ(40px)" }}>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-aqua">{d.tag}</span>
                  <h3 className="mt-1 font-display text-2xl font-bold">{d.name}</h3>
                </div>
              </>
            );
            const link = d.slug ? (
              <Link
                to="/countries/$slug"
                params={{ slug: d.slug }}
                className={className}
                onMouseMove={onTilt}
                onMouseLeave={onTiltReset}
              >
                {inner}
              </Link>
            ) : (
              <Link to="/countries" className={className} onMouseMove={onTilt} onMouseLeave={onTiltReset}>
                {inner}
              </Link>
            );
            return (
              <Reveal key={d.name} delay={idx * 90} direction="up">
                {link}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
