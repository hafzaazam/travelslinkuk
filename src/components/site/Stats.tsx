import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 12000, suffix: "+", label: "Successful Applications" },
  { value: 25, suffix: "+", label: "Destination Countries" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.floor(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative -mt-16 z-10 px-5 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl glass shadow-glow p-6 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map((it) => (
          <div key={it.label} className="text-center">
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-brand">
              <Counter to={it.value} suffix={it.suffix} />
            </div>
            <div className="mt-2 text-sm font-medium text-muted-foreground">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
