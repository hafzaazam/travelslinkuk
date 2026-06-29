import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/travel-links-logo.png.asset.json";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center group" aria-label="Travel Links Solution — Home">
      <img
        src={logoAsset.url}
        alt="Travel Links Solution"
        className={`h-16 sm:h-20 lg:h-24 w-auto object-contain transition-transform group-hover:scale-105 ${
          light ? "drop-shadow-[0_4px_16px_rgba(56,216,232,0.55)]" : "drop-shadow-[0_2px_8px_rgba(8,18,48,0.18)]"
        }`}
      />
    </Link>

  );
}
