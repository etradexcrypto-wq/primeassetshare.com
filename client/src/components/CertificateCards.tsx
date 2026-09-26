import { ArrowDownToLine, BadgeCheck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";

type CertificateTemplate = {
  id: string;
  label: string;
  title: string;
  description: string;
  background: string;
  orientation: "portrait" | "landscape";
  accent: [number, number, number];
  notice?: string;
};

const templates: CertificateTemplate[] = [
  { id: "institutional", label: "Institutional award", title: "Investment learning recognition", description: "Recognizing a commitment to thoughtful, long-term financial learning.", background: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/QdrcdOjOTJkhfxql.png", orientation: "portrait", accent: [24, 74, 138] },
  { id: "global", label: "Global achievement", title: "Global market perspective", description: "Recognizing engagement with diversified markets and responsible investment education.", background: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/acdeenjoYULcdszO.png", orientation: "landscape", accent: [133, 35, 55] },
  { id: "elite", label: "Investor education", title: "Portfolio foundations", description: "Recognizing completion of primeassetshare portfolio-foundations learning materials.", background: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/xAZubwqvyBxQmtVk.png", orientation: "landscape", accent: [41, 98, 255] },
  { id: "registration", label: "Platform recognition", title: "Platform recognition certificate", description: "A branded record of the primeassetshare digital platform experience.", background: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663940838304/FhfBWtqbSPjUAPND.png", orientation: "portrait", accent: [25, 75, 128], notice: "Commemorative platform credential — not a government registration, incorporation record, licence, or regulatory approval." },
];

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export default function CertificateCards() {
  const [busy, setBusy] = useState<string | null>(null);
  const createPdf = async (template: CertificateTemplate) => {
    setBusy(template.id);
    try {
      const image = await loadImage(template.background);
      const pdf = new jsPDF({ orientation: template.orientation, unit: "mm", format: "a4" });
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(image, "PNG", 0, 0, width, height);
      pdf.setTextColor(17, 31, 50);
      pdf.setFont("times", "bold");
      pdf.setFontSize(template.orientation === "portrait" ? 18 : 17);
      pdf.text("PRIMEASSETSHARE.COM", width / 2, height * .20, { align: "center" });
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.setTextColor(92, 104, 118);
      pdf.text("DIGITAL PLATFORM RECOGNITION", width / 2, height * .36, { align: "center", charSpace: 1.1 });
      pdf.setFont("times", "bolditalic");
      pdf.setFontSize(template.orientation === "portrait" ? 21 : 19);
      pdf.setTextColor(...template.accent);
      pdf.text(template.title, width / 2, height * .46, { align: "center", maxWidth: width * .72 });
      pdf.setDrawColor(...template.accent);
      pdf.setLineWidth(.35);
      pdf.line(width * .28, height * .50, width * .72, height * .50);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(45, 54, 65);
      pdf.setFontSize(8.5);
      pdf.text(template.description, width / 2, height * .57, { align: "center", maxWidth: width * .62 });
      pdf.setFont("times", "bold");
      pdf.setFontSize(template.orientation === "portrait" ? 15 : 14);
      pdf.text("Issued by primeassetshare.com", width / 2, height * .66, { align: "center" });
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(94, 103, 113);
      pdf.text(`Document PAS-${new Date().getFullYear()} · ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`, width / 2, height * .80, { align: "center" });
      if (template.notice) {
        pdf.setTextColor(112, 64, 64);
        pdf.setFontSize(6.5);
        pdf.text(template.notice, width / 2, height * .87, { align: "center", maxWidth: width * .72 });
      }
      pdf.save(`primeassetshare-${template.id}-certificate.pdf`);
    } finally {
      setBusy(null);
    }
  };

  return <section className="certificate-section certificate-studio section-pad"><div className="container">
    <div className="section-kicker"><span>07 / Recognition</span><span className="line" /></div>
    <div className="certificate-heading"><div><p className="prime-kicker"><BadgeCheck size={15} /> primeassetshare certificates</p><h2>Recognition<br /><em>with purpose.</em></h2></div><p>Four original primeassetshare designs, including a formal platform-recognition edition inspired by classic certificate composition. Every design downloads as a site-branded PDF with no personal placeholder name.</p></div>
    <div className="certificate-grid">{templates.map((template) => <article className={`certificate-card certificate-${template.id}`} key={template.id}>
      <div className="certificate-preview"><img src={template.background} alt={`${template.label} certificate design`} loading="lazy" /><div className="certificate-preview-copy"><small>primeassetshare.com</small><span>Digital platform recognition</span><strong>{template.title}</strong><i>Issued by primeassetshare.com</i><b>{new Date().getFullYear()}</b></div></div>
      <div className="certificate-info"><small><ShieldCheck size={13} /> {template.label}</small><h3>{template.title}</h3><p>{template.notice ?? "Primeassetshare-branded recognition · PDF format"}</p><button className="button button-dark" type="button" onClick={() => createPdf(template)} disabled={busy !== null}>{busy === template.id ? "Preparing PDF…" : "Download certificate"} <ArrowDownToLine size={15} /></button></div>
    </article>)}</div>
  </div></section>;
}
