import { Plane } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5 group">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand shadow-glow">
        <Plane className="h-5 w-5 text-white -rotate-45" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold text-[15px] tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          Travel Links
        </span>
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gradient-brand">
          Solution
        </span>
      </span>
    </a>
  );
}
