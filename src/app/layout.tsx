import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title:
    "Mohit Sengar – Award-Winning CTO & Technology Leader | Official Site",
  description:
    "Mohit Sengar is an award-winning CTO and technology leader based in Dubai with 14+ years of enterprise experience. Sengar specializes in AI, automation, software development, blockchain, and digital transformation for startups and enterprises worldwide.",
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
    title:
      "Mohit Sengar – Award-Winning CTO & Technology Leader | Official Site",
    description:
      "Mohit Sengar is an award-winning CTO based in Dubai. Sengar specializes in AI, automation, software development, blockchain, and digital transformation. 100% job success rate across 40+ clients.",
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
    title: "Mohit Sengar – Award-Winning CTO & Technology Leader",
    description:
      "Mohit Sengar – award-winning CTO based in Dubai with 14+ years experience. Specializing in AI, automation, blockchain, and digital transformation.",
    images: [`${SITE_URL}/images/hero.jpg`],
  },
  other: {
    "google-site-verification": "",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohit Sengar",
  alternateName: "Sengar",
  jobTitle: "Chief Technology Officer",
  description:
    "Mohit Sengar is an award-winning CTO and technology leader based in Dubai with 14+ years of enterprise experience. Sengar specializes in AI, automation, software development, blockchain, and digital transformation.",
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
  worksFor: {
    "@type": "Organization",
    name: "Invatu Technologies",
    url: "https://invatu.com",
  },
  knowsAbout: [
    "AI & Machine Learning",
    "Automation",
    "Software Development",
    "Blockchain",
    "Digital Transformation",
    "Full-Stack Development",
    "Enterprise Integration",
    "Team Leadership",
    "IoT",
    "E-commerce",
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
  name: "Invatu Technologies",
  founder: {
    "@type": "Person",
    name: "Mohit Sengar",
  },
  description:
    "Technology company specializing in enterprise integration, digital transformation, and custom software development.",
  knowsAbout: [
    "Enterprise Integration",
    "Digital Transformation",
    "Custom Software Development",
    "Automation",
  ],
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Mohit Sengar — Technology Leadership & Innovation",
  description:
    "Watch Mohit Sengar discuss technology leadership, AI, and digital transformation. Award-winning CTO and fractional technology leader based in Dubai.",
  thumbnailUrl: `${SITE_URL}/images/hero.jpg`,
  uploadDate: "2024-02-01",
  contentUrl: "https://www.youtube.com/watch?v=EY4CJU8LNAE",
  embedUrl: "https://www.youtube.com/embed/EY4CJU8LNAE",
  publisher: {
    "@type": "Person",
    name: "Mohit Sengar",
    url: SITE_URL,
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "AI News & Insights by Mohit Sengar",
  description:
    "Curated breaking news from the world of artificial intelligence, updated daily by Mohit Sengar — award-winning CTO and technology leader.",
  url: `${SITE_URL}/#news`,
  author: {
    "@type": "Person",
    name: "Mohit Sengar",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Person",
    name: "Mohit Sengar",
    url: SITE_URL,
  },
  inLanguage: "en-US",
  about: {
    "@type": "Thing",
    name: "Artificial Intelligence",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the first engagement look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We start with a free 30-minute call where Mohit learns about your business, tech stack, and goals. If there's a fit, he'll propose an engagement model — fractional, project-based, or advisory — with clear scope and timeline. No pressure, no obligation.",
      },
    },
    {
      "@type": "Question",
      name: "What is a fractional CTO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fractional CTO is an experienced technology executive who provides part-time CTO services to companies that need strategic technology leadership but may not require or afford a full-time CTO. Mohit Sengar offers fractional CTO services, bringing 14+ years of enterprise experience to help with technology strategy, team building, architecture decisions, and digital transformation — typically 10-20 hours per week.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to work with Mohit Sengar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the engagement model. Fractional CTO retainers, project-based architecture reviews, and one-time due diligence assessments are all priced differently. Mohit is transparent about pricing from the first call — no surprises.",
      },
    },
    {
      "@type": "Question",
      name: "What if it's not a good fit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No hard feelings. The initial call is free, and Mohit only proposes next steps if he genuinely believes he can help. He has turned down work that wasn't the right match — his 100% success rate depends on it.",
      },
    },
    {
      "@type": "Question",
      name: "Can Mohit Sengar work with my existing team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Most engagements involve integrating with existing developers. Mohit doesn't replace your team — he makes them more effective through better architecture, clearer processes, and strategic technical direction.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can Mohit Sengar start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically within 1-2 weeks. For urgent needs, availability can be prioritized. Discuss your timeline on the free strategy call.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
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
      <body>{children}</body>
    </html>
  );
}
