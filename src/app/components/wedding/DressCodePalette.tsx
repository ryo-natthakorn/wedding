import { motion } from "motion/react";
import { useLang } from "./wedding-context";
import { useReveal, Divider, COLORS, BotanicalBorder } from "./shared";

/* 3 × 3 arch palette matching the physical card */
const ROWS: { label: keyof Pick<typeof labels, "row1">; colors: string[] }[] = [] as any;

const labels = {
  row1: "Brown",
  row2: "Gold",
  row3: "Green",
};

const PALETTE: { label: string; colors: string[] }[] = [
  { label: "row1", colors: ["#4A2F1A", "#7A4F2A", "#B07A4A"] }, // dark brown, mid brown, light brown
  { label: "row2", colors: ["#9A7022", "#C9A040", "#E5CB7A"] }, // mustard, golden yellow, pale yellow
  { label: "row3", colors: ["#3D5236", "#6E8A5C", "#A8B98C"] }, // dark green, mid green, sage green
];

function Arch({ color }: { color: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      style={{
        width: "100%",
        aspectRatio: "1 / 1.25",
        background: color,
        borderTopLeftRadius: "100% 60%",
        borderTopRightRadius: "100% 60%",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        boxShadow: "inset 0 -6px 14px rgba(0,0,0,0.12), 0 6px 18px rgba(92,68,38,0.16)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    />
  );
}

export function DressCodePalette() {
  const { t, lang } = useLang();
  const { ref, inView } = useReveal();

  const rowLabel = (key: string) =>
    key === "row1" ? t.dress_palette_row1 : key === "row2" ? t.dress_palette_row2 : t.dress_palette_row3;

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "80px 20px",
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.peachLight} 100%)`,
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
          marginTop: 26,
          marginBottom: 8,
        }}
      >
        {t.dress_label}
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
          marginBottom: 16,
        }}
      >
        {t.dress_title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "0.92rem",
          color: COLORS.tealSoft,
          maxWidth: 540,
          margin: "0 auto 48px",
          lineHeight: 1.85,
        }}
      >
        {t.dress_desc}
      </motion.p>

      {/* 3x3 arch grid */}
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "0 12px",
        }}
      >
        {PALETTE.map((row, ri) => (
          <div key={ri} style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: COLORS.gold,
                minWidth: 60,
                textAlign: "right",
                letterSpacing: "0.04em",
              }}
            >
              {rowLabel(row.label)}
            </p>
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {row.colors.map((c, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + ri * 0.15 + ci * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Arch color={c} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.66rem",
          letterSpacing: "0.2em",
          color: COLORS.lightBrown,
          textTransform: "uppercase",
          marginTop: 36,
        }}
      >
        {lang === "TH" ? "เลือกได้ตามชอบ" : "Choose your favourite"}
      </p>

      <div style={{ marginTop: 48 }}>
        <BotanicalBorder position="bottom" />
      </div>
    </section>
  );
}
