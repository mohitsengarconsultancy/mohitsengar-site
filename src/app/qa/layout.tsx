import type { Metadata } from "next";
import { QA_FAQS } from "./faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/qa`;

export const metadata: Metadata = {
  title: "QA & Quality Engineering Services | Mohit Sengar",
  description:
    "QA and quality engineering, the delivery bench behind my CTO work: test automation, AI/LLM testing, performance, CI/CD security, observability. Free fit call.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "QA services",
    "quality engineering",
    "software testing services",
    "test automation",
    "hire QA engineer",
    "AI testing",
    "LLM testing",
    "performance testing",
    "security testing",
    "DevSecOps",
    "CI/CD testing",
    "shift-left testing",
    "shift-right testing",
    "observability-driven testing",
    "flaky test fix",
    "regression testing optimization",
    "contract testing",
    "service virtualization",
    "test data management",
    "QA audit",
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
    title: "QA & Quality Engineering — Better Testing, Stronger Software",
    description:
      "Modern QA that ships software that doesn't break — test automation, AI/LLM testing, performance, security in CI/CD, and observability. Solving the top 10 testing problems of 2026.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/qa/testing-problems-2026.jpg`,
        width: 1024,
        height: 1536,
        alt: "Top 10 Software Testing Problems & Solutions 2026 — Sengar Consultancy",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QA & Quality Engineering | Mohit Sengar",
    description:
      "Test automation, AI/LLM testing, performance, security-in-CI, and observability. Solve the top 10 testing problems of 2026. Book a free fit call.",
    images: [`${SITE_URL}/images/qa/testing-problems-2026.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sengar Consultancy — QA & Quality Engineering",
  description:
    "CTO-led QA and quality engineering, the delivery bench behind Mohit Sengar's fractional CTO practice: test automation, AI/LLM system testing, performance and load testing, continuous security (DevSecOps), microservice contract testing, and observability-driven testing.",
  url: PAGE_URL,
  image: `${SITE_URL}/images/qa/testing-problems-2026.jpg`,
  priceRange: "$$-$$$",
  areaServed: { "@type": "Place", name: "Worldwide" },
  provider: { "@id": `${SITE_URL}/#org` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ways to buy quality engineering",
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
            "5 working days on an AI-built MVP: tests, load, security (exposed keys, Supabase RLS, auth), payments and webhooks, with a written keep / fix / rebuild verdict.",
        },
      },
      {
        "@type": "Offer",
        url: `${SITE_URL}/readiness-review`,
        priceSpecification: [
          { "@type": "PriceSpecification", price: 27500, priceCurrency: "AED" },
          { "@type": "PriceSpecification", price: 7500, priceCurrency: "USD" },
        ],
        itemOffered: {
          "@type": "Service",
          name: "Production & Investor Readiness Review",
          description:
            "2 weeks: architecture, code quality and testing, security, team and delivery process, in an investor-forwardable report presented live.",
        },
      },
      {
        "@type": "Offer",
        url: `${SITE_URL}/fractional-cto`,
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            price: 45000,
            priceCurrency: "AED",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
          {
            "@type": "UnitPriceSpecification",
            price: 14000,
            priceCurrency: "USD",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        ],
        itemOffered: {
          "@type": "Service",
          name: "Fractional CTO",
          description:
            "2 days a week as a part-time CTO, with ongoing quality engineering (automation, CI/CD quality gates, security and performance) as part of the role.",
        },
      },
    ],
  },
};

/* Built from the same array the page renders, so schema and visible FAQ match. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QA_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function QaLayout({
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
