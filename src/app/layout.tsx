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
      name: "Who is Mohit Sengar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mohit Sengar is an award-winning Chief Technology Officer (CTO) and full-stack technology leader with over 11 years of enterprise experience. He is the CTO of Invatu Technologies and has collaborated with 47+ clients across e-commerce, healthcare, finance, parking management, theme park operations, and more. He holds the prestigious Top Rated Plus badge on Upwork (top 1%) with a 100% job success rate.",
      },
    },
    {
      "@type": "Question",
      name: "What does Mohit Sengar specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mohit Sengar specializes in digital transformation, enterprise integration and automation, full-stack development, AI & machine learning, blockchain, IoT, and technology team leadership. He has expertise across multiple industries including e-commerce, healthcare, finance, parking management, and theme park operations.",
      },
    },
    {
      "@type": "Question",
      name: "What is a fractional CTO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fractional CTO is an experienced technology executive who provides part-time CTO services to companies that need strategic technology leadership but may not require or afford a full-time CTO. Mohit Sengar offers fractional CTO services, bringing 11+ years of enterprise experience to help businesses with technology strategy, team building, and digital transformation.",
      },
    },
    {
      "@type": "Question",
      name: "How can I hire Mohit Sengar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can hire Mohit Sengar by scheduling a call through his website at mohitsengar.org. He offers CTO-as-a-service, full-stack development, digital transformation consulting, and enterprise integration services. He is also available on Upwork where he holds Top Rated Plus status.",
      },
    },
    {
      "@type": "Question",
      name: "What awards has Mohit Sengar received?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mohit Sengar received the Outstanding Leadership Award at Dubai's Internet 2.0 Conference in February 2024 for his adept leadership and transformative impact as CTO of Invatu Technologies. He also holds the Upwork Top Rated Plus badge, reserved for the top 1% of freelancers.",
      },
    },
    {
      "@type": "Question",
      name: "What is Mohit Sengar's experience on Upwork?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mohit Sengar has accumulated over 29,000 hours of work on Upwork with a 100% job success rate. He has collaborated with 47+ clients and earned the Top Rated Plus badge, which is reserved for the top 1% of freelancers on the platform. He consistently receives 5-star feedback from clients.",
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
