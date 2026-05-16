import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "./wedding-context";
import { useReveal, COLORS, BotanicalBorder, Divider } from "./shared";

const PHOTOS = [
  "https://images.unsplash.com/photo-1502389498275-fe50566c4c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1776957389179-b2388f2653ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1768561715378-2de6d0fe4fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1775441522523-317359de673f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1728201294086-9dad53c817c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1673163077413-e0cc7bbf21c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
];

/* Watercolor polaroid camera */
function PolaroidCamera() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <defs>
        <linearGradient id="cam-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE9D5"/>
          <stop offset="100%" stopColor="#E8C4B8"/>
        </linearGradient>
        <linearGradient id="cam-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A88A6B" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#A88A6B" stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      <ellipse cx="90" cy="132" rx="60" ry="4" fill="url(#cam-shadow)"/>
      <rect x="20" y="32" width="140" height="92" rx="10" fill="url(#cam-shell)" stroke="#8A7030" strokeWidth="1.6"/>
      {/* Top strip with viewfinder */}
      <rect x="20" y="32" width="140" height="22" rx="10" fill="#1B4A5C" opacity="0.85"/>
      <rect x="34" y="38" width="14" height="10" rx="1" fill="#FFFBF4" opacity="0.85"/>
      <circle cx="142" cy="43" r="3" fill="#E8C4B8"/>
      <circle cx="148" cy="43" r="2" fill="#8FA279"/>
      {/* Lens */}
      <circle cx="90" cy="84" r="22" fill="#1B4A5C" stroke="#8A7030" strokeWidth="1.6"/>
      <circle cx="90" cy="84" r="15" fill="#2A6473"/>
      <circle cx="85" cy="79" r="5" fill="#7BB7E6" opacity="0.6"/>
      <circle cx="92" cy="86" r="2" fill="#FFFFFF" opacity="0.7"/>
      {/* Slot — photos eject from here */}
      <rect x="50" y="116" width="80" height="3" rx="1" fill="#1B4A5C" opacity="0.6"/>
      {/* Brand mark */}
      <text x="90" y="48" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="9" fill="#FBE9D5" fontStyle="italic">P &amp; N</text>
    </svg>
  );
}

export function PolaroidGallery() {
  const { t } = useLang();
  const { ref, inView } = useReveal("-100px");
  const [ejected, setEjected] = useState<number>(-1);

  const captions = [
    t.gallery_caption_1, t.gallery_caption_2, t.gallery_caption_3,
    t.gallery_caption_4, t.gallery_caption_5, t.gallery_caption_6,
  ];

  // Trigger one-by-one ejection when the section enters view
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const tick = () => {
      i += 1;
      setEjected(i);
      if (i < PHOTOS.length) setTimeout(tick, 380);
    };
    setTimeout(tick, 350);
  }, [inView]);

  // Pre-computed fan-out positions
  const positions = [
    { x: -180, y: 60,  rot: -14 },
    { x: -90,  y: 90,  rot: -6  },
    { x: 0,    y: 110, rot: 2   },
    { x: 90,   y: 90,  rot: 9   },
    { x: 180,  y: 60,  rot: 16  },
    { x: 240,  y: 20,  rot: 24  },
  ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "80px 20px 100px",
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.peachLight} 50%, ${COLORS.cream} 100%)`,
        overflow: "hidden",
      }}
    >
      <BotanicalBorder position="top" />

      <div style={{ textAlign: "center", marginTop: 30, marginBottom: 40 }}>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: COLORS.gold,
          textTransform: "uppercase",
          marginBottom: 8,
        }}>{t.gallery_label}</p>
        <Divider className="mb-4" />
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)",
          fontStyle: "italic",
          color: COLORS.teal,
        }}>{t.gallery_subtitle}</h2>
      </div>

      {/* Desktop / tablet: camera ejects polaroids that fan out */}
      <div
        className="polaroid-stage"
        style={{
          position: "relative",
          height: 520,
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", top: 0 }}>
          <PolaroidCamera />
        </div>

        {PHOTOS.map((src, i) => {
          const isEjected = i < ejected;
          const pos = positions[i] || positions[positions.length - 1];
          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 90, rotate: 0, opacity: 0, scale: 0.4 }}
              animate={
                isEjected
                  ? { x: pos.x, y: 180 + pos.y, rotate: pos.rot, opacity: 1, scale: 1 }
                  : { x: 0, y: 90, rotate: 0, opacity: 0, scale: 0.4 }
              }
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                mass: 0.9,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                marginLeft: -75,
                width: 150,
                background: "#FFFBF4",
                padding: "10px 10px 28px",
                boxShadow: "0 12px 28px rgba(27,74,92,0.18), 0 2px 6px rgba(92,68,38,0.15)",
                borderRadius: 4,
                zIndex: isEjected ? 10 + i : 0,
              }}
            >
              <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 2 }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <p
                style={{
                  fontFamily: "'Caveat', 'Cormorant Garamond', cursive",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: COLORS.teal,
                  textAlign: "center",
                  marginTop: 6,
                  letterSpacing: "0.02em",
                }}
              >
                {captions[i]}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile fallback: vertical stack */}
      <div
        className="polaroid-mobile"
        style={{
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          marginTop: 24,
        }}
      >
        {PHOTOS.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -3 : 3 }}
            animate={inView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 } : {}}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 220,
              background: "#FFFBF4",
              padding: "10px 10px 28px",
              boxShadow: "0 10px 26px rgba(27,74,92,0.18)",
              borderRadius: 4,
            }}
          >
            <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p style={{
              fontFamily: "'Caveat', 'Cormorant Garamond', cursive",
              fontStyle: "italic",
              fontSize: "1rem",
              color: COLORS.teal,
              textAlign: "center",
              marginTop: 6,
            }}>{captions[i]}</p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .polaroid-stage { display: none !important; }
          .polaroid-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
