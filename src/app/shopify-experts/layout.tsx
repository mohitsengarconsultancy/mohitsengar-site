import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/shopify-experts`;

export const metadata: Metadata = {
  title: "Shopify Experts — Development, CRO & Growth | Mohit Sengar",
  description:
    "Top 1% Shopify team — store builds, CRO, speed, and DTC growth for 40+ brands. $501K+ managed, 100% success rate. Book a free strategy call.",
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
    title: "Top 1% Shopify Experts | Build, Optimize & Scale Your Store",
    description:
      "We are the top 1% Shopify experts trusted by 40+ brands. From store setup to CRO, speed optimization, and full DTC growth — we handle everything. $501K+ in managed client revenue. Book your free strategy call.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Top 1% Shopify Experts - Mohit Sengar / Sengar Consultancy",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Experts — CRO & Growth | Mohit Sengar",
    description:
      "Hire the top 1% Shopify experts. $501K+ managed. 100% success rate. Store setup, CRO, speed optimization, theme dev & DTC growth.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sengar Consultancy — Top 1% Shopify Experts",
  description:
    "Elite Shopify development, CRO optimization, speed optimization, theme customization, and DTC growth services. Trusted by 40+ brands with 100% job success rate.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes you a top 1% Shopify expert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We maintain a 100% job success rate across 40+ clients, with over $501K in managed client revenue. Our team specializes exclusively in Shopify ecosystem services including theme customization, CRO, speed optimization, and full DTC growth. We are recognized Shopify experts with deep experience across health, fashion, supplements, and electronics verticals.",
      },
    },
    {
      "@type": "Question",
      name: "What Shopify services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer comprehensive Shopify services: Store Setup & Configuration, Theme Customization & Design, Conversion Rate Optimization (CRO), Speed & Performance Optimization, Custom App Development, Product Listing & Merchandising, Landing Page Design, DTC Growth Operations, and Dropshipping & Fulfillment setup.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to hire your Shopify experts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer three engagement models: a one-time Shopify Store Audit starting at $497, a 60-day CRO Sprint starting at $2,997, and an ongoing Growth Retainer starting at $4,997/month. Each is scoped to your store's needs with clear deliverables and timelines. Book a free strategy call to get a custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries do you specialize in on Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We have deep vertical expertise in Health & Supplements (25% of our portfolio), General Ecommerce (25%), Fashion & Streetwear (21%), Electronics & Tech (14%), Fitness & Sports (7%), and Beauty & Skincare. Our industry specialization means we understand the unique conversion patterns, compliance requirements, and customer behavior in each vertical.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can you start working on my Shopify store?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically within 48 hours of signing. For urgent needs like broken stores, critical bugs, or launch deadlines, we offer priority onboarding. Book a free strategy call to discuss your timeline.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with Shopify Plus stores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work across all Shopify plans including Shopify Plus. Our enterprise clients benefit from advanced Shopify Plus features including custom checkout, Scripts, Flow automations, and multi-currency/multi-language setups.",
      },
    },
  ],
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
