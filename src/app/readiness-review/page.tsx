"use client";

import Image from "next/image";
import { useState, useRef, useId, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CountUp } from "@/components/motion";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/contact";
import { READINESS_FAQS } from "./faqs";
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
  { value: "2", label: "Weeks" },
  { value: "8", label: "Areas reviewed" },
  { value: "14+", label: "Years building software" },
  { value: "7+", label: "Years as a CTO" },
];

const HERO_INCLUDES = [
  "2 weeks, fixed fee",
  "Investor-forwardable written report",
  "Every risk rated, with a recommended fix",
  "Presented live, to your board or lead investor if you want",
  "Fee credited in full to a retainer signed within 30 days",
];

const WHO = [
  {
    title: "Founders about to raise",
    desc: "Investors will ask who owns the technology, what breaks at scale and what the cloud bill will become. Know your answers, and fix the worst gaps, before they ask.",
  },
  {
    title: "Founders about to scale",
    desc: "More users, more engineers or a new market. Find out what fails first, and what to fix, hire for or stop doing, before growth finds it for you.",
  },
  {
    title: "Boards and investors",
    desc: "An independent view of a company where delivery is slipping, a CTO has left or a follow-on round is coming. Investing in a new company? See buy-side due diligence below.",
  },
];

const SCOPE = [
  {
    title: "Architecture & scalability",
    desc: "How the system is built, where it breaks at ten times today's usage, and the single points of failure.",
  },
  {
    title: "Code quality & testing",
    desc: "Structure and readability, tests on the critical paths, CI, and how safely changes reach production.",
  },
  {
    title: "Security & data protection",
    desc: "Auth, access control, secrets and personal-data handling, with likely UAE PDPL or GDPR exposure flagged for your lawyer.",
  },
  {
    title: "Infrastructure & cloud cost",
    desc: "Hosting, environments, backups and monitoring, and what drives the cloud bill as you grow.",
  },
  {
    title: "Team & delivery process",
    desc: "Who does what, how work is planned and released, key-person risk, and how agencies or contractors are managed.",
  },
  {
    title: "Technical debt & roadmap",
    desc: "Which debt is slowing you down, and what the roadmap needs that the system can't yet do.",
  },
  {
    title: "IP & account ownership",
    desc: "Repos, cloud, domains and app-store accounts in company names, contractor IP assignment, and open-source licences.",
  },
  {
    title: "AI/LLM usage & risk",
    desc: "Model and vendor dependence, prompt-injection and data-leakage exposure, evaluation, and cost controls.",
  },
];

const DELIVERABLES = [
  {
    title: "Investor-forwardable written report",
    desc: "A plain-language executive summary up front and the detailed findings behind it, written so you can send it to investors or your board as it stands.",
  },
  {
    title: "Risks rated, with recommended fixes",
    desc: "Each risk rated by severity, with a recommended fix and an effort estimate, so the report turns straight into a plan.",
  },
  {
    title: "Prioritised recommendations",
    desc: "What to fix first, what to hire for and what to stop doing, ordered by their effect on the raise or the next stage of growth.",
  },
  {
    title: "Live presentation",
    desc: "I present the findings to you and, if you want, your board or lead investor, and take the hard questions in the room.",
  },
];

const TIMELINE = [
  {
    week: "Week 1",
    title: "Discovery",
    items: [
      "Kick-off call and access to repositories, cloud and tools",
      "Interviews with the founders and the people who build the product: in-house, contractors or agency",
      "Architecture, code and infrastructure review",
      "Security, data-protection and AI/LLM walkthrough",
    ],
  },
  {
    week: "Week 2",
    title: "Analysis & report",
    items: [
      "Delivery process, team structure and key-person risk",
      "IP, licences and account-ownership checks",
      "Cloud cost and technical debt measured against the roadmap",
      "Draft checked with you for factual accuracy",
      "Final report and live presentation",
    ],
  },
];

const DD_POINTS = [
  "1 to 3 weeks, with a fixed scope agreed up front",
  "The same eight areas, focused on the deal: is the technology what the pitch says, what will it cost to fix, and can the team deliver the plan?",
  "A written report to you, the investor, with red flags and deal-relevant risks called out",
  "Scope and price set by the size of the company and your deadline",
];

const RETAINERS = [
  {
    name: "Advisory",
    price: "AED 18,000",
    usd: "$5,000",
    period: "per month",
    desc: "Up to about 12 hours a month: monthly steering and async access while your team works through the plan.",
    highlighted: false,
  },
  {
    name: "Fractional CTO",
    price: "AED 45,000",
    usd: "$14,000",
    period: "per month",
    desc: "2 days a week as your part-time CTO: architecture, delivery, hiring and the investor-facing technical story.",
    highlighted: true,
  },
  {
    name: "Embedded CTO",
    price: "AED 75,000",
    usd: "$22,000-$28,000",
    period: "per month",
    desc: "3 days a week, for a heavier stretch such as a rebuild, a fast hiring push or the months around a raise.",
    highlighted: false,
  },
];

const CAREER = [
  { role: "Fractional CTO & Engineering Partner", org: "Independent", dates: "Mar 2026 — Present" },
  { role: "Chief Technology Officer", org: "Unlimits", dates: "Mar 2025 — Mar 2026" },
  { role: "Chief Technology Officer", org: "Invatu Technologies", dates: "Sep 2018 — Mar 2025" },
  { role: "Associate Technology", org: "Publicis Sapient", dates: "Mar 2015 — Jan 2018" },
];

const TESTIMONIAL = {
  img: "/images/testimonial-erlend.jpeg",
  name: "Erlend Bårli-Olsen",
  role: "APCOA Parkings GmbH",
  text: QUOTES.erlend,
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
export default function ReadinessReviewPage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-clip">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            Mohit <span className="text-mint">Sengar</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#scope" className="hover:text-white transition-colors">Scope</a>
            <a href="#deliverables" className="hover:text-white transition-colors">What You Get</a>
            <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
            <a href="#investors" className="hover:text-white transition-colors">For Investors</a>
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

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Readiness Review", href: "/readiness-review" }]} />

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
                  <span className="text-sm text-mint font-medium">Readiness Review · Dubai &amp; Remote</span>
                </div>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  Production &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-dark">Investor Readiness</span>{" "}
                  Review
                </h1>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
                <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                  About to raise, or about to scale? In two weeks I review your architecture, code,
                  security, team and delivery process the way a technical investor would, and write
                  it up in a report you can forward to investors. Then I present it live.
                </p>
              </div>
              <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                  <CtaButton>Book a Free Fit Call</CtaButton>
                  <a
                    href="/investor-tech-checklist"
                    className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                  >
                    Free Investor Checklist
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
                <p className="text-4xl md:text-5xl font-bold text-mint">AED 27,500</p>
                <p className="text-white/50 mt-2">$7,500</p>
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

      {/* ─── WHO IT'S FOR ─── */}
      <section id="who" className="py-24 md:py-32 border-t border-white/5 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Who it&apos;s for</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-14 leading-tight">
              An Independent View, Before It Matters
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {WHO.map((w, i) => (
              <Reveal key={w.title} delay={i * STAGGER.normal}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-7 h-full hover:border-mint/20 transition-colors">
                  <span className="text-mint/40 font-bold text-lg">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-semibold mt-3 mb-3">{w.title}</h3>
                  <p className="text-white/50 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SCOPE ─── */}
      <section id="scope" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Scope</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Eight Areas Investors Look At</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              The whole technology function, not just the code: the system, the people who build
              it, and the risks a diligent investor will find.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCOPE.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * STAGGER.fast}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 h-full hover:border-mint/20 transition-colors">
                  <p className="text-mint/40 font-bold text-sm mb-2">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-center text-xs text-white/50 mt-10 max-w-2xl mx-auto">
              The review flags likely data-protection and IP issues for your lawyer. It is not legal
              advice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── DELIVERABLES ─── */}
      <section id="deliverables" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>What you get</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">A Report You Can Forward</h2>
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

      {/* ─── TIMELINE ─── */}
      <section id="timeline" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Timeline</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Two Weeks, Start to Finish</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              It starts with a free 30-minute fit call to agree the scope, the start date and who
              should be in the room for the presentation.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.week} delay={i * STAGGER.normal}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-7 md:p-8 h-full">
                  <div className="text-5xl font-bold text-mint/15 mb-3">{t.week}</div>
                  <h3 className="text-xl font-semibold mb-5">{t.title}</h3>
                  <ul className="space-y-3">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/60 leading-relaxed text-sm md:text-base">
                        <Check />
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

      {/* ─── FOR INVESTORS ─── */}
      <section id="investors" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 md:p-12">
              <div>
                <p className="text-sm uppercase tracking-widest text-mint/60 mb-4">For investors</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
                  Buy-side Technical Due Diligence
                </h2>
                <p className="text-white/55 leading-relaxed mb-7">
                  For VCs, private equity, family offices and angels who need an independent
                  technical view before a deal closes, or on a portfolio company that needs one. I
                  report to you, the investor.
                </p>
                <ul className="space-y-3">
                  {DD_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-white/60 leading-relaxed">
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0A0A0A]/60 border border-mint/20 rounded-2xl p-8 text-center lg:text-left">
                <p className="text-xs uppercase tracking-widest text-mint/70 mb-3">Fixed scope</p>
                <p className="text-3xl md:text-4xl font-bold text-mint">From AED 35,000</p>
                <p className="text-white/50 mt-2 mb-8">From $9,500 · 1-3 weeks</p>
                <CtaButton className="w-full">Scope It on a Call</CtaButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── AFTER THE REVIEW ─── */}
      <section id="next" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>After the review</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Fix It Yourself, or Keep Me On</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              The report is written so your own team can act on it. If you want a CTO to see it
              through, these are the options, with prices published.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {RETAINERS.map((r, i) => (
              <Reveal key={r.name} delay={i * STAGGER.normal}>
                <div
                  className={`relative bg-[#1A1A1A] rounded-2xl p-8 h-full flex flex-col ${
                    r.highlighted ? "border-2 border-mint shadow-[0_0_40px_rgba(141,217,191,0.1)]" : "border border-white/5"
                  }`}
                >
                  {r.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-mint text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Most Common
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{r.name}</h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl font-bold text-mint">{r.price}</span>
                    <span className="text-sm text-white/50">{r.period}</span>
                  </div>
                  <p className="text-sm text-white/50 mt-1">{r.usd} {r.period}</p>
                  <p className="text-white/50 mt-4 text-sm leading-relaxed flex-1">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10 bg-gradient-to-r from-mint/10 to-transparent border border-mint/15 rounded-2xl p-7 md:p-8">
              <p className="text-white/80 font-medium leading-relaxed">
                The Readiness Review fee is credited in full against a retainer signed within 30 days.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mt-2">
                Retainers are billed monthly in advance, with a 3-month minimum and then one
                month&apos;s notice. When you are ready for a full-time CTO, I help you hire one (job
                description, sourcing, interview loop and handover) for about one month&apos;s
                retainer.{" "}
                <a href="/fractional-cto" className="text-mint hover:underline">
                  How the fractional CTO role works
                </a>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-center text-sm text-white/50 mt-8">
              Built on Lovable, Bolt, Cursor or another AI builder and not raising yet? The 5-day{" "}
              <a href="/launch-check" className="text-mint hover:underline">
                Launch Check
              </a>{" "}
              (AED 9,500 / $2,500) may be the better first step.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── WHO YOU GET ─── */}
      <section className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-widest text-mint/60 mb-4">Who does the review</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  A CTO Who Has Sat in the Seat
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
                  I&apos;ve spent 14+ years building software for 40+ companies. As CTO at Invatu
                  Technologies and then Unlimits I ran engineering teams and delivery, and at
                  Invatu I also ran security audits and data-protection training. That is why the
                  review covers people and process as well as code. I work in person in Dubai and
                  Abu Dhabi, and remotely with founders and investors in the US, UK and Europe.
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
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Credentials</p>
                <p className="text-sm text-white/60 mb-6">
                  Outstanding Leadership Award, Internet 2.0 Conference, Dubai, February 2024
                </p>
                <a href="/resume" className="text-mint text-sm font-medium hover:underline">
                  See the full resume &rarr;
                </a>
              </Reveal>
            </div>

            <div className="space-y-6">
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
              <Reveal delay={0.25}>
                <a
                  href="/investor-tech-checklist"
                  className="group block bg-gradient-to-br from-mint/10 to-transparent border border-mint/25 rounded-2xl p-7 hover:border-mint/50 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-mint mb-2">Free, no email needed</p>
                  <p className="text-xl font-semibold mb-2 group-hover:text-mint transition-colors">
                    Investor Tech Due-Diligence Checklist
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">
                    40 questions investors ask about your technology, each with what good looks like.
                    Work through it with your team before the review, or instead of it.
                  </p>
                  <p className="text-mint text-sm font-medium mt-4">Open the checklist &rarr;</p>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Questions &amp; Answers</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Readiness Review FAQ</h2>
          </Reveal>
          <div className="space-y-4">
            {READINESS_FAQS.map((f, i) => (
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
              Know What Investors Will Find.
              <br />
              <span className="text-mint">Before They Find It.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Book a free 30-minute fit call. Tell me where the product, team and raise stand, and
              we&apos;ll agree whether a Readiness Review, a Launch Check or something else is the
              right first step.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <CtaButton className="px-10 py-5 text-lg">Book Your Free Fit Call</CtaButton>
            <p className="text-xs text-white/50 mt-5">Free fit call · 2 weeks · AED 27,500 / $7,500 fixed</p>
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
