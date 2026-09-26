import { ArrowRight, BarChart3, Check, ChevronRight, CircleDollarSign, Clock3, LineChart, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import AnimatedCounter from "@/components/AnimatedCounter";
import CertificateCards from "@/components/CertificateCards";
import PlanSection from "@/components/PlanSection";
import TrustSection from "@/components/TrustSection";
import HomeCollage from "@/components/HomeCollage";
import LiveMarketLines from "@/components/LiveMarketLines";
import ImageRails from "@/components/ImageRails";
import RotatingHeadline from "@/components/RotatingHeadline";
import TradingViewMarket from "@/components/TradingViewMarket";
import MarketTicker from "@/components/MarketTicker";
import PrimeMotionPanels from "@/components/PrimeMotionPanels";
import FeaturedStories from "@/components/FeaturedStories";

const city = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/RRJCkZzVnqgvjMuF.jpg";
const cityVideo = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/cYaZgeFxUroYlLca.mp4";
const marketVisual = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/jHZqVFWsbcGsMJNH.jpg";

const goals = [
  { icon: <WalletCards size={20} />, title: "Build wealth", copy: "Create a diversified portfolio designed around your time horizon and the life you want to fund." },
  { icon: <Clock3 size={20} />, title: "Plan for retirement", copy: "Turn an important future goal into a clear contribution plan with milestones you can follow." },
  { icon: <CircleDollarSign size={20} />, title: "Save for what matters", copy: "Keep near-term savings purposeful while your long-term investments keep moving forward." },
];

const plans = ["Personal investing", "Retirement accounts", "Education savings", "Managed portfolios"];

export default function Home() {
  return <div className="prime-shell"><SiteHeader /><main>
    <section className="prime-hero">
      <div className="prime-hero-media" style={{ backgroundImage: `url(${city})` }} /><video className="prime-hero-video" autoPlay muted loop playsInline preload="metadata" poster={city} aria-hidden="true"><source src={cityVideo} type="video/mp4" /></video><div className="prime-hero-shade" />
      <div className="container prime-hero-inner"><div className="prime-hero-copy"><p className="prime-eyebrow"><span className="status-dot" /> A clearer way to invest</p><h1>Your goals.<br /><RotatingHeadline /></h1><p className="prime-hero-lede">Powerful investing tools, thoughtful guidance, and a plan built around what matters to you.</p><div className="prime-hero-actions"><a className="button prime-button" href="https://app.primeassetshare.com">Start investing <ArrowRight size={16} /></a><Link className="button prime-outline" href="/approach">See how it works <ChevronRight size={16} /></Link></div><div className="prime-trust-line"><ShieldCheck size={16} /><span>Built for long-term investors</span><span>•</span><span>Simple pricing</span></div></div><TradingViewMarket /></div>
    </section>
    <MarketTicker />
    <FeaturedStories />
    <PrimeMotionPanels />
    <section className="prime-proof"><div className="container prime-proof-grid"><div><strong><AnimatedCounter value={40} suffix="+" /></strong><span>years of market perspective</span></div><div><strong><AnimatedCounter value={98.4} suffix="%" decimals={1} /></strong><span>portfolio visibility</span></div><div><strong>24/7</strong><span>secure account access</span></div><div><strong>1:1</strong><span>human support when needed</span></div></div></section>
    <section className="prime-intro section-pad"><div className="container prime-two-col"><div><p className="prime-kicker">A stronger starting point</p><h2>Investing should feel<br /><em>clear, not complicated.</em></h2></div><div className="prime-intro-copy"><div className="intro-explainer-image"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/LMIkgRVKrfrwDWjI.png" alt="People discussing a financial plan" /></div><p>Whether you are opening your first account or refining a long-term strategy, primeassetshare brings the essential pieces together: straightforward choices, transparent information, and the flexibility to change as your life changes.</p><Link className="prime-text-link" href="/approach">Explore our approach <ArrowRight size={16} /></Link></div></div></section>
    <section className="prime-goals section-pad"><div className="container"><div className="prime-section-head"><div><p className="prime-kicker">Start with a goal</p><h2>Make a plan for<br /><em>what comes next.</em></h2></div><p>Choose a direction. We will help you understand the options and take the next step with confidence.</p></div><div className="prime-goal-grid">{goals.map((goal) => <article className="prime-goal-card" key={goal.title}>{goal.icon}<h3>{goal.title}</h3><p>{goal.copy}</p><Link className="prime-text-link" href="/approach">Learn more <ArrowRight size={15} /></Link></article>)}</div></div></section>
    <section className="prime-options section-pad"><div className="container"><div className="prime-options-layout"><div className="prime-options-copy"><p className="prime-kicker">Investment choices</p><h2>Tools that keep<br /><em>you moving.</em></h2><p>Build your own portfolio, use a guided strategy, or combine both. Your plan should fit your level of experience, not the other way around.</p><Link className="button prime-button" href="/market">Explore investments <ArrowRight size={16} /></Link></div><div className="prime-options-list">{plans.map((plan, index) => <Link href="/market" className="prime-option" key={plan}><span>0{index + 1}</span><strong>{plan}</strong><ArrowRight size={18} /></Link>)}</div></div></div></section>
    <section className="prime-research section-pad"><div className="container prime-research-grid"><div className="prime-research-image" style={{ backgroundImage: `url(${marketVisual})` }}><div className="research-image-label"><LineChart size={17} /><span>Market intelligence</span></div></div><div className="prime-research-copy"><p className="prime-kicker">Stay informed</p><h2>Context for<br /><em>every decision.</em></h2><p>Markets move. Our research helps you understand why, what it means, and which signals deserve your attention.</p><div className="prime-research-list"><div><BarChart3 size={18} /><span><strong>Market insights</strong> Perspectives without the noise.</span></div><div><Sparkles size={18} /><span><strong>Investor education</strong> Practical ideas for every level.</span></div></div><Link className="prime-text-link" href="/insights">Visit the research room <ArrowRight size={16} /></Link></div></div></section>
    <LiveMarketLines />
    <ImageRails />
    <div className="prime-additions"><PlanSection /><HomeCollage /><TrustSection /></div>
    <CertificateCards />
    <section className="prime-cta section-pad"><div className="container prime-cta-inner"><p className="prime-kicker">Your next move</p><h2>Make it a<br /><em>prime one.</em></h2><p>Open an account in minutes and start building a more intentional financial future.</p><a className="button prime-button" href="https://app.primeassetshare.com">Open an account <ArrowRight size={16} /></a></div></section>
  </main><SiteFooter /></div>;
}
