import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./wedding-context";

// ─── Replace the src below with your actual audio file path or URL ───
// e.g., import songFile from "../../../assets/pantika-proposal.mp3";
// then use:  src={songFile}
const AUDIO_SRC = "Better Me.mp3"; // <- place your proposal song URL/path here

export function MusicPlayer() {
  const { t } = useLang();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(20).fill(4));
  const animRef = useRef<number>();

  // Animate equalizer bars when playing
  useEffect(() => {
    const animateBars = () => {
      setBars((prev) =>
        prev.map(() => playing ? Math.random() * 28 + 4 : 4)
      );
      animRef.current = requestAnimationFrame(animateBars);
    };
    if (playing) {
      animRef.current = requestAnimationFrame(animateBars);
    } else {
      setBars(Array(20).fill(4));
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [playing]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const onEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC || undefined}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />

      {/* Floating player */}
<motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
 style={{
  position: "fixed",
  bottom: 28,
  zIndex: 1000,
  left: expanded ? 16 : "50%",
  right: expanded ? 16 : "auto",
  transform: expanded ? "none" : "translateX(-50%)",
}}
>
        <motion.div
          layout
          style={{
            background: "#1B2A4A",
            borderRadius: 100,
            boxShadow: "0 8px 40px rgba(27,42,74,0.35), 0 2px 8px rgba(0,0,0,0.2)",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Collapsed: pill */}
          {!expanded && (
            <motion.div
              layout
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px" }}
            >
              {/* Equalizer bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 24, cursor: "pointer" }} onClick={() => setExpanded(true)}>
                {bars.slice(0, 8).map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: h }}
                    transition={{ duration: 0.08, ease: "linear" }}
                    style={{ width: 2.5, background: playing ? "#8A9E7A" : "rgba(255,255,255,0.3)", borderRadius: 2, minHeight: 4 }}
                  />
                ))}
              </div>

              {/* Title */}
              <button
                onClick={() => setExpanded(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.music_note}
              </button>

              {/* Play button */}
              <button
                onClick={togglePlay}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#8A9E7A",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {playing ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="1" y="1" width="3" height="8" rx="1" fill="white"/>
                    <rect x="6" y="1" width="3" height="8" rx="1" fill="white"/>
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 1.5L9 5L2 8.5V1.5Z" fill="white"/>
                  </svg>
                )}
              </button>
            </motion.div>
          )}

          {/* Expanded */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: "20px 24px 16px" }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 3 }}>
                      {t.music_label}
                    </p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontStyle: "italic", color: "#FFF8EE", lineHeight: 1.2 }}>
                      {t.music_title}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpanded(false)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", lineHeight: 1, padding: 4 }}
                  >
                    ×
                  </button>
                </div>

                {/* Waveform equalizer */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 40, marginBottom: 16, justifyContent: "center" }}>
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: h }}
                      transition={{ duration: 0.08, ease: "linear" }}
                      style={{
                        width: "calc((100% - 40px) / 20)",
                        background: playing
                          ? `rgba(138, 158, 122, ${0.4 + (i / 20) * 0.6})`
                          : "rgba(255,255,255,0.15)",
                        borderRadius: 3,
                        minHeight: 4,
                        maxWidth: 12,
                      }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div
                  onClick={seek}
                  style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2, cursor: "pointer", marginBottom: 8, position: "relative" }}
                >
                  <div style={{ height: "100%", width: `${progress}%`, background: "#8A9E7A", borderRadius: 2 }} />
                </div>

                {/* Time */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>
                    {formatTime(currentTime)}
                  </span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>
                    {duration ? formatTime(duration) : "--:--"}
                  </span>
                </div>

                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
                  {/* Rewind */}
                  <button
                    onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10; }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3V1L5 4l4 3V5a5 5 0 1 1-5 5H2a7 7 0 1 0 7-7z" fill="currentColor"/>
                    </svg>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #8A9E7A, #6A8060)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(138,158,122,0.4)",
                    }}
                  >
                    {playing ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="1" width="4" height="12" rx="1.5" fill="white"/>
                        <rect x="8" y="1" width="4" height="12" rx="1.5" fill="white"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 1.5L13 7L3 12.5V1.5Z" fill="white"/>
                      </svg>
                    )}
                  </button>

                  {/* Forward */}
                  <button
                    onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10; }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3V1l4 3-4 3V5a5 5 0 1 0 5 5h2A7 7 0 1 1 9 3z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

                {!AUDIO_SRC && (
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 14, letterSpacing: "0.05em" }}>
                    ♪ Add your audio file to AUDIO_SRC in MusicPlayer.tsx
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
