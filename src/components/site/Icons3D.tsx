// Animated, glossy 3D-style vector icons. All pure SVG — no deps.
// Each icon uses gradient fills, a soft base shadow, a top highlight,
// and subtle motion via CSS keyframes (.icon3d-*).

type IconProps = { className?: string };

const SIZE = 96;

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7AA6FF" />
        <stop offset="55%" stopColor="#3D63FF" />
        <stop offset="100%" stopColor="#1B3FCC" />
      </linearGradient>
      <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A8F0FF" />
        <stop offset="100%" stopColor="#38D8E8" />
      </linearGradient>
      <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#0a1a4a" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0a1a4a" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Base({ id }: { id: string }) {
  return (
    <ellipse cx="48" cy="86" rx="26" ry="4" fill={`url(#${id}-shadow)`} />
  );
}

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width="100%"
      height="100%"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ---------- Student / Graduation ---------- */
export function Icon3DStudent({ className }: IconProps) {
  const id = "i3-stu";
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Base id={id} />
      <g className="icon3d-bob">
        {/* book base */}
        <rect x="22" y="56" width="52" height="18" rx="4" fill={`url(#${id}-body)`} />
        <rect x="22" y="56" width="52" height="5" rx="2.5" fill={`url(#${id}-gloss)`} opacity="0.55" />
        {/* mortarboard */}
        <polygon points="48,18 82,32 48,46 14,32" fill={`url(#${id}-body)`} />
        <polygon points="48,20 78,32 48,44 18,32" fill={`url(#${id}-accent)`} opacity="0.55" />
        <rect x="44" y="40" width="8" height="10" fill="#1B3FCC" opacity="0.6" />
        {/* tassel */}
        <g className="icon3d-tilt" style={{ transformOrigin: "76px 32px" }}>
          <line x1="76" y1="32" x2="76" y2="50" stroke="#A8F0FF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="76" cy="53" r="3" fill="#38D8E8" />
        </g>
      </g>
    </Frame>
  );
}

/* ---------- Work / Briefcase ---------- */
export function Icon3DWork({ className }: IconProps) {
  const id = "i3-wrk";
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Base id={id} />
      <g className="icon3d-rise">
        {/* handle */}
        <rect x="38" y="22" width="20" height="12" rx="4" fill="none" stroke={`url(#${id}-accent)`} strokeWidth="3" />
        {/* body */}
        <rect x="16" y="34" width="64" height="44" rx="8" fill={`url(#${id}-body)`} />
        <rect x="16" y="34" width="64" height="10" rx="6" fill={`url(#${id}-gloss)`} opacity="0.5" />
        <rect x="40" y="50" width="16" height="6" rx="2" fill="#A8F0FF" opacity="0.85" />
        <line x1="16" y1="58" x2="80" y2="58" stroke="#0a1a4a" strokeOpacity="0.25" strokeWidth="2" />
      </g>
    </Frame>
  );
}

/* ---------- Tourist / Plane ---------- */
export function Icon3DTourist({ className }: IconProps) {
  const id = "i3-tou";
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Base id={id} />
      {/* sun rays behind */}
      <g className="icon3d-tilt" style={{ transformOrigin: "70px 26px" }}>
        <circle cx="70" cy="26" r="8" fill={`url(#${id}-accent)`} />
        <circle cx="70" cy="26" r="5" fill="#FFF6C2" opacity="0.9" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="70"
            y1="26"
            x2={70 + Math.cos((a * Math.PI) / 180) * 13}
            y2={26 + Math.sin((a * Math.PI) / 180) * 13}
            stroke="#FFD66B"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      </g>
      {/* suitcase */}
      <g className="icon3d-bob">
        {/* handle */}
        <rect x="36" y="30" width="24" height="10" rx="5" fill="none" stroke="#1B3FCC" strokeWidth="3" />
        {/* body */}
        <rect x="20" y="40" width="56" height="40" rx="6" fill={`url(#${id}-body)`} />
        <rect x="20" y="40" width="56" height="10" rx="5" fill={`url(#${id}-gloss)`} opacity="0.55" />
        {/* center band */}
        <rect x="20" y="56" width="56" height="6" fill="#1B3FCC" opacity="0.55" />
        {/* luggage tag */}
        <g className="icon3d-tilt" style={{ transformOrigin: "62px 44px" }}>
          <line x1="60" y1="42" x2="66" y2="50" stroke="#A8F0FF" strokeWidth="1.5" />
          <rect x="62" y="50" width="10" height="8" rx="1.5" fill={`url(#${id}-accent)`} />
        </g>
        {/* palm leaf accent */}
        <path
          d="M30 70 Q34 60 42 60 Q36 62 34 70 Q40 64 46 66 Q38 68 34 74 Z"
          fill="#38D8E8"
          opacity="0.85"
        />
      </g>
    </Frame>
  );
}



/* ---------- Business / Building ---------- */
export function Icon3DBusiness({ className }: IconProps) {
  const id = "i3-biz";
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Base id={id} />
      <g className="icon3d-rise">
        {/* back tower */}
        <rect x="46" y="18" width="26" height="60" rx="3" fill="#1B3FCC" />
        <rect x="46" y="18" width="26" height="6" fill={`url(#${id}-gloss)`} opacity="0.45" />
        {/* front tower */}
        <rect x="22" y="32" width="30" height="46" rx="3" fill={`url(#${id}-body)`} />
        <rect x="22" y="32" width="30" height="6" fill={`url(#${id}-gloss)`} opacity="0.5" />
        {/* windows */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`a-${r}-${c}`}
              x={26 + c * 8}
              y={42 + r * 8}
              width="5"
              height="5"
              rx="1"
              fill="#A8F0FF"
              opacity={(r + c) % 2 === 0 ? 0.95 : 0.55}
            />
          ))
        )}
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`b-${r}-${c}`}
              x={52 + c * 8}
              y={28 + r * 9}
              width="5"
              height="5"
              rx="1"
              fill="#A8F0FF"
              opacity={(r + c) % 2 === 0 ? 0.9 : 0.5}
            />
          ))
        )}
      </g>
    </Frame>
  );
}

/* ---------- Family / People ---------- */
export function Icon3DFamily({ className }: IconProps) {
  const id = "i3-fam";
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Base id={id} />
      <g className="icon3d-bob">
        {/* back person */}
        <circle cx="62" cy="32" r="10" fill="#1B3FCC" />
        <path d="M44 70 q18 -22 36 0 v8 h-36 z" fill="#1B3FCC" />
        {/* front person */}
        <circle cx="36" cy="36" r="12" fill={`url(#${id}-body)`} />
        <ellipse cx="32" cy="32" rx="4" ry="3" fill={`url(#${id}-gloss)`} opacity="0.6" />
        <path d="M14 78 q22 -28 44 0 v2 h-44 z" fill={`url(#${id}-body)`} />
        <path d="M18 70 q18 -20 36 0" fill="none" stroke={`url(#${id}-gloss)`} strokeWidth="3" opacity="0.4" />
      </g>
    </Frame>
  );
}

/* ---------- PR / Badge with shine ---------- */
export function Icon3DPR({ className }: IconProps) {
  const id = "i3-pr";
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Base id={id} />
      {/* pulse ring */}
      <circle cx="48" cy="46" r="22" fill="none" stroke="#38D8E8" strokeWidth="2" className="icon3d-ring" />
      <g className="icon3d-tilt" style={{ transformOrigin: "48px 46px" }}>
        {/* star/badge */}
        <polygon
          points="48,16 56,32 74,34 60,46 64,64 48,55 32,64 36,46 22,34 40,32"
          fill={`url(#${id}-body)`}
        />
        {/* gloss */}
        <polygon
          points="48,18 54,32 70,34 60,44 48,38"
          fill={`url(#${id}-gloss)`}
          opacity="0.55"
        />
        {/* check */}
        <path d="M40 46 l6 6 l12 -12" fill="none" stroke="#A8F0FF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* shine sweep */}
        <g clipPath={`url(#${id}-clip)`}>
          <rect x="20" y="14" width="14" height="56" fill="#ffffff" opacity="0.45" className="icon3d-shine" />
        </g>
        <clipPath id={`${id}-clip`}>
          <polygon points="48,16 56,32 74,34 60,46 64,64 48,55 32,64 36,46 22,34 40,32" />
        </clipPath>
      </g>
    </Frame>
  );
}
