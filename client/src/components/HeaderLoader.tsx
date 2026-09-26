import { useEffect, useState } from "react";
export default function HeaderLoader() {
  const [open, setOpen] = useState(false); const [progress, setProgress] = useState(0);
  useEffect(() => { const started = performance.now(); const timer = window.setInterval(() => setProgress(Math.min(100, Math.round(((performance.now() - started) / 1800) * 100))), 30); return () => window.clearInterval(timer); }, []);
  return <div className="header-loader"><button type="button" className="header-loader-toggle" aria-expanded={open} onClick={() => setOpen(!open)}><span className="header-loader-leaf"><svg viewBox="0 0 28 28"><path d="M24 4C13 4 5 8 4 21c7 1 14-2 17-8 2-4 2-7 3-9Z" /><path d="M4 21c5-5 10-8 16-11" /></svg></span><b>{progress}%</b><span className="header-loader-chevron">⌄</span></button>{open && <div className="header-loader-menu"><strong>REVSIMPLEX</strong><span className="header-words"><b>loading</b><span className="header-word-reel"><i>insight</i><i>markets</i><i>clarity</i><i>progress</i><i>insight</i></span></span><div><i style={{ width: `${progress}%` }} /></div></div>}</div>;
}
