import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { LangProvider, useLang } from "./wedding/wedding-context";
import { LangToggle } from "./wedding/LangToggle";
import { MusicPlayer } from "./wedding/MusicPlayer";
import { MapSection } from "./wedding/MapSection";
import { RSVPSection } from "./wedding/RSVPSection";
import { RingUnlock } from "./wedding/RingUnlock";
import { FamilyIntro } from "./wedding/FamilyIntro";
import { CeremonyTimeline } from "./wedding/CeremonyTimeline";
import { PolaroidGallery } from "./wedding/PolaroidGallery";
import { HashtagSection } from "./wedding/HashtagSection";
import { DressCodePalette } from "./wedding/DressCodePalette";
import {
  useReveal,
  COLORS,
  PNMonogram,
  BotanicalBorder,
  Divider,
  GoldAccentLine,
} from "./wedding/shared";

/* ────────────────────────────────────────────────────────────────
   Hero — watercolor couple illustration with PN monogram + date.
   Drop the real Sailom Sangdad illustration into HERO_IMAGE.
──────────────────────────────────────────────────────────────── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1503516459261-40c66117780a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600";

function FloatingLeaf({
  side,
  delay = 0,
  size = 90,
  top = "20%",
}: {
  side: "left" | "right";
  delay?: number;
  size?: number;
  top?: string;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.85, y: 0 }}
      transition={{ delay, duration: 1.2 }}
      style={{
        position: "absolute",
        [side]: -10,
        top,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <motion.svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 90 110"
        fill="none"
        animate={{ rotate: [0, side === "left" ? 6 : -6, 0] }}
        transition={{ repeat: Infinity, duration: 7 + delay, ease: "easeInOut" }}
        style={{ transform: side === "right" ? "scaleX(-1)" : "none" }}
      >
        <defs>
          <radialGradient id={`hero-leaf-${side}`} cx="0.4" cy="0.4" r="0.7">
            <stop offset="0%" stopColor="#BAC9A2" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#6E8A5C" stopOpacity="0.55"/>
          </radialGradient>
        </defs>
        <path d="M22 6 C8 22, -2 50, 14 90 C32 78, 44 56, 42 30" stroke="#6E8A5C" strokeOpacity="0.5" strokeWidth="1" fill="none"/>
        <ellipse cx="18" cy="22" rx="10" ry="4.5" transform="rotate(40 18 22)" fill={`url(#hero-leaf-${side})`}/>
        <ellipse cx="12" cy="42" rx="11" ry="5" transform="rotate(55 12 42)" fill={`url(#hero-leaf-${side})`}/>
        <ellipse cx="14" cy="64" rx="11" ry="5" transform="rotate(70 14 64)" fill={`url(#hero-leaf-${side})`}/>
        <ellipse cx="22" cy="84" rx="9" ry="4.5" transform="rotate(85 22 84)" fill={`url(#hero-leaf-${side})`}/>
        <ellipse cx="32" cy="32" rx="9" ry="4" transform="rotate(20 32 32)" fill={`url(#hero-leaf-${side})`} opacity="0.85"/>
      </motion.svg>
    </motion.div>
  );
}

function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.25]);
  const springY = useSpring(heroY, { stiffness: 70, damping: 22 });

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: `radial-gradient(circle at 50% 35%, ${COLORS.peachLight} 0%, ${COLORS.cream} 70%, ${COLORS.peach} 100%)`,
      }}
    >
      {/* Parallax illustration */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-8% 0",
          y: springY,
          zIndex: 0,
          opacity: 0.55,
        }}
        aria-hidden
      >
        <img
          src={HERO_IMAGE}
          alt=""
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "saturate(0.75) brightness(1.05) blur(0.5px)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(251,241,228,0.35) 0%, rgba(251,241,228,0.05) 40%, rgba(251,221,196,0.55) 100%)`,
          }}
        />
      </motion.div>

      {/* Floating watercolor leaves */}
      <FloatingLeaf side="left" delay={0.3} size={100} top="14%" />
      <FloatingLeaf side="right" delay={0.5} size={110} top="58%" />
      <FloatingLeaf side="left" delay={0.7} size={70} top="70%" />

      <motion.div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "100px 24px 80px",
          opacity: heroOpacity,
        }}
      >
        {/* PN monogram */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
        >
          <PNMonogram size={130} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: COLORS.gold,
            marginBottom: 12,
          }}
        >
          {t.invitation_pre}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.3rem, 7vw, 4.2rem)",
            fontWeight: 500,
            color: COLORS.teal,
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            marginBottom: 4,
          }}
        >
          Pantika
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: COLORS.gold,
              margin: "0 14px",
              fontWeight: 400,
            }}
          >
            &amp;
          </span>
          Natthakorn
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            color: COLORS.tealSoft,
            fontSize: "1rem",
            marginBottom: 28,
          }}
        >
          Panyee &amp; Ryo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ marginBottom: 28 }}
        >
          <GoldAccentLine width={72} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)",
            color: COLORS.gold,
            letterSpacing: "0.32em",
            fontWeight: 500,
            marginLeft: "0.32em", // visual centring with tracking
          }}
        >
          {t.hero_date}
        </motion.p>
      </motion.div>

      {/* Bottom botanical border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <BotanicalBorder position="bottom" />
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: 22,
            height: 34,
            border: `1.4px solid ${COLORS.gold}88`,
            borderRadius: 12,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 5,
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: 3, height: 6, background: COLORS.gold, borderRadius: 2 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   Venue + Footer kept (cream/teal restyle).
──────────────────────────────────────────────────────────────── */

function VenueSection() {
  const { t } = useLang();
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} style={{ padding: "80px 20px", maxWidth: 1080, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 0,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 18px 60px rgba(92,68,38,0.12)",
          border: `1px solid ${COLORS.gold}33`,
        }}
      >
        <div style={{ position: "relative", minHeight: 360, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1634562984686-5e559a782117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900"
            alt="Venue"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 360 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 50%, rgba(251,241,228,0.55) 100%)" }} />
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              background: COLORS.teal,
              borderRadius: 100,
              padding: "6px 14px",
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                color: COLORS.ivory,
                textTransform: "uppercase",
              }}
            >
              {t.venue_label}
            </span>
          </div>
        </div>
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.ivory}, ${COLORS.peachLight})`,
            padding: "48px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 4, height: 44, background: COLORS.gold, opacity: 0.6, borderRadius: 2, marginBottom: 20 }} />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 600,
              color: COLORS.teal,
              lineHeight: 1.15,
              marginBottom: 4,
            }}
          >
            {t.venue_name_line1}
          </h2>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.8vw, 2.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: COLORS.tealSoft,
              lineHeight: 1.15,
              marginBottom: 22,
            }}
          >
            {t.venue_name_line2}
          </h2>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 300,
              color: COLORS.tealSoft,
              lineHeight: 1.9,
              marginBottom: 28,
            }}
          >
            {t.venue_desc}
          </p>
          <a
            href="#map"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: COLORS.gold,
              textDecoration: "none",
              borderBottom: `1px solid ${COLORS.gold}55`,
              paddingBottom: 4,
              width: "fit-content",
            }}
          >
            {t.directions}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke={COLORS.gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  const { ref, inView } = useReveal();
  return (
    <footer
      ref={ref}
      style={{
        background: `linear-gradient(180deg, ${COLORS.peachLight} 0%, ${COLORS.peach} 100%)`,
        padding: "70px 20px 50px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <BotanicalBorder position="top" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        style={{ maxWidth: 560, margin: "0 auto", paddingTop: 24 }}
      >
        <Divider className="mb-8" />
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            fontStyle: "italic",
            color: COLORS.tealSoft,
            lineHeight: 1.8,
            marginBottom: 12,
          }}
        >
          {t.quote}
        </p>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.66rem",
            letterSpacing: "0.2em",
            color: COLORS.gold,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          {t.quote_author}
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <PNMonogram size={84} />
        </div>
        <div style={{ width: 56, height: 1.5, background: COLORS.gold, opacity: 0.55, borderRadius: 1, margin: "16px auto" }} />
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            color: COLORS.teal,
            textTransform: "uppercase",
            marginBottom: 44,
          }}
        >
          22 · 11 · 2026
        </p>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            color: COLORS.lightBrown,
            textTransform: "uppercase",
          }}
        >
          {t.footer_venue}
        </p>
      </motion.div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────────
   InvitationContent — order of sections
──────────────────────────────────────────────────────────────── */
function InvitationContent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.cream,
        fontFamily: "'Jost', sans-serif",
        color: COLORS.teal,
      }}
    >
      <Hero />
      <FamilyIntro />
      <CeremonyTimeline />
      <PolaroidGallery />
      <HashtagSection />
      <VenueSection />
      <div id="map">
        <MapSection />
      </div>
      <DressCodePalette />
      <RSVPSection />
      <Footer />
    </div>
  );
}

export function WeddingInvitation() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <LangProvider>
      {!unlocked && <RingUnlock onUnlock={() => setUnlocked(true)} />}
      <LangToggle />
      <MusicPlayer />
      <InvitationContent />
    </LangProvider>
  );
}
