import Link from "next/link";

const SITE_URL = "https://www.mohitsengar.org";

export interface Crumb {
  label: string;
  href: string;
}

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. Pass crumbs including the current page (last item unlinked). */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-20 pb-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/35">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span aria-current="page" className="text-white/60">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-[#8DD9BF] transition-colors">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </nav>
  );
}
