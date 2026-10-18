import type { Metadata } from "next";
import "./globals.css";
import { MotionRoot, ScrollProgress } from "@/components/motion";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title: "Fractional CTO in Dubai — Mohit Sengar",
  description:
    "Award-winning fractional CTO for founders worldwide — AI apps, e-commerce, rescue engineering. 40+ clients, 100% success rate. Book a free strategy call.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    title: "Fractional CTO in Dubai — Mohit Sengar",
    description:
      "Award-winning fractional CTO for founders worldwide — AI apps, e-commerce, rescue engineering. 40+ clients, 100% success rate.",
    url: SITE_URL,
    siteName: "Mohit Sengar",
    images: [
      {
        url: `${SITE_URL}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Mohit Sengar - CTO & Technology Leader",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional CTO in Dubai — Mohit Sengar",
    description:
      "Award-winning fractional CTO — AI apps, e-commerce, rescue engineering. 40+ clients, 100% success rate.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
};

/*
 * Entity graph: exactly ONE Person node and ONE Organization node for the
 * whole site, addressable by @id. Every other schema (services, FAQ pages,
 * articles) references these via {"@id": ...} instead of redefining them.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Mohit Singh Sengar",
  alternateName: ["Mohit Sengar", "Sengar"],
  jobTitle: "Fractional CTO",
  description:
    "Mohit Sengar is an award-winning fractional CTO and engineering leader based in Dubai with 14+ years of experience across AI, automation, software development, and blockchain.",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  nationality: {
    "@type": "Country",
    name: "India",
  },
  worksFor: { "@id": `${SITE_URL}/#org` },
  knowsAbout: [
    "AI & Machine Learning",
    "Automation",
    "Software Development",
    "Blockchain",
    "Digital Transformation",
    "Full-Stack Development",
    "Enterprise Integration",
    "Team Leadership",
    "E-commerce",
    "Shopify",
    "Healthcare Technology",
    "Fintech",
  ],
  award: "Outstanding Leadership Award - Internet 2.0 Conference Dubai 2024",
  sameAs: [
    "https://www.linkedin.com/in/mohitsengarr/",
    "https://www.instagram.com/mohitsengarr/",
    "https://www.youtube.com/@mohitsengarr",
    "https://github.com/mohitsengarr",
    "https://twitter.com/mohitsengarr",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Sengar Consultancy",
  url: SITE_URL,
  email: "mohit@sengarconsultancy.org",
  founder: { "@id": `${SITE_URL}/#person` },
  description:
    "Independent engineering consultancy led by Mohit Sengar — fractional CTO services, AI application rescue, Shopify development, and senior engineering teams.",
  areaServed: ["AE", "US", "GB", "EU", "IN"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Hotjar Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6690297,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        {/* Leadsy.ai vTag */}
        <script
          id="vtag-ai-js"
          async
          src="https://r2.leadsy.ai/tag.js"
          data-pid="q1TpErQJyYOtnm4X"
          data-version="062024"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JW4SYZ00EQ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-JW4SYZ00EQ');`,
          }}
        />
      </head>
      <body>
        <MotionRoot>
          <ScrollProgress />
          {children}
        </MotionRoot>
      </body>
    </html>
  );
}
