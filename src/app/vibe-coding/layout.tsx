import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title:
    "Hire a Vibe Coding Expert | Lovable, Bolt, Replit, Base44 — Mohit Sengar",
  description:
    "Hire an award-winning CTO and vibe coding expert who builds production-grade MVPs using Lovable, Bolt.new, Replit, and Base44. 14+ years experience. 40+ clients. Rapid prototyping with enterprise-grade architecture, security, and scalability from day one.",
  alternates: {
    canonical: `${SITE_URL}/vibe-coding`,
  },
  keywords: [
    "vibe coding expert",
    "hire vibe coder",
    "vibe coding developer",
    "Lovable developer",
    "Bolt.new expert",
    "Replit developer",
    "Base44 developer",
    "AI app builder expert",
    "rapid MVP development",
    "vibe coding agency",
    "AI-powered app development",
    "no-code to production",
    "vibe coding consultant",
    "vibe coded app rescue",
    "AI app security audit",
    "production-grade vibe coding",
    "fractional CTO vibe coding",
    "startup MVP builder",
    "vibe coding services",
  ],
  openGraph: {
    type: "website",
    title:
      "Hire a Vibe Coding Expert — Production-Grade MVPs at 10x Speed | Mohit Sengar",
    description:
      "Don't just vibe code — vibe code RIGHT. Award-winning CTO builds production-grade apps using Lovable, Bolt, Replit & Base44. 82% of AI-generated apps fail in production. Yours won't.",
    url: `${SITE_URL}/vibe-coding`,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Mohit Sengar - Vibe Coding Expert & CTO",
      },
    ],
  },
};

const vibeCodingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vibe Coding & AI-Powered App Development Services",
  description:
    "Production-grade MVP development using AI coding tools (Lovable, Bolt.new, Replit, Base44) with enterprise-level architecture, security, and scalability. Led by an award-winning CTO with 14+ years experience.",
  provider: {
    "@type": "Person",
    name: "Mohit Sengar",
    url: SITE_URL,
    jobTitle: "CTO & Vibe Coding Expert",
  },
  serviceType: [
    "Rapid MVP Development",
    "Vibe-Coded App Rescue",
    "AI App Security Audit",
    "Production-Grade Vibe Builds",
    "Scale-Up Engineering",
    "Platform Migration",
    "AI Prototyping",
    "No-Code to Production Conversion",
  ],
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vibe Coding Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rapid MVP Development",
          description:
            "Production-grade MVPs built in days using Lovable, Bolt.new, Replit, or Base44 with proper architecture and security from day one.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vibe-Coded App Rescue",
          description:
            "Fix broken AI-generated apps — security flaws, scaling issues, business logic bugs, and production readiness.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI App Security Audit",
          description:
            "Deep-dive audit of AI-generated codebases. Find the security flaws, RLS issues, and vulnerabilities before they cost you.",
        },
      },
    ],
  },
};

const vibeCodingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is vibe coding and why do I need an expert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vibe coding uses AI tools like Lovable, Bolt.new, Replit, and Base44 to build apps from natural language prompts. While these tools are powerful, research shows AI-generated code has 1.7x more major issues and 2.74x higher security vulnerability rates than human-written code. An expert ensures your vibe-coded app is production-ready, secure, and scalable.",
      },
    },
    {
      "@type": "Question",
      name: "Which vibe coding platforms do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with all major platforms: Lovable (React + Supabase), Bolt.new (multi-framework), Replit (full IDE + deployment), Base44 (enterprise-grade), v0 by Vercel (frontend UI), Cursor, and Claude Code. We choose the right tool based on your project requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you build an MVP with vibe coding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landing pages and simple apps: 2-3 days. Full MVP with authentication, database, and API integrations: 1-2 weeks. Complex multi-feature SaaS: 2-4 weeks. This is 5-10x faster than traditional development while maintaining production-grade quality.",
      },
    },
    {
      "@type": "Question",
      name: "Can you fix my broken vibe-coded app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our Vibe-Coded App Rescue service fixes common AI-generated code problems: security vulnerabilities (10.3% of Lovable apps have critical RLS flaws), silent business logic failures, scaling issues, and missing production infrastructure like logging, monitoring, and error handling.",
      },
    },
    {
      "@type": "Question",
      name: "What makes you different from other vibe coders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most vibe coders are prompt engineers. Mohit Sengar is an award-winning CTO with 14+ years of enterprise engineering leadership. He uses AI tools as accelerators within a proper engineering framework — delivering the speed of vibe coding with the reliability of traditional engineering. 40+ clients, 100% success rate.",
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
          __html: JSON.stringify(vibeCodingServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(vibeCodingFaqSchema),
        }}
      />
      {children}
    </>
  );
}
