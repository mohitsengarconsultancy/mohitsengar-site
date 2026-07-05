"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CALENDLY = "https://calendly.com/mohitsengarr";

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
  "14+ years CTO / senior engineering · Dubai",
  "Recognised at Internet 2.0 Conference, Dubai 2024",
  "40+ shipped engagements · 100% completion",
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

const SERVICES = [
  {
    title: "Lovable / Bolt / Base44 Prototype Audit",
    price: "from $4,500",
    timeline: "5–10 days",
    oneliner:
      "A technical review of what your AI tool actually built — before you launch, raise, or hire engineers.",
    idealFor:
      "Founders with a working prototype who can't tell if it's safe, scalable, or hand-offable.",
    deliverables: [
      "Architecture diagram of what's actually running",
      "Auth · RLS · secrets · webhook audit",
      "Edge-case and failure-mode list with priorities",
      "Remediation roadmap with effort estimates",
    ],
  },
  {
    title: "Lovable → Production App Build",
    price: "$20K – $90K",
    timeline: "4–10 weeks",
    oneliner:
      "Your validated MVP shipped as a real product — same UI, real infrastructure, the security and edge cases your users will actually hit.",
    idealFor:
      "Founders with paying users (or about to) who need the prototype to stop being a prototype.",
    deliverables: [
      "Hardened Supabase / Postgres backend — RLS, indexes, backups",
      "Production auth + Stripe wired correctly (idempotency, webhooks, refunds)",
      "Observability: error tracking, structured logs, uptime alerts",
      "CI/CD, staging environment, written runbook — code in your repo",
    ],
  },
  {
    title: "Lovable → WordPress / Elementor Migration",
    price: "from $9,000",
    timeline: "2–5 weeks",
    oneliner:
      "Move your AI-generated site onto WordPress + Elementor — the platform your team can edit without calling a developer.",
    idealFor:
      "Founders whose Lovable site became a black box and who need editability, SEO control, and a real CMS.",
    deliverables: [
      "1:1 visual rebuild on Elementor or a custom block theme",
      "Content migration with SEO redirects — no traffic loss",
      "Forms, payments, integrations re-wired (Stripe, Mailchimp, n8n)",
      "Core Web Vitals pass + editor training for your team",
    ],
  },
  {
    title: "Backend & API Integration",
    price: "from $6,500",
    timeline: "3–8 weeks",
    oneliner:
      "The connective tissue your AI app is probably faking — Supabase, Stripe, Twilio, Resend, Claude API, n8n, webhooks, queues.",
    idealFor:
      "Founders whose product needs to actually do something — send the SMS, charge the card, call the LLM, fire the workflow.",
    deliverables: [
      "Production integrations with retries, idempotency, error handling",
      "Supabase schema review + RLS hardening",
      "Webhook signing, verification, replay protection",
      "LLM cost tracking, rate limiting, prompt-injection guardrails",
    ],
  },
  {
    title: "AI App Rescue + Security Hardening",
    price: "from $7,500",
    timeline: "2–4 weeks",
    oneliner:
      "When your build is half-working, half-broken, and you can't tell which half. Triage, stabilise, ship.",
    idealFor: "Founders mid-launch with a leaking app and no engineer to call.",
    deliverables: [
      "Same-week triage: what's exploitable, broken, or silently failing",
      "Critical fixes: leaked secrets, missing RLS, open endpoints, broken auth",
      "Database and data-integrity review + backups",
      "Honest decision doc: rescue vs. rebuild, with reasoning",
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
    tag: "AI Product Build",
    title: "Generative-AI storytelling engine → production",
    body: "An illustrated-narrative engine over Sanskrit/Hindi source texts: Supabase pgvector knowledge base across a multi-million-token corpus, character face bank on FLUX for cross-frame consistency, and a multi-layer language-detection pipeline. Shipped as a production system, not a demo.",
    stack: "Supabase · pgvector · Together AI FLUX · Next.js",
  },
  {
    tag: "App Rescue",
    title: "SaaS reporting platform — observability overhaul",
    body: "A live SaaS with invisible failures: designed and implemented the full logging, error-handling and observability strategy — structured logs, retention, alerting, incident runbooks — plus a testing plan spanning unit, integration and end-to-end suites.",
    stack: "Node.js · Postgres · structured logging · CI test suites",
  },
  {
    tag: "MVP → Funded Product",
    title: "Legal-tech application, idea to launch",
    body: "Full-stack build for a legal-tech founder — from concept to a product her team calls “a game-changer in the legal tech domain.” Architecture, backend, frontend, and handover her future engineers could run with.",
    stack: "Full-stack · client-verifiable testimonial below",
  },
];

const COMPARISON = [
  { them: "Prompt the AI tool until errors stop", me: "Read the generated code line-by-line, fix the architecture" },
  { them: "Ship “it works on my machine”", me: "Ship with RLS, observability, backups, written runbook" },
  { them: "Keep the project in their accounts", me: "Your repo, your cloud accounts, your domain — always" },
  { them: "“Trust me, it's secure”", me: "Pen-test the auth, audit the RLS, document the threat model" },
  { them: "Hourly with no end in sight", me: "Fixed scope, fixed price, honest scoping before we start" },
];

const PROCESS = [
  {
    step: "01",
    title: "30-min Build Review (free)",
    body: "We screen-share. You walk me through what you built. I tell you honestly what's production-blocking, what's fine, and whether I'm the right person to fix it — with a written summary within 48 hours either way.",
  },
  {
    step: "02",
    title: "Written scope, fixed price",
    body: "Within 3 business days: exactly what I'll do, exactly what you'll get, exactly what it costs. No “we'll figure it out as we go.”",
  },
  {
    step: "03",
    title: "Build / migrate / harden",
    body: "Daily written updates in plain English. Weekly demo call. Source code in your repo from day one — never in mine.",
  },
  {
    step: "04",
    title: "Production handover",
    body: "Written runbook, recorded walkthrough, 30-day post-launch support. If your next engineer can't run it, I haven't finished.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "My absolute pleasure to endorse Mohit — an invaluable asset and the pivotal force behind our success at APCOA Parkings GmbH. Consistent technical acumen and unwavering dedication.",
    name: "Erlend Bårli-Olsen",
    role: "APCOA Parkings GmbH",
  },
  {
    quote:
      "Your contributions helped us bring our idea to life and positioned our application as a game-changer in the legal-tech domain. Exceptional full-stack engineer.",
    name: "Nadia O.",
    role: "Legal-tech founder",
  },
  {
    quote:
      "Competent and trustworthy full-stack developer. Communicative, a great team player, and solved complex problems across many years of collaboration.",
    name: "Max Aronsson",
    role: "Long-term collaborator, Sweden",
  },
  {
    quote:
      "Working with Mohit has been great. A technical expert in all things development — I rely on him for advice, expertise, and well-developed solutions.",
    name: "Nathan Jaskot",
    role: "Founder, Everconnect Data Systems",
  },
];

const FAQS = [
  {
    q: "I built my app in Lovable. Do I have to migrate off it to work with you?",
    a: "About half my Lovable engagements stay on Lovable — we harden the Supabase backend, fix the auth, wire real Stripe/Twilio, and add what Lovable couldn't generate. The other half migrate because they hit a structural ceiling: custom backend logic, complex permissions, performance at scale. I'll tell you which is right for you on the Build Review call.",
  },
  {
    q: "What does this cost?",
    a: "Prototype Audit from $4,500 (5–10 days). AI App Rescue from $7,500 (2–4 weeks). WordPress/Elementor migration from $9,000. Lovable → Production build $20K–$90K depending on scope. Backend/integrations from $6,500. Every engagement is fixed price — you get a written scope before you commit a dollar.",
  },
  {
    q: "How fast can you start?",
    a: "Audits and rescues usually within a week. Larger builds 2–3 weeks out. If your launch is on fire, say so on the call — I keep a slot for emergencies most months.",
  },
  {
    q: "I'm not technical. Will I understand what you're doing?",
    a: "Yes. Daily updates in plain English — “we fixed the bug where new signups could see each other's accounts” — and short recorded walkthroughs when something matters. You don't need to read code; you need to know what's done, what's next, and what's at risk.",
  },
  {
    q: "Do you keep my code, my Supabase account, my Stripe account?",
    a: "Never. Your repo, your accounts, your domain. I'm a guest in your infrastructure — when the engagement ends you can hire anyone and nothing breaks because I'm gone.",
  },
  {
    q: "Why is this different from the last freelancer who burned me?",
    a: "I scope before I start, quote fixed price, and don't take work I can't deliver. My completion rate is 100% across 40+ engagements — and it stays there because I say “no, that's not a fit” when it isn't. The free Build Review is partly so I can decide that honestly.",
  },
  {
    q: "Can you work alongside my existing engineer or agency?",
    a: "Often, yes — especially on audits and integrations. I review what they built, write a remediation list, and either fix it myself or hand it back against a clear spec. Many engagements end with me handing a clean codebase to the client's permanent team.",
  },
  {
    q: "Are you in my timezone?",
    a: "I'm based in Dubai (GMT+4) and work daily with founders in the US, UK, EU, and APAC — there's always a 3-hour live overlap with every major timezone, and async-first updates mean you're rarely waiting on me.",
  },
];

/* ─── FAQ Item ─── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.05}>
      <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-violet-400/30 transition-colors">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
          aria-expanded={open}
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
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <p className="px-6 pb-6 text-white/60 leading-relaxed text-sm md:text-base">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
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
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-violet-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-violet-400 transition-colors"
          >
            Book a Build Review
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
          <Reveal>
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Lovable · Bolt · Base44 · Replit → Production
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              You built it with AI in a weekend.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-200">
                Now it needs to survive Monday.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            {/* Answer-first block: what this service is, in two sentences */}
            <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed mb-4">
              I&apos;m a CTO-led engineering partner for founders whose Lovable, Bolt, Base44 or Replit
              prototype works in a demo but cracks under real users. I read what the AI generated,
              harden what matters — auth, RLS, payments, edge cases — and either ship it to production
              or migrate it onto a stack your team can actually maintain.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-500 hover:bg-violet-400 text-white font-semibold px-8 py-4 rounded-full transition-all text-center"
              >
                Book a 30-Min Build Review →
              </a>
              <a
                href="/blog/lovable-app-production-ready-checklist"
                className="border border-white/15 hover:border-violet-400/50 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full transition-all text-center"
              >
                Get the Production Checklist
              </a>
            </div>
            <p className="text-xs text-white/30 mt-4">
              Free, screen-share, no pitch. Written assessment within 48 hours — whether or not we work together.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-10 text-xs text-white/40">
              {TRUST_BAR.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
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
                      <div className="text-white/35 text-xs mt-1">{s.timeline}</div>
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
              Every engagement is fixed price with a written scope before you commit a dollar.
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
              14 years as a CTO and senior engineer across healthcare, fintech, e-commerce, parking
              systems (APCOA), and legal-tech. The AI tools are new. The engineering discipline isn&apos;t.
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
              Book a 30-minute Build Review. I&apos;ll look at what you built, tell you what&apos;s
              production-blocking, and send a written summary. Free. No pitch. You leave with a plan
              whether or not we work together.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-semibold px-10 py-5 rounded-full transition-all text-lg shadow-2xl shadow-violet-500/20"
            >
              Book the Build Review →
            </a>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-xs text-white/35">
              <li>30 min, screen-share, on your calendar</li>
              <li>Written assessment within 48 hours</li>
              <li>No sales follow-up unless you ask</li>
            </ul>
            <p className="text-sm text-white/40 mt-8">
              Prefer email?{" "}
              <a href="mailto:mohit@sengarconsultancy.org" className="text-violet-300 hover:underline">
                mohit@sengarconsultancy.org
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
