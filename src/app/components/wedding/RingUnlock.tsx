import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { useLang } from "./wedding-context";
import { COLORS, SapphireRing, BotanicalBorder } from "./shared";

/* Slide-to-open ring unlock — full-screen landing.
   Drag the sapphire ring left→right along the track.
   On unlock: ring dissolves upward with particles, content fades in. */
export function RingUnlock({ onUnlock }: { onUnlock: () => void }) {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxX, setMaxX] = useState(220);
  const [unlocked, setUnlocked] = useState(false);
  const progress = useTransform(x, (v) => (maxX === 0 ? 0 : v / maxX));
  const fillWidth = useTransform(x, (v) => `${Math.min(100, (v / maxX) * 100)}%`);
  const hintOpacity = useTransform(x, [0, maxX * 0.4], [1, 0]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      // Ring handle is 64px wide, track padding 6px on each side
      const w = trackRef.current.offsetWidth - 64 - 12;
      setMaxX(Math.max(120, w));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleDragEnd = () => {
    if (x.get() >= maxX - 8) {
      setUnlocked(true);
      setTimeout(onUnlock, 1200);
    } else {
      // snap back
      const animate = () => {
        const current = x.get();
        if (current > 1) {
          x.set(current * 0.82);
          requestAnimationFrame(animate);
        } else x.set(0);
      };
      requestAnimationFrame(animate);
    }
  };

  return (
    <AnimatePresence>
      {!unlocked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5000,
            background: `radial-gradient(circle at 50% 35%, ${COLORS.peachLight} 0%, ${COLORS.cream} 55%, ${COLORS.peach} 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 24px",
            overflow: "hidden",
          }}
        >
          {/* Soft watercolor wash overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 10% 20%, rgba(143,162,121,0.18) 0%, transparent 45%), radial-gradient(ellipse at 90% 80%, rgba(216,194,142,0.22) 0%, transparent 45%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "absolute", top: 20, left: 0, right: 0 }}>
            <BotanicalBorder position="top" opacity={0.55} />
          </div>
          <div style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
            <BotanicalBorder position="bottom" opacity={0.55} />
          </div>

          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
              color: COLORS.teal,
              letterSpacing: "0.06em",
              marginBottom: 6,
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {t.slide_to_open}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              color: COLORS.gold,
              textTransform: "uppercase",
              marginBottom: 56,
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {t.slide_hint}
          </motion.p>

          {/* Slide track */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            ref={trackRef}
            style={{
              position: "relative",
              width: "min(340px, 88vw)",
              height: 76,
              borderRadius: 100,
              background: "rgba(27,74,92,0.06)",
              border: `1px solid ${COLORS.gold}55`,
              boxShadow: "inset 0 2px 8px rgba(27,74,92,0.08)",
              backdropFilter: "blur(4px)",
              padding: 6,
              zIndex: 2,
            }}
          >
            {/* Filled portion */}
            <motion.div
              style={{
                position: "absolute",
                left: 6,
                top: 6,
                bottom: 6,
                width: fillWidth,
                borderRadius: 100,
                background: `linear-gradient(90deg, ${COLORS.goldPale}, ${COLORS.gold})`,
                opacity: 0.55,
              }}
            />
            {/* Hint text */}
            <motion.span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: COLORS.teal,
                opacity: hintOpacity,
                pointerEvents: "none",
              }}
            >
              → slide →
            </motion.span>

            {/* Draggable ring handle */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: maxX }}
              dragElastic={0}
              dragMomentum={false}
              style={{
                x,
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${COLORS.ivory} 0%, ${COLORS.peachLight} 100%)`,
                boxShadow: "0 6px 24px rgba(138,112,48,0.35), 0 2px 6px rgba(27,74,92,0.18)",
                cursor: "grab",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                touchAction: "none",
              }}
              whileDrag={{ cursor: "grabbing", scale: 1.05 }}
              animate={
                x.get() === 0
                  ? { y: [0, -3, 0], boxShadow: ["0 6px 24px rgba(138,112,48,0.35)", "0 10px 30px rgba(138,112,48,0.45)", "0 6px 24px rgba(138,112,48,0.35)"] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              onDragEnd={handleDragEnd}
            >
              <SapphireRing size={52} />
            </motion.div>
          </motion.div>

          {/* Sparkle particles on unlock */}
          <AnimatePresence>
            {unlocked && (
              <>
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i / 24) * Math.PI * 2;
                  const dist = 80 + Math.random() * 80;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist - 120,
                        scale: 0.3,
                      }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: i % 2 === 0 ? COLORS.goldPale : "#7BB7E6",
                        boxShadow: `0 0 8px ${i % 2 === 0 ? COLORS.gold : "#2F6FAA"}`,
                        zIndex: 3,
                      }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
