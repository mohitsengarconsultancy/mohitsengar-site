import type { Metadata } from "next";
import { LAUNCH_CHECK_FAQS } from "./faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/launch-check`;
const OG_IMAGE = `${SITE_URL}/images/hero.jpg`;
const PERSON = { "@id": `${SITE_URL}/#person` };

export const metadata: Metadata = {
  title: "Launch Check for AI-Built MVPs | Mohit Sengar",
  description:
    "Launch Check for AI-built MVPs: 5 days, AED 9,500 / $2,500. Exposed keys, Supabase RLS, auth, payments, tests and load, then a keep / fix / rebuild verdict.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "Launch Check",
    "AI-built MVP audit",
    "Lovable app audit",
    "Bolt app audit",
    "Base44 app review",
    "Cursor app security review",
    "Replit app production",
    "v0 app review",
    "vibe coding audit",
    "Supabase RLS audit",
    "AI app security review",
    "MVP production readiness",
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
    title: "Launch Check for AI-Built MVPs: 5 Days, Fixed Fee",
    description:
      "Before real users or investors arrive: a CTO checks your AI-built app for exposed keys, Supabase RLS gaps, auth, payments, tests and load, then gives you a keep, fix or rebuild verdict.",
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
    title: "Launch Check for AI-Built MVPs | Mohit Sengar",
    description:
      "5 working days, fixed fee: security, Supabase RLS, auth, payments, tests and load for Lovable, Bolt, Cursor, Base44, Replit and v0 apps.",
    images: [OG_IMAGE],
  },
};

function fee(priceCurrency: string, price: number) {
  return {
    "@type": "Offer",
    url: PAGE_URL,
    price,
    priceCurrency,
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      price,
      priceCurrency,
    },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Launch Check for AI-Built MVPs",
  serviceType: "Software production-readiness review",
  description:
    "A 5-working-day technical review of an AI-built MVP (Lovable, Bolt, Cursor, Base44, Replit, v0): security and exposed keys, Supabase row-level security, authentication, payments and webhooks, tests and load. Delivered as a written report with a keep, fix or rebuild verdict.",
  url: PAGE_URL,
  image: OG_IMAGE,
  provider: PERSON,
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Worldwide" },
  ],
  offers: [fee("AED", 9500), fee("USD", 2500), fee("GBP", 2000)],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LAUNCH_CHECK_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LaunchCheckLayout({
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
