import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";
const PAGE_URL = `${SITE_URL}/investor-tech-checklist`;
const OG_IMAGE = `${SITE_URL}/images/hero.jpg`;
const PERSON = { "@id": `${SITE_URL}/#person` };
const PUBLISHED = "2026-10-22";

const TITLE = "Investor Tech Due-Diligence Checklist: the questions investors ask about your technology";
const DESCRIPTION =
  "40 questions investors ask about your technology, in 8 areas from architecture and security to IP and AI, each with what good looks like. Free and printable.";

export const metadata: Metadata = {
  title: "Investor Tech Due-Diligence Checklist (Free) | Mohit Sengar",
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "technical due diligence checklist",
    "tech due diligence questions",
    "investor due diligence technology",
    "startup technical due diligence",
    "due diligence checklist for startups",
    "CTO due diligence checklist",
    "investor readiness checklist",
    "technology due diligence UAE",
    "AI due diligence questions",
  ],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "article",
    title: "Investor Tech Due-Diligence Checklist: 40 Questions, Free",
    description:
      "The questions investors ask about your technology, grouped into 8 areas, each with what good looks like. Free, ungated and printable.",
    url: PAGE_URL,
    siteName: "Mohit Sengar",
    publishedTime: PUBLISHED,
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
    title: "Investor Tech Due-Diligence Checklist | Mohit Sengar",
    description:
      "40 questions investors ask about your technology, each with what good looks like. Free and printable.",
    images: [OG_IMAGE],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  image: OG_IMAGE,
  author: PERSON,
  publisher: PERSON,
  inLanguage: "en-US",
  articleSection: "Technical due diligence",
  isAccessibleForFree: true,
};

export default function InvestorTechChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  );
}
