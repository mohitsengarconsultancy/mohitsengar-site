import type { Metadata } from "next";
import { VIBE_FAQS } from "./faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/vibe-coding`;
const PERSON_REF = { "@id": `${SITE_URL}/#person` };
const ORG_REF = { "@id": `${SITE_URL}/#org` };

export const metadata: Metadata = {
  title: "Vibe Coding Expert — Lovable to Production | Mohit Sengar",
  description:
    "Take your Lovable, Bolt or Base44 prototype to production. Fixed-fee Launch Check, AED 9,500 / $2,500, then hardening and rescue. Free fit call.",
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "vibe coding expert",
    "hire vibe coder",
    "Lovable to production",
    "Lovable app developer",
    "Lovable to WordPress migration",
    "Bolt.new developer",
    "Base44 expert",
    "Replit app production",
    "AI app rescue",
    "AI app security audit",
    "Supabase RLS audit",
    "fractional CTO AI apps",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "website",
    title: "Vibe Coding Expert — Lovable to Production | Mohit Sengar",
    description:
      "CTO-led engineering for AI-built prototypes: a fixed-fee Launch Check, then Rescue to Production and security hardening. Free 30-minute fit call.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Mohit Sengar — Vibe Coding Expert, Lovable to Production",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Expert — Lovable to Production",
    description:
      "CTO-led engineering for AI-built prototypes: Launch Check, Rescue to Production, security hardening. Free fit call.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vibe Coding — Lovable to Production Engineering",
  description:
    "CTO-led engineering for AI-generated prototypes: the fixed-fee Launch Check, Rescue to Production with security hardening, and a fractional CTO retainer afterwards.",
  url: PAGE_URL,
  image: `${SITE_URL}/images/hero.jpg`,
  priceRange: "$$-$$$",
  areaServed: { "@type": "Place", name: "Worldwide" },
  provider: ORG_REF,
  founder: PERSON_REF,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vibe Coding Services",
    itemListElement: [
      {
        "@type": "Offer",
        url: `${SITE_URL}/launch-check`,
        priceSpecification: [
          { "@type": "PriceSpecification", price: 9500, priceCurrency: "AED" },
          { "@type": "PriceSpecification", price: 2500, priceCurrency: "USD" },
          { "@type": "PriceSpecification", price: 2000, priceCurrency: "GBP" },
        ],
        itemOffered: {
          "@type": "Service",
          name: "Launch Check",
          description:
            "5-working-day check of an AI-built MVP (Lovable, Bolt, Cursor, Base44, Replit, v0): security (exposed API keys, Supabase RLS, auth), tests, load, payments and webhooks, with a written keep / fix / rebuild verdict.",
        },
      },
      {
        "@type": "Offer",
        // A "from" price: minPrice only, so it is never shown as an exact price.
        priceSpecification: [
          { "@type": "PriceSpecification", minPrice: 55000, priceCurrency: "AED" },
          { "@type": "PriceSpecification", minPrice: 15000, priceCurrency: "USD" },
        ],
        itemOffered: {
          "@type": "Service",
          name: "Rescue to Production & Security Hardening",
          description:
            "Fixed-scope project, billed by milestone, to make an AI-generated app production-ready: triage, secrets, RLS, auth, payments, integrations, observability and handover, including a migration off the AI builder where needed.",
        },
      },
    ],
  },
};

/* Built from the same array the page renders, so schema and visible FAQ match. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: VIBE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VibeCodingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {children}
    </>
  );
}
