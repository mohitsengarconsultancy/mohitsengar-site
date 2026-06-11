import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title:
    "Top 1% Shopify Experts & Development Team | Mohit Sengar",
  description:
    "Hire elite Shopify experts. Custom Shopify store development, CRO, landing pages, headless builds & migration. 14+ years experience, 40+ clients, 100% success rate. Book a free strategy call.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/shopify`,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "website",
    title: "Top 1% Shopify Experts & Development Team | Mohit Sengar",
    description:
      "Elite Shopify development team. Custom stores, headless commerce, CRO, migrations & ongoing optimization. 100% project success rate across 40+ clients.",
    url: `${SITE_URL}/shopify`,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Mohit Sengar - Top Shopify Expert",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 1% Shopify Experts | Mohit Sengar",
    description:
      "Elite Shopify development: custom stores, headless commerce, CRO, migrations. 100% success rate. Book a free strategy call.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
  keywords: [
    "Shopify experts",
    "Shopify developer",
    "Shopify development team",
    "hire Shopify expert",
    "Shopify Plus developer",
    "Shopify custom development",
    "Shopify store setup",
    "Shopify migration",
    "Shopify CRO",
    "Shopify landing page",
    "headless Shopify",
    "Shopify experts Dubai",
    "best Shopify developers",
    "top Shopify agency",
    "Shopify ecommerce expert",
    "Shopify theme development",
    "Shopify app development",
  ],
};

const shopifyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Shopify Expert Development Services",
  description:
    "Top 1% Shopify expert team offering custom store development, headless commerce, CRO optimization, theme customization, app development, and Shopify Plus migration. 100% project success rate.",
  provider: {
    "@type": "Person",
    name: "Mohit Sengar",
    url: SITE_URL,
    jobTitle: "Chief Technology Officer & Shopify Expert",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
  serviceType: [
    "Shopify Store Development",
    "Shopify Plus Migration",
    "Headless Shopify (Hydrogen)",
    "Shopify Theme Customization",
    "Shopify App Development",
    "Shopify CRO & Conversion Optimization",
    "Shopify Landing Page Development",
    "Shopify SEO Optimization",
  ],
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Shopify Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Shopify Store Build",
          description: "End-to-end custom Shopify store development with conversion-optimized design",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shopify Plus Migration",
          description: "Seamless migration from any platform to Shopify Plus with zero downtime",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Headless Shopify Development",
          description: "Hydrogen & custom headless storefronts for maximum performance",
        },
      },
    ],
  },
};

const shopifyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I hire Mohit Sengar's team as my Shopify expert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With 14+ years of engineering leadership, 40+ successful client engagements, and a 100% project success rate, Mohit Sengar's team delivers enterprise-grade Shopify solutions. The team includes certified Shopify developers, UX/CRO specialists, and QA engineers who work as a dedicated unit on every project.",
      },
    },
    {
      "@type": "Question",
      name: "What Shopify services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer end-to-end Shopify services: custom store development, Shopify Plus setup and migration, headless commerce (Hydrogen), theme customization, app development, CRO and conversion optimization, landing page creation, SEO optimization, and ongoing maintenance and support.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you build a Shopify store?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landing pages can be delivered in 3-4 days. A full custom Shopify store typically takes 2-4 weeks depending on complexity. Shopify Plus migrations with custom integrations take 4-8 weeks. We always provide honest timelines upfront.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with Shopify Plus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We have extensive experience with Shopify Plus, including custom checkout extensibility, Shopify Functions, advanced multi-currency setups, wholesale channels, and enterprise integrations with ERPs and CRMs.",
      },
    },
    {
      "@type": "Question",
      name: "Can you migrate my store from WooCommerce or Magento to Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We handle complete platform migrations from WooCommerce, Magento, BigCommerce, and custom platforms to Shopify/Shopify Plus — including product data, customer data, order history, SEO redirects, and zero-downtime cutover.",
      },
    },
  ],
};

export default function ShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shopifyServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(shopifyFaqSchema),
        }}
      />
      {children}
    </>
  );
}
