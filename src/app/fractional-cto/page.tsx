"use client";

import Image from "next/image";
import { useState, useRef, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
import { FCTO_FAQS } from "./faqs";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION TOKENS
   ═══════════════════════════════════════════════════════════════ */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const STAGGER = { fast: 0.08, normal: 0.12 };
const CALENDLY = "https://calendly.com/mohitsengarr";

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
  { value: "40+", label: "Companies Served" },
  { value: "100%", label: "Job Success Rate" },
  { value: "14+", label: "Years Engineering" },
  { value: "7+", label: "Years as a CTO" },
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
    desc: "10-20 hours a week inside your leadership team: architecture decisions, sprint and release oversight, vendor management and weekly steering.",
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
    desc: "Pre-investment or pre-acquisition review of code, team and infrastructure, delivered as a written risk report in about a week.",
    visual: <DueDiligenceViz />,
  },
];

const COMPARE_ROWS = [
  { label: "Annual cost", ft: "$300K-$450K+", fr: "70-80% less" },
  { label: "Time to start", ft: "3-6 months", fr: "1-2 weeks" },
  { label: "Commitment", ft: "Full-time, plus equity", fr: "10-20 hrs/week, scale up or down" },
  { label: "Wrong-hire risk", ft: "6-12 months lost", fr: "Ends with notice" },
  { label: "Experience", ft: "Varies by hire", fr: "14+ years, 40+ companies" },
];

const PRICING = [
  {
    name: "Advisory",
    range: "from ~$5K",
    period: "per month",
    desc: "A few strategy calls a month plus async review. Suits teams whose systems are stable and who need a senior second opinion.",
    features: ["Monthly strategy calls", "Async architecture & PR review", "Hiring and vendor second opinions"],
    highlighted: false,
  },
  {
    name: "Fractional CTO",
    range: "$12K-$28K",
    period: "per month",
    desc: "The full CTO role for 10-20 hours a week: decisions, delivery, hiring and investor-facing technical planning.",
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
    name: "Project-Scoped",
    range: "from $15K",
    period: "fixed scope",
    desc: "One defined outcome: a due-diligence report, an architecture review, a rebuild plan or an AI initiative.",
    features: ["Fixed scope and timeline", "Written deliverable", "Handover walkthrough"],
    highlighted: false,
  },
];

const INCLUDED = [
  "A written scope: hours, responsibilities, deliverables and exit terms.",
  "A weekly steering call plus written updates you can forward to investors.",
  "Everything lives in your accounts: repos, cloud, docs. No lock-in.",
  "Hiring support for your permanent team, from job description to final interview.",
  "A handover path, so your eventual full-time CTO inherits a working system.",
];

const STEPS = [
  { step: "01", title: "Free 30-min call", desc: "Your situation, your stack, your goals. You leave with three concrete recommendations either way." },
  { step: "02", title: "Written scope", desc: "Hours, responsibilities, deliverables and how it ends. Agreed before any work starts." },
  { step: "03", title: "Plug in", desc: "Within 1-2 weeks: access to your repos and tools, a weekly steering rhythm, and the first decisions made." },
  { step: "04", title: "Hand over", desc: "When the stage calls for a full-time CTO, help hiring them and a clean handover of systems and team." },
];

const CAREER = [
  { role: "Fractional CTO & Engineering Partner", org: "Independent", dates: "2026 — Present" },
  { role: "Chief Technology Officer", org: "Unlimits", dates: "2025 — 2026" },
  { role: "Chief Technology Officer", org: "Invatu Technologies", dates: "2018 — 2025" },
  { role: "Associate Technology", org: "Publicis Sapient", dates: "2015 — 2018" },
];

const CLIENT_LOGOS = [
  { img: "/images/project-apcoa.jpg", name: "APCOA Parking" },
  { img: "/images/project-ferrari.jpg", name: "Ferrari World Abu Dhabi" },
  { img: "/images/project-social27.jpg", name: "Social27" },
  { img: "/images/project-vourity.png", name: "Vourity" },
  { img: "/images/project-atlas.jpg", name: "Atlas HXM" },
];

const TESTIMONIALS = [
  {
    img: "/images/testimonial-erlend.jpeg",
    name: "Erlend Bårli-Olsen",
    role: "APCOA Parkings GmbH",
    text: "My absolute pleasure to endorse Mohit — an invaluable asset and the pivotal force behind our success at APCOA Parkings GmbH. He has consistently demonstrated exceptional technical acumen and unwavering dedication to our projects.",
  },
  {
    img: "/images/testimonial-max.jpeg",
    name: "Max Aronsson",
    role: "Long-term Collaborator",
    text: "Competent and trustworthy fullstack developer. Mohit is communicative and a great team player. Always available and open to new ideas — he thrived in a fast changing environment. Solved complex problems during many years of collaboration.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * STAGGER.fast}>
      <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-mint/20 transition-colors">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
          aria-expanded={open}
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
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <p className="px-6 pb-6 text-white/60 leading-relaxed">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function CtaButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY}
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
            href={CALENDLY}
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
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  <span className="text-sm text-mint font-medium">Fractional CTO · Dubai &amp; Remote</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  Fractional CTO Services for Startups That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-dark">Need to Ship</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                  Senior technology leadership 10-20 hours a week: architecture, hiring,
                  delivery and an investor-ready technical plan, from a CTO who has done it
                  for 40+ companies. At 70-80% less than a full-time hire, starting in 1-2 weeks.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                  <CtaButton>Book a Free Strategy Call</CtaButton>
                  <a
                    href="#compare"
                    className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                  >
                    Compare vs Full-Time
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {STATS.map((s, i) => (
                    <div key={s.label} className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-bold text-mint">
                        <CountUp value={s.value} delay={0.3 + i * 0.1} />
                      </div>
                      <div className="text-sm text-white/40 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/images/stats-photo.jpeg"
                  alt="Mohit Sengar, award-winning fractional CTO"
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-mint mb-1">Outstanding Leadership Award</p>
                  <p className="text-sm text-white/70">Internet 2.0 Conference, Dubai 2024</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CLIENT STRIP ─── */}
      <section className="border-y border-white/5 py-8 bg-[#111]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-white/30 mb-6">Trusted by teams at</p>
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
              <Reveal key={e.title} delay={(i % 2) * STAGGER.normal}>
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
                    <th className="px-5 py-4 font-medium text-white/40 uppercase tracking-wider text-xs" scope="col"><span className="sr-only">Factor</span></th>
                    <th className="px-5 py-4 font-semibold text-white/60" scope="col">Full-Time CTO</th>
                    <th className="px-5 py-4 font-semibold text-mint" scope="col">Fractional CTO</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.label} className="border-t border-white/[0.06]">
                      <th className="px-5 py-4 text-left font-medium text-white/40 uppercase tracking-wider text-xs" scope="row">{r.label}</th>
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
              Typical 2026 ranges for senior fractional CTOs. Your exact scope and quote are
              set on the free first call, with no surprises later.{" "}
              <a href="/blog/fractional-cto-cost-guide-2026" className="text-mint hover:underline">
                Read the full cost guide
              </a>
              .
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * STAGGER.normal}>
                <div
                  className={`relative bg-[#1A1A1A] rounded-2xl p-8 h-full flex flex-col ${
                    p.highlighted ? "border-2 border-mint shadow-[0_0_40px_rgba(141,217,191,0.1)]" : "border border-white/5"
                  }`}
                >
                  {p.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-mint text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Most Common
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-mint">{p.range}</span>
                    <span className="text-sm text-white/40">{p.period}</span>
                  </div>
                  <p className="text-white/50 mt-3 mb-6 text-sm leading-relaxed">{p.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-4 rounded-full font-semibold transition-all ${
                      p.highlighted ? "bg-mint text-black hover:bg-mint-hover" : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    Discuss on a Free Call
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 md:p-10">
              <h3 className="text-xl font-semibold mb-6">Every engagement includes</h3>
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
                  I&apos;m Mohit Sengar. I&apos;ve spent 14+ years building technology for
                  40+ companies across healthcare, fintech, e-commerce, parking and theme-park
                  operations, including more than seven years as a full-time CTO. In 2024 I
                  received the Outstanding Leadership Award at Dubai&apos;s Internet 2.0
                  Conference for leading Invatu Technologies.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <ol className="relative border-l border-white/10 ml-2 space-y-6 mb-8">
                  {CAREER.map((c) => (
                    <li key={c.org} className="pl-6 relative">
                      <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-mint" aria-hidden="true" />
                      <p className="text-xs text-white/35 mb-0.5">{c.dates}</p>
                      <p className="font-semibold text-white">{c.role}</p>
                      <p className="text-sm text-white/45">{c.org}</p>
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
                        <p className="text-sm text-white/40">{t.role}</p>
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
                You&apos;ll hear that on the first call. My 100% job success rate depends on
                taking only the work I can deliver.
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
              Tell me where the product, team and roadmap stand. You&apos;ll leave with three
              concrete recommendations, whether or not we work together.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <CtaButton className="px-10 py-5 text-lg">Book Your Free Strategy Call</CtaButton>
            <p className="text-xs text-white/30 mt-5">No obligation · 30 minutes · 3 free recommendations</p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
