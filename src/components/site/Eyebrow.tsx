import type { LucideIcon } from "lucide-react";

export function Eyebrow({
  label,
}: {
  label: string;
  icon?: LucideIcon;
}) {
  return (
    <span className="inline-flex items-center px-1 py-1">
      <span className="text-[11px] font-black uppercase tracking-[0.3em] leading-none bg-gradient-brand bg-clip-text text-transparent">
        {label}
      </span>
    </span>
  );
}
