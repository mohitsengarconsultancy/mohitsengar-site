import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title:
    "Mohit Sengar | CTO & Full-Stack Technology Leader | 11+ Years Experience",
  description:
    "Mohit Sengar is an award-winning CTO and full-stack technology leader with 11+ years of enterprise experience. Specializing in digital transformation, team leadership, and cutting-edge technology strategy.",
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
      "Mohit Sengar | CTO & Full-Stack Technology Leader | 11+ Years Experience",
    description:
      "Award-winning CTO and full-stack technology leader. Specializing in digital transformation, enterprise integration, and technology strategy. Top Rated Plus on Upwork with 100% job success rate.",
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
    title: "Mohit Sengar | CTO & Full-Stack Technology Leader",
    description:
      "Award-winning CTO with 11+ years experience. Specializing in digital transformation, enterprise integration, and technology strategy.",
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
  jobTitle: "Chief Technology Officer",
  description:
    "Award-winning CTO and full-stack technology leader with 11+ years of enterprise experience specializing in digital transformation, team leadership, and cutting-edge technology strategy.",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero.jpg`,
  worksFor: {
    "@type": "Organization",
    name: "Invatu Technologies",
    url: "https://invatu.com",
  },
  knowsAbout: [
    "Digital Transformation",
    "Full-Stack Development",
    "Enterprise Integration",
    "Team Leadership",
    "AI & Machine Learning",
    "Blockchain",
    "IoT",
    "E-commerce",
    "Healthcare Technology",
    "Fintech",
  ],
  award: "Outstanding Leadership Award - Internet 2.0 Conference Dubai 2024",
  sameAs: [
    "https://www.linkedin.com/in/mohitsengarr/",
    "https://github.com/mohitsengarr",
    "https://www.upwork.com/freelancers/mohitsengar",
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
        text: "A fractional CTO is an experienced technology executive who provides part-time CTO services to companies that need strategic technology leadership but may not require or afford a full-time CTO. Mohit Sengar offers fractional CTO services, bringing 11+ years of enterprise experience to help with technology strategy, team building, architecture decisions, and digital transformation — typically 10-20 hours per week.",
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
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
