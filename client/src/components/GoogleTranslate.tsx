import { useEffect, useRef, useState } from "react";
import { GB, ES, FR, DE, PT } from "country-flag-icons/react/3x2";

declare global { interface Window { googleTranslateElementInit?: () => void; } }
const languages = [
  { label: "English", code: "en", Flag: GB },
  { label: "Español", code: "es", Flag: ES },
  { label: "Français", code: "fr", Flag: FR },
  { label: "Deutsch", code: "de", Flag: DE },
  { label: "Português", code: "pt", Flag: PT },
] as const;
function readLanguage() { const match = document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/); return match?.[1] || "en"; }
function setLanguageCookie(code: string) { const value = `/en/${code}`; document.cookie = `googtrans=${value};path=/;SameSite=Lax`; if (location.hostname.includes(".")) document.cookie = `googtrans=${value};path=/;domain=.${location.hostname};SameSite=Lax`; }
export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCurrent(readLanguage());
    const initialize = () => { const Constructor = (window as any).google?.translate?.TranslateElement; const target = document.getElementById("google_translate_element"); if (Constructor && target && !target.hasChildNodes()) new Constructor({ pageLanguage: "en", includedLanguages: "en,es,fr,de,pt", autoDisplay: false, multilanguagePage: true }, "google_translate_element"); };
    window.googleTranslateElementInit = initialize;
    const existing = document.querySelector<HTMLScriptElement>("script[data-primeassetshare-translate]");
    if (!existing) { const script = document.createElement("script"); script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; script.async = true; script.defer = true; script.dataset.primeassetshareTranslate = "true"; document.body.appendChild(script); } else initialize();
    const close = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("click", close);
    return () => { document.removeEventListener("click", close); };
  }, []);
  const choose = (language: string) => {
    setCurrent(language); setOpen(false); setLanguageCookie(language);
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) { select.value = language; select.dispatchEvent(new Event("change", { bubbles: true })); return; }
    window.setTimeout(() => { const delayed = document.querySelector<HTMLSelectElement>(".goog-te-combo"); if (delayed) { delayed.value = language; delayed.dispatchEvent(new Event("change", { bubbles: true })); } else window.location.reload(); }, 450);
  };
  const ActiveFlag = languages.find((item) => item.code === current)?.Flag ?? GB;
  return <div className="translate-control notranslate" ref={root} translate="no"><button type="button" className="translate-trigger" aria-label="Choose language" aria-expanded={open} onClick={() => setOpen(!open)}><ActiveFlag /><span>{current.toUpperCase()}</span><i>⌄</i></button>{open && <div className="translate-menu">{languages.map(({ label, code, Flag }) => <button type="button" key={code} aria-current={current === code ? "true" : undefined} onClick={() => choose(code)}><Flag /><span>{label}</span></button>)}</div>}<div id="google_translate_element" aria-hidden="true" /></div>;
}
