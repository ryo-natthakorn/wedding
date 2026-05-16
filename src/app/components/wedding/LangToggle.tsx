import { motion } from "motion/react";
import { useLang, Lang } from "./wedding-context";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        background: "rgba(27,74,92,0.92)",
        backdropFilter: "blur(12px)",
        borderRadius: 100,
        padding: 4,
        gap: 2,
        boxShadow: "0 4px 20px rgba(27,74,92,0.35)",
        border: "1px solid rgba(216,194,142,0.35)",
      }}
    >
      {(["EN", "TH"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            position: "relative",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 16px",
            borderRadius: 100,
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: lang === l ? "#FFF8EE" : "rgba(255,255,255,0.45)",
            transition: "color 0.3s",
            zIndex: 1,
          }}
        >
          {lang === l && (
            <motion.div
              layoutId="lang-pill"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #C7A75A, #8A7030)",
                borderRadius: 100,
                zIndex: -1,
                boxShadow: "0 2px 8px rgba(138,112,48,0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {l}
        </button>
      ))}
    </motion.div>
  );
}
