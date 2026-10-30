import { ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Ornamentos botánicos del layout "elegant".
   Todo está dibujado con SVG/CSS: hojas en verde salvia,
   capullos en tono rubor y flores color crema.
   ────────────────────────────────────────────────────────────── */

type LeafTone = "sage" | "deep" | "pale" | "olive" | "eucalyptus";

const LEAF_COLORS: Record<LeafTone, string> = {
  sage: "#A85566",
  deep: "#6E1F33",
  pale: "#D9A9AE",
  olive: "#8C3A4E",
  eucalyptus: "#B9737E",
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
        stroke="#4A1424"
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
  const petal = tone === "blush" ? "#A85566" : "#FBF2E0";
  const edge = tone === "blush" ? "#7A2038" : "#D9BE8E";
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
      <circle r="2.2" fill="#C9A46A" />
      <circle r="0.8" fill="#8C6A2E" opacity="0.9" />
    </g>
  );
}

function Bud({
  x,
  y,
  r = 0,
  s = 1,
  color = "#A85566",
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
        stroke="#7A2038"
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
          stroke="#6E1F33"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M62 252C48 236 40 220 40 202"
          stroke="#6E1F33"
          strokeWidth="1.1"
          fill="none"
        />
        <path
          d="M84 182C102 170 116 156 124 138"
          stroke="#6E1F33"
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
        <Bud x={92} y={152} r={16} s={0.8} color="#A85566" />
        <Bud x={128} y={52} r={-10} s={0.7} />
        <Bud x={154} y={16} r={22} s={0.6} color="#A85566" />

        <Blossom x={166} y={12} s={1.05} />
        <Blossom x={44} y={276} s={0.72} r={18} tone="blush" />
        <Blossom x={98} y={120} s={0.62} r={-12} />
        <Blossom x={30} y={206} s={0.5} r={24} tone="blush" />

        <circle cx="74" cy="276" r="1.6" fill="#C9A46A" />
        <circle cx="104" cy="138" r="1.4" fill="#C9A46A" />
        <circle cx="142" cy="34" r="1.3" fill="#C9A46A" />
      </g>
    </svg>
  );
}

/* Corona circular de hojas y flores para la portada. */
export function BotanicalWreath({ className = "" }: { className?: string }) {
  const tones: LeafTone[] = ["sage", "deep", "pale", "olive", "eucalyptus"];
  const leaves = Array.from({ length: 40 }, (_, i) => ({
    angle: (360 / 40) * i,
    radius: i % 2 === 0 ? 185 : 192,
    tilt: i % 2 === 0 ? -34 : 26,
    scale: i % 3 === 0 ? 0.9 : 0.74,
    tone: tones[i % tones.length],
  }));

  const innerLeaves = Array.from({ length: 22 }, (_, i) => ({
    angle: (360 / 22) * i + 8,
    radius: i % 2 === 0 ? 168 : 164,
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
        r="162"
        stroke="var(--elegant-gold)"
        strokeWidth="1"
        opacity="0.6"
      />
      <circle
        cx="240"
        cy="240"
        r="156"
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
          transform={`rotate(${angle} 240 240) translate(240 ${240 - 178}) rotate(${
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
            240 - 174
          }) scale(${flower.scale})`}
        >
          <Blossom x={0} y={0} tone={flower.tone} />
        </g>
      ))}

      <circle cx="240" cy="74" r="2" fill="#C9A46A" />
      <circle cx="240" cy="406" r="2" fill="#C9A46A" />
      <circle cx="74" cy="240" r="2" fill="#C9A46A" />
      <circle cx="406" cy="240" r="2" fill="#C9A46A" />
      <circle cx="128" cy="108" r="1.6" fill="#C9A46A" />
      <circle cx="352" cy="108" r="1.6" fill="#C9A46A" />
      <circle cx="128" cy="372" r="1.6" fill="#C9A46A" />
      <circle cx="352" cy="372" r="1.6" fill="#C9A46A" />
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
        stroke="#8C3A4E"
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
        stroke="#8C3A4E"
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

/* Ramillete asimétrico: hojas, capullos y flores para esquinas y laterales. */
export function FloralCluster({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 210"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M34 202C58 176 76 148 88 118C100 88 112 58 134 30"
          stroke="#6E1F33"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M62 164C48 148 40 130 38 110"
          stroke="#6E1F33"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M84 122C102 112 116 96 122 76"
          stroke="#6E1F33"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M100 84C86 72 78 58 76 42"
          stroke="#6E1F33"
          strokeWidth="0.9"
          fill="none"
        />

        <Leaf x={44} y={188} r={-52} s={0.86} t="deep" />
        <Leaf x={54} y={172} r={112} s={0.82} t="sage" />
        <Leaf x={62} y={152} r={-44} s={0.8} t="pale" />
        <Leaf x={72} y={132} r={108} s={0.78} t="olive" />
        <Leaf x={80} y={112} r={-36} s={0.74} t="sage" />
        <Leaf x={90} y={92} r={102} s={0.7} t="eucalyptus" />
        <Leaf x={98} y={72} r={-28} s={0.66} t="pale" />
        <Leaf x={108} y={52} r={96} s={0.6} t="sage" />
        <Leaf x={118} y={34} r={-18} s={0.54} t="deep" />
        <Leaf x={58} y={146} r={-96} s={0.5} t="eucalyptus" />
        <Leaf x={98} y={98} r={30} s={0.46} t="sage" />

        <RoundLeaf x={34} y={198} r={-12} s={0.9} t="eucalyptus" />
        <RoundLeaf x={48} y={202} r={16} s={0.75} t="sage" />

        <Bud x={70} y={158} r={-14} s={0.72} />
        <Bud x={94} y={100} r={18} s={0.62} color="#A85566" />
        <Bud x={112} y={58} r={-8} s={0.55} />
        <Bud x={128} y={30} r={20} s={0.5} color="#A85566" />

        <Blossom x={134} y={26} s={0.95} />
        <Blossom x={48} y={176} s={0.62} r={16} tone="blush" />
        <Blossom x={104} y={80} s={0.52} r={-12} />
        <Blossom x={76} y={128} s={0.4} r={22} tone="blush" />

        <circle cx="62" cy="170" r="1.5" fill="#C9A46A" />
        <circle cx="110" cy="66" r="1.3" fill="#C9A46A" />
        <circle cx="88" cy="116" r="1.1" fill="#C9A46A" />
      </g>
    </svg>
  );
}

/* Rosa abierta de pétalos concéntricos. */
export function RoseBloom({
  className = "",
  tone = "blush",
}: {
  className?: string;
  tone?: "blush" | "cream";
}) {
  const petal = tone === "blush" ? "#A85566" : "#FBF0D9";
  const core = tone === "blush" ? "#8C3A4E" : "#F1DFC0";
  const edge = tone === "blush" ? "#6E1F33" : "#D6BC8E";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M50 96C52 82 54 72 58 62"
          stroke="#8C3A4E"
          strokeWidth="1.2"
          fill="none"
        />
        <Leaf x={46} y={82} r={-118} s={0.42} t="sage" />
        <Leaf x={58} y={72} r={62} s={0.36} t="deep" />

        <circle cx="50" cy="44" r="30" fill={petal} opacity="0.45" />

        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={`rose-outer-${angle}`}
            cx="50"
            cy="24"
            rx="11"
            ry="14"
            fill={petal}
            stroke={edge}
            strokeWidth="0.7"
            transform={`rotate(${angle} 50 44)`}
          />
        ))}
        {[30, 90, 150, 210, 270, 330].map((angle) => (
          <ellipse
            key={`rose-inner-${angle}`}
            cx="50"
            cy="31"
            rx="8.5"
            ry="10.5"
            fill={core}
            stroke={edge}
            strokeWidth="0.6"
            transform={`rotate(${angle} 50 44)`}
          />
        ))}
        <circle
          cx="50"
          cy="44"
          r="6.5"
          fill={tone === "blush" ? "#8C3A4E" : "#E6D2AA"}
          stroke={edge}
          strokeWidth="0.6"
        />
        <path
          d="M46 44C48 41 52 41 54 44"
          stroke="#FFFDF8"
          strokeWidth="0.8"
          opacity="0.7"
          fill="none"
        />
      </g>
    </svg>
  );
}

/* Mariposa pequeña para flotar entre las secciones. */
export function Butterfly({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M32 24C26 10 12 4 7 12C2 20 12 31 29 32Z"
          fill="#E7C7C9"
          stroke="#8C3A4E"
          strokeWidth="0.8"
        />
        <path
          d="M32 24C38 10 52 4 57 12C62 20 52 31 35 32Z"
          fill="#E7C7C9"
          stroke="#8C3A4E"
          strokeWidth="0.8"
        />
        <path
          d="M30 31C22 33 14 43 18 48C22 53 30 43 32 35Z"
          fill="#A85566"
          stroke="#7A2038"
          strokeWidth="0.7"
        />
        <path
          d="M34 31C42 33 50 43 46 48C42 53 34 43 32 35Z"
          fill="#A85566"
          stroke="#7A2038"
          strokeWidth="0.7"
        />
        <path d="M32 22V40" stroke="#8C6A2E" strokeWidth="1.2" />
        <path d="M32 22C30 16 27 13 24 11" stroke="#8C6A2E" strokeWidth="0.8" />
        <path d="M32 22C34 16 37 13 40 11" stroke="#8C6A2E" strokeWidth="0.8" />
        <circle cx="32" cy="21" r="1.4" fill="#8C6A2E" />
        <circle cx="16" cy="17" r="1.3" fill="#FBF7EE" opacity="0.9" />
        <circle cx="48" cy="17" r="1.3" fill="#FBF7EE" opacity="0.9" />
      </g>
    </svg>
  );
}

/* Guirnalda horizontal de hojas y flores para pies y divisores. */
export function LeafGarland({ className = "" }: { className?: string }) {
  const leaves = [
    { x: 30, y: 48, r: -34, s: 0.5, t: "deep" as const },
    { x: 54, y: 42, r: 152, s: 0.46, t: "sage" as const },
    { x: 82, y: 36, r: -28, s: 0.48, t: "pale" as const },
    { x: 108, y: 34, r: 158, s: 0.44, t: "olive" as const },
    { x: 136, y: 36, r: -22, s: 0.46, t: "sage" as const },
    { x: 164, y: 40, r: 162, s: 0.44, t: "eucalyptus" as const },
    { x: 192, y: 40, r: -18, s: 0.46, t: "pale" as const },
    { x: 220, y: 38, r: 166, s: 0.44, t: "sage" as const },
    { x: 248, y: 34, r: -26, s: 0.46, t: "deep" as const },
    { x: 276, y: 30, r: 154, s: 0.44, t: "sage" as const },
    { x: 304, y: 28, r: -30, s: 0.46, t: "olive" as const },
    { x: 330, y: 24, r: 158, s: 0.42, t: "pale" as const },
  ];

  return (
    <svg
      viewBox="0 0 360 80"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M8 54C60 26 120 22 180 34C240 46 300 42 352 22"
          stroke="#8C3A4E"
          strokeWidth="1.1"
          fill="none"
        />
        {leaves.map((leaf, index) => (
          <Leaf
            key={`garland-leaf-${index}`}
            x={leaf.x}
            y={leaf.y}
            r={leaf.r}
            s={leaf.s}
            t={leaf.t}
          />
        ))}

        <Bud x={46} y={44} r={-20} s={0.5} />
        <Bud x={148} y={33} r={18} s={0.46} color="#A85566" />
        <Bud x={252} y={34} r={-16} s={0.46} />
        <Bud x={322} y={25} r={20} s={0.42} color="#A85566" />

        <Blossom x={14} y={52} s={0.44} tone="blush" />
        <Blossom x={96} y={34} s={0.38} />
        <Blossom x={204} y={42} s={0.4} tone="blush" />
        <Blossom x={290} y={29} s={0.36} />
        <Blossom x={348} y={20} s={0.4} tone="blush" />

        <circle cx="70" cy="38" r="1.2" fill="#C9A46A" />
        <circle cx="176" cy="36" r="1.1" fill="#C9A46A" />
        <circle cx="268" cy="34" r="1.1" fill="#C9A46A" />
      </g>
    </svg>
  );
}

/* Ramitas de paniculata (flores minúsculas) para rellenar esquinas. */
export function BabyBreath({ className = "" }: { className?: string }) {
  const dots = [
    { x: 20, y: 12, r: 1.6 },
    { x: 26, y: 20, r: 1.3 },
    { x: 14, y: 22, r: 1.2 },
    { x: 60, y: 58, r: 1.6 },
    { x: 68, y: 50, r: 1.2 },
    { x: 54, y: 48, r: 1.1 },
    { x: 16, y: 34, r: 1.5 },
    { x: 22, y: 42, r: 1.1 },
    { x: 10, y: 42, r: 1.2 },
    { x: 30, y: 30, r: 1.1 },
    { x: 42, y: 22, r: 1.4 },
    { x: 50, y: 30, r: 1.1 },
    { x: 34, y: 44, r: 1.2 },
    { x: 46, y: 52, r: 1.3 },
  ];

  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M40 118C38 92 36 70 32 52C28 36 24 24 20 12"
          stroke="#8C3A4E"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M38 86C48 80 56 70 60 58"
          stroke="#8C3A4E"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M34 62C24 56 18 46 16 34"
          stroke="#8C3A4E"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M36 40C42 32 48 26 50 18"
          stroke="#8C3A4E"
          strokeWidth="0.7"
          fill="none"
        />

        <Leaf x={36} y={96} r={-118} s={0.3} t="sage" />
        <Leaf x={40} y={74} r={64} s={0.26} t="deep" />
        <Leaf x={30} y={52} r={-124} s={0.24} t="pale" />
        <Leaf x={48} y={64} r={52} s={0.22} t="eucalyptus" />

        {dots.map((dot, index) => (
          <circle
            key={`baby-breath-${index}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill={index % 3 === 0 ? "#EBCF93" : "#FBEBC7"}
            stroke="#C9A96E"
            strokeWidth="0.3"
          />
        ))}
      </g>
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

/**
 * Separador mínimo entre nombres completos de una misma tarjeta.
 * Sirve para que dos personas no se lean como un único nombre largo.
 */
export function NameDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-hidden
    >
      <span
        className="h-px w-5 sm:w-8"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201, 164, 106, 0.7))",
        }}
      />
      <span
        className="h-1.5 w-1.5 rotate-45"
        style={{ backgroundColor: "var(--elegant-gold)" }}
      />
      <span
        className="h-px w-5 sm:w-8"
        style={{
          background: "linear-gradient(270deg, transparent, rgba(201, 164, 106, 0.7))",
        }}
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
        boxShadow: "inset 0 0 0 3px rgba(255, 253, 248, 0.85), 0 10px 24px -18px rgba(40,10,20,0.5)",
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
        className="mt-3 font-elegant-display text-[2.15rem] leading-tight sm:text-4xl md:text-5xl"
        style={{ color: "var(--inv-text)", letterSpacing: "0.02em" }}
      >
        {title}
      </h2>
      <GoldDivider className={`mt-5 ${align === "center" ? "" : "justify-start"}`} />
      {subtitle && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
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
