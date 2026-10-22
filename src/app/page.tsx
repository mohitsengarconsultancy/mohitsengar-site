import HomeClient, { type RecentPost } from "./HomeClient";
import { getPost } from "./blog/posts";
import { HOME_FAQS } from "./home-faqs";

const SITE_URL = "https://www.mohitsengar.org";
const PERSON_REF = { "@id": `${SITE_URL}/#person` };

/** Posts linked from the homepage "Recent writing" section, in display order. */
const RECENT_POST_SLUGS = [
  "fractional-cto-cost-guide-2026",
  "lovable-vs-bolt-vs-base44",
  "lovable-app-production-ready-checklist",
];

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Mohit Sengar — Technology Leadership & Innovation",
  description:
    "Watch Mohit Sengar discuss technology leadership, AI, and digital transformation. Mohit is a fractional CTO based in Dubai.",
  thumbnailUrl: `${SITE_URL}/images/hero.jpg`,
  uploadDate: "2024-02-01",
  contentUrl: "https://www.youtube.com/watch?v=EY4CJU8LNAE",
  embedUrl: "https://www.youtube.com/embed/EY4CJU8LNAE",
  publisher: PERSON_REF,
};

/* Built from the same array HomeClient renders, so schema and visible FAQ match. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  const recentPosts: RecentPost[] = RECENT_POST_SLUGS.flatMap((slug) => {
    const post = getPost(slug);
    return post
      ? [{ slug: post.slug, title: post.title, description: post.description, readMinutes: post.readMinutes }]
      : [];
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient recentPosts={recentPosts} />
    </>
  );
}
