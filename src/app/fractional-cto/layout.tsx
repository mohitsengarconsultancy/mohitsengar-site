import type { Metadata } from "next";
import { FCTO_FAQS } from "./faqs";
import { CONTACT_EMAIL } from "@/lib/contact";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/fractional-cto`;
const OG_IMAGE = `${SITE_URL}/images/hero.jpg`;

export const metadata: Metadata = {
  title: "Fractional CTO in Dubai & the UAE | Mohit Sengar",
  description:
    "Dubai-based fractional CTO, 2-3 days a week. I make AI-built and agency-built products production-ready and investor-ready. Start with a 5-day Launch Check.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "fractional CTO",
    "fractional CTO Dubai",
    "fractional CTO UAE",
    "fractional CTO Abu Dhabi",
    "fractional CTO services",
    "hire a fractional CTO",
    "part-time CTO",
    "interim CTO",
    "fractional CTO for startups",
    "outsourced CTO",
    "virtual CTO",
    "CTO as a service",
    "fractional CTO cost",
    "fractional CTO cost AED",
    "AI-built MVP audit",
    "production readiness review",
    "investor readiness review",
    "technical due diligence",
    "technical co-founder alternative",
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
    title: "Fractional CTO in Dubai & the UAE: Production-Ready, Investor-Ready",
    description:
      "I take AI-built and agency-built products to production and make them investor-ready, then stay on as your part-time CTO 2-3 days a week. In person in Dubai and Abu Dhabi; remote for the US, UK and Europe.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: OG_IMAGE,
        alt: "Mohit Sengar, fractional CTO in Dubai, speaking at a technology conference",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional CTO in Dubai & the UAE | Mohit Sengar",
    description:
      "Production-ready, investor-ready tech leadership 2-3 days a week from a Dubai-based CTO. Start with a 5-day Launch Check.",
    images: [OG_IMAGE],
  },
};

/* ─── Offer catalog (approved price ladder: AED for UAE/GCC clients, USD for remote clients) ─── */

const PERSON = { "@id": `${SITE_URL}/#person` };
const AREA_SERVED = [
  { "@type": "City", name: "Dubai" },
  { "@type": "City", name: "Abu Dhabi" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Place", name: "Worldwide" },
];
const PER_MONTH = { "@type": "QuantitativeValue", value: 1, unitCode: "MON", unitText: "month" };

/** One-off fee. A `from` price is expressed as minPrice only, so it is never read as exact. */
function fee(priceCurrency: string, price: number, from = false) {
  return from
    ? { "@type": "PriceSpecification", minPrice: price, priceCurrency }
    : { "@type": "PriceSpecification", price, priceCurrency };
}

/** Monthly retainer price. */
function monthly(priceCurrency: string, price: number) {
  return { "@type": "UnitPriceSpecification", price, priceCurrency, referenceQuantity: PER_MONTH };
}

function offer({
  name,
  description,
  url,
  priceSpecification,
}: {
  name: string;
  description: string;
  url?: string;
  /** Omitted for offers priced relative to a retainer (no fixed number). */
  priceSpecification?: object[];
}) {
  return {
    "@type": "Offer",
    name,
    ...(url ? { url } : {}),
    ...(priceSpecification ? { priceSpecification } : {}),
    itemOffered: {
      "@type": "Service",
      name,
      description,
      provider: PERSON,
      areaServed: AREA_SERVED,
    },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mohit Sengar — Fractional CTO in Dubai & the UAE",
  description:
    "Part-time CTO leadership for startups and scale-ups, based in Dubai: taking AI-built and agency-built products to production, making them investor-ready, and staying on 2-3 days a week until the company hires a full-time CTO.",
  url: PAGE_URL,
  image: OG_IMAGE,
  email: CONTACT_EMAIL,
  priceRange: "AED 9,500 - AED 75,000/month",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  areaServed: AREA_SERVED,
  founder: PERSON,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fractional CTO Engagements",
    itemListElement: [
      offer({
        name: "Launch Check",
        description:
          "5 working days for AI-built MVPs (Lovable, Bolt, Cursor, Base44, Replit, v0): security (exposed API keys, Supabase RLS, auth), tests, load, payments and webhooks, with a keep / fix / rebuild verdict in a written report.",
        url: `${SITE_URL}/launch-check`,
        priceSpecification: [fee("AED", 9500), fee("USD", 2500), fee("GBP", 2000)],
      }),
      offer({
        name: "Production & Investor Readiness Review",
        description:
          "2 weeks: architecture, code, team, delivery process and risks, delivered as an investor-forwardable written report and presented live.",
        url: `${SITE_URL}/readiness-review`,
        priceSpecification: [fee("AED", 27500), fee("USD", 7500)],
      }),
      offer({
        name: "Buy-side Technical Due Diligence",
        description:
          "1-3 weeks, fixed scope: pre-investment or pre-acquisition review of code, team and infrastructure for investors, delivered as a written risk report.",
        priceSpecification: [fee("AED", 35000, true), fee("USD", 9500, true)],
      }),
      offer({
        name: "Advisory",
        description:
          "Up to about 12 hours a month: a monthly steering session plus async access for architecture, hiring and vendor questions.",
        priceSpecification: [monthly("AED", 18000), monthly("USD", 5000)],
      }),
      offer({
        name: "Fractional CTO",
        description:
          "The CTO role 2 days a week: architecture and release ownership, weekly steering, hiring support, vendor management and the technical narrative for the board and investors.",
        priceSpecification: [monthly("AED", 45000), monthly("USD", 14000)],
      }),
      offer({
        name: "Embedded CTO",
        description: "The CTO role 3 days a week, for a rebuild, a raise or a team that is growing fast.",
        priceSpecification: [
          monthly("AED", 75000),
          {
            "@type": "UnitPriceSpecification",
            minPrice: 22000,
            maxPrice: 28000,
            priceCurrency: "USD",
            referenceQuantity: PER_MONTH,
          },
        ],
      }),
      offer({
        name: "Rescue to Production",
        description: "Fixed-scope project, billed by milestone, to make an existing product production-ready in an agreed number of weeks.",
        priceSpecification: [fee("AED", 55000, true), fee("USD", 15000, true)],
      }),
      offer({
        name: "Hire your full-time CTO",
        description:
          "Exit service: job description, sourcing, interview loop and handover to your permanent CTO. Priced at about one month's retainer.",
      }),
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FCTO_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FractionalCtoLayout({
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
