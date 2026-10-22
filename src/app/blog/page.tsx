import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { POSTS } from "./posts";
import { CALENDLY_URL } from "@/lib/contact";

const SITE_URL = "https://www.mohitsengar.org";

export const metadata: Metadata = {
  title: "Blog — AI Apps & Fractional CTO Insights | Mohit Sengar",
  description:
    "Practical guides on taking Lovable and AI-built apps to production, Supabase security, migrations, and fractional CTO economics.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    title: "Blog — AI Apps & Fractional CTO Insights | Mohit Sengar",
    description:
      "Practical guides on taking AI-built apps to production, Supabase security, migrations, and fractional CTO economics.",
    url: `${SITE_URL}/blog`,
    siteName: "Mohit Sengar",
    images: [{ url: `${SITE_URL}/images/hero.jpg`, width: 1200, height: 630, alt: "Mohit Sengar — Blog" }],
  },
};

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
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

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />

      <section className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        <header className="mb-14">
          <p className="text-[#8DD9BF] text-sm uppercase tracking-[0.2em] mb-4">Blog</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            AI apps, production engineering,
            <br className="hidden md:block" /> and fractional CTO economics
          </h1>
          <p className="text-white/50 mt-4 max-w-2xl">
            Field notes from taking Lovable, Bolt and Base44 builds to production — written for founders, not engineers.
          </p>
          <p className="text-white/40 mt-3 max-w-2xl text-sm">
            Need hands-on help? See how I work as a{" "}
            <Link href="/fractional-cto" className="text-[#8DD9BF] hover:underline">
              fractional CTO
            </Link>
            , or use the{" "}
            <Link href="/investor-tech-checklist" className="text-[#8DD9BF] hover:underline">
              investor tech checklist
            </Link>{" "}
            before your next raise.
          </p>
        </header>

        <div className="grid gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group bg-white/[0.03] border border-white/[0.08] hover:border-[#8DD9BF]/30 rounded-2xl p-7 md:p-9 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                <span className="text-[#8DD9BF] bg-[#8DD9BF]/10 border border-[#8DD9BF]/20 rounded-full px-3 py-1 uppercase tracking-wider">
                  {p.tag}
                </span>
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{p.readMinutes} min read</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold leading-snug group-hover:text-[#8DD9BF] transition-colors">
                {p.title}
              </h2>
              <p className="text-white/55 mt-3 leading-relaxed text-sm md:text-base max-w-3xl">{p.description}</p>
              <span className="inline-block mt-4 text-sm text-[#8DD9BF]">Read the guide →</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
