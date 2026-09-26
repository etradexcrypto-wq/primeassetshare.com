import { useEffect, useState } from "react";
const words = ["insight.", "intention.", "possibility.", "confidence."];
export default function RotatingHeadline() { const [index, setIndex] = useState(0); useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2600); return () => window.clearInterval(timer); }, []); return <em key={words[index]} className="rotating-headline" aria-live="polite">{words[index]}</em>; }
