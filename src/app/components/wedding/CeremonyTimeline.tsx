import { motion } from "motion/react";
import { useLang } from "./wedding-context";
import { useReveal, Divider, COLORS, BotanicalBorder } from "./shared";

/* Three watercolor mini-illustrations for each timeline beat. */
function RingsExchangeIllustration() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <defs>
        <linearGradient id="r-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C97A"/><stop offset="100%" stopColor="#8A7030"/>
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="50" rx="16" ry="14" stroke="url(#r-gold)" strokeWidth="2.6" fill="none"/>
      <ellipse cx="54" cy="50" rx="16" ry="14" stroke="url(#r-gold)" strokeWidth="2.6" fill="none"/>
      <circle cx="32" cy="36" r="3.4" fill="#2F6FAA" stroke="#0E2A4F" strokeWidth="0.5"/>
      <circle cx="54" cy="36" r="3.4" fill="#2F6FAA" stroke="#0E2A4F" strokeWidth="0.5"/>
      <circle cx="31" cy="35" r="1" fill="#FFFFFF" opacity="0.85"/>
      <circle cx="53" cy="35" r="1" fill="#FFFFFF" opacity="0.85"/>
      <path d="M16 70 Q42 64 70 70" stroke="#8FA279" strokeOpacity="0.6" strokeWidth="1.4" fill="none"/>
      <ellipse cx="22" cy="69" rx="5" ry="2" fill="#8FA279" opacity="0.55"/>
      <ellipse cx="62" cy="69" rx="5" ry="2" fill="#8FA279" opacity="0.55"/>
    </svg>
  );
}

function CameraIllustration() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <defs>
        <linearGradient id="cam-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE9D5"/><stop offset="100%" stopColor="#E8C4B8"/>
        </linearGradient>
      </defs>
      <rect x="14" y="26" width="56" height="40" rx="6" fill="url(#cam-body)" stroke="#8A7030" strokeWidth="1.5"/>
      <rect x="22" y="20" width="22" height="10" rx="2" fill="#FBE9D5" stroke="#8A7030" strokeWidth="1.2"/>
      <circle cx="42" cy="46" r="11" fill="#1B4A5C" stroke="#8A7030" strokeWidth="1.6"/>
      <circle cx="42" cy="46" r="7" fill="#2A6473"/>
      <circle cx="39" cy="43" r="2.5" fill="#7BB7E6" opacity="0.7"/>
      <circle cx="58" cy="34" r="2" fill="#8A7030"/>
      <ellipse cx="20" cy="70" rx="6" ry="2" fill="#8FA279" opacity="0.55"/>
      <ellipse cx="64" cy="70" rx="6" ry="2" fill="#8FA279" opacity="0.55"/>
    </svg>
  );
}

function CelebrationIllustration() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <defs>
        <linearGradient id="ch-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8E2" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#D8C28E" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
      {/* Left glass */}
      <path d="M22 22 L30 22 L29 42 Q26 46 26 50 L26 60 L22 60 L22 50 Q22 46 19 42 Z" fill="url(#ch-glass)" stroke="#8A7030" strokeWidth="1.2"/>
      <path d="M21 60 L27 60" stroke="#8A7030" strokeWidth="1.6" strokeLinecap="round"/>
      {/* Right glass — clinking */}
      <path d="M54 22 L62 22 L65 42 Q68 46 68 50 L68 60 L64 60 L64 50 Q64 46 61 42 Z" fill="url(#ch-glass)" stroke="#8A7030" strokeWidth="1.2"/>
      <path d="M63 60 L69 60" stroke="#8A7030" strokeWidth="1.6" strokeLinecap="round"/>
      {/* Bubbles */}
      <circle cx="24" cy="34" r="1.2" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="27" cy="38" r="0.8" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="60" cy="34" r="1.2" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="63" cy="38" r="0.8" fill="#FFFFFF" opacity="0.9"/>
      {/* Confetti */}
      <rect x="36" y="14" width="3" height="6" rx="1" fill="#1B4A5C" transform="rotate(-20 36 14)"/>
      <rect x="44" y="10" width="3" height="6" rx="1" fill="#8A7030" transform="rotate(15 44 10)"/>
      <rect x="50" y="16" width="3" height="6" rx="1" fill="#8FA279" transform="rotate(-30 50 16)"/>
      <circle cx="40" cy="22" r="1.2" fill="#E8C4B8"/>
      <circle cx="48" cy="20" r="1.2" fill="#D8C28E"/>
    </svg>
  );
}

export function CeremonyTimeline() {
  const { t } = useLang();
  const { ref, inView } = useReveal();

  const steps = [
    {
      time: t.timeline_engagement_time,
      title: t.timeline_engagement_title,
      desc: t.timeline_engagement_desc,
      Illustration: RingsExchangeIllustration,
    },
    {
      time: t.timeline_welcome_time,
      title: t.timeline_welcome_title,
      desc: t.timeline_welcome_desc,
      Illustration: CameraIllustration,
    },
    {
      time: t.timeline_celebration_time,
      title: t.timeline_celebration_title,
      desc: t.timeline_celebration_desc,
      Illustration: CelebrationIllustration,
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "80px 20px",
        background: `linear-gradient(180deg, ${COLORS.peachLight} 0%, ${COLORS.cream} 100%)`,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <BotanicalBorder position="top" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: COLORS.gold,
          textTransform: "uppercase",
          marginTop: 30,
          marginBottom: 8,
        }}
      >
        {t.timeline_label}
      </motion.p>
      <Divider className="mb-4" />
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)",
          fontStyle: "italic",
          color: COLORS.teal,
          marginBottom: 56,
        }}
      >
        {t.timeline_subtitle}
      </motion.h2>

      {/* Steps */}
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          position: "relative",
        }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 18px",
              position: "relative",
            }}
          >
            {/* Dotted connector (only between cards on wide screens) */}
            {i < steps.length - 1 && (
              <svg
                aria-hidden
                style={{
                  position: "absolute",
                  top: 52,
                  right: -22,
                  width: 44,
                  height: 24,
                  display: "block",
                  pointerEvents: "none",
                }}
              >
                <path
                  d="M0 12 Q22 0 38 12"
                  stroke={COLORS.gold}
                  strokeOpacity="0.55"
                  strokeWidth="1.4"
                  strokeDasharray="3 4"
                  fill="none"
                />
                <path d="M34 8 L40 12 L34 16" stroke={COLORS.gold} strokeOpacity="0.7" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}

            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${COLORS.ivory}, ${COLORS.peachLight})`,
                boxShadow: "0 10px 28px rgba(92,68,38,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                border: `1px solid ${COLORS.gold}33`,
              }}
            >
              <s.Illustration />
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 4vw, 2rem)",
                fontWeight: 500,
                color: COLORS.gold,
                letterSpacing: "0.04em",
                marginBottom: 6,
              }}
            >
              {s.time}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                color: COLORS.teal,
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              {s.title}
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: "0.84rem",
                color: COLORS.tealSoft,
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 60 }}>
        <BotanicalBorder position="bottom" />
      </div>
    </section>
  );
}
