import { useRef } from "react";
import type { CSSProperties } from "react";
import { useInView } from "motion/react";

export function useReveal(margin = "-60px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as any });
  return { ref, inView };
}

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Watercolor cottage-garden palette (matches physical card) ── */
export const COLORS = {
  // Backgrounds
  cream: "#FBF1E4",          // soft peach/warm cream wash
  peach: "#F5DDC4",
  peachLight: "#FBE9D5",
  ivory: "#FFF6EA",
  // Text — dark teal (matches card name text)
  teal: "#1B4A5C",
  tealDark: "#143A48",
  tealSoft: "#2A6473",
  // Accent — olive gold (matches PN monogram)
  gold: "#8A7030",
  goldLight: "#A88A45",
  goldPale: "#D8C28E",
  // Botanical — sage green watercolor
  sage: "#8FA279",
  sageDeep: "#6E8A5C",
  sageLight: "#BAC9A2",
  // Supporting
  warmBrown: "#5C4426",
  midBrown: "#8A6B3F",
  lightBrown: "#A98A6B",
  white: "#FFFBF4",
  // Legacy alias (keep for back-compat in legacy sections)
  navy: "#1B4A5C",
  navyLight: "#2A6473",
  blush: "#F0C8A8",
};

/* ── Small ornamental sparkle divider ── */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 justify-center ${className}`}>
      <div style={{ width: 48, height: 1, background: "rgba(138,112,48,0.4)" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0C7 0 7.6 3.5 10.5 3.5C7.6 3.5 7 7 7 7C7 7 6.4 3.5 3.5 3.5C6.4 3.5 7 0 7 0Z" fill={COLORS.gold} fillOpacity="0.7"/>
        <path d="M7 7C7 7 7.6 10.5 10.5 10.5C7.6 10.5 7 14 7 14C7 14 6.4 10.5 3.5 10.5C6.4 10.5 7 7 7 7Z" fill={COLORS.gold} fillOpacity="0.7"/>
      </svg>
      <div style={{ width: 48, height: 1, background: "rgba(138,112,48,0.4)" }} />
    </div>
  );
}

/* ── Single watercolor sage leaf ── */
export function LeafSvg({ style }: { style?: CSSProperties }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" style={style}>
      <defs>
        <radialGradient id="leafGrad" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#BAC9A2" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#6E8A5C" stopOpacity="0.4"/>
        </radialGradient>
      </defs>
      <path d="M45 8 C33 22, 10 34, 8 58 C22 64, 40 52, 45 34 C50 52, 68 64, 82 58 C80 34, 57 22, 45 8Z" fill="url(#leafGrad)"/>
      <path d="M45 8 C45 28, 45 52, 45 82" stroke="#6E8A5C" strokeOpacity="0.45" strokeWidth="0.9"/>
    </svg>
  );
}

/* ── Watercolor botanical border (top/bottom of cards & sections) ── */
export function BotanicalBorder({
  position = "top",
  width = "100%",
  opacity = 0.85,
}: {
  position?: "top" | "bottom";
  width?: string | number;
  opacity?: number;
}) {
  const flip = position === "bottom" ? "scaleY(-1)" : "none";
  return (
    <div
      aria-hidden
      style={{
        width,
        display: "flex",
        justifyContent: "center",
        transform: flip,
        opacity,
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 420 90" width="100%" height="90" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs>
          <radialGradient id="bb-leaf-a" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#BAC9A2" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#6E8A5C" stopOpacity="0.55"/>
          </radialGradient>
          <radialGradient id="bb-leaf-b" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#D8C28E" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#8A7030" stopOpacity="0.5"/>
          </radialGradient>
        </defs>
        {/* Left cluster */}
        <g transform="translate(40,30)">
          <path d="M0 30 C20 10, 60 -5, 100 6" stroke="#6E8A5C" strokeOpacity="0.5" strokeWidth="1.1" fill="none"/>
          <ellipse cx="22" cy="22" rx="14" ry="6" transform="rotate(-30 22 22)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="48" cy="14" rx="13" ry="5.5" transform="rotate(-18 48 14)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="74" cy="9" rx="11" ry="5" transform="rotate(-10 74 9)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="36" cy="36" rx="11" ry="4.5" transform="rotate(15 36 36)" fill="url(#bb-leaf-a)" opacity="0.85"/>
          <circle cx="92" cy="6" r="2.4" fill="url(#bb-leaf-b)"/>
        </g>
        {/* Right cluster (mirrored) */}
        <g transform="translate(380,30) scale(-1,1)">
          <path d="M0 30 C20 10, 60 -5, 100 6" stroke="#6E8A5C" strokeOpacity="0.5" strokeWidth="1.1" fill="none"/>
          <ellipse cx="22" cy="22" rx="14" ry="6" transform="rotate(-30 22 22)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="48" cy="14" rx="13" ry="5.5" transform="rotate(-18 48 14)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="74" cy="9" rx="11" ry="5" transform="rotate(-10 74 9)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="36" cy="36" rx="11" ry="4.5" transform="rotate(15 36 36)" fill="url(#bb-leaf-a)" opacity="0.85"/>
          <circle cx="92" cy="6" r="2.4" fill="url(#bb-leaf-b)"/>
        </g>
        {/* Centre tiny sprig */}
        <g transform="translate(210,46)">
          <path d="M-18 0 Q0 -12 18 0" stroke="#6E8A5C" strokeOpacity="0.5" strokeWidth="1" fill="none"/>
          <ellipse cx="-10" cy="-3" rx="6" ry="2.6" transform="rotate(-25 -10 -3)" fill="url(#bb-leaf-a)"/>
          <ellipse cx="10" cy="-3" rx="6" ry="2.6" transform="rotate(25 10 -3)" fill="url(#bb-leaf-a)"/>
          <circle cx="0" cy="-10" r="2.6" fill="url(#bb-leaf-b)"/>
        </g>
      </svg>
    </div>
  );
}

/* ── PN gold monogram (Image 5 placeholder; pure SVG so it scales) ── */
export function PNMonogram({ size = 110 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-label="P&amp;N monogram">
      <defs>
        <linearGradient id="pn-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C7A75A"/>
          <stop offset="50%" stopColor="#8A7030"/>
          <stop offset="100%" stopColor="#6A5520"/>
        </linearGradient>
      </defs>
      {/* Outer circle */}
      <circle cx="60" cy="60" r="56" stroke="url(#pn-gold)" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="60" cy="60" r="52" stroke="url(#pn-gold)" strokeWidth="0.6" fill="none" opacity="0.4"/>
      {/* P */}
      <path
        d="M38 36 L38 86 M38 36 L56 36 C66 36 70 42 70 50 C70 58 66 64 56 64 L38 64"
        stroke="url(#pn-gold)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ampersand-ish flourish dot */}
      <circle cx="60" cy="76" r="1.6" fill="url(#pn-gold)"/>
      {/* N */}
      <path
        d="M52 86 L52 50 L84 86 L84 50"
        stroke="url(#pn-gold)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      {/* Tiny sparkle accents */}
      <circle cx="20" cy="60" r="1.4" fill="url(#pn-gold)" opacity="0.7"/>
      <circle cx="100" cy="60" r="1.4" fill="url(#pn-gold)" opacity="0.7"/>
    </svg>
  );
}

/* ── Sapphire love-knot engagement ring (Image 4 placeholder) ── */
export function SapphireRing({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Sapphire love knot ring">
      <defs>
        <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C97A"/>
          <stop offset="50%" stopColor="#B79248"/>
          <stop offset="100%" stopColor="#7A5C28"/>
        </linearGradient>
        <radialGradient id="sapphire" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#7BB7E6"/>
          <stop offset="35%" stopColor="#2F6FAA"/>
          <stop offset="100%" stopColor="#0E2A4F"/>
        </radialGradient>
        <radialGradient id="sapphire-shine" cx="0.3" cy="0.25" r="0.4">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Band — circle */}
      <ellipse cx="50" cy="62" rx="28" ry="26" stroke="url(#ring-gold)" strokeWidth="4" fill="none"/>
      <ellipse cx="50" cy="62" rx="28" ry="26" stroke="#F3D88A" strokeWidth="0.8" fill="none" opacity="0.6"/>
      {/* Love-knot setting (two interlocking loops) */}
      <path
        d="M38 36 C32 30 32 22 40 20 C48 18 50 26 50 30 C50 26 52 18 60 20 C68 22 68 30 62 36 C58 40 52 42 50 42 C48 42 42 40 38 36 Z"
        fill="url(#ring-gold)"
        stroke="#7A5C28"
        strokeWidth="0.6"
      />
      {/* Sapphire stone */}
      <circle cx="50" cy="30" r="6.5" fill="url(#sapphire)" stroke="#0E2A4F" strokeWidth="0.5"/>
      <circle cx="48" cy="28" r="2" fill="url(#sapphire-shine)"/>
      {/* Tiny diamond accents */}
      <circle cx="40" cy="25" r="1.2" fill="#FFFFFF" opacity="0.85"/>
      <circle cx="60" cy="25" r="1.2" fill="#FFFFFF" opacity="0.85"/>
      <circle cx="44" cy="38" r="1" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="56" cy="38" r="1" fill="#FFFFFF" opacity="0.7"/>
    </svg>
  );
}

/* ── Small accent gold rule used between paragraphs ── */
export function GoldAccentLine({ width = 56 }: { width?: number }) {
  return (
    <div style={{ width, height: 1.2, background: COLORS.gold, opacity: 0.55, borderRadius: 1, margin: "0 auto" }} />
  );
}

/* ── Legacy alias to avoid breakage in older files ── */
export function NavyAccentLine() {
  return <GoldAccentLine />;
}
