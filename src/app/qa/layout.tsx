import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/qa`;

export const metadata: Metadata = {
  title: "QA & Quality Engineering Services | Mohit Sengar",
  description:
    "Modern QA and quality engineering — test automation, AI/LLM testing, performance, security in CI/CD, and observability. Solve the top 10 testing problems of 2026. Book a free QA audit.",
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
      "Test automation, AI/LLM testing, performance, security-in-CI, and observability. Solve the top 10 testing problems of 2026. Book a free QA audit.",
    images: [`${SITE_URL}/images/qa/testing-problems-2026.jpg`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sengar Consultancy — QA & Quality Engineering",
  description:
    "CTO-led QA and quality engineering: test automation, AI/LLM system testing, performance and load testing, continuous security (DevSecOps), microservice contract testing, and observability-driven testing.",
  url: PAGE_URL,
  image: `${SITE_URL}/images/qa/testing-problems-2026.jpg`,
  priceRange: "$$-$$$",
  areaServed: { "@type": "Place", name: "Worldwide" },
  provider: { "@id": `${SITE_URL}/#org` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "QA & Quality Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "QA Health Audit",
          description:
            "A deep review of test coverage, flakiness, CI/CD pipeline, security posture, and performance, with a prioritized remediation roadmap.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Test Automation Sprint",
          description:
            "A 60-day sprint to build resilient, self-healing test automation, wire it into CI/CD, and eliminate flaky tests.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Quality Engineering Retainer",
          description:
            "Ongoing quality engineering — automation, AI/LLM testing, security-in-CI, performance, and observability with release-confidence reporting.",
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
      name: "What does a QA and quality engineering engagement include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern quality engineering across the whole delivery lifecycle: resilient test automation, AI/LLM system testing, performance and load testing shifted left, continuous security (SAST, DAST, SCA) in CI/CD, microservice contract testing and service virtualization, and observability-driven testing that feeds real production behaviour back into your test suite.",
      },
    },
    {
      "@type": "Question",
      name: "How do you fix flaky tests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most flakiness comes from selector fragility against dynamic DOM structures. We rebuild suites on AI-driven, self-healing frameworks (Playwright, testRigor, Katalon) that use multiple locators and context to find elements even when the original selector changes, so false failures stop eroding trust in automation.",
      },
    },
    {
      "@type": "Question",
      name: "Can you test AI and LLM features?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Because a large language model can return different responses to similar inputs, we evaluate qualities rather than a single expected output — hallucinations, bias, toxicity, truthfulness, relevance and prompt-injection resistance — using an LLM-as-a-Judge approach with tools like DeepEval, Langfuse and Promptfoo.",
      },
    },
    {
      "@type": "Question",
      name: "How much does QA cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three engagement models: a one-time QA Health Audit from $997, a 60-day Test Automation Sprint from $4,997, and an ongoing Quality Engineering Retainer from $6,997/month. Each is scoped to your stack and risk profile with clear deliverables. Book a free QA audit call for a custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "What testing tools do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are tool-agnostic and pick what fits your stack: Playwright, testRigor and Katalon for automation; DeepEval, Langfuse and Promptfoo for AI/LLM evaluation; Grafana k6, Locust and OpenTelemetry for performance; Snyk, SonarQube and OWASP ZAP for security; PactFlow, WireMock and Tricentis for integration; and Datadog, Dynatrace and Honeycomb for observability.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can you start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QA audits and rescues usually start within a week. For a launch on fire — a broken pipeline, a security scare, or a release deadline — we offer priority onboarding. Book a free QA audit to discuss your timeline.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with our existing team and CI/CD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We plug into your existing engineers, repositories and pipelines rather than replacing them — reviewing what you have, writing a remediation plan, and either implementing it ourselves or handing your team a clear spec. Most engagements end with a durable QA capability owned by your permanent team.",
      },
    },
  ],
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
