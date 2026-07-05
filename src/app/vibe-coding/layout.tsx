import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/vibe-coding`;
const PERSON_REF = { "@id": `${SITE_URL}/#person` };
const ORG_REF = { "@id": `${SITE_URL}/#org` };

export const metadata: Metadata = {
  title: "Vibe Coding Expert — Lovable to Production | Mohit Sengar",
  description:
    "Turn your Lovable, Bolt or Base44 prototype into a production app — security hardening, Supabase, Stripe, rescue engineering. Fixed price. Free build review.",
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
      "CTO-led engineering for AI-built prototypes: audits, production builds, WordPress migrations, rescue & hardening. Fixed price, free build review.",
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
      "CTO-led engineering for AI-built prototypes: audits, builds, migrations, rescue. Fixed price, free build review.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vibe Coding — Lovable to Production Engineering",
  description:
    "CTO-led engineering for AI-generated prototypes: prototype audits, production builds, WordPress migrations, backend integrations, and app rescue with security hardening.",
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
        itemOffered: {
          "@type": "Service",
          name: "Prototype Audit",
          description:
            "5–10 day technical review of a Lovable/Bolt/Base44 build: architecture, auth, RLS, secrets, webhooks, failure modes, remediation roadmap.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lovable to Production Build",
          description:
            "Ship a validated AI-built MVP as a real product: hardened backend, production auth and payments, observability, CI/CD, and handover.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lovable to WordPress Migration",
          description:
            "Rebuild an AI-generated site on WordPress + Elementor with SEO-safe redirects, integrations, and editor training.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI App Rescue & Security Hardening",
          description:
            "Triage and stabilise a half-broken AI-generated app: exploitable gaps, RLS, secrets, data integrity, honest rescue-vs-rebuild decision.",
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
      name: "I built my app in Lovable. Do I have to migrate off it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "About half of Lovable engagements stay on Lovable — hardening the Supabase backend, fixing auth, wiring real Stripe/Twilio. The other half migrate because they hit a structural ceiling: custom backend logic, complex permissions, or performance at scale. The free Build Review determines which path fits.",
      },
    },
    {
      "@type": "Question",
      name: "What does it cost to make an AI app production-ready?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prototype Audit from $4,500 (5–10 days). AI App Rescue from $7,500 (2–4 weeks). Lovable to WordPress migration from $9,000. Lovable to Production build $20K–$90K depending on scope. Backend/integrations from $6,500. Every engagement is fixed price with a written scope first.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Audits and rescues usually start within a week; larger builds 2–3 weeks out. Emergency slots are held most months for launches on fire.",
      },
    },
    {
      "@type": "Question",
      name: "Will a non-technical founder understand the process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — daily updates in plain English and short recorded walkthroughs. You don't need to read code; you need to know what's done, what's next, and what's at risk.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the code and accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do — always. Your repo, your Supabase and Stripe accounts, your domain. When the engagement ends, nothing breaks because the engineer is gone.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with an existing engineer or agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often, yes — especially on audits and integrations: review what they built, write a remediation list, then fix it or hand it back against a clear spec. Many engagements end with handover to the client's permanent team.",
      },
    },
    {
      "@type": "Question",
      name: "What timezone do you work in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Based in Dubai (GMT+4), working daily with founders in the US, UK, EU, and APAC — there is always a 3-hour live overlap with every major timezone, with async-first updates.",
      },
    },
  ],
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
