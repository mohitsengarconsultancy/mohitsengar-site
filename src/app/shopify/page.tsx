"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, FormEvent, ReactNode } from "react";
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

const SERVICES = [
  {
    title: "Custom Shopify Store Development",
    desc: "Pixel-perfect, conversion-optimized stores built from scratch. Custom themes with Liquid, Tailwind, and modern front-end stack. Mobile-first, blazing fast, SEO-ready.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    title: "Shopify Plus & Enterprise",
    desc: "Enterprise-grade builds with custom checkout extensibility, Shopify Functions, multi-currency, wholesale B2B channels, and advanced integrations with ERPs and CRMs.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
  },
  {
    title: "Headless Commerce (Hydrogen)",
    desc: "Ultra-fast headless storefronts with Shopify Hydrogen, Remix, or Next.js. Storefront API + custom front-end for maximum performance and total design freedom.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "CRO & Conversion Optimization",
    desc: "Data-driven audits, A/B testing, landing page optimization, checkout funnel analysis, and revenue recovery strategies. We turn traffic into revenue.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Platform Migration",
    desc: "Zero-downtime migrations from WooCommerce, Magento, BigCommerce, or custom platforms. Products, customers, orders, SEO redirects — everything moves safely.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Shopify App Development",
    desc: "Custom Shopify apps, private integrations, webhook automations, and third-party API connections. Built with Shopify's latest App Bridge and Polaris standards.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
];

const TEAM = [
  { role: "CTO & Architect", desc: "14+ years leading engineering teams. Oversees every project personally.", count: 1 },
  { role: "Senior Shopify Developers", desc: "Liquid, Hydrogen, Storefront API, custom themes, checkout extensions.", count: 3 },
  { role: "UI/UX & CRO Specialists", desc: "Conversion-focused design, A/B testing, user journey mapping.", count: 2 },
  { role: "QA & DevOps Engineers", desc: "Automated testing, CI/CD, staging environments, zero-downtime deploys.", count: 2 },
  { role: "SEO & Performance Lead", desc: "Core Web Vitals, structured data, page speed, search ranking.", count: 1 },
  { role: "Project Managers", desc: "Daily standups, transparent Jira boards, milestone tracking.", count: 1 },
];

const PROCESS = [
  { step: "01", title: "Discovery Call", desc: "Free 30-min strategy session. We learn your business, goals, and tech requirements. No obligation.", time: "Day 0" },
  { step: "02", title: "Proposal & Scope", desc: "Detailed proposal with fixed scope, timeline, milestones, and transparent pricing. No surprises.", time: "Day 1-2" },
  { step: "03", title: "Design & Architecture", desc: "Wireframes, UI mockups, and technical architecture review. You approve before any code is written.", time: "Week 1" },
  { step: "04", title: "Build & Iterate", desc: "Agile sprints with daily updates. Staging preview so you see progress in real-time.", time: "Week 2-3" },
  { step: "05", title: "QA & Launch", desc: "Cross-browser testing, mobile QA, performance audit, SEO check, and zero-downtime launch.", time: "Week 4" },
  { step: "06", title: "Support & Optimize", desc: "30-day post-launch support included. Optional ongoing retainer for CRO, updates, and scaling.", time: "Ongoing" },
];

const RESULTS = [
  { metric: "40+", label: "Clients Served", desc: "Across e-commerce, SaaS, and DTC brands" },
  { metric: "100%", label: "Success Rate", desc: "Every project delivered on time and budget" },
  { metric: "14+", label: "Years Experience", desc: "Engineering leadership across diverse industries" },
  { metric: "3-4 Days", label: "Landing Pages", desc: "From brief to live Shopify landing page" },
  { metric: "2-4 Weeks", label: "Full Store Build", desc: "Custom Shopify store end-to-end" },
  { metric: "0", label: "Missed Deadlines", desc: "We don't miss. Period." },
];

const FAQS = [
  { q: "Why should I hire your team as my Shopify expert?", a: "With 14+ years of engineering leadership, 40+ successful client engagements, and a 100% project success rate, we deliver enterprise-grade Shopify solutions. Our team includes senior Shopify developers, UX/CRO specialists, QA engineers, and a dedicated project manager — all working as a unit on your project." },
  { q: "What Shopify services do you offer?", a: "End-to-end: custom store development, Shopify Plus setup and migration, headless commerce (Hydrogen/Remix), theme customization, app development, CRO and conversion optimization, landing page creation, SEO optimization, and ongoing maintenance." },
  { q: "How fast can you build a Shopify store?", a: "Landing pages: 3-4 days. Full custom store: 2-4 weeks. Shopify Plus migrations with integrations: 4-8 weeks. We provide honest timelines upfront — no surprises." },
  { q: "Do you work with Shopify Plus?", a: "Yes. We have deep experience with Shopify Plus including custom checkout extensibility, Shopify Functions, multi-currency, wholesale B2B channels, and enterprise integrations with ERPs and CRMs." },
  { q: "Can you migrate my store from WooCommerce or Magento?", a: "Absolutely. We handle complete platform migrations — products, customers, orders, SEO redirects, zero-downtime cutover. We've migrated from WooCommerce, Magento, BigCommerce, and custom platforms." },
  { q: "What does pricing look like?", a: "It depends on scope. Landing pages start at a fixed fee. Full store builds and migrations are scoped and priced after the discovery call. We're transparent from day one — you'll know exactly what you're paying for before we start." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. Every project includes 30 days of post-launch support. For ongoing needs, we offer monthly retainers covering updates, CRO testing, performance monitoring, and feature additions." },
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
          <span className="text-base md:text-lg font-medium pr-4 text-white group-hover:text-mint transition-colors duration-300">
            {q}
          </span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${open ? "text-mint" : "text-[var(--color-text-muted)]"}`}
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
export default function ShopifyPage() {
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
            <Link
              href="/"
              className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline"
            >
              Home
            </Link>
            <a href="#services" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Services
            </a>
            <a href="#team" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Team
            </a>
            <a href="#process" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              Process
            </a>
            <a href="#faq" className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 hidden md:inline">
              FAQ
            </a>
            <a
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-mint hover:bg-mint-hover active:bg-mint-pressed text-black font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-mint/20"
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
          className="block w-full bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-[0.98] text-black font-semibold py-3.5 rounded-full transition-all text-center text-base"
        >
          Get a Free Shopify Strategy Call
        </a>
      </div>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-start overflow-hidden"
      >
        {/* Shopify green gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A120E] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#95BF47] rounded-full blur-[200px]" />
        </div>

        <motion.div
          className="relative z-10 text-left px-6 md:px-16 lg:px-24 max-w-7xl w-full pt-32 md:pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#95BF47] rounded-full animate-pulse" />
            <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-[var(--color-text-secondary)] font-medium">
              Top 1% Shopify Expert Team
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.08] mb-8 max-w-4xl tracking-tight text-white"
          >
            We Build Shopify Stores That{" "}
            <span className="text-[#95BF47]">Print Money</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
            className="text-base md:text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed"
          >
            A dedicated 10-person engineering team led by an award-winning CTO with
            14+ years experience, 40+ successful projects, and a 100% delivery rate.
            Custom stores, headless builds, CRO, migrations &mdash; we do it all, and
            we do it right.
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
              className="hidden md:inline-block bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-95 text-black font-semibold px-8 py-4 rounded-full transition-all text-base hover:shadow-xl hover:shadow-mint/20"
            >
              Book a Free Strategy Call &rarr;
            </a>
            <a
              href="#services"
              className="hidden md:inline-block bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.2] text-white font-semibold px-8 py-4 rounded-full transition-all text-base"
            >
              See Our Shopify Services
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-[var(--color-bg)] border-y border-[var(--color-divider)] py-10 md:py-14">
        <StaggerContainer className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {RESULTS.map((r) => (
            <StaggerItem key={r.label}>
              <div className="text-2xl md:text-3xl font-bold text-mint tracking-tight">
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

      {/* ═══ PROBLEM / AGITATION ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-5xl font-bold mb-12 text-center tracking-tight text-white">
              Tired of Shopify Developers Who Disappear?
            </h2>
          </Reveal>
          <div className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed space-y-8 text-left">
            <Reveal delay={0.1}>
              <p>
                You&apos;ve hired freelancers who promised the world and delivered
                broken themes. You&apos;ve tried agencies that charged enterprise
                prices for template-level work. Your store is slow, your conversion
                rate is bleeding, and every week you delay costs you revenue.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Maybe you need to migrate from WooCommerce but you&apos;re terrified
                of losing data. Maybe you need a landing page for a launch event in
                3 days. Maybe your Shopify Plus checkout needs custom logic that
                &ldquo;can&apos;t be done.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white font-semibold text-lg md:text-2xl text-center !leading-snug">
                You don&apos;t need another Shopify freelancer.<br />
                You need a dedicated engineering team that treats your
                store like a product.
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
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">
                Shopify Services
              </p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Everything Your Shopify Store Needs
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                From a 3-day landing page to a full Shopify Plus enterprise build
                &mdash; one team, one point of contact, zero excuses.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-mint/20 transition-all duration-500 p-6 md:p-8 h-full"
                >
                  <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center mb-5 text-mint">
                    {s.icon}
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
                className="inline-block bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-95 text-black font-semibold px-8 py-4 rounded-full transition-all text-base md:text-lg hover:shadow-xl hover:shadow-mint/20"
              >
                Discuss Your Shopify Project &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface" id="team">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">
                Your Dedicated Team
              </p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                10 Engineers. One Mission.
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                You don&apos;t get a solo freelancer juggling 5 clients. You get a
                dedicated, cross-functional team with every role filled &mdash;
                led personally by a CTO with 14 years of experience.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((t) => (
              <StaggerItem key={t.role}>
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {t.role}
                    </h3>
                    <span className="text-mint text-sm font-bold bg-mint/10 px-3 py-1 rounded-full">
                      {t.count}x
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-full px-6 py-3">
                <svg className="w-5 h-5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[var(--color-text-secondary)] text-sm md:text-base">
                  Every project is personally overseen by <strong className="text-white">Mohit Sengar, CTO</strong>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)]" id="process">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">
                Our Process
              </p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                From Call to Launch in Weeks, Not Months
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                Clear milestones. Daily updates. No black boxes. You&apos;ll always know
                exactly where your project stands.
              </p>
            </div>
          </Reveal>
          <div className="space-y-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="flex gap-5 md:gap-8 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-mint/10 group-hover:bg-mint/20 rounded-2xl flex items-center justify-center transition-colors duration-300">
                    <span className="text-mint font-bold text-lg md:text-xl">
                      {p.step}
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {p.title}
                      </h3>
                      <span className="text-xs bg-white/[0.06] text-[var(--color-text-muted)] px-2.5 py-1 rounded-full">
                        {p.time}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">
                Why Brands Trust Us
              </p>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                The Shopify Experts Other Shopify Experts Recommend
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {[
              {
                quote: "Working with Mohit has been great! He is a technical expert in all things development! I can consistently rely on him to provide great advice, technical expertise and well developed solutions.",
                name: "Nathan Jaskot",
                role: "E-commerce Founder",
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
                    <p className="text-[var(--color-text-muted)] text-xs">
                      {t.role}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[var(--color-bg)]" id="faq">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">
                FAQ
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                Common Questions About Our Shopify Services
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
      <section className="py-24 md:py-32 px-6 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[#95BF47]/5 rounded-full blur-[120px]" />
        </div>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Ready to Build a Shopify Store That Actually Converts?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg mb-10 max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your current
              setup and give you 3 actionable recommendations &mdash; whether you
              hire us or not.
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-mint hover:bg-mint-hover active:bg-mint-pressed text-black font-semibold px-10 md:px-12 py-4 md:py-5 rounded-full transition-colors text-base md:text-lg shadow-2xl shadow-mint/20 hover:shadow-mint/30"
            >
              Book Your Free Shopify Strategy Call &rarr;
            </motion.a>
            <p className="text-[var(--color-text-muted)] text-sm mt-6">
              No obligation. No pitch deck. Just honest advice from a CTO
              who&apos;s built 40+ successful projects.
            </p>
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
            Award-winning CTO &amp; Shopify expert. 14+ years building e-commerce
            experiences that convert.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="mailto:mohit@sengarconsultancy.org"
              className="text-[var(--color-text-secondary)] hover:text-mint transition-colors text-sm"
            >
              mohit@sengarconsultancy.org
            </a>
            <a
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-mint transition-colors text-sm"
            >
              Schedule a Call
            </a>
          </div>
          <div className="pt-6 border-t border-[var(--color-divider)] text-xs text-[var(--color-text-placeholder)]">
            &copy; {new Date().getFullYear()} Mohit Sengar. All rights reserved. |{" "}
            <Link href="/" className="hover:text-mint transition-colors">
              Main Site
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
