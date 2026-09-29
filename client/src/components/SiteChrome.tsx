import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import GoogleTranslate from "@/components/GoogleTranslate";

const navItems = [
  { label: "Invest", href: "/market", children: [["Markets", "/market"], ["Portfolio choices", "/market"], ["Managed investing", "/approach"]] },
  { label: "Planning", href: "/approach", children: [["Our approach", "/approach"], ["Retirement", "/approach"], ["Family goals", "/approach"]] },
  { label: "Research", href: "/insights", children: [["Latest insights", "/insights"], ["Investor education", "/insights"], ["Market context", "/insights"]] },
  { label: "About", href: "/about", children: [["Our story", "/about"], ["Why primeassetshare", "/about"], ["Contact", "/contact"]] },
] as const;

function PrimeMark() {
  return <span className="prime-mark" aria-hidden="true"><svg viewBox="0 0 38 38"><path d="M8 31V7h11.5c6.5 0 10.5 3.1 10.5 8.4s-4 8.5-10.5 8.5H14" /><path d="M14 24v7" /><circle cx="29" cy="8" r="2.5" /></svg></span>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY;
      setScrolled(next > 28);
      setHidden(next > 170 && next > lastY.current + 5 && !open);
      if (next < lastY.current - 5) setHidden(false);
      lastY.current = next;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);
  useEffect(() => { document.body.classList.toggle("prime-menu-open", open); return () => document.body.classList.remove("prime-menu-open"); }, [open]);
  return <header className={`site-header prime-header ${scrolled ? "is-scrolled" : "is-top"} ${hidden ? "is-hidden" : ""}`}><div className="header-pill">
    <Link href="/" className="brand prime-brand" aria-label="primeassetshare.com home"><PrimeMark /><span><strong>prime</strong><small>assetshare.com</small></span></Link>
    <div className="prime-header-status"><span className="status-dot" /> Secure investing, clearly presented</div>
    <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <div className="prime-nav-group" key={item.href}><Link href={item.href}>{item.label}<ChevronDown size={13} /></Link><div className="prime-nav-dropdown">{item.children.map(([label, href]) => <Link key={label} href={href}><span>{label}</span><ArrowUpRight size={13} /></Link>)}</div></div>)}<Link href="/contact">Contact</Link></nav>
    <div className="header-actions"><GoogleTranslate /><a className="header-login" href="https://app.primeassetshare.com">Log in</a><a className="button prime-button header-cta" href="https://app.primeassetshare.com">Open an account <ArrowUpRight size={15} /></a></div>
    <button className="mobile-menu" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
  </div>{open && <div className="mobile-nav prime-mobile-nav"><div className="prime-mobile-menu-head"><span>Explore primeassetshare</span><GoogleTranslate /></div>{navItems.map((item, index) => <div className="prime-mobile-menu-group" key={item.href}><Link href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}<ArrowUpRight size={17} /></Link><div>{item.children.slice(0,2).map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div></div>)}<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link><div className="prime-mobile-actions"><a href="https://app.primeassetshare.com">Log in</a><a className="button prime-button" href="https://app.primeassetshare.com">Open an account <ArrowUpRight size={15} /></a></div></div>}</header>;
}

export function SiteFooter() {
  return <footer className="site-footer prime-footer"><div className="footer-top"><Link href="/" className="brand footer-brand prime-brand"><PrimeMark /><span><strong>prime</strong><small>assetshare.com</small></span></Link><div className="footer-cta"><p>Put your money<br /><em>to work, thoughtfully.</em></p><a className="button prime-button" href="https://app.primeassetshare.com">Open your account <ArrowUpRight size={16} /></a></div></div><div className="footer-columns"><div><small>Invest</small><Link href="/market">Investment options</Link><Link href="/approach">Retirement planning</Link><Link href="/market">Managed portfolios</Link></div><div><small>Learn</small><Link href="/insights">Market insights</Link><Link href="/insights">Investor education</Link><Link href="/about">Why primeassetshare</Link></div><div><small>Connect</small><a href="mailto:support@primeassetshare.com">Support</a><Link href="/contact">Contact us</Link><div className="footer-socials"><a href="https://x.com" aria-label="X">𝕏</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="https://facebook.com" aria-label="Facebook">f</a></div></div></div><p className="footer-disclaimer">Investing involves risk, including possible loss of principal. Primeassetshare provides educational information and digital tools; it is not a recommendation or substitute for financial, tax, or legal advice.</p><div className="footer-bottom"><span>© 2019 primeassetshare.com</span><a href="mailto:support@primeassetshare.com">support@primeassetshare.com</a><span><a href="#privacy">Privacy</a> · <a href="#cookies">Cookies</a> · <a href="#terms">Terms</a></span></div></footer>;
}

export { ChevronDown };
