import logoAsset from "@/assets/travel-links-logo.png.asset.json";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3 group" aria-label="Travel Links Solution — Home">
      <img
        src={logoAsset.url}
        alt="Travel Links Solution"
        width={48}
        height={48}
        className={`h-11 w-11 object-contain transition-transform group-hover:scale-105 ${
          light ? "drop-shadow-[0_4px_12px_rgba(56,216,232,0.45)]" : ""
        }`}
      />
      <span className="hidden sm:flex flex-col leading-none">
        <span className={`font-display font-bold text-[15px] tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          Travel Links
        </span>
        <span className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${light ? "text-brand-aqua" : "text-gradient-brand"}`}>
          Solution
        </span>
      </span>
    </a>
  );
}
