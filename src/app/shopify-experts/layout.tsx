import type { Metadata } from "next";
import { SHOPIFY_FAQS } from "./faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/shopify-experts`;

export const metadata: Metadata = {
  title: "Shopify Experts — Development, CRO & Growth | Mohit Sengar",
  description:
    "CTO-led Shopify team for store builds, theme customization, CRO, speed optimization and DTC growth, led by Mohit Sengar. Book a free strategy call.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "Shopify experts",
    "Shopify developer",
    "Shopify expert agency",
    "hire Shopify expert",
    "Shopify CRO optimization",
    "Shopify speed optimization",
    "Shopify theme customization",
    "Shopify store setup",
    "Shopify app development",
    "Shopify Plus experts",
    "top Shopify developers",
    "best Shopify experts",
    "Shopify conversion rate optimization",
    "Shopify performance optimization",
    "DTC Shopify agency",
    "Shopify health supplements store",
    "Shopify fashion store developer",
    "Shopify growth partner",
    "Shopify landing page design",
    "Shopify store audit",
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
    title: "Shopify Experts | Build, Optimize & Scale Your Store",
    description:
      "CTO-led Shopify experts. From store setup to CRO, speed optimization and full DTC growth, we handle everything. Book your free strategy call.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Shopify Experts - Mohit Sengar / Sengar Consultancy",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Experts — CRO & Growth | Mohit Sengar",
    description:
      "CTO-led Shopify experts: store setup, CRO, speed optimization, theme development and DTC growth.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sengar Consultancy — Shopify Experts",
  description:
    "CTO-led Shopify development, CRO optimization, speed optimization, theme customization, and DTC growth services, led by Mohit Sengar.",
  url: PAGE_URL,
  image: `${SITE_URL}/images/hero.jpg`,
  priceRange: "$$-$$$",
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  provider: { "@id": `${SITE_URL}/#org` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Shopify Expert Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shopify Store Audit",
          description:
            "Comprehensive audit of your Shopify store covering speed, CRO, UX, and technical health.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "CRO Sprint",
          description:
            "60-day conversion rate optimization sprint with measurable revenue uplift.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Growth Retainer",
          description:
            "Ongoing Shopify development, optimization, and strategic growth partnership.",
        },
      },
    ],
  },
};

/* Built from the same array the page renders, so schema and visible FAQ match. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SHOPIFY_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function ShopifyExpertsLayout({
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
