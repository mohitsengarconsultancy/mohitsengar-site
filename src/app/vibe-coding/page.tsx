"use client";

import { useState, useRef, useId, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/contact";
import { QUOTES } from "@/lib/testimonials";
import { VIBE_FAQS } from "./faqs";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Reveal ─── */
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
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */

const TRUST_BAR = [
  "7+ years as a CTO · 14+ years building software · Dubai",
  "40+ companies worked with",
  "Outstanding Leadership Award, Internet 2.0 Conference, Dubai, Feb 2024",
  "Verifiable on LinkedIn",
];

const PAIN_POINTS = [
  "Login works for you. It breaks for the second user.",
  "Supabase has no Row-Level Security — anyone with the URL can read everyone's data.",
  "The Stripe webhook fires twice. Or not at all. You can't tell.",
  "Lovable invented an auth flow you don't understand and can't change.",
  "Every fix breaks two other things.",
  "You don't know if the database is backed up, if it scales past 50 users, or what “production” even means.",
];

/* Approved price ladder only: AED first, USD/GBP second. */
const SERVICES: {
  title: string;
  price: string;
  timeline: string;
  href?: string;
  oneliner: string;
  idealFor: string;
  deliverables: string[];
}[] = [
  {
    title: "Launch Check for AI-built MVPs",
    price: "AED 9,500 · $2,500 · £2,000",
    timeline: "5 working days",
    href: "/launch-check",
    oneliner:
      "A fixed-scope check of what Lovable, Bolt, Cursor, Base44, Replit or v0 actually built — before you launch, raise, or hire engineers. You get a clear keep / fix / rebuild verdict.",
    idealFor:
      "Founders with a working prototype who can't tell if it's safe, scalable, or hand-offable.",
    deliverables: [
      "Security: exposed API keys, Supabase RLS, auth",
      "Test coverage and a load check",
      "Payments and webhooks checked end to end",
      "Written report with a keep / fix / rebuild verdict",
    ],
  },
  {
    title: "Rescue to Production",
    price: "From AED 55,000 · from $15,000",
    timeline: "Fixed scope · billed by milestone",
    oneliner:
      "Your prototype made production-ready in an agreed number of weeks: same UI, real infrastructure, and the security and edge cases your users will actually hit. When the AI builder is the ceiling, the same project can move you onto a stack your team can maintain.",
    idealFor:
      "Founders with paying users (or about to have them) whose build is half-working, half-broken, or simply still a prototype.",
    deliverables: [
      "Triage first: what's exploitable, broken, or silently failing",
      "Critical fixes: leaked secrets, missing RLS, open endpoints, broken auth",
      "Hardened Supabase / Postgres backend — RLS, indexes, backups",
      "Production auth and Stripe wired correctly (idempotency, webhooks, refunds)",
      "Integrations with retries, idempotency and error handling",
      "Observability: error tracking, structured logs, uptime alerts",
      "CI/CD, staging environment, written runbook — code in your repo",
      "Honest decision doc: rescue, rebuild or migrate, with reasoning",
    ],
  },
  {
    title: "Fractional CTO",
    price: "AED 45,000 · $14,000 per month",
    timeline: "2 days a week · 3-month minimum",
    href: "/fractional-cto",
    oneliner:
      "After launch, I stay on as your part-time CTO until you're ready to hire a full-time one: architecture, delivery, hiring and the investor-facing technical story.",
    idealFor:
      "Founders who need someone to own the technology after the rescue, without a full-time hire yet.",
    deliverables: [
      "Weekly steering call plus written updates",
      "Architecture and release ownership",
      "Hiring support for your engineering team",
      "Vendor and agency management",
    ],
  },
];

const PLATFORMS = [
  { group: "AI Builders", items: "Lovable · Bolt · Base44 · Replit · v0 · Cursor" },
  { group: "Backend", items: "Supabase · Postgres · Node · Edge Functions · n8n" },
  { group: "Frontend", items: "Next.js · React · WordPress · Elementor · Tailwind" },
  { group: "Payments", items: "Stripe · Paddle · Lemon Squeezy" },
  { group: "Comms", items: "Twilio · Resend · Postmark · SendGrid" },
  { group: "AI APIs", items: "Claude · OpenAI · Vercel AI SDK" },
  { group: "Infra", items: "Vercel · Cloudflare · AWS · Supabase Storage" },
  { group: "Observability", items: "Sentry · PostHog · Better Stack" },
];

const CASE_STUDIES = [
  {
    tag: "Own product",
    title: "Generative-AI storytelling engine (my own product)",
    body: "An illustrated-narrative engine over Sanskrit/Hindi source texts that I build and run myself: a Supabase pgvector knowledge base across a multi-million-token corpus, a character face bank on FLUX for cross-frame consistency, and a multi-layer language-detection pipeline.",
    stack: "Supabase · pgvector · Together AI FLUX · Next.js",
  },
  {
    tag: "Own project",
    title: "SaaS reporting platform — logging & observability (my own project)",
    body: "For a SaaS reporting platform of my own, I designed the logging, error-handling and observability strategy — structured logs, retention, alerting, incident runbooks — plus a testing plan spanning unit, integration and end-to-end suites.",
    stack: "Node.js · Postgres · structured logging · CI test suites",
  },
  {
    tag: "Client · MVP build",
    title: "Legal-tech application, idea to working product",
    body: "Full-stack build for a legal-tech founder: architecture, backend and frontend. In her words, the work “positioned our application as a game-changer in the legal tech domain.”",
    stack: "Full-stack · founder's testimonial below",
  },
];

const COMPARISON = [
  { them: "Prompt the AI tool until errors stop", me: "Read the generated code line-by-line, fix the architecture" },
  { them: "Ship “it works on my machine”", me: "Ship with RLS, observability, backups, written runbook" },
  { them: "Keep the project in their accounts", me: "Your repo, your cloud accounts, your domain — always" },
  { them: "“Trust me, it's secure”", me: "Test the auth as a second user, audit the RLS, document the threat model" },
  { them: "Hourly with no end in sight", me: "Fixed scope, fixed price, honest scoping before we start" },
];

const PROCESS = [
  {
    step: "01",
    title: "Free 30-minute fit call",
    body: "We screen-share. You walk me through what you built. I tell you honestly what looks production-blocking and whether I'm the right person to fix it. If you need the answer in writing, that's the Launch Check.",
  },
  {
    step: "02",
    title: "Written scope, fixed price",
    body: "Before any project starts: exactly what I'll do, exactly what you'll get, exactly what it costs. No “we'll figure it out as we go.”",
  },
  {
    step: "03",
    title: "Build / migrate / harden",
    body: "Written updates in plain English at every milestone. Source code in your repo from day one — never in mine.",
  },
  {
    step: "04",
    title: "Production handover",
    body: "Written runbook and a recorded walkthrough. If your next engineer can't run it, I haven't finished.",
  },
];

/* Verbatim quotes, shared with the homepage and /resume (src/lib/testimonials.ts). */
const TESTIMONIALS = [
  { quote: QUOTES.erlend, name: "Erlend Bårli-Olsen", role: "APCOA Parkings GmbH" },
  { quote: QUOTES.nadia, name: "Nadia O.", role: "Legal-tech founder" },
  { quote: QUOTES.max, name: "Max Aronsson", role: "Long-term collaborator, Sweden" },
  { quote: QUOTES.nathan, name: "Nathan Jaskot", role: "Founder, Everconnect Data Systems" },
];

const FAQS = VIBE_FAQS;

/* ─── FAQ Item ───
   The answer is always in the DOM (collapsed to height 0), so it is in the
   server HTML and matches the FAQPage schema. */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <Reveal delay={index * 0.05}>
      <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-violet-400/30 transition-colors">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="text-base md:text-lg font-medium text-white pr-4">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-violet-400 text-2xl flex-shrink-0"
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
          <p className="px-6 pb-6 text-white/60 leading-relaxed text-sm md:text-base">{a}</p>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ─── Page ─── */
export default function VibeCodingPage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            Mohit <span className="text-violet-400">Sengar</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-violet-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-violet-400 transition-colors"
          >
            Book a Fit Call
          </a>
        </div>
      </nav>

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Vibe Coding", href: "/vibe-coding" }]} />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-violet-400/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <div className="hero-rise">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Lovable · Bolt · Base44 · Replit → Production
            </p>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              You built it with AI in a weekend.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-200">
                Now it needs to survive Monday.
              </span>
            </h1>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
            {/* Answer-first block: what this service is, in two sentences */}
            <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed mb-4">
              I&apos;m a CTO-led engineering partner for founders whose Lovable, Bolt, Base44 or Replit
              prototype works in a demo but cracks under real users. I read what the AI generated,
              harden what matters — auth, RLS, payments, edge cases — and either ship it to production
              or migrate it onto a stack your team can actually maintain.
            </p>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-500 hover:bg-violet-400 text-white font-semibold px-8 py-4 rounded-full transition-all text-center"
              >
                Book a Free 30-Min Fit Call →
              </a>
              <a
                href="/launch-check"
                className="border border-white/15 hover:border-violet-400/50 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full transition-all text-center"
              >
                See the Launch Check
              </a>
            </div>
            <p className="text-xs text-white/50 mt-4">
              The fit call is free, on screen-share, with no pitch. Need the answer in writing? The
              Launch Check gives you a written keep / fix / rebuild verdict in 5 working days.{" "}
              <a href="/blog/lovable-app-production-ready-checklist" className="text-violet-300 hover:underline">
                Or start with the free production checklist
              </a>
              .
            </p>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.4s" }}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-10 text-xs text-white/40">
              {TRUST_BAR.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6 bg-[#0D0D0F] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-violet-400 text-sm uppercase tracking-[0.2em] mb-4 text-center">The Lovable Gap</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Why isn&apos;t your AI-built app production-ready?
            </h2>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
              Three days to a prototype. Six weeks later, you still can&apos;t open it to real users —
              because of the things AI didn&apos;t tell you about:
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 text-sm text-white/70 leading-relaxed h-full">
                  {p}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-center text-white/70 font-medium text-lg mt-12 max-w-2xl mx-auto">
              What you need is someone who can <span className="text-violet-300">read</span> what the AI
              generated, find what&apos;s missing, and make it real — without throwing it all out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6" id="services">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-violet-400 text-sm uppercase tracking-[0.2em] mb-4 text-center">Services & Pricing</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
              What does it cost to make an AI app production-ready?
            </h2>
          </Reveal>
          <div className="space-y-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="bg-white/[0.03] border border-white/[0.08] hover:border-violet-400/25 rounded-2xl p-7 md:p-9 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{s.title}</h3>
                      <p className="text-white/55 mt-2 max-w-2xl leading-relaxed text-sm md:text-base">{s.oneliner}</p>
                    </div>
                    <div className="flex-shrink-0 text-left md:text-right">
                      <div className="text-violet-300 font-bold text-lg">{s.price}</div>
                      <div className="text-white/50 text-xs mt-1">{s.timeline}</div>
                      {s.href && (
                        <a
                          href={s.href}
                          className="inline-block text-violet-300 hover:text-violet-200 text-xs font-semibold mt-2 hover:underline"
                        >
                          What&apos;s included →
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-white/35 mb-2">Ideal for</p>
                  <p className="text-sm text-white/60 mb-5">{s.idealFor}</p>
                  <p className="text-xs uppercase tracking-wider text-white/35 mb-2">You get</p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="text-sm text-white/70 flex gap-2">
                        <span className="text-violet-400 flex-shrink-0" aria-hidden="true">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-center text-white/40 text-sm mt-10">
              Every project is fixed price with a written scope before you commit a dollar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-24 px-6 bg-[#0D0D0F] border-y border-white/5" id="platforms">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Which stacks do you work in?
            </h2>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
              The ones I ship with every week. I don&apos;t pick a stack because it&apos;s trendy —
              I pick the one your team can maintain after handover.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLATFORMS.map((p, i) => (
              <Reveal key={p.group} delay={i * 0.04}>
                <div className="flex items-baseline gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-4">
                  <span className="text-xs uppercase tracking-wider text-violet-300 w-28 flex-shrink-0">{p.group}</span>
                  <span className="text-sm text-white/65">{p.items}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 px-6" id="case-studies">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-violet-400 text-sm uppercase tracking-[0.2em] mb-4 text-center">Real Work</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
              What does this look like in practice?
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 h-full flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-400/20 rounded-full px-3 py-1 self-start mb-4">
                    {c.tag}
                  </span>
                  <h3 className="text-lg font-bold leading-snug mb-3">{c.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed flex-1">{c.body}</p>
                  <p className="text-xs text-white/35 mt-4 pt-4 border-t border-white/5">{c.stack}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section className="py-24 px-6 bg-[#0D0D0F] border-y border-white/5" id="why-expert">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-4">
              How is this different from hiring a &ldquo;vibe coder&rdquo;?
            </h2>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
              A CTO who reads the code AI wrote — not a prompt jockey who retries until it compiles.
            </p>
          </Reveal>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-2 text-xs uppercase tracking-wider bg-white/[0.04]">
              <div className="px-5 py-3 text-white/40">Most vibe coders</div>
              <div className="px-5 py-3 text-violet-300">This engagement</div>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.me} className="grid grid-cols-2 border-t border-white/5 text-sm">
                <div className="px-5 py-4 text-white/45">{row.them}</div>
                <div className="px-5 py-4 text-white/80">{row.me}</div>
              </div>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="text-center text-white/60 mt-10 max-w-2xl mx-auto leading-relaxed">
              14+ years building software, 7+ of them as a CTO, across healthcare, fintech,
              e-commerce, parking systems (APCOA), and legal-tech. The AI tools are new. The engineering discipline isn&apos;t.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-6" id="process">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
              How does an engagement run?
            </h2>
          </Reveal>
          <div className="space-y-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="flex gap-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                  <span className="text-violet-400 font-bold text-lg flex-shrink-0" aria-hidden="true">{p.step}</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1.5">{p.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-[#0D0D0F] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
              What do founders and operators say?
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 h-full flex flex-col">
                  <blockquote className="text-sm md:text-base text-white/70 leading-relaxed italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-white/5">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40 mt-0.5">{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" id="faq">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-14">
              Common questions
            </h2>
          </Reveal>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-6 bg-gradient-to-b from-[#0A0A0A] to-[#12101a]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Your prototype works.{" "}
              <span className="text-violet-300">Let&apos;s find out if it ships.</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto mb-10 leading-relaxed">
              Book a free 30-minute fit call. I&apos;ll look at what you built and give you an honest
              read on what&apos;s production-blocking. If you want it in writing, the Launch Check is
              the next step: a written keep / fix / rebuild verdict in 5 working days.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-semibold px-10 py-5 rounded-full transition-all text-lg shadow-2xl shadow-violet-500/20"
            >
              Book a Free Fit Call →
            </a>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-xs text-white/50">
              <li>30 min, screen-share, on your calendar</li>
              <li>Written verdict: the Launch Check, AED 9,500 / $2,500</li>
              <li>No sales follow-up unless you ask</li>
            </ul>
            <p className="text-sm text-white/40 mt-8">
              Prefer email?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-300 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
