"use client";

import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION SYSTEM
   ═══════════════════════════════════════════════════════════════ */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const REVEAL = { duration: 0.8, ease: EASE_OUT, distance: 40 };
const STAGGER = { fast: 0.08, normal: 0.12 };

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const map = {
    up: { y: REVEAL.distance, x: 0 },
    down: { y: -REVEAL.distance, x: 0 },
    left: { x: REVEAL.distance, y: 0 },
    right: { x: -REVEAL.distance, y: 0 },
    none: { x: 0, y: 0 },
  };
  const initial = { opacity: 0, ...map[direction] };
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: REVEAL.duration, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
  stagger = STAGGER.normal,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: REVEAL.duration, ease: EASE_OUT },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

/* Accent: electric violet for the AI/vibe coding theme */
const ACCENT = "#A78BFA"; // violet-400
const ACCENT_HEX = "#7C3AED"; // violet-600

const PLATFORMS = [
  {
    name: "Lovable",
    desc: "React + Supabase full-stack. Best for non-technical founders wanting a complete MVP fast.",
    strength: "Simplest end-to-end",
    logo: "L",
  },
  {
    name: "Bolt.new",
    desc: "Multi-framework (React, Vue, Next.js). Browser-based, open source. Best for flexible prototyping.",
    strength: "Fastest iteration",
    logo: "B",
  },
  {
    name: "Replit",
    desc: "Full IDE + deployment. Most autonomous AI agent. Best for developers who want visibility.",
    strength: "Most transparent",
    logo: "R",
  },
  {
    name: "Base44",
    desc: "Built-in database, auth, email, SMS. No external config needed. Best for enterprise compliance.",
    strength: "All-in-one platform",
    logo: "44",
  },
  {
    name: "v0 by Vercel",
    desc: "Frontend UI generation specialist. 2M+ users. Best for React components and landing pages.",
    strength: "UI generation king",
    logo: "v0",
  },
  {
    name: "Cursor / Claude Code",
    desc: "AI-powered code editors for professional developers. Best for complex, custom codebases.",
    strength: "Pro-grade control",
    logo: "C",
  },
];

const SERVICES = [
  {
    title: "Rapid MVP Development",
    desc: "Production-grade MVPs built in days, not months. We use the right AI tool for your project — Lovable, Bolt, Replit, or Base44 — but with proper architecture, authentication, and security from day one.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    timeline: "3 days – 2 weeks",
  },
  {
    title: "Vibe-Coded App Rescue",
    desc: "Your AI-generated app is broken, insecure, or won't scale. We fix it — security flaws, silent business logic bugs, missing error handling, and the spaghetti code that AI left behind.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.19a.75.75 0 00-1.137.644v6.752a.75.75 0 001.137.644l5.384-3.19a.75.75 0 000-1.288v0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    timeline: "1 – 2 weeks",
  },
  {
    title: "AI App Security Audit",
    desc: "10.3% of Lovable apps have critical security flaws. We audit your AI-generated codebase for RLS vulnerabilities, API key leaks, auth bypasses, and data exposure before it costs you.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    timeline: "3 – 5 days",
  },
  {
    title: "Scale-Up Engineering",
    desc: "Your MVP proved the concept. Now it needs to handle real traffic. We add logging, monitoring, caching, load balancing, and the production infrastructure AI tools never generate.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    timeline: "2 – 4 weeks",
  },
  {
    title: "Platform Migration",
    desc: "Outgrown Lovable or Base44? We migrate your app to a custom stack — Next.js, React, Node.js — with zero downtime and full data preservation. No more vendor lock-in.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    timeline: "1 – 3 weeks",
  },
  {
    title: "AI-Powered Custom Builds",
    desc: "Complex apps that need custom logic, third-party API integrations, real-time features, or domain-specific algorithms — where pure AI tools break down and CTO-level engineering takes over.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    timeline: "2 – 6 weeks",
  },
];

const DANGER_STATS = [
  { stat: "10.3%", label: "of Lovable apps have critical security flaws (RLS)" },
  { stat: "1.7x", label: "more major issues in AI-generated vs human code" },
  { stat: "2.74x", label: "higher security vulnerability rate in AI code" },
  { stat: "0%", label: "of AI tools generate production infrastructure" },
];

const RESULTS = [
  { metric: "10x", label: "Faster Delivery", desc: "MVP in days, not months" },
  { metric: "40+", label: "Clients Served", desc: "Across every industry" },
  { metric: "100%", label: "Success Rate", desc: "Every project shipped" },
  { metric: "14+", label: "Years Experience", desc: "CTO-level engineering" },
  { metric: "0", label: "Security Breaches", desc: "Production-grade from day 1" },
  { metric: "$4.7B", label: "Market We Lead", desc: "Vibe coding market 2026" },
];

const FAQS = [
  {
    q: "What is vibe coding and why do I need an expert?",
    a: "Vibe coding uses AI tools like Lovable, Bolt.new, Replit, and Base44 to build apps from natural language prompts — 10x faster than traditional development. But research shows AI-generated code has 1.7x more major issues and 2.74x higher security vulnerability rates. An expert ensures your app is production-ready, secure, and scalable — not just a working demo.",
  },
  {
    q: "Which vibe coding platform is best for my project?",
    a: "It depends on your needs. Lovable is best for non-technical founders wanting a quick MVP. Bolt.new for teams that want multi-framework flexibility. Replit for developers who want transparency. Base44 for enterprise compliance. v0 for frontend UI. Cursor/Claude Code for complex custom builds. We assess your project and recommend the optimal tool — or combine several.",
  },
  {
    q: "How fast can you build an MVP?",
    a: "Landing pages and simple apps: 2-3 days. Full MVP with auth, database, and APIs: 1-2 weeks. Complex multi-feature SaaS: 2-4 weeks. That's 5-10x faster than traditional development, but with production-grade quality from day one — proper architecture, security, and monitoring.",
  },
  {
    q: "Can you fix my broken vibe-coded app?",
    a: "Yes — that's our Vibe-Coded App Rescue service. Common issues we fix: security vulnerabilities (10.3% of Lovable apps have critical RLS flaws), silent business logic failures, API key leaks, subscription bypasses, database chaos, and missing production infrastructure like logging and error handling.",
  },
  {
    q: "What makes you different from other vibe coders?",
    a: "Most vibe coders are prompt engineers who know how to talk to AI but can't debug what it produces. Mohit Sengar is an award-winning CTO with 14+ years of enterprise engineering leadership across 40+ clients. He uses AI tools as accelerators within a proper engineering framework — you get the speed of vibe coding with the reliability of battle-tested engineering.",
  },
  {
    q: "I'm a non-technical founder. Can you handle everything?",
    a: "Absolutely. We handle the entire lifecycle: platform selection, architecture design, development, testing, deployment, and ongoing support. You describe what you want in plain English, we build it. You'll get daily updates and staging previews so you see progress in real-time.",
  },
  {
    q: "What does pricing look like?",
    a: "Freelance vibe coders charge $75-350/hr. Traditional agencies charge $30K-150K for an MVP. We deliver faster than both at competitive rates because AI tools are force multipliers — but with CTO-level quality. Pricing depends on scope; we discuss transparently on the strategy call.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-[var(--color-border)]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center py-6 px-2 text-left min-h-[56px] group"
          aria-expanded={open}
        >
          <span className="text-base md:text-lg font-medium pr-4 text-white group-hover:text-violet-400 transition-colors duration-300">
            {q}
          </span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${open ? "text-violet-400" : "text-[var(--color-text-muted)]"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <p className="px-2 pb-6 text-[var(--color-text-secondary)] leading-relaxed">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function VibeCodingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[var(--color-bg)] text-white">
      {/* ═══ HEADER ═══ */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-nav-bg)] backdrop-blur-xl shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-white font-bold text-lg tracking-tight">
            Mohit Sengar
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Home
            </Link>
            <a href="#services" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Services
            </a>
            <a href="#platforms" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Platforms
            </a>
            <a href="#why-expert" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Why an Expert
            </a>
            <a href="#faq" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              FAQ
            </a>
            <a
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-violet-500/20"
            >
              Free Strategy Call
            </a>
          </div>
        </div>
      </motion.header>

      {/* ═══ Floating Mobile CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl px-4 py-3 border-t border-[var(--color-divider)]">
        <a
          href="https://calendly.com/mohitsengarr"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-violet-500 hover:bg-violet-400 active:bg-violet-600 active:scale-[0.98] text-white font-semibold py-3.5 rounded-full transition-all text-center text-base"
        >
          Get a Free Vibe Coding Strategy Call
        </a>
      </div>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-start overflow-hidden"
      >
        {/* Violet/purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0E0A14] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-15">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600 rounded-full blur-[200px]" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10">
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[150px]" />
        </div>

        <motion.div
          className="relative z-10 text-left px-6 md:px-16 lg:px-24 max-w-7xl w-full pt-32 md:pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-violet-500/[0.08] border border-violet-500/[0.15] rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-violet-300/80 font-medium">
              Vibe Coding Expert &bull; CTO-Level Engineering
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.08] mb-8 max-w-4xl tracking-tight text-white"
          >
            Don&apos;t Just Vibe Code.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Vibe Code Right.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
            className="text-base md:text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed"
          >
            82% of AI-generated apps fail in production. Yours won&apos;t. An award-winning
            CTO with 14+ years experience builds production-grade MVPs using Lovable, Bolt,
            Replit &amp; Base44 &mdash; 10x faster, with zero security shortcuts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block bg-violet-500 hover:bg-violet-400 active:bg-violet-600 active:scale-95 text-white font-semibold px-8 py-4 rounded-full transition-all text-base hover:shadow-xl hover:shadow-violet-500/20"
            >
              Build My MVP Now &rarr;
            </a>
            <a
              href="#services"
              className="hidden md:inline-block bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.2] text-white font-semibold px-8 py-4 rounded-full transition-all text-base"
            >
              See Vibe Coding Services
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-[var(--color-bg)] border-y border-[var(--color-divider)] py-10 md:py-14">
        <StaggerContainer className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {RESULTS.map((r) => (
            <StaggerItem key={r.label}>
              <div className="text-2xl md:text-3xl font-bold text-violet-400 tracking-tight">
                {r.metric}
              </div>
              <div className="text-xs text-white font-semibold mt-1 uppercase tracking-wider">
                {r.label}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">
                {r.desc}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ THE PROBLEM — WHY VIBE CODING FAILS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface" id="why-expert">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-5xl font-bold mb-6 text-center tracking-tight text-white">
              The Dirty Secret About Vibe Coding
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg text-center max-w-2xl mx-auto mb-14">
              AI tools are incredible for speed. But speed without engineering is a ticking time bomb.
            </p>
          </Reveal>

          <StaggerContainer className="grid sm:grid-cols-2 gap-4" stagger={STAGGER.fast}>
            {DANGER_STATS.map((d) => (
              <StaggerItem key={d.stat}>
                <div className="bg-red-500/[0.04] border border-red-500/10 rounded-2xl p-5 md:p-6 flex items-start gap-4">
                  <div className="text-2xl md:text-3xl font-bold text-red-400 flex-shrink-0 min-w-[70px]">
                    {d.stat}
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
                    {d.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-14 space-y-8 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                You built your app with Lovable or Bolt in a weekend. It looked amazing in the demo. Then real users
                showed up &mdash; and things broke. Subscriptions bypassed. API keys leaked. Random data appearing
                in the wrong accounts. The AI wrote code that <em>runs</em> but doesn&apos;t actually <em>work</em>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                The AI never generated logging. No monitoring. No error boundaries. No rate limiting. No
                proper auth checks. Because those aren&apos;t part of the prompt &mdash; they&apos;re part of
                14 years of engineering experience.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white font-semibold text-lg md:text-2xl text-center !leading-snug">
                You don&apos;t need to stop vibe coding.<br />
                You need a CTO who knows how to vibe code <span className="text-violet-400">and</span> ship to production.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)]" id="services">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-violet-400/60 text-sm uppercase tracking-[0.2em] mb-4">
                Vibe Coding Services
              </p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                From Prompt to Production
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                Whether you need a rapid MVP, a broken app rescued, or a security audit &mdash;
                we combine AI speed with CTO-level engineering.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-violet-500/20 transition-all duration-500 p-6 md:p-8 h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400">
                      {s.icon}
                    </div>
                    <span className="text-[10px] bg-violet-500/10 text-violet-300/70 px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
                      {s.timeline}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-white">
                    {s.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                    {s.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.3}>
            <div className="text-center mt-12 md:mt-16">
              <a
                href="https://calendly.com/mohitsengarr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-violet-500 hover:bg-violet-400 active:bg-violet-600 active:scale-95 text-white font-semibold px-8 py-4 rounded-full transition-all text-base md:text-lg hover:shadow-xl hover:shadow-violet-500/20"
              >
                Discuss Your Project &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PLATFORMS MASTERY ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface" id="platforms">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-violet-400/60 text-sm uppercase tracking-[0.2em] mb-4">
                Platform Expertise
              </p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Every Major Vibe Coding Platform
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                We don&apos;t force you into one tool. We assess your project and recommend the
                optimal platform &mdash; or combine several for the best result.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORMS.map((p) => (
              <StaggerItem key={p.name}>
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 h-full group hover:border-violet-500/15 transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 font-bold text-sm">
                      {p.logo}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white">{p.name}</h3>
                      <span className="text-[10px] text-violet-300/50 uppercase tracking-wider">{p.strength}</span>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ VIBE CODER vs CTO COMPARISON ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-violet-400/60 text-sm uppercase tracking-[0.2em] mb-4">The Difference</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                Freelance Vibe Coder vs CTO-Led Vibe Engineering
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Generic vibe coder */}
              <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-[30px]" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white/60">Freelance Vibe Coder</h3>
                    <p className="text-xs text-white/30">Prompt-first approach</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Approach", value: "Prompt until it works" },
                    { label: "Security", value: "Whatever AI generates" },
                    { label: "Debugging", value: "Regenerate and hope" },
                    { label: "Production", value: "No monitoring or logs" },
                    { label: "Scaling", value: "Not considered" },
                    { label: "Long-term", value: "Unmaintainable code" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between bg-white/[0.03] rounded-lg px-3 py-2">
                      <span className="text-[11px] text-white/40 uppercase tracking-wider">{row.label}</span>
                      <span className="text-xs text-white/40">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* CTO-led */}
              <div className="bg-white/[0.03] rounded-2xl border border-violet-500/20 p-6 md:p-8 relative overflow-hidden shadow-lg shadow-violet-500/5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/10 rounded-full blur-[30px]" />
                <div className="absolute top-4 right-4 bg-violet-500/10 text-violet-400 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">CTO-Led Vibe Engineering</h3>
                    <p className="text-xs text-violet-400/60">With Mohit Sengar</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Approach", value: "AI + engineering framework" },
                    { label: "Security", value: "Audited & hardened" },
                    { label: "Debugging", value: "Root cause analysis" },
                    { label: "Production", value: "Full observability stack" },
                    { label: "Scaling", value: "Architected from day 1" },
                    { label: "Long-term", value: "Clean, maintainable code" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between bg-white/[0.04] rounded-lg px-3 py-2">
                      <span className="text-[11px] text-white/40 uppercase tracking-wider">{row.label}</span>
                      <span className="text-xs font-medium text-violet-400">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-violet-400/60 text-sm uppercase tracking-[0.2em] mb-4">
                How It Works
              </p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                From Idea to Production in Days
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                A proven process that combines AI speed with engineering rigor.
              </p>
            </div>
          </Reveal>
          <div className="space-y-6">
            {[
              { step: "01", title: "Strategy Call", desc: "Free 30-min session. We assess your idea, technical requirements, and recommend the optimal platform and approach. Zero obligation.", time: "Day 0" },
              { step: "02", title: "Platform & Architecture", desc: "We select the right AI tools (Lovable, Bolt, Replit, etc.) and define the architecture — database schema, auth, API structure, and security layer.", time: "Day 1" },
              { step: "03", title: "Rapid Build", desc: "AI-accelerated development with continuous quality checks. You get a staging link with daily updates so you see progress in real-time.", time: "Day 2-7" },
              { step: "04", title: "Security & QA", desc: "We audit every line the AI generated. Fix RLS flaws, add error handling, test edge cases, and ensure production-grade security.", time: "Day 7-10" },
              { step: "05", title: "Launch", desc: "Production deployment with monitoring, logging, error tracking, and performance optimization. Zero-downtime launch.", time: "Day 10-14" },
              { step: "06", title: "Support & Scale", desc: "30-day post-launch support included. As you grow, we add the infrastructure to handle real traffic and real revenue.", time: "Ongoing" },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="flex gap-5 md:gap-8 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-violet-500/10 group-hover:bg-violet-500/20 rounded-2xl flex items-center justify-center transition-colors duration-300">
                    <span className="text-violet-400 font-bold text-lg md:text-xl">{p.step}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white">{p.title}</h3>
                      <span className="text-xs bg-white/[0.06] text-[var(--color-text-muted)] px-2.5 py-1 rounded-full">{p.time}</span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-violet-400/60 text-sm uppercase tracking-[0.2em] mb-4">
                Client Results
              </p>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                What Clients Say About Working With Mohit
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {[
              {
                quote: "Working with Mohit has been great! He is a technical expert in all things development! I can consistently rely on him to provide great advice, technical expertise and well developed solutions.",
                name: "Nathan Jaskot",
                role: "Startup Founder",
              },
              {
                quote: "Competent and trustworthy fullstack developer. Always available and open to new ideas — he thrived in a fast changing environment. Solved complex problems during many years of collaboration.",
                name: "Max Aronsson",
                role: "Long-term Collaborator",
              },
              {
                quote: "My absolute pleasure to endorse Mohit — an invaluable asset and the pivotal force behind our success. He has consistently demonstrated exceptional technical acumen and unwavering dedication.",
                name: "Erlend Bårli-Olsen",
                role: "Enterprise Client",
              },
              {
                quote: "Your contributions have helped us bring our idea to life and positioned our application as a game-changer. Your efforts as a full-stack software engineer are exceptional.",
                name: "Nadia O.",
                role: "Tech Founder",
              },
            ].map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 md:p-8 h-full">
                  <p className="text-[var(--color-text-secondary)] leading-relaxed italic text-sm md:text-base mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-[var(--color-text-muted)] text-xs">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface" id="faq">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-violet-400/60 text-sm uppercase tracking-[0.2em] mb-4">
                FAQ
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                Common Questions About Vibe Coding Services
              </h2>
            </div>
          </Reveal>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px]" />
        </div>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Ready to Build Something That Actually Works?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg mb-10 max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll assess your project, recommend
              the right platform, and give you a clear roadmap &mdash; whether you hire us or not.
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white font-semibold px-10 md:px-12 py-4 md:py-5 rounded-full transition-colors text-base md:text-lg shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/30"
            >
              Start Your Vibe Coding Project &rarr;
            </motion.a>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-[var(--color-text-muted)]">
              {[
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, text: "No obligation" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "30-min session" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, text: "Platform recommendation" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs">
                  {b.icon}
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#050505] text-white py-12 md:py-16 px-6 pb-28 md:pb-16 border-t border-[var(--color-divider)]">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="text-white font-bold text-lg tracking-tight">
            Mohit Sengar
          </Link>
          <p className="text-[var(--color-text-muted)] text-sm mt-3 mb-6 max-w-md mx-auto">
            Award-winning CTO &amp; vibe coding expert. 14+ years building
            production-grade applications with the latest AI tools.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:mohit@sengarconsultancy.org" className="text-[var(--color-text-secondary)] hover:text-violet-400 transition-colors text-sm">
              mohit@sengarconsultancy.org
            </a>
            <a href="https://calendly.com/mohitsengarr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-violet-400 transition-colors text-sm">
              Schedule a Call
            </a>
          </div>
          <div className="pt-6 border-t border-[var(--color-divider)] text-xs text-[var(--color-text-placeholder)]">
            &copy; {new Date().getFullYear()} Mohit Sengar. All rights reserved. |{" "}
            <Link href="/" className="hover:text-violet-400 transition-colors">
              Main Site
            </Link>{" "}
            |{" "}
            <Link href="/shopify" className="hover:text-violet-400 transition-colors">
              Shopify Services
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
