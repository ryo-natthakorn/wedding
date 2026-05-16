import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "./wedding-context";
import { useReveal, COLORS } from "./shared";

export function HashtagSection() {
  const { t } = useLang();
  const { ref, inView } = useReveal("-100px");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    setTyped("");
    let i = 0;
    const full = t.hashtag_value;
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 95);
    return () => clearInterval(id);
  }, [inView, t.hashtag_value]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "96px 24px",
        background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 60%, ${COLORS.tealSoft} 100%)`,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Watercolor texture overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(216,194,142,0.18) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(143,162,121,0.18) 0%, transparent 45%), radial-gradient(circle at 60% 20%, rgba(251,233,213,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      {/* Sage leaf accents */}
      <svg aria-hidden style={{ position: "absolute", top: 20, left: 20, opacity: 0.35 }} width="120" height="120" viewBox="0 0 120 120">
        <ellipse cx="40" cy="60" rx="36" ry="14" fill="#BAC9A2" transform="rotate(-30 40 60)"/>
        <ellipse cx="60" cy="80" rx="26" ry="10" fill="#8FA279" transform="rotate(-50 60 80)"/>
      </svg>
      <svg aria-hidden style={{ position: "absolute", bottom: 20, right: 20, opacity: 0.35 }} width="120" height="120" viewBox="0 0 120 120">
        <ellipse cx="80" cy="60" rx="36" ry="14" fill="#BAC9A2" transform="rotate(30 80 60)"/>
        <ellipse cx="60" cy="80" rx="26" ry="10" fill="#8FA279" transform="rotate(50 60 80)"/>
      </svg>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: COLORS.goldPale,
          textTransform: "uppercase",
          marginBottom: 28,
          position: "relative",
        }}
      >
        {t.hashtag_label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.5rem, 9vw, 5.2rem)",
          color: COLORS.ivory,
          letterSpacing: "0.02em",
          marginBottom: 28,
          position: "relative",
          fontWeight: 500,
        }}
      >
        {typed}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          style={{ color: COLORS.goldPale, marginLeft: 4 }}
        >
          |
        </motion.span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}
      >
        {/* Instagram */}
        <a aria-label="Instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 12, background: "rgba(255,251,244,0.10)", border: "1px solid rgba(255,251,244,0.22)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.ivory} strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill={COLORS.ivory}/>
          </svg>
        </a>
        {/* Facebook */}
        <a aria-label="Facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 12, background: "rgba(255,251,244,0.10)", border: "1px solid rgba(255,251,244,0.22)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.ivory} strokeWidth="1.6">
            <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3H9v9h3v-9h2.5l.5-3H12V7a1 1 0 0 1 1-1h2V3z" fill={COLORS.ivory} stroke="none"/>
          </svg>
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.55 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "rgba(255,251,244,0.78)",
          position: "relative",
        }}
      >
        {t.hashtag_sub}
      </motion.p>
    </section>
  );
}
