"use client";

import Image from "next/image";
import { useState, useRef, useId, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CountUp } from "@/components/motion";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/contact";
import { LAUNCH_CHECK_FAQS } from "./faqs";
import { QUOTES } from "@/lib/testimonials";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION TOKENS
   ═══════════════════════════════════════════════════════════════ */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const STAGGER = { fast: 0.08, normal: 0.12 };

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm uppercase tracking-widest text-mint/60 mb-4 text-center">{children}</p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const STATS = [
  { value: "5", label: "Working days" },
  { value: "6", label: "Areas checked" },
  { value: "14+", label: "Years building software" },
  { value: "7+", label: "Years as a CTO" },
];

const TOOLS = ["Lovable", "Bolt", "Cursor", "Base44", "Replit", "v0"];

const HERO_INCLUDES = [
  "5 working days, fixed fee",
  "Security, Supabase RLS, auth, payments, tests and load",
  "Written report and a keep / fix / rebuild verdict",
  "Fee credited in full to a retainer signed within 30 days",
];

const BREAKS = [
  {
    title: "Exposed keys",
    desc: "Secret keys for Stripe, an LLM provider or the Supabase service role end up in the browser bundle or in git history, where anyone can copy them.",
  },
  {
    title: "Missing or wrong Supabase RLS",
    desc: "A table created mid-prompt with no row-level security, a USING (true) policy, reads locked but updates and deletes open, or a policy that trusts a user_id sent by the browser instead of auth.uid().",
  },
  {
    title: "Auth that only works for user #1",
    desc: "Everything looks fine for the founder's account. The second user can see, change or break someone else's data, and role checks exist only in the UI.",
  },
  {
    title: "Payment webhooks taken on trust",
    desc: "No signature verification and no idempotency, so a retried webhook creates a duplicate order, or a failed one silently drops a payment.",
  },
  {
    title: "Never tested under load",
    desc: "The app is fine with ten users and slows to a crawl at a hundred, because a missing index or an N+1 query was never measured.",
  },
  {
    title: "No tests, no staging",
    desc: "Every fix breaks two other things, because nothing checks the sign-up, payment and core flows before changes go live.",
  },
];

const READING = [
  {
    href: "/blog/supabase-rls-mistakes-ai-apps",
    tag: "Security",
    title: "The Supabase RLS mistakes hiding in your AI-generated app",
  },
  {
    href: "/blog/lovable-app-production-ready-checklist",
    tag: "Lovable",
    title: "How to make a Lovable app production-ready",
  },
  {
    href: "/blog/lovable-vs-bolt-vs-base44",
    tag: "AI Builders",
    title: "Lovable vs Bolt vs Base44: where all three hit the same wall",
  },
];

/* The approved Launch Check scope: security (keys, Supabase RLS, auth), tests, load, payments/webhooks. */
const SCOPE = [
  {
    title: "Security & secrets",
    items: [
      "Keys in the client bundle, env files and git history",
      "Service-role and admin keys kept server-side",
    ],
  },
  {
    title: "Data & Supabase RLS",
    items: [
      "RLS enabled on every table",
      "Policies for select, insert, update and delete",
      "Identity from auth.uid(), not the request body",
      "Storage buckets and file URLs",
    ],
  },
  {
    title: "Authentication & access",
    items: [
      "Sign-up, login, reset and session expiry",
      "Everything retested as a second user",
      "Roles enforced on the server, not just the UI",
      "Admin routes and internal tools",
    ],
  },
  {
    title: "Payments & webhooks",
    items: [
      "Webhook signature verification",
      "Idempotency on retries",
      "Refunds, failed payments and cancellations",
    ],
  },
  {
    title: "Tests",
    items: [
      "What is tested today, and what isn't",
      "Untested money paths: sign-up, checkout, core flow",
      "A minimal test plan for the critical flows",
    ],
  },
  {
    title: "Load & performance",
    items: [
      "A basic load test on key flows, agreed with you",
      "Slow queries, N+1s and missing indexes",
      "Page weight and load time on mobile",
    ],
  },
];

const DELIVERABLES = [
  {
    title: "Written report",
    desc: "Every finding in plain English, with evidence and a severity rating, so you know exactly what is at risk, why, and what to fix first.",
  },
  {
    title: "Keep / fix / rebuild verdict",
    desc: "A straight answer on whether the current build can carry real users, with the reasoning behind it.",
  },
];

const DAYS = [
  {
    step: "Day 1",
    title: "Map it",
    desc: "Kick-off, access checks, walk the app as a new user, map the architecture, accounts and data flows.",
  },
  {
    step: "Day 2",
    title: "Security & data",
    desc: "Secrets in the bundle and git history, RLS on every table and bucket, auth retested as a second user.",
  },
  {
    step: "Day 3",
    title: "Payments & webhooks",
    desc: "Webhook signatures, idempotency, refunds, failed payments and cancellations.",
  },
  {
    step: "Day 4",
    title: "Tests & load",
    desc: "Existing tests and critical gaps, and a basic load test on the key flows, agreed with you.",
  },
  {
    step: "Day 5",
    title: "Verdict & report",
    desc: "The written report and the keep / fix / rebuild verdict, delivered to you.",
  },
];

const NEXT_STEPS = [
  {
    name: "Fix it yourself",
    price: "No further cost",
    desc: "Many findings are configuration-level and quick for your own developer. The report marks which ones those are and what done looks like.",
    href: "",
    link: "",
  },
  {
    name: "Rescue to Production",
    price: "From AED 55,000 / from $15,000",
    desc: "I fix it with you. Fixed scope, billed by milestone, with a clear “production-ready in N weeks” target.",
    href: "/vibe-coding",
    link: "More on AI-built apps",
  },
  {
    name: "Fractional CTO",
    price: "AED 45,000 / $14,000 per month",
    desc: "I stay on 2 days a week as your part-time CTO through launch, hiring and the next raise, until you are ready for a full-time CTO.",
    href: "/fractional-cto",
    link: "How the fractional CTO role works",
  },
];

const NOT_FOR = [
  "You haven't built anything yet. A fit call, or Advisory, will help you more than a check.",
  "You want the problems fixed rather than found. That is Rescue to Production, a fixed-scope project billed by milestone.",
  "You are raising or scaling and need a view on the team, process and roadmap as well as the code. The Readiness Review is the better fit.",
  "You need a certified penetration test or a compliance audit such as SOC 2 or ISO 27001. The Launch Check is an engineering review, not a certificate.",
  "Your product is a large platform with several services and an engineering team behind it. That needs the 2-week Readiness Review.",
];

const TESTIMONIAL = {
  img: "/images/testimonial-nathan.jpeg",
  name: "Nathan Jaskot",
  role: "Client",
  text: QUOTES.nathan,
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/** The answer is always in the DOM (collapsed to height 0), so it is in the server HTML. */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <Reveal delay={index * STAGGER.fast}>
      <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-mint/20 transition-colors">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="text-lg font-medium text-white pr-4">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-mint text-2xl flex-shrink-0"
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>
        <motion.div
          id={panelId}
          initial={false}
          animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="overflow-hidden"
          aria-hidden={!open}
        >
          <p className="px-6 pb-6 text-white/60 leading-relaxed">{a}</p>
        </motion.div>
      </div>
    </Reveal>
  );
}

function CtaButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center bg-mint text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-mint-hover transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

function Check() {
  return (
    <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function LaunchCheckPage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-clip">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            Mohit <span className="text-mint">Sengar</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#what-breaks" className="hover:text-white transition-colors">What Breaks</a>
            <a href="#scope" className="hover:text-white transition-colors">What&apos;s Checked</a>
            <a href="#deliverables" className="hover:text-white transition-colors">What You Get</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mint text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-mint-hover transition-colors"
          >
            Book a Call
          </a>
        </div>
      </nav>

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Launch Check", href: "/launch-check" }]} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[88vh] flex items-center pt-6">
        <div className="absolute inset-0 bg-gradient-to-b from-mint/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-mint/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <div className="hero-rise">
                <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  <span className="text-sm text-mint font-medium">Launch Check · AI-built MVPs</span>
                </div>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  Launch Check for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-dark">AI-Built MVPs</span>
                </h1>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
                <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                  Built it with Lovable, Bolt, Cursor, Base44, Replit or v0? Before real users or
                  investors arrive, I spend 5 working days checking what the tool didn&apos;t:
                  exposed keys, Supabase RLS, auth, payments, tests and load. You get a written
                  report and a straight keep, fix or rebuild verdict.
                </p>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                  <CtaButton>Book a Free Fit Call</CtaButton>
                  <a
                    href="#scope"
                    className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                  >
                    See What&apos;s Checked
                  </a>
                </div>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.4s" }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {STATS.map((s, i) => (
                    <div key={s.label} className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-bold text-mint">
                        <CountUp value={s.value} delay={0.3 + i * 0.1} />
                      </div>
                      <div className="text-sm text-white/50 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.25s" }}>
              <div className="relative bg-[#1A1A1A] rounded-3xl p-8 border-2 border-mint shadow-[0_0_40px_rgba(141,217,191,0.1)]">
                <p className="text-xs uppercase tracking-widest text-mint/70 mb-3">Fixed fee</p>
                <p className="text-4xl md:text-5xl font-bold text-mint">AED 9,500</p>
                <p className="text-white/50 mt-2">$2,500 · £2,000</p>
                <ul className="space-y-3 mt-7 mb-8">
                  {HERO_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <CtaButton className="w-full">Book a Fit Call</CtaButton>
                <p className="text-xs text-white/50 mt-4 text-center">Free 30-minute fit call first. No obligation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOLS STRIP ─── */}
      <section className="border-y border-white/5 py-8 bg-[#111]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-white/50 mb-6">For apps built with</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {TOOLS.map((t) => (
              <li
                key={t}
                className="bg-white/[0.03] border border-white/[0.08] rounded-full px-5 py-2 text-sm text-white/70"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="text-center text-sm text-white/50 mt-6">
            Agency-built code on React, Next.js, Supabase and Node works too.{" "}
            <a href="/vibe-coding" className="text-mint hover:underline">
              More on AI-built apps
            </a>
            .
          </p>
        </div>
      </section>

      {/* ─── WHAT USUALLY BREAKS ─── */}
      <section id="what-breaks" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <SectionLabel>What usually breaks</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight">
              The Gaps AI Builders Leave Behind
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-14">
              These are the patterns that come up again and again in AI-generated code. None of
              them shows up in a demo: the app works the same with or without them, which is
              exactly why they ship.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {BREAKS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * STAGGER.fast}>
                <div className="flex items-start gap-4 bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 h-full">
                  <span className="text-mint/40 font-bold text-lg leading-none mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5">{b.title}</h3>
                    <p className="text-white/55 leading-relaxed text-sm md:text-base">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="text-center text-xs uppercase tracking-widest text-white/50 mt-16 mb-5">Read more first</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {READING.map((r, i) => (
              <Reveal key={r.href} delay={i * STAGGER.fast}>
                <a
                  href={r.href}
                  className="group block h-full bg-white/[0.02] border border-white/[0.07] hover:border-mint/30 rounded-xl p-5 transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-wider text-mint">{r.tag}</span>
                  <p className="font-semibold leading-snug mt-2 text-sm md:text-base group-hover:text-mint transition-colors">
                    {r.title}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S CHECKED ─── */}
      <section id="scope" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>What&apos;s checked</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Six Areas, Checked by Hand</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              I read the code the tool generated and test the app the way an attacker or an
              unlucky second user would, rather than asking another AI whether it looks fine.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCOPE.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * STAGGER.fast}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 h-full hover:border-mint/20 transition-colors">
                  <p className="text-mint/40 font-bold text-sm mb-2">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-lg font-semibold mb-4">{s.title}</h3>
                  <ul className="space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/55 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-mint/60 flex-shrink-0 mt-2.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section id="deliverables" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>What you get</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">A Decision, Not Just a List</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {DELIVERABLES.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * STAGGER.normal}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-7 md:p-8 h-full hover:border-mint/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <Check />
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{d.title}</h3>
                      <p className="text-white/50 leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionLabel>How it works</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Five Working Days</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              It starts with a free 30-minute fit call, where we agree the scope, the start date
              and the access I need. Read-only access covers almost everything.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {DAYS.map((d, i) => (
              <Reveal key={d.step} delay={i * STAGGER.fast}>
                <div className="relative">
                  <div className="text-4xl font-bold text-mint/15 mb-4">{d.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{d.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base">{d.desc}</p>
                  {i < DAYS.length - 1 && (
                    <div className="hidden lg:block absolute top-4 right-0 translate-x-1/2 text-white/10 text-2xl" aria-hidden="true">
                      &rarr;
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-center text-sm text-white/50 mt-14 max-w-2xl mx-auto">
              If I find something urgent, such as a live secret key in the browser, you hear about it
              the same day, not on day 5.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── WHAT HAPPENS NEXT ─── */}
      <section id="next" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>What happens next</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Three Ways Forward</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              The report is yours either way. There is no obligation to hire me for the fixes.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {NEXT_STEPS.map((n, i) => (
              <Reveal key={n.name} delay={i * STAGGER.normal}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{n.name}</h3>
                  <p className="text-mint font-semibold">{n.price}</p>
                  <p className="text-white/50 mt-3 text-sm leading-relaxed flex-1">{n.desc}</p>
                  {n.href && (
                    <a href={n.href} className="text-mint text-sm font-medium hover:underline mt-6">
                      {n.link} &rarr;
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 bg-gradient-to-r from-mint/10 to-transparent border border-mint/15 rounded-2xl p-7 md:p-8">
              <p className="text-white/80 font-medium leading-relaxed">
                The Launch Check fee is credited in full against a retainer (Advisory, Fractional
                CTO or Embedded CTO) signed within 30 days.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mt-2">
                Retainers are billed monthly in advance, with a 3-month minimum and then one
                month&apos;s notice. Raising soon, or need a view on the team and process too? See the{" "}
                <a href="/readiness-review" className="text-mint hover:underline">
                  Production &amp; Investor Readiness Review
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WHO YOU GET ─── */}
      <section className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-widest text-mint/60 mb-4">Who does the check</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Checked by a CTO Who Reads the Code
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-white/55 leading-relaxed mb-5">
                  I&apos;m Mohit Sengar, a Dubai-based CTO with 7 years in the seat. I take AI-built
                  and agency-built products to production and make them investor-ready, and then I
                  stay on as your part-time CTO until you&apos;re ready to hire a full-time one. You
                  work with me directly.
                </p>
                <p className="text-white/55 leading-relaxed mb-8">
                  I&apos;ve spent 14+ years building software for 40+ companies, starting with
                  security software at Glasswall. The tests and load work in the Launch Check draw
                  on{" "}
                  <a href="/qa" className="text-mint hover:underline">
                    my delivery bench for QA and quality engineering
                  </a>
                  . I work in person in Dubai and Abu Dhabi, and remotely with founders in the US,
                  UK and Europe.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Credentials</p>
                <p className="text-sm text-white/60 mb-6">
                  Outstanding Leadership Award, Internet 2.0 Conference, Dubai, February 2024
                </p>
                <a href="/resume" className="text-mint text-sm font-medium hover:underline">
                  See the full resume &rarr;
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <figure className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-7">
                <blockquote className="text-white/65 leading-relaxed italic mb-6">&ldquo;{TESTIMONIAL.text}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                    <Image src={TESTIMONIAL.img} alt={TESTIMONIAL.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{TESTIMONIAL.name}</p>
                    <p className="text-sm text-white/50">{TESTIMONIAL.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── HONEST FIT ─── */}
      <section className="py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="bg-gradient-to-r from-mint/10 to-transparent border border-mint/15 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Who the Launch Check Is Not For</h2>
              <ul className="space-y-4">
                {NOT_FOR.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-white/60 leading-relaxed">
                    <span className="text-mint flex-shrink-0 mt-0.5" aria-hidden="true">&rarr;</span>
                    {n}
                  </li>
                ))}
              </ul>
              <p className="text-white/80 font-medium mt-6">
                If it isn&apos;t the right step, you&apos;ll hear that on the fit call.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Questions &amp; Answers</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Launch Check FAQ</h2>
          </Reveal>
          <div className="space-y-4">
            {LAUNCH_CHECK_FAQS.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-mint/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Find the Gaps
              <br />
              <span className="text-mint">Before Your Users Do.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Book a free 30-minute fit call. Tell me what you built and when it goes live. If the
              Launch Check is the right step, we agree a start date; if it isn&apos;t, I&apos;ll say
              what is.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <CtaButton className="px-10 py-5 text-lg">Book Your Free Fit Call</CtaButton>
            <p className="text-xs text-white/50 mt-5">Free fit call · 5 working days · AED 9,500 / $2,500 / £2,000 fixed</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-white/50">
              <p>
                Prefer email?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-mint hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <WhatsAppLink className="text-mint hover:underline" />
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
