import type { Metadata } from "next";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title: "Mohit Sengar — CTO Resume / CV",
  description:
    "Résumé of Mohit Sengar, a Dubai-based fractional CTO with 7+ years in the seat and 14+ years building software across AI, automation and blockchain.",
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "profile",
    title: "Mohit Sengar — Resume / CV",
    description:
      "Chief Technology Officer · 7+ years as a CTO · 14+ years building software · AI, automation, blockchain. Based in Dubai.",
    url: `${SITE_URL}/resume`,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Mohit Sengar — CTO & Technology Leader",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Sengar — Resume / CV",
    description:
      "Chief Technology Officer · 7+ years as a CTO · 14+ years building software · AI, automation, blockchain.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
