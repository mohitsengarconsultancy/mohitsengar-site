import Link from "next/link";

const SERVICES = [
  { label: "Fractional CTO", href: "/fractional-cto" },
  { label: "QA & Quality Engineering", href: "/qa" },
  { label: "Shopify Experts", href: "/shopify-experts" },
  { label: "Vibe Coding — Lovable to Production", href: "/vibe-coding" },
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "AI App Production Checklist", href: "/blog/lovable-app-production-ready-checklist" },
  { label: "Resume / CV", href: "/resume" },
  { label: "AI News", href: "/#news" },
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
              Award-winning fractional CTO. 14+ years turning prototypes into
              production and teams into shipping machines.
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
                <a href="mailto:mohit@sengarconsultancy.org" className="text-sm text-white/60 hover:text-[#8DD9BF] transition-colors break-all">
                  mohit@sengarconsultancy.org
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
