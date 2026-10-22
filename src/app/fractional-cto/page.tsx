"use client";

import Image from "next/image";
import { useState, useRef, useId, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CountUp } from "@/components/motion";
import {
  DeliveryDashboardViz,
  DueDiligenceViz,
  HiringPipelineViz,
  ArchitectureViz,
  CostCompareBar,
} from "@/components/ServiceVisuals";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CALENDLY_URL } from "@/lib/contact";
import { QUOTES } from "@/lib/testimonials";
import { FCTO_FAQS } from "./faqs";

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

/** `animate: false` renders the value as-is (CountUp would tick "1-2" through "0-2"). */
const STATS: { value: string; label: string; animate?: boolean }[] = [
  { value: "40+", label: "Companies Served" },
  { value: "14+", label: "Years Engineering" },
  { value: "7+", label: "Years as a CTO" },
  { value: "1-2", label: "Weeks to Start", animate: false },
];

const SIGNALS = [
  "Your developers are busy, but releases keep slipping and nobody can say why.",
  "You are about to raise and investors will ask who owns the technology.",
  "You are choosing between agencies, freelancers and hiring, with no one technical to judge them.",
  "The architecture worked for the MVP and is starting to crack under real users.",
  "Your CTO search has dragged on for months and the roadmap can't wait.",
  "An AI-built prototype needs to become a product real customers can trust.",
];

const ENGAGEMENTS = [
  {
    title: "Ongoing Tech Leadership",
    desc: "Two or three days a week inside your leadership team: architecture decisions, sprint and release oversight, vendor management and weekly steering.",
    visual: <DeliveryDashboardViz />,
  },
  {
    title: "Engineering Hiring",
    desc: "Define the roles, write the job descriptions, run technical interviews and build a team that stays and ships on schedule.",
    visual: <HiringPipelineViz />,
  },
  {
    title: "Architecture & Scaling",
    desc: "Find the bottlenecks before your users do, and get a roadmap that carries the system through the next stage of growth.",
    visual: <ArchitectureViz />,
  },
  {
    title: "Technical Due Diligence",
    desc: "Pre-investment or pre-acquisition review of code, team and infrastructure, delivered as a written risk report in 1-3 weeks.",
    visual: <DueDiligenceViz />,
  },
];

const COMPARE_ROWS = [
  {
    label: "Cost",
    ft: "AED 100K-130K/month loaded (UAE); $300K-$450K+/year (US)",
    fr: "About half (loaded cost)",
  },
  { label: "Time to start", ft: "3-6 months", fr: "1-2 weeks" },
  { label: "Commitment", ft: "Full-time, plus equity", fr: "2 or 3 days a week, billed monthly" },
  { label: "Wrong-hire risk", ft: "6-12 months lost", fr: "One month's notice after a 3-month minimum" },
  { label: "Experience", ft: "Varies by hire", fr: "14+ years, 7+ as a CTO, 40+ companies" },
];

type PriceCard = {
  name: string;
  tagline: string;
  /** Shown small before the price, e.g. "From". */
  from?: boolean;
  aed: string;
  unit?: string;
  usd: string;
  meta: string;
  features: string[];
  href?: string;
  linkLabel?: string;
  highlighted?: boolean;
};

/** Fixed-fee entry offers. AED is primary; USD (and GBP) secondary. */
const START_HERE: PriceCard[] = [
  {
    name: "Launch Check",
    tagline: "For AI-built MVPs: Lovable, Bolt, Cursor, Base44, Replit, v0 and similar.",
    aed: "AED 9,500",
    usd: "$2,500 · £2,000",
    meta: "Fixed fee · 5 working days",
    features: [
      "Security: exposed API keys, Supabase RLS, auth",
      "Tests and load",
      "Payments and webhooks",
      "Keep / fix / rebuild verdict in a written report",
    ],
    href: "/launch-check",
    linkLabel: "Launch Check details",
  },
  {
    name: "Production & Investor Readiness Review",
    tagline: "For products heading into a raise or real growth.",
    aed: "AED 27,500",
    usd: "$7,500",
    meta: "Fixed fee · 2 weeks",
    features: [
      "Architecture, code, team and delivery process",
      "Risks, in plain language",
      "A written report you can forward to investors",
      "Presented to you live",
    ],
    href: "/readiness-review",
    linkLabel: "Readiness Review details",
  },
  {
    name: "Buy-side Technical Due Diligence",
    tagline: "For investors assessing a company's technology before they commit.",
    from: true,
    aed: "AED 35,000",
    usd: "From $9,500",
    meta: "Fixed scope · 1-3 weeks",
    features: [
      "Code, architecture, team and infrastructure",
      "Scope and timeline fixed up front",
      "Written risk report",
    ],
  },
];

/** Monthly retainers. */
const ONGOING: PriceCard[] = [
  {
    name: "Advisory",
    tagline: "For teams whose systems are stable and who want a senior second opinion.",
    aed: "AED 18,000",
    unit: "/month",
    usd: "$5,000 per month",
    meta: "Up to ~12 hours a month",
    features: [
      "Monthly steering session",
      "Async access between sessions",
      "Architecture, hiring and vendor second opinions",
    ],
  },
  {
    name: "Fractional CTO",
    tagline: "The CTO role, two days a week: decisions, delivery, hiring and the investor story.",
    aed: "AED 45,000",
    unit: "/month",
    usd: "$14,000 per month",
    meta: "2 days a week",
    features: [
      "Weekly steering call + written updates",
      "Architecture & release ownership",
      "Hiring support for your permanent team",
      "Vendor and agency management",
      "Board and investor technical narrative",
    ],
    highlighted: true,
  },
  {
    name: "Embedded CTO",
    tagline: "More time in the room, for a rebuild, a raise or a team that is growing fast.",
    aed: "AED 75,000",
    unit: "/month",
    usd: "$22,000-$28,000 per month",
    meta: "3 days a week",
    features: [
      "Everything in Fractional CTO",
      "Three days a week with your team",
      "Hands-on in design reviews, releases and incidents",
    ],
  },
];

const PROJECTS = [
  {
    name: "Rescue to Production",
    price: "From AED 55,000",
    usd: "from $15,000",
    desc: "Fixed scope, billed by milestone: production-ready in an agreed number of weeks.",
  },
  {
    name: "Hire your full-time CTO",
    price: "About one month's retainer",
    usd: "",
    desc: "Job description, sourcing, interview loop and handover to your permanent CTO.",
  },
];

/** Fractional and Embedded CTO retainers (Advisory has a monthly steering session instead). */
const INCLUDED = [
  "A written scope: days per week, responsibilities, deliverables and exit terms.",
  "A weekly steering call plus written updates you can forward to investors.",
  "Everything lives in your accounts: repos, cloud, docs. No lock-in.",
  "Hiring support for your permanent team, from job description to final interview.",
  "A handover path, so your eventual full-time CTO inherits a working system.",
];

const STEPS = [
  { step: "01", title: "Free 30-min call", desc: "Your situation, your stack, your goals. You get an honest read on what you need, whether or not we work together." },
  { step: "02", title: "Written scope", desc: "Days per week, responsibilities, deliverables and how it ends. Agreed before any work starts." },
  { step: "03", title: "Plug in", desc: "Within 1-2 weeks: access to your repos and tools, a weekly steering rhythm, and the first decisions made." },
  { step: "04", title: "Hand over", desc: "When the stage calls for a full-time CTO, help hiring them and a clean handover of systems and team." },
];

const CAREER = [
  { role: "Fractional CTO & Engineering Partner", org: "Independent", dates: "Mar 2026 — Present" },
  { role: "Chief Technology Officer", org: "Unlimits", dates: "Mar 2025 — Mar 2026" },
  { role: "Chief Technology Officer", org: "Invatu Technologies", dates: "Sep 2018 — Mar 2025" },
  { role: "Associate Technology", org: "Publicis Sapient", dates: "Mar 2015 — Jan 2018" },
];

const CLIENT_LOGOS = [
  { img: "/images/project-apcoa.jpg", name: "APCOA Parking" },
  { img: "/images/project-ferrari.jpg", name: "Ferrari World Abu Dhabi" },
  { img: "/images/project-social27.jpg", name: "Social27" },
  { img: "/images/project-vourity.png", name: "Vourity" },
  { img: "/images/project-atlas.jpg", name: "Atlas HXM" },
];

/* Verbatim quotes, shared with the homepage and /resume (src/lib/testimonials.ts). */
const TESTIMONIALS = [
  {
    img: "/images/testimonial-erlend.jpeg",
    name: "Erlend Bårli-Olsen",
    role: "APCOA Parkings GmbH",
    text: QUOTES.erlend,
  },
  {
    img: "/images/testimonial-max.jpeg",
    name: "Max Aronsson",
    role: "Long-term Collaborator",
    text: QUOTES.max,
  },
];

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

function PriceCardView({ p }: { p: PriceCard }) {
  return (
    <div
      className={`relative bg-[#1A1A1A] rounded-2xl p-8 h-full flex flex-col ${
        p.highlighted ? "border-2 border-mint shadow-[0_0_40px_rgba(141,217,191,0.1)]" : "border border-white/5"
      }`}
    >
      {p.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-mint text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          Most Common
        </div>
      )}
      <p className="text-xs uppercase tracking-wider text-white/50 mb-2">{p.meta}</p>
      <h4 className="text-xl font-semibold mb-3">{p.name}</h4>
      <div className="flex flex-wrap items-baseline gap-x-2">
        {p.from && <span className="text-sm text-white/50">From</span>}
        <span className="text-3xl font-bold text-mint whitespace-nowrap">{p.aed}</span>
        {p.unit && <span className="text-sm text-white/50">{p.unit}</span>}
      </div>
      <p className="text-sm text-white/50 mt-1">{p.usd}</p>
      <p className="text-white/50 mt-4 mb-6 text-sm leading-relaxed">{p.tagline}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/60">
            <Check />
            {f}
          </li>
        ))}
      </ul>
      {p.href && (
        <a href={p.href} className="block text-sm text-mint font-medium hover:underline mb-5">
          {p.linkLabel}&nbsp;&rarr;
        </a>
      )}
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center py-4 rounded-full font-semibold transition-all ${
          p.highlighted ? "bg-mint text-black hover:bg-mint-hover" : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        Discuss on a Free Call
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function FractionalCtoPage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            Mohit <span className="text-mint">Sengar</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#what-i-do" className="hover:text-white transition-colors">What I Do</a>
            <a href="#compare" className="hover:text-white transition-colors">Fractional vs Full-Time</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
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

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Fractional CTO", href: "/fractional-cto" }]} />

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
                  <span className="text-sm text-mint font-medium">Fractional CTO · Dubai &amp; Remote</span>
                </div>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  Fractional CTO in Dubai &amp; the UAE, for Startups That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-dark">Need to Ship</span>
                </h1>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
                <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                  I&apos;m Mohit Sengar, a Dubai-based CTO with 7 years in the seat. I take
                  AI-built and agency-built products to production and make them investor-ready,
                  then stay on as your part-time CTO, 2-3 days a week, until you&apos;re ready to
                  hire a full-time one. You work with me directly, at about half the loaded cost
                  of a full-time hire, starting in 1-2 weeks.
                </p>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-col sm:flex-row gap-4 mb-5">
                  <CtaButton>Book a Free Strategy Call</CtaButton>
                  <a
                    href="#compare"
                    className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                  >
                    Compare vs Full-Time
                  </a>
                </div>
                <p className="text-sm text-white/50 mb-14">
                  Not ready for a retainer?{" "}
                  <a href="/launch-check" className="text-mint font-medium hover:underline">
                    Start with a 5-day Launch Check &rarr;
                  </a>
                </p>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.4s" }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {STATS.map((s, i) => (
                    <div key={s.label} className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-bold text-mint">
                        {s.animate === false ? (
                          <span className="tabular-nums">{s.value}</span>
                        ) : (
                          <CountUp value={s.value} delay={0.3 + i * 0.1} />
                        )}
                      </div>
                      <div className="text-sm text-white/50 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-rise hidden lg:block" style={{ animationDelay: "0.25s" }}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/images/stats-photo.jpeg"
                  alt="Mohit Sengar, fractional CTO based in Dubai"
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-mint mb-1">Outstanding Leadership Award</p>
                  <p className="text-sm text-white/70">Internet 2.0 Conference, Dubai, February 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENT STRIP ─── */}
      <section className="border-y border-white/5 py-8 bg-[#111]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-white/50 mb-6">Trusted by teams at</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CLIENT_LOGOS.map((c) => (
              <div key={c.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="relative aspect-[3/2]">
                  <Image src={c.img} alt={c.name} fill sizes="200px" className="object-contain p-5" />
                </div>
                <p className="text-xs text-white/50 text-center px-2 pb-3">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SIGNALS ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Is this you?</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-14 leading-tight">
              Signs You Need a Fractional CTO
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {SIGNALS.map((s, i) => (
              <Reveal key={s} delay={(i % 2) * STAGGER.fast}>
                <div className="flex items-start gap-4 bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 h-full">
                  <span className="text-mint/40 font-bold text-lg leading-none mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-white/65 leading-relaxed">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-center text-white/80 font-medium text-lg md:text-xl mt-12">
              You don&apos;t need another developer. You need{" "}
              <span className="text-mint">someone who owns the technology</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── WHAT I DO ─── */}
      <section id="what-i-do" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>What a Fractional CTO Does</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">The Whole CTO Role, Part-Time</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Not advice from the sidelines. Decisions, ownership and accountability for
              how your technology gets built.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.title} delay={(i % 2) * STAGGER.normal} className="min-w-0">
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-7 md:p-8 h-full hover:border-mint/20 transition-colors">
                  <h3 className="text-xl font-semibold mb-3">{e.title}</h3>
                  <p className="text-white/50 leading-relaxed">{e.desc}</p>
                  {e.visual}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARE ─── */}
      <section id="compare" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Why Fractional?</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Fractional vs Full-Time CTO</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-14">
              Before Series B, most startups need the strategic layer of a CTO, not 60
              hours a week of it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CostCompareBar />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-white/[0.03] text-left">
                    <th className="px-5 py-4 font-medium text-white/50 uppercase tracking-wider text-xs" scope="col"><span className="sr-only">Factor</span></th>
                    <th className="px-5 py-4 font-semibold text-white/60" scope="col">Full-Time CTO</th>
                    <th className="px-5 py-4 font-semibold text-mint" scope="col">Fractional CTO</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.label} className="border-t border-white/[0.06]">
                      <th className="px-5 py-4 text-left font-medium text-white/50 uppercase tracking-wider text-xs" scope="row">{r.label}</th>
                      <td className="px-5 py-4 text-white/50">{r.ft}</td>
                      <td className="px-5 py-4 text-white font-medium">{r.fr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">How Much Does a Fractional CTO Cost?</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              My published prices: AED for clients in the UAE and GCC, USD for remote clients.
              Start with a fixed-fee review or go straight to a retainer; the scope is agreed in
              writing before any work starts.{" "}
              <a href="/blog/fractional-cto-cost-guide-2026" className="text-mint hover:underline">
                Read the full cost guide
              </a>
              .
            </p>
          </Reveal>

          {/* Start here: fixed-fee entry offers */}
          <Reveal>
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest text-mint/70 font-semibold">Start here</h3>
              <p className="text-white/50 text-sm mt-1">
                A fixed-fee look at where your product stands, before any retainer.
              </p>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {START_HERE.map((p, i) => (
              <Reveal key={p.name} delay={i * STAGGER.normal}>
                <PriceCardView p={p} />
              </Reveal>
            ))}
          </div>

          {/* Ongoing leadership: monthly retainers */}
          <Reveal>
            <div className="mt-20 mb-8">
              <h3 className="text-sm uppercase tracking-widest text-mint/70 font-semibold">Ongoing leadership</h3>
              <p className="text-white/50 text-sm mt-1">
                Monthly retainers, set by days per week so you know exactly what you are buying.
              </p>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {ONGOING.map((p, i) => (
              <Reveal key={p.name} delay={i * STAGGER.normal}>
                <PriceCardView p={p} />
              </Reveal>
            ))}
          </div>

          {/* Projects & handover */}
          <Reveal delay={0.1}>
            <div className="mt-14 bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 md:p-10">
              <h3 className="text-sm uppercase tracking-widest text-mint/70 font-semibold mb-6">Projects &amp; handover</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    <h4 className="text-lg font-semibold text-white">{p.name}</h4>
                    <p className="mt-1">
                      <span className="text-mint font-semibold">{p.price}</span>
                      {p.usd && <span className="text-sm text-white/50"> · {p.usd}</span>}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed mt-2">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-white/50 leading-relaxed max-w-3xl mx-auto text-center">
              Retainers are billed monthly in advance, with a 3-month minimum and then one
              month&apos;s notice. The Launch Check or Readiness Review fee is credited in full
              against a retainer signed within 30 days.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 md:p-10">
              <h3 className="text-xl font-semibold mb-2">Every Fractional and Embedded CTO retainer includes</h3>
              <p className="text-sm text-white/50 mb-6">Advisory has a monthly steering session and async access instead.</p>
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60 leading-relaxed">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionLabel>How It Works</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">From First Call to Full Speed</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * STAGGER.normal}>
                <div className="relative">
                  <div className="text-6xl font-bold text-mint/10 mb-4">{s.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-white/50 leading-relaxed">{s.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-white/10 text-2xl" aria-hidden="true">
                      &rarr;
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO YOU GET ─── */}
      <section className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-widest text-mint/60 mb-4">Who You Get</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  A CTO Who Has Already Done the Job
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-white/55 leading-relaxed mb-8">
                  I&apos;m Mohit Sengar, a Dubai-based CTO. I&apos;ve spent 14+ years building
                  software for 40+ companies across healthcare, fintech, e-commerce, parking and
                  theme-park operations, including 7+ years as a CTO at Invatu Technologies and
                  Unlimits. I work in person with teams in Dubai and Abu Dhabi, and remotely with
                  clients in the US, UK and Europe.
                </p>
                <p className="text-white/55 leading-relaxed mb-6">
                  QA and quality engineering is{" "}
                  <a href="/qa" className="text-mint hover:underline">
                    my delivery bench
                  </a>
                  : the testing capability behind the CTO work.
                </p>
                <p className="text-sm text-white/50 leading-relaxed mb-8">
                  <span className="text-white/60 font-medium">Credential:</span> Outstanding
                  Leadership Award, Internet 2.0 Conference, Dubai, February 2024, for steering
                  Invatu Technologies.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <ol className="relative border-l border-white/10 ml-2 space-y-6 mb-8">
                  {CAREER.map((c) => (
                    <li key={c.org} className="pl-6 relative">
                      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-mint" aria-hidden="true" />
                      <p className="text-xs text-white/50 mb-0.5">{c.dates}</p>
                      <p className="font-semibold text-white">{c.role}</p>
                      <p className="text-sm text-white/50">{c.org}</p>
                    </li>
                  ))}
                </ol>
                <a href="/resume" className="text-mint text-sm font-medium hover:underline">
                  See the full resume &rarr;
                </a>
              </Reveal>
            </div>

            <div className="space-y-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={0.15 + i * STAGGER.normal}>
                  <figure className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-7">
                    <blockquote className="text-white/65 leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</blockquote>
                    <figcaption className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                        <Image src={t.img} alt={t.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-white/50">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HONEST FIT ─── */}
      <section className="py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="bg-gradient-to-r from-mint/10 to-transparent border border-mint/15 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">When You Shouldn&apos;t Hire Me</h2>
              <p className="text-white/55 leading-relaxed mb-4">
                If engineering is your core moat and you&apos;re past roughly 15 engineers, you
                need a full-time CTO&apos;s daily presence, and I&apos;ll help you hire one. If
                what you actually need is another senior developer, hire that directly; it&apos;s
                cheaper.
              </p>
              <p className="text-white/80 font-medium">
                I only take work I can deliver, and you&apos;ll hear it on the first call.
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
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Fractional CTO FAQ</h2>
          </Reveal>
          <div className="space-y-4">
            {FCTO_FAQS.map((f, i) => (
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
              Get a CTO&apos;s Read on Your Situation.
              <br />
              <span className="text-mint">Free, in 30 Minutes.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Tell me where the product, team and roadmap stand. You&apos;ll get an honest read
              on what you need, whether or not we work together.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center">
              <CtaButton className="px-10 py-5 text-lg">Book Your Free Strategy Call</CtaButton>
              <WhatsAppLink
                className="mt-5 text-sm text-mint font-medium hover:underline"
                label="Or message me on WhatsApp"
              />
            </div>
            <p className="text-xs text-white/50 mt-5">No obligation · 30 minutes · An honest read on what you need</p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
