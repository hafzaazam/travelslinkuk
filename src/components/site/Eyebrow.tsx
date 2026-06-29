import type { LucideIcon } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Eyebrow({
  label,
  icon: Icon = Sparkles,
}: {
  label: string;
  icon?: LucideIcon;
}) {
  return (
    <span className="relative inline-flex p-[1.5px] rounded-full bg-gradient-brand">
      <span className="inline-flex items-center gap-3 rounded-full bg-white/85 backdrop-blur-2xl border border-white/80 px-5 py-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[11px] font-black uppercase tracking-[0.3em] leading-none bg-gradient-brand bg-clip-text text-transparent">
          {label}
        </span>
        <span className="w-px h-3 bg-primary/15" />
        <ArrowRight className="h-3 w-3 text-brand-cyan" strokeWidth={2.5} />
      </span>
    </span>
  );
}
