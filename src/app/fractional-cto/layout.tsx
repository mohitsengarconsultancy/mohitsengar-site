import type { Metadata } from "next";
import { FCTO_FAQS } from "./faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/fractional-cto`;
const OG_IMAGE = `${SITE_URL}/images/hero.jpg`;

export const metadata: Metadata = {
  title: "Fractional CTO Services for Startups | Mohit Sengar",
  description:
    "Hire an award-winning fractional CTO for 10-20 hours a week: architecture, hiring, delivery and investor-ready tech leadership at 70-80% less than a full-time CTO. Start in 1-2 weeks.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "fractional CTO",
    "fractional CTO services",
    "hire a fractional CTO",
    "part-time CTO",
    "interim CTO",
    "fractional CTO Dubai",
    "fractional CTO for startups",
    "outsourced CTO",
    "virtual CTO",
    "CTO as a service",
    "fractional CTO cost",
    "technical co-founder alternative",
    "startup technology leadership",
    "technical due diligence",
    "engineering team building",
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
    title: "Fractional CTO Services — Senior Tech Leadership Without the $400K Salary",
    description:
      "Architecture, hiring, delivery and investor-ready tech leadership from an award-winning CTO, 10-20 hours a week. Start in 1-2 weeks.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: OG_IMAGE,
        alt: "Mohit Sengar, fractional CTO, speaking at a technology conference",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional CTO Services | Mohit Sengar",
    description:
      "Senior tech leadership 10-20 hours a week: architecture, hiring and delivery at 70-80% less than a full-time CTO.",
    images: [OG_IMAGE],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mohit Sengar — Fractional CTO Services",
  description:
    "Part-time CTO leadership for startups and scale-ups: technology strategy, architecture, engineering hiring, delivery oversight, technical due diligence and investor-ready technical planning.",
  url: PAGE_URL,
  image: OG_IMAGE,
  priceRange: "$$$",
  areaServed: { "@type": "Place", name: "Worldwide" },
  provider: { "@id": `${SITE_URL}/#person` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fractional CTO Engagements",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fractional CTO Retainer",
          description:
            "Ongoing strategic technology leadership for 10-20 hours a week: architecture, hiring, vendor decisions and delivery oversight.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical Advisory",
          description:
            "A lighter cadence of strategy calls and async review for teams whose systems are stable.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical Due Diligence",
          description:
            "Pre-investment or pre-acquisition review of codebase, team and infrastructure, delivered as a written risk report.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Architecture & Scaling Review",
          description:
            "One-time audit of your current system with a scaling roadmap for the next growth stage.",
        },
      },
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
