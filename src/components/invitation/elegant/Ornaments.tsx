import { ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Ornamentos botánicos del layout "elegant".
   Todo está dibujado con SVG/CSS: hojas en verde salvia,
   capullos en tono rubor y flores color crema.
   ────────────────────────────────────────────────────────────── */

type LeafTone = "sage" | "deep" | "pale" | "olive" | "eucalyptus";

const LEAF_COLORS: Record<LeafTone, string> = {
  sage: "#8CA68B",
  deep: "#5B7863",
  pale: "#B9CBAE",
  olive: "#7C9270",
  eucalyptus: "#7F9B8E",
};

function Leaf({
  x,
  y,
  r = 0,
  s = 1,
  t = "sage",
  o = 1,
}: {
  x: number;
  y: number;
  r?: number;
  s?: number;
  t?: LeafTone;
  o?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <path
        d="M0 0C9 -8 24 -12 38 -3C26 7 10 9 0 0Z"
        fill={LEAF_COLORS[t]}
      />
      <path
        d="M1 0C12 -4 25 -6 37 -3"
        stroke="#FBF8F0"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />
      <path
        d="M8 -1C16 -4 24 -5 31 -4"
        stroke="#3F5A48"
        strokeWidth="0.45"
        strokeLinecap="round"
        opacity="0.28"
        fill="none"
      />
    </g>
  );
}

function RoundLeaf({
  x,
  y,
  r = 0,
  s = 1,
  t = "eucalyptus",
}: {
  x: number;
  y: number;
  r?: number;
  s?: number;
  t?: LeafTone;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="10" ry="7" fill={LEAF_COLORS[t]} opacity="0.95" />
      <path
        d="M-7 0C-3 -2 3 -2 7 0"
        stroke="#FBF8F0"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
    </g>
  );
}

function Blossom({
  x,
  y,
  s = 1,
  r = 0,
  tone = "cream",
}: {
  x: number;
  y: number;
  s?: number;
  r?: number;
  tone?: "cream" | "blush";
}) {
  const petal = tone === "blush" ? "#EBCBC6" : "#FBF7EE";
  const edge = tone === "blush" ? "#D8ADA8" : "#E4D7C3";
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-5.4"
          rx="4.1"
          ry="5.8"
          transform={`rotate(${angle})`}
          fill={petal}
          stroke={edge}
          strokeWidth="0.45"
        />
      ))}
      <circle r="2.2" fill="#D9C089" />
      <circle r="0.8" fill="#B79557" opacity="0.8" />
    </g>
  );
}

function Bud({
  x,
  y,
  r = 0,
  s = 1,
  color = "#E2B6B0",
}: {
  x: number;
  y: number;
  r?: number;
  s?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path
        d="M0 0C-4 -5 -3 -11 0 -14C3 -11 4 -5 0 0Z"
        fill={color}
        stroke="#C9958F"
        strokeWidth="0.45"
      />
      <path
        d="M0 -2C0 -6 0 -9 0 -12"
        stroke="#FBF8F0"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />
    </g>
  );
}

/* Rama principal, usada en esquinas, portada, sobre y pie. */
export function BotanicalBranch({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 220 330"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M28 318C48 274 64 236 76 196C88 154 98 112 114 76C126 48 142 26 164 10"
          stroke="#6C876F"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M62 252C48 236 40 220 40 202"
          stroke="#6C876F"
          strokeWidth="1.1"
          fill="none"
        />
        <path
          d="M84 182C102 170 116 156 124 138"
          stroke="#6C876F"
          strokeWidth="1"
          fill="none"
        />

        <Leaf x={42} y={302} r={-58} s={1} t="deep" />
        <Leaf x={50} y={286} r={104} s={0.9} t="sage" />
        <Leaf x={56} y={266} r={-46} s={0.95} t="pale" />
        <Leaf x={66} y={246} r={110} s={0.9} t="olive" />
        <Leaf x={66} y={228} r={-38} s={0.92} t="sage" />
        <Leaf x={78} y={208} r={106} s={0.88} t="eucalyptus" />
        <Leaf x={78} y={190} r={-30} s={0.9} t="pale" />
        <Leaf x={88} y={166} r={102} s={0.85} t="sage" />
        <Leaf x={88} y={148} r={-24} s={0.86} t="deep" />
        <Leaf x={100} y={122} r={98} s={0.8} t="olive" />
        <Leaf x={98} y={104} r={-18} s={0.82} t="sage" />
        <Leaf x={110} y={80} r={92} s={0.78} t="pale" />
        <Leaf x={112} y={60} r={-12} s={0.72} t="deep" />
        <Leaf x={126} y={38} r={84} s={0.7} t="sage" />
        <Leaf x={140} y={22} r={72} s={0.62} t="olive" />

        <Leaf x={46} y={216} r={-78} s={0.62} t="sage" />
        <Leaf x={37} y={198} r={-104} s={0.52} t="pale" />
        <Leaf x={120} y={144} r={32} s={0.58} t="eucalyptus" />
        <Leaf x={128} y={130} r={72} s={0.5} t="sage" />

        <RoundLeaf x={22} y={322} r={-18} s={1.1} t="eucalyptus" />
        <RoundLeaf x={38} y={328} r={12} s={0.9} t="sage" />

        <Bud x={64} y={254} r={-18} s={0.9} />
        <Bud x={92} y={152} r={16} s={0.8} color="#DDA9A4" />
        <Bud x={128} y={52} r={-10} s={0.7} />
        <Bud x={154} y={16} r={22} s={0.6} color="#DDA9A4" />

        <Blossom x={166} y={12} s={1.05} />
        <Blossom x={44} y={276} s={0.72} r={18} tone="blush" />
        <Blossom x={98} y={120} s={0.62} r={-12} />
        <Blossom x={30} y={206} s={0.5} r={24} tone="blush" />

        <circle cx="74" cy="276" r="1.6" fill="#C9A96E" />
        <circle cx="104" cy="138" r="1.4" fill="#C9A96E" />
        <circle cx="142" cy="34" r="1.3" fill="#C9A96E" />
      </g>
    </svg>
  );
}

/* Corona circular de hojas y flores para la portada. */
export function BotanicalWreath({ className = "" }: { className?: string }) {
  const tones: LeafTone[] = ["sage", "deep", "pale", "olive", "eucalyptus"];
  const leaves = Array.from({ length: 40 }, (_, i) => ({
    angle: (360 / 40) * i,
    radius: i % 2 === 0 ? 157 : 164,
    tilt: i % 2 === 0 ? -34 : 26,
    scale: i % 3 === 0 ? 0.9 : 0.74,
    tone: tones[i % tones.length],
  }));

  const innerLeaves = Array.from({ length: 22 }, (_, i) => ({
    angle: (360 / 22) * i + 8,
    radius: i % 2 === 0 ? 144 : 140,
    tilt: i % 2 === 0 ? 104 : 78,
    scale: i % 3 === 0 ? 0.52 : 0.44,
    tone: tones[(i + 2) % tones.length],
  }));

  const blossoms = [
    { angle: 12, scale: 1.85, tone: "cream" as const },
    { angle: 48, scale: 1.5, tone: "blush" as const },
    { angle: 74, scale: 1.5, tone: "blush" as const },
    { angle: 138, scale: 1.8, tone: "cream" as const },
    { angle: 198, scale: 1.45, tone: "blush" as const },
    { angle: 252, scale: 1.75, tone: "cream" as const },
    { angle: 284, scale: 1.4, tone: "cream" as const },
    { angle: 314, scale: 1.6, tone: "blush" as const },
  ];

  const buds = [44, 108, 170, 226, 288, 344];

  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="240"
        cy="240"
        r="136"
        stroke="var(--elegant-gold)"
        strokeWidth="1"
        opacity="0.6"
      />
      <circle
        cx="240"
        cy="240"
        r="130"
        stroke="var(--elegant-gold)"
        strokeWidth="0.8"
        strokeDasharray="1 6"
        opacity="0.45"
      />

      {leaves.map((leaf, index) => (
        <g
          key={`wreath-leaf-${index}`}
          transform={`rotate(${leaf.angle} 240 240) translate(240 ${
            240 - leaf.radius
          }) rotate(${leaf.tilt}) scale(${leaf.scale})`}
        >
          <Leaf x={0} y={0} t={leaf.tone} />
        </g>
      ))}

      {innerLeaves.map((leaf, index) => (
        <g
          key={`wreath-inner-${index}`}
          transform={`rotate(${leaf.angle} 240 240) translate(240 ${
            240 - leaf.radius
          }) rotate(${leaf.tilt}) scale(${leaf.scale})`}
        >
          <Leaf x={0} y={0} t={leaf.tone} o={0.9} />
        </g>
      ))}

      {buds.map((angle) => (
        <g
          key={`wreath-bud-${angle}`}
          transform={`rotate(${angle} 240 240) translate(240 ${240 - 151}) rotate(${
            angle % 2 === 0 ? -20 : 30
          })`}
        >
          <Bud x={0} y={0} s={0.95} />
        </g>
      ))}

      {blossoms.map((flower) => (
        <g
          key={`wreath-blossom-${flower.angle}`}
          transform={`rotate(${flower.angle} 240 240) translate(240 ${
            240 - 147
          }) scale(${flower.scale})`}
        >
          <Blossom x={0} y={0} tone={flower.tone} />
        </g>
      ))}

      <circle cx="240" cy="74" r="2" fill="#C9A96E" />
      <circle cx="240" cy="406" r="2" fill="#C9A96E" />
      <circle cx="74" cy="240" r="2" fill="#C9A96E" />
      <circle cx="406" cy="240" r="2" fill="#C9A96E" />
      <circle cx="128" cy="108" r="1.6" fill="#C9A96E" />
      <circle cx="352" cy="108" r="1.6" fill="#C9A96E" />
      <circle cx="128" cy="372" r="1.6" fill="#C9A96E" />
      <circle cx="352" cy="372" r="1.6" fill="#C9A96E" />
    </svg>
  );
}

/* Esquina floral compacta para tarjetas y marcos. */
export function BotanicalCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 58V6H58"
        stroke="var(--elegant-gold)"
        strokeWidth="1.2"
        opacity="0.75"
      />
      <path
        d="M14 74C24 56 38 40 58 28C72 20 86 14 100 10"
        stroke="#7C9270"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <Leaf x={26} y={62} r={-70} s={0.62} t="sage" />
      <Leaf x={38} y={46} r={-55} s={0.58} t="deep" />
      <Leaf x={52} y={32} r={-40} s={0.55} t="pale" />
      <Leaf x={68} y={22} r={-25} s={0.5} t="olive" />
      <Leaf x={84} y={16} r={-12} s={0.45} t="eucalyptus" />
      <Leaf x={40} y={80} r={20} s={0.42} t="eucalyptus" />
      <Bud x={62} y={54} r={-20} s={0.7} />
      <Blossom x={70} y={44} s={0.68} tone="cream" />
      <Blossom x={34} y={74} s={0.5} tone="blush" />
    </svg>
  );
}

/* Pequeño ramillete horizontal para títulos y divisores. */
export function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 22C26 22 40 20 54 16C66 13 78 10 88 8"
        stroke="#7C9270"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <Leaf x={20} y={21} r={-28} s={0.36} t="sage" />
      <Leaf x={34} y={19} r={16} s={0.32} t="deep" />
      <Leaf x={48} y={17} r={-22} s={0.3} t="pale" />
      <Leaf x={62} y={14} r={14} s={0.28} t="olive" />
      <Leaf x={40} y={12} r={-58} s={0.26} t="eucalyptus" />
      <Bud x={72} y={10} r={-12} s={0.5} />
      <Blossom x={80} y={9} s={0.5} tone="cream" />
      <Blossom x={12} y={24} s={0.4} tone="blush" />
    </svg>
  );
}

export function GoldDivider({
  className = "",
  wide = false,
}: {
  className?: string;
  wide?: boolean;
}) {
  const line = wide ? "w-16 sm:w-24" : "w-10 sm:w-14";
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} aria-hidden>
      <span
        className={`h-px ${line}`}
        style={{ background: "linear-gradient(90deg, transparent, var(--elegant-gold))" }}
      />
      <BotanicalSprig className="h-5 w-12 shrink-0 sm:w-14" />
      <span
        className={`h-px ${line}`}
        style={{ background: "linear-gradient(270deg, transparent, var(--elegant-gold))" }}
      />
    </div>
  );
}

export function Monogram({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${className}`}
      style={{
        border: "1px solid var(--elegant-line-strong)",
        background:
          "radial-gradient(circle at 40% 30%, #FFFDF8 0%, #F3ECDF 100%)",
        boxShadow: "inset 0 0 0 3px rgba(255, 253, 248, 0.85), 0 10px 24px -18px rgba(34,49,39,0.5)",
      }}
      aria-hidden
    >
      <span
        className="absolute inset-[6px] rounded-full"
        style={{ border: "1px solid var(--elegant-line)" }}
      />
      <span
        className="relative font-elegant-display leading-none"
        style={{ color: "var(--elegant-sage-deep)", letterSpacing: "0.06em" }}
      >
        {text}
      </span>
    </div>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return <BotanicalCorner className={className} />;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <>
          <BotanicalSprig
            className={`h-8 w-20 ${align === "center" ? "mx-auto" : ""}`}
          />
          <p
            className="elegant-eyebrow mt-2"
            style={{ color: "var(--inv-accent)" }}
          >
            {eyebrow}
          </p>
        </>
      )}
      <h2
        className="mt-3 font-elegant-display text-3xl leading-tight sm:text-4xl md:text-5xl"
        style={{ color: "var(--inv-text)", letterSpacing: "0.02em" }}
      >
        {title}
      </h2>
      <GoldDivider className={`mt-5 ${align === "center" ? "" : "justify-start"}`} />
      {subtitle && (
        <p
          className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={{ color: "var(--inv-text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function FineFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span
        className="pointer-events-none absolute inset-2 rounded-[inherit]"
        style={{ border: "1px solid var(--elegant-line)" }}
        aria-hidden
      />
      {children}
    </div>
  );
}
