import { useEffect, useMemo, useState } from "react";

const phases = ["Securing your session", "Connecting market context", "Preparing your experience"];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const phase = useMemo(() => phases[Math.min(phases.length - 1, Math.floor(progress / 34))], [progress]);

  useEffect(() => {
    document.documentElement.classList.add("is-preloading");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 450 : 1900;
    const exitDuration = reduced ? 80 : 620;
    const start = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const ratio = Math.min(1, (time - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - ratio, 3.4)) * 100));
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const exitTimer = window.setTimeout(() => setLeaving(true), duration);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("is-preloading");
    }, duration + exitDuration);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.documentElement.classList.remove("is-preloading");
    };
  }, []);

  if (!visible) return null;
  return <div className={`prime-opening-loader ${leaving ? "is-leaving" : ""}`} role="status" aria-live="polite" aria-label={`Loading primeassetshare, ${progress} percent`}>
    <div className="prime-loader-curtain prime-loader-curtain-left" />
    <div className="prime-loader-curtain prime-loader-curtain-right" />
    <div className="prime-loader-backdrop" />
    <div className="prime-loader-grid" />
    <div className="prime-loader-center">
      <div className="prime-loader-orbit"><span /><i /><b /></div>
      <span className="prime-loader-mark"><svg viewBox="0 0 38 38" aria-hidden="true"><path d="M8 31V7h11.5c6.5 0 10.5 3.1 10.5 8.4s-4 8.5-10.5 8.5H14" /><path d="M14 24v7" /><circle cx="29" cy="8" r="2.5" /></svg></span>
      <div className="prime-loader-word"><strong>prime</strong><span>assetshare.com</span><small key={phase}>{phase}</small></div>
    </div>
    <div className="prime-loader-progress"><span style={{ transform: `scaleX(${progress / 100})` }} /><b>{String(progress).padStart(3, "0")}%</b></div>
  </div>;
}
