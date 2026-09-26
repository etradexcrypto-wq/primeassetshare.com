import { ArrowUpRight } from "lucide-react";

const leftRow = [
  ["Market intelligence", "Understand the forces moving your portfolio.", "#103a52", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png"],
  ["Retirement planning", "Turn a future goal into an investable plan.", "#123e35", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png"],
  ["Investor education", "Build confidence with practical, plain-language insight.", "#1b2050", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png"],
  ["Portfolio clarity", "See what you own, why it matters, and what it costs.", "#3f2858", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png"],
  ["Family wealth", "Give the next chapter a stronger foundation.", "#573022", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/jHZqVFWsbcGsMJNH.jpg"],
];
const rightRow = [
  ["Global allocation", "Connect your plan to a wider investment universe.", "#173858", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/sNZtsvwxmDFPbcgg.jpg"],
  ["Simple pricing", "Know what you pay before you commit.", "#4c213b", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/sNZtsvwxmDFPbcgg.jpg"],
  ["Human guidance", "A considered conversation when the decision matters.", "#1b4250", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png"],
  ["Long-term growth", "Let time become an ally in your financial life.", "#302754", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/pHjezRrfKseuAeun.png"],
  ["Purposeful saving", "Small contributions can create meaningful options.", "#4a3525", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png"],
];

function Row({ items, direction }: { items: typeof leftRow; direction: "left" | "right" }) {
  const loop = [...items, ...items];
  return <div className={`prime-motion-row ${direction}`}><div className="prime-motion-track">{loop.map(([title, copy, color, image], index) => <article className="prime-motion-card" style={{ backgroundColor: color }} key={`${title}-${index}`}><img src={image} alt="" loading="lazy" /><div className="prime-motion-card-copy"><small>primeassetshare</small><h3>{title}</h3><p>{copy}</p><a href="/insights">Explore <ArrowUpRight size={14} /></a></div></article>)}</div></div>;
}

export default function PrimeMotionPanels() { return <section className="prime-motion-panels"><div className="container prime-motion-heading"><p className="prime-kicker">Built for the way markets move</p><h2>Insight that keeps<br /><em>moving with you.</em></h2></div><Row items={leftRow} direction="left" /><Row items={rightRow} direction="right" /></section>; }
