import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { POSTS, getPost } from "../posts";
import { CALENDLY_URL } from "@/lib/contact";
import { PERSON_REF, SITE_URL } from "@/lib/person";

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Render a post string, turning [label](href) into real links. */
function renderInline(text: string, linkClass = "text-[#8DD9BF] hover:underline") {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_LINK)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      href.startsWith("/") ? (
        <Link key={at} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={at} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      )
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.description,
      url,
      siteName: "Mohit Sengar",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [
        {
          url: `${SITE_URL}${post.heroImage || "/images/hero.jpg"}`,
          width: 1200,
          height: 630,
          alt: post.heroImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    image: `${SITE_URL}${post.heroImage || "/images/hero.jpg"}`,
    author: PERSON_REF,
    publisher: PERSON_REF,
    mainEntityOfPage: url,
    inLanguage: "en-US",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const nextSteps = [
    {
      href: "/fractional-cto",
      label: "Fractional CTO",
      body: "A part-time CTO, two days a week, until you're ready to hire a full-time one.",
    },
    {
      href: "/launch-check",
      label: "Launch Check",
      body: "Five working days on your AI-built MVP, with a written keep / fix / rebuild verdict.",
    },
    {
      href: "/blog/fractional-cto-cost-guide-2026",
      label: "Fractional CTO cost guide",
      body: "What a fractional CTO costs in 2026, compared with a full-time hire.",
    },
  ].filter((l) => l.href !== `/blog/${post.slug}`);

  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mohit <span className="text-[#8DD9BF]">Sengar</span>
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8DD9BF] text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#A3E4CF] transition-colors"
          >
            Book a Call
          </a>
        </div>
      </nav>

      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.tag, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6 pt-10 pb-24">
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/50 mb-4">
            <span className="text-[#8DD9BF] bg-[#8DD9BF]/10 border border-[#8DD9BF]/20 rounded-full px-3 py-1 uppercase tracking-wider">
              {post.tag}
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            {post.updated && post.updated !== post.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated{" "}
                  <time dateTime={post.updated}>
                    {new Date(post.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readMinutes} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{post.title}</h1>
          {/* Answer-first block for AI/answer engines */}
          <p className="mt-6 text-white/75 leading-relaxed border-l-2 border-[#8DD9BF] pl-5 text-[15px] md:text-base">
            {post.answerFirst}
          </p>
          <p className="mt-4 text-xs text-white/35">
            By{" "}
            <Link href="/resume" className="text-[#8DD9BF] hover:underline">
              Mohit Sengar
            </Link>{" "}
            — Dubai-based fractional CTO, 7+ years as a CTO, 14+ years building software.
          </p>
        </header>

        {post.heroImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            width={1600}
            height={893}
            className="w-full h-auto rounded-2xl border border-white/10 mb-10"
          />
        )}

        <div className="space-y-10">
          {post.sections.map((s) => (
            <section key={s.h2}>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">{s.h2}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-white/60 leading-relaxed mb-4 text-[15px] md:text-base">
                  {renderInline(p)}
                </p>
              ))}
              {s.list && (
                <ul className="space-y-2.5 mt-2">
                  {s.list.map((li, i) => (
                    <li key={i} className="flex gap-3 text-white/65 text-[15px] md:text-base leading-relaxed">
                      <span className="text-[#8DD9BF] flex-shrink-0 mt-0.5" aria-hidden="true">
                        →
                      </span>
                      <span>{renderInline(li)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-5">Quick answers</h2>
            <div className="space-y-4">
              {post.faqs.map((f) => (
                <div key={f.q} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="font-semibold text-white text-[15px] md:text-base">{f.q}</h3>
                  <p className="text-white/55 text-sm md:text-[15px] leading-relaxed mt-2">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <aside className="bg-gradient-to-br from-[#8DD9BF]/10 to-transparent border border-[#8DD9BF]/25 rounded-2xl p-7 md:p-8">
            <h2 className="text-lg md:text-xl font-bold">{post.cta.heading}</h2>
            <p className="text-white/55 text-sm md:text-[15px] mt-2">{renderInline(post.cta.body)}</p>
            <a
              href={post.cta.href}
              {...(post.cta.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-block mt-5 bg-[#8DD9BF] hover:bg-[#A3E4CF] text-black font-semibold px-6 py-3 rounded-full transition-colors text-sm md:text-base"
            >
              {post.cta.label} →
            </a>
          </aside>

          {/* Standard next steps */}
          <section aria-labelledby="next-steps-heading">
            <h2 id="next-steps-heading" className="text-lg md:text-xl font-bold tracking-tight mb-4">
              Working on something like this?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {nextSteps.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group bg-white/[0.02] border border-white/[0.07] hover:border-[#8DD9BF]/30 rounded-xl p-5 transition-colors"
                >
                  <h3 className="font-semibold text-sm md:text-base group-hover:text-[#8DD9BF] transition-colors">
                    {l.label} →
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-2">{l.body}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="pt-4 border-t border-white/10">
            <h2 className="text-sm uppercase tracking-wider text-white/40 mb-4">Keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white/[0.02] border border-white/[0.07] hover:border-[#8DD9BF]/30 rounded-xl p-5 transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-wider text-[#8DD9BF]">{r.tag}</span>
                  <h3 className="font-semibold leading-snug mt-2 group-hover:text-[#8DD9BF] transition-colors text-sm md:text-base">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
