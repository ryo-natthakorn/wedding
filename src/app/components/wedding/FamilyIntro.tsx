import { motion } from "motion/react";
import { useLang } from "./wedding-context";
import { useReveal, COLORS, BotanicalBorder, SapphireRing, GoldAccentLine } from "./shared";

export function FamilyIntro() {
  const { t, lang } = useLang();
  const { ref, inView } = useReveal();

  const slideUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] as any },
    }),
  };

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "80px 20px",
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.peachLight} 100%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: COLORS.ivory,
          borderRadius: 28,
          boxShadow: "0 18px 60px rgba(92,68,38,0.10)",
          padding: "44px 28px 36px",
          position: "relative",
          border: `1px solid ${COLORS.gold}22`,
        }}
      >
        <BotanicalBorder position="top" />

        {/* Parents */}
        <motion.p
          custom={0}
          variants={slideUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.66rem",
            letterSpacing: "0.28em",
            color: COLORS.gold,
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 18,
            marginBottom: 18,
          }}
        >
          {t.family_parents_label}
        </motion.p>

        <motion.div
          custom={1}
          variants={slideUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginBottom: 22,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2.6vw, 1.18rem)",
              color: COLORS.teal,
              textAlign: "center",
              lineHeight: 1.6,
              letterSpacing: "0.02em",
            }}
          >
            {t.family_bride_parents}
          </p>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.gold, opacity: 0.7, fontSize: "1.1rem" }}>
            ·
          </span>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2.6vw, 1.18rem)",
              color: COLORS.teal,
              textAlign: "center",
              lineHeight: 1.6,
              letterSpacing: "0.02em",
            }}
          >
            {t.family_groom_parents}
          </p>
        </motion.div>

        {/* Invitation line */}
        <motion.p
          custom={2}
          variants={slideUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 2.4vw, 1.05rem)",
            color: COLORS.tealSoft,
            textAlign: "center",
            marginBottom: 36,
            lineHeight: 1.7,
          }}
        >
          {t.family_invite_line}
        </motion.p>

        {/* Bride name */}
        <motion.div
          custom={3}
          variants={slideUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.7rem, 5.5vw, 2.6rem)",
              fontWeight: 500,
              color: COLORS.teal,
              lineHeight: 1.25,
              letterSpacing: "0.01em",
              marginBottom: 6,
            }}
          >
            {lang === "TH" ? t.family_bride_th : t.family_bride_en}
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
              color: COLORS.tealSoft,
              opacity: 0.85,
            }}
          >
            {lang === "TH" ? t.family_bride_en : t.family_bride_th}
          </p>
        </motion.div>

        {/* Ring divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ flex: 1, maxWidth: 80, height: 1, background: `${COLORS.gold}55` }} />
          <SapphireRing size={48} />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: COLORS.gold,
              fontSize: "1.05rem",
              letterSpacing: "0.04em",
            }}
          >
            {t.family_and}
          </span>
          <SapphireRing size={48} />
          <div style={{ flex: 1, maxWidth: 80, height: 1, background: `${COLORS.gold}55` }} />
        </motion.div>

        {/* Groom name */}
        <motion.div
          custom={4}
          variants={slideUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: 12 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.7rem, 5.5vw, 2.6rem)",
              fontWeight: 500,
              color: COLORS.teal,
              lineHeight: 1.25,
              letterSpacing: "0.01em",
              marginBottom: 6,
            }}
          >
            {lang === "TH" ? t.family_groom_th : t.family_groom_en}
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
              color: COLORS.tealSoft,
              opacity: 0.85,
            }}
          >
            {lang === "TH" ? t.family_groom_en : t.family_groom_th}
          </p>
        </motion.div>

        <div style={{ margin: "28px 0 18px" }}>
          <GoldAccentLine />
        </div>

        <BotanicalBorder position="bottom" />
      </div>
    </section>
  );
}
