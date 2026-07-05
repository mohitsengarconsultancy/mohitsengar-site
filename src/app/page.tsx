import HomeClient from "./HomeClient";
import { fetchAINews } from "@/lib/news";

export const revalidate = 86400; // refresh server-rendered news daily

const SITE_URL = "https://www.mohitsengar.org";
const PERSON_REF = { "@id": `${SITE_URL}/#person` };

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
  publisher: PERSON_REF,
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "AI News & Insights by Mohit Sengar",
  description:
    "Curated breaking news from the world of artificial intelligence, updated daily by Mohit Sengar — award-winning CTO and technology leader.",
  url: `${SITE_URL}/#news`,
  author: PERSON_REF,
  publisher: PERSON_REF,
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

export default async function Home() {
  const payload = await fetchAINews();
  const newsUpdatedAt = payload?.lastUpdated
    ? new Date(payload.lastUpdated).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient initialNews={payload?.news ?? []} newsUpdatedAt={newsUpdatedAt} />
    </>
  );
}
