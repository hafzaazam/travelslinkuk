import logoAsset from "@/assets/travel-links-logo.png.asset.json";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center group" aria-label="Travel Links Solution — Home">
      <img
        src={logoAsset.url}
        alt="Travel Links Solution"
        className={`h-12 w-auto object-contain transition-transform group-hover:scale-105 ${
          light ? "drop-shadow-[0_4px_12px_rgba(56,216,232,0.45)]" : ""
        }`}
      />
    </a>
  );
}
