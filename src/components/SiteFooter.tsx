import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CALENDLY_URL, CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";

const SERVICES = [
  { label: "Fractional CTO", href: "/fractional-cto" },
  { label: "Launch Check", href: "/launch-check" },
  { label: "Readiness Review", href: "/readiness-review" },
  { label: "QA & Quality Engineering", href: "/qa" },
  { label: "Shopify Experts", href: "/shopify-experts" },
  { label: "Vibe Coding — Lovable to Production", href: "/vibe-coding" },
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Fractional CTO cost guide", href: "/blog/fractional-cto-cost-guide-2026" },
  { label: "Investor Tech Checklist", href: "/investor-tech-checklist" },
  { label: "AI App Production Checklist", href: "/blog/lovable-app-production-ready-checklist" },
  { label: "Resume / CV", href: "/resume" },
];

const COMPANY = [
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#050505] text-white py-14 md:py-16 px-6 border-t border-white/10" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold tracking-tight hover:text-[#8DD9BF] transition-colors">
              Mohit Sengar
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mt-3">
              Dubai-based CTO with 7+ years in the seat. I take AI-built and
              agency-built products to production, make them investor-ready,
              and stay on as your part-time CTO until you hire a full-time one.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-4">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-[#8DD9BF] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {RESOURCES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-[#8DD9BF] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-4">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-[#8DD9BF] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#8DD9BF] hover:text-white transition-colors"
                >
                  Book a call
                </a>
              </li>
              {WHATSAPP_URL && (
                <li>
                  <WhatsAppLink className="text-sm text-white/60 hover:text-[#8DD9BF] transition-colors" />
                </li>
              )}
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-white/60 hover:text-[#8DD9BF] transition-colors break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>{`© ${new Date().getFullYear()} Mohit Sengar — Sengar Consultancy. All rights reserved.`}</span>
          <span>Dubai, UAE · Working globally</span>
        </div>
      </div>
    </footer>
  );
}
