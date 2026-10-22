import type { Metadata } from "next";
import { READINESS_FAQS } from "./faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/readiness-review`;
const OG_IMAGE = `${SITE_URL}/images/hero.jpg`;
const PERSON = { "@id": `${SITE_URL}/#person` };
const AREA_SERVED = [
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Place", name: "Worldwide" },
];

export const metadata: Metadata = {
  title: "Production & Investor Readiness Review | Mohit Sengar",
  description:
    "Readiness Review: 2 weeks, AED 27,500 / $7,500. A CTO reviews architecture, code, security, team and process, in an investor-ready report presented live.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "investor readiness review",
    "production readiness review",
    "technical due diligence",
    "tech due diligence Dubai",
    "buy-side technical due diligence",
    "technology audit for startups",
    "CTO review before fundraising",
    "architecture review",
    "code quality review",
    "startup tech assessment UAE",
    "fractional CTO Dubai",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    title: "Production & Investor Readiness Review: 2 Weeks, Fixed Fee",
    description:
      "Before you raise or scale: an independent CTO's view of your architecture, code, security, team and delivery process, in a report you can forward to investors, presented live.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: OG_IMAGE,
        alt: "Mohit Sengar, Dubai-based fractional CTO, speaking at a technology conference",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Production & Investor Readiness Review | Mohit Sengar",
    description:
      "2 weeks, fixed fee: architecture, code, security, team and process, in an investor-forwardable report presented live.",
    images: [OG_IMAGE],
  },
};

/**
 * One-off fee. A `from` price carries only priceSpecification.minPrice (no
 * top-level price), so rich results never show a starting price as exact.
 */
function offer(url: string, priceCurrency: string, price: number, from = false) {
  if (from) {
    return {
      "@type": "Offer",
      url,
      priceCurrency,
      availability: "https://schema.org/InStock",
      priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency },
    };
  }
  return {
    "@type": "Offer",
    url,
    price,
    priceCurrency,
    availability: "https://schema.org/InStock",
    priceSpecification: { "@type": "PriceSpecification", price, priceCurrency },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Production & Investor Readiness Review",
      serviceType: "Technology readiness review",
      description:
        "A 2-week independent review of a startup's technology: architecture and scalability, code quality and testing, security and data protection, infrastructure and cloud cost, team and delivery process, technical debt and roadmap, IP and account ownership, and AI/LLM usage. Delivered as an investor-forwardable written report, presented live.",
      url: PAGE_URL,
      image: OG_IMAGE,
      provider: PERSON,
      areaServed: AREA_SERVED,
      offers: [offer(PAGE_URL, "AED", 27500), offer(PAGE_URL, "USD", 7500)],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#buy-side-due-diligence`,
      name: "Buy-side Technical Due Diligence",
      serviceType: "Technical due diligence",
      description:
        "Fixed-scope technical due diligence for investors (VCs, private equity, family offices and angels) over 1 to 3 weeks, with a written report to the investor on the target company's technology, team and risks.",
      url: `${PAGE_URL}#investors`,
      image: OG_IMAGE,
      provider: PERSON,
      areaServed: AREA_SERVED,
      offers: [
        offer(`${PAGE_URL}#investors`, "AED", 35000, true),
        offer(`${PAGE_URL}#investors`, "USD", 9500, true),
      ],
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: READINESS_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ReadinessReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
