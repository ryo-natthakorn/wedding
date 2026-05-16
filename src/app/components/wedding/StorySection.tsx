import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./wedding-context";
import { useReveal, Divider, COLORS } from "./shared";

const STORY_IMAGES = [
  "https://images.unsplash.com/photo-1502389498275-fe50566c4c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBwb3J0cmFpdCUyMHN1bnNldCUyMGdvbGRlbiUyMGhvdXIlMjBsb3ZlfGVufDF8fHx8MTc3ODQ2OTIxMHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1776957389179-b2388f2653ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwaGFuZCUyMGluJTIwaGFuZCUyMG5hdHVyZSUyMHBhdGh8ZW58MXx8fHwxNzc4NDY5MjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1768561715378-2de6d0fe4fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBwcm9wb3NhbCUyMHJpbmclMjByb21hbnRpYyUyMG91dGRvb3J8ZW58MXx8fHwxNzc4NDY5MjExfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1775441522523-317359de673f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMGhhcHB5JTIwcGljbmljJTIwb3V0ZG9vcnxlbnwxfHx8fDE3Nzg0NjkyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

export function StorySection() {
  const { t } = useLang();
  const { ref, inView } = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      ref={ref}
      style={{
        padding: "96px 24px",
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #EDE4D5 100%)`,
        textAlign: "center",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.28em", color: COLORS.lightBrown, textTransform: "uppercase", marginBottom: 12 }}>
          {t.story_label}
        </p>
        <Divider className="mb-6" />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, fontStyle: "italic", color: COLORS.warmBrown, marginBottom: 48 }}>
          {t.story_subtitle}
        </h2>
      </motion.div>

      {/* Timeline navigation tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48, flexWrap: "wrap" }}
      >
        {t.story_items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              background: activeIdx === i ? COLORS.navy : "transparent",
              border: `1px solid ${activeIdx === i ? COLORS.navy : "rgba(138,107,75,0.3)"}`,
              borderRadius: 100,
              padding: "8px 20px",
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              color: activeIdx === i ? "#FFF8EE" : COLORS.lightBrown,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {item.year}
          </button>
        ))}
      </motion.div>

      {/* Active story card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 860,
            margin: "0 auto 64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 0,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(90,62,40,0.12)",
          }}
        >
          {/* Image */}
          <div
            style={{ position: "relative", minHeight: 320, cursor: "pointer" }}
            onClick={() => setLightbox(activeIdx)}
          >
            <img
              src={STORY_IMAGES[activeIdx]}
              alt={t.story_items[activeIdx].title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: 320 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,42,74,0.08)", transition: "background 0.3s" }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(27,42,74,0.7)", borderRadius: 100, padding: "6px 14px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: "#FFF8EE" }}>
                {t.story_items[activeIdx].year}
              </span>
            </div>
            {/* Expand icon */}
            <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.8)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h4M2 2v4M12 2h-4M12 2v4M2 12h4M2 12v-4M12 12h-4M12 12v-4" stroke="#5A3E28" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Text */}
          <div style={{ background: "#F2EBE0", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "left" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", color: COLORS.sage, textTransform: "uppercase", marginBottom: 16 }}>
              {t.story_items[activeIdx].year}
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 500, color: COLORS.warmBrown, marginBottom: 20, lineHeight: 1.2 }}>
              {t.story_items[activeIdx].title}
            </h3>
            <div style={{ width: 36, height: 1, background: COLORS.navy, marginBottom: 20, opacity: 0.5 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", color: COLORS.midBrown, lineHeight: 1.8 }}>
              {t.story_items[activeIdx].caption}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 700, margin: "0 auto" }}
      >
        {STORY_IMAGES.map((src, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setActiveIdx(i); setLightbox(i); }}
            style={{
              width: 120,
              height: 90,
              border: i === activeIdx ? `2px solid ${COLORS.navy}` : "2px solid transparent",
              borderRadius: 12,
              overflow: "hidden",
              cursor: "pointer",
              background: "none",
              padding: 0,
              boxShadow: i === activeIdx ? `0 4px 16px rgba(27,42,74,0.25)` : "0 2px 8px rgba(90,62,40,0.1)",
              transition: "box-shadow 0.3s, border-color 0.3s",
            }}
          >
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(10,15,25,0.92)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 780, width: "100%", borderRadius: 16, overflow: "hidden", position: "relative" }}
            >
              <img
                src={STORY_IMAGES[lightbox]}
                alt=""
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "80vh", objectFit: "contain" }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(10,15,25,0.85) 0%, transparent 100%)", padding: "32px 28px 24px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontStyle: "italic", color: "#FFF8EE" }}>
                  {t.story_items[lightbox].title} · {t.story_items[lightbox].year}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
              >
                ×
              </button>
              {/* Prev/Next */}
              {lightbox > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); setActiveIdx(lightbox - 1); }}
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
                >
                  ‹
                </button>
              )}
              {lightbox < STORY_IMAGES.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); setActiveIdx(lightbox + 1); }}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
                >
                  ›
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
