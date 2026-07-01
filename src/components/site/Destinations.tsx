import { Link } from "@tanstack/react-router";
import { SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { BlurImage } from "./BlurImage";

const lqip = (url: string) => url.replace(/[?&]w=\d+/, "").replace(/[?&]q=\d+/, "") + (url.includes("?") ? "&" : "?") + "w=32&q=20&blur=200";


const DEST = [
  { name: "Europe", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80", alt: "Cobbled European street with historic architecture at golden hour", tag: "Schengen Area", to: "/countries" as const, slug: undefined },
  { name: "Canada", img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80", alt: "Snow-capped Canadian Rocky Mountains over a turquoise lake", tag: "Tourist Visa", to: "/countries/$slug" as const, slug: "canada" },
  { name: "USA", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1200&q=80", alt: "New York City skyline with the Statue of Liberty at dusk", tag: "B1/B2 Visa", to: "/countries/$slug" as const, slug: "usa" },
  { name: "Australia", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80", alt: "Sydney Opera House and harbour bridge under a clear blue sky", tag: "Tourist Visa", to: "/countries/$slug" as const, slug: "australia" },
  { name: "New Zealand", img: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=80", alt: "Lush green New Zealand mountain valley with a winding river", tag: "Visitor Visa", to: "/countries/$slug" as const, slug: "new-zealand" },
  { name: "Asia", img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&q=80", alt: "Tokyo street at night glowing with neon signs and lanterns", tag: "Tourist & Business", to: "/countries" as const, slug: undefined },
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
        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5" style={{ perspective: "1200px" }}>
          {DEST.map((d, idx) => {
            const className =
              "group relative block h-40 sm:h-64 lg:h-72 overflow-hidden rounded-2xl sm:rounded-3xl shadow-card hover:shadow-glow transition-shadow tilt-3d will-change-transform";
            const inner = (
              <>
                <BlurImage
                  src={d.img}
                  placeholder={lqip(d.img)}
                  alt={d.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 text-white" style={{ transform: "translateZ(40px)" }}>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-brand-aqua">{d.tag}</span>
                  <h3 className="mt-0.5 sm:mt-1 font-display text-base sm:text-2xl font-bold">{d.name}</h3>
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
