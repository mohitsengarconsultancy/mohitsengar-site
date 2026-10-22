"use client";

import { useState, useRef, useId, FormEvent, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/contact";
import { trackLead } from "@/lib/analytics";
import { SHOPIFY_FAQS } from "./faqs";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION TOKENS
   ═══════════════════════════════════════════════════════════════ */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const REVEAL = {
  duration: 0.8,
  ease: EASE_OUT,
  distance: 40,
};

const STAGGER = {
  fast: 0.08,
  normal: 0.12,
};

/* ─── Reveal Component ─── */
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

  const dirMap = {
    up: { y: REVEAL.distance, x: 0 },
    down: { y: -REVEAL.distance, x: 0 },
    left: { x: REVEAL.distance, y: 0 },
    right: { x: -REVEAL.distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...dirMap[direction] }
      }
      transition={{ duration: REVEAL.duration, ease: REVEAL.ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

/* Career-wide facts about the lead, not Shopify-specific counts. */
const STATS = [
  { value: "7+", label: "Years as a CTO" },
  { value: "14+", label: "Years Building Software" },
  { value: "40+", label: "Companies, Career-Wide" },
];

const SERVICES = [
  {
    icon: "🎨",
    title: "Theme Customization & Design",
    description:
      "Pixel-perfect Shopify themes built for conversions. Shrine, Dawn, and custom theme expertise that turns visitors into buyers.",
  },
  {
    icon: "⚙️",
    title: "Store Setup & Configuration",
    description:
      "End-to-end Shopify store setup — from product architecture to payment gateways, shipping rules, and tax configuration.",
  },
  {
    icon: "📈",
    title: "CRO & Conversion Optimization",
    description:
      "Data-driven conversion rate optimization that increases your revenue without increasing ad spend. A/B testing, funnel analysis, and checkout optimization.",
  },
  {
    icon: "⚡",
    title: "Speed & Performance Optimization",
    description:
      "Sub-2-second load times. We audit, optimize, and supercharge your Shopify store speed for higher rankings and better conversions.",
  },
  {
    icon: "🔌",
    title: "App Development & Integration",
    description:
      "Custom Shopify apps and third-party integrations — CRMs, ERPs, marketing tools, and payment processors wired seamlessly.",
  },
  {
    icon: "🚀",
    title: "DTC Growth & Operations",
    description:
      "Full-stack DTC operator support — growth strategy, landing pages, product merchandising, and fulfillment optimization.",
  },
];

const INDUSTRIES = [
  {
    name: "Health & Supplements",
    color: "#8DD9BF",
    description: "Subscription models, compliance-ready, high-AOV funnels",
  },
  {
    name: "General Ecommerce",
    color: "#7BC4E8",
    description: "Multi-product catalogs, merchandising, cross-sell engines",
  },
  {
    name: "Fashion & Streetwear",
    color: "#D4A5E5",
    description: "Lookbooks, size guides, drop launches, brand storytelling",
  },
  {
    name: "Electronics & Tech",
    color: "#F5C87A",
    description: "Spec-heavy PDPs, comparison tools, warranty management",
  },
  {
    name: "Fitness & Sports",
    color: "#FF8A8A",
    description: "Community-driven, challenge funnels, subscription bundles",
  },
  {
    name: "Beauty & Skincare",
    color: "#FFB5D8",
    description: "Shade finders, ingredient transparency, review-driven UX",
  },
];

const PACKAGES = [
  {
    name: "Shopify Store Audit",
    price: "$497",
    period: "one-time",
    description:
      "A comprehensive deep-dive into your store's health, speed, UX, and conversion bottlenecks.",
    features: [
      "Full technical audit (speed, SEO, mobile)",
      "Conversion funnel analysis",
      "Competitor benchmarking",
      "Prioritized action plan with ROI estimates",
      "30-minute strategy walkthrough call",
    ],
    cta: "Book Your Audit",
    highlighted: false,
  },
  {
    name: "CRO Sprint",
    price: "$2,997",
    period: "60-day engagement",
    description:
      "Aggressive 60-day sprint to find and fix every conversion leak in your store.",
    features: [
      "Everything in Store Audit",
      "A/B testing setup & execution",
      "Checkout flow optimization",
      "Product page conversion redesign",
      "Speed optimization to sub-2s",
      "Weekly progress reports",
      "Dedicated Slack channel",
    ],
    cta: "Start Your Sprint",
    highlighted: true,
  },
  {
    name: "Growth Retainer",
    price: "$4,997",
    period: "per month",
    description:
      "Ongoing Shopify development, CRO, and strategic growth partnership. Your fractional ecommerce team.",
    features: [
      "Everything in CRO Sprint",
      "Ongoing theme development & updates",
      "New feature implementation",
      "App integrations & custom builds",
      "DTC growth strategy & execution",
      "Monthly growth review calls",
      "Revenue-tied KPI tracking",
    ],
    cta: "Apply for Retainer",
    highlighted: false,
  },
];

const TEAM_MEMBERS = [
  {
    role: "Shopify Lead Developer",
    expertise: "Theme customization, Liquid, Shrine/Dawn, custom sections",
    years: "8+ years",
  },
  {
    role: "CRO & Analytics Specialist",
    expertise: "A/B testing, funnel optimization, GA4, heatmaps",
    years: "6+ years",
  },
  {
    role: "UI/UX Designer",
    expertise: "Conversion-focused design, mobile-first, brand systems",
    years: "7+ years",
  },
  {
    role: "Full-Stack Engineer",
    expertise: "Custom Shopify apps, API integrations, automation",
    years: "10+ years",
  },
  {
    role: "DTC Growth Strategist",
    expertise: "Paid acquisition, retention, email/SMS, LTV optimization",
    years: "5+ years",
  },
  {
    role: "Project Manager",
    expertise: "Agile delivery, client communication, deadline management",
    years: "6+ years",
  },
];

const FAQS = SHOPIFY_FAQS;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Strategy Call",
    description: "30-minute deep dive into your store, goals, and bottlenecks. No obligation.",
  },
  {
    step: "02",
    title: "Custom Game Plan",
    description: "We deliver a prioritized roadmap with clear deliverables, timeline, and expected ROI.",
  },
  {
    step: "03",
    title: "Execute & Optimize",
    description: "Our team builds, tests, and iterates — with weekly reports and a dedicated Slack channel.",
  },
  {
    step: "04",
    title: "Scale & Grow",
    description: "Ongoing optimization, new features, and strategic growth to keep your revenue climbing.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  return (
    <Reveal delay={index * STAGGER.fast}>
      <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-[#8DD9BF]/20 transition-colors">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="text-lg font-medium text-white pr-4">
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#8DD9BF] text-2xl flex-shrink-0"
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>
        {/* Always in the DOM (collapsed to height 0) so the answer is in the server HTML. */}
        <motion.div
          id={panelId}
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="overflow-hidden"
          aria-hidden={!isOpen}
        >
          <p className="px-6 pb-6 text-white/60 leading-relaxed">
            {answer}
          </p>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function ShopifyExpertsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    store: "",
    revenue: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formStatus === "submitting") return;
    setFormStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "shopify-lead", ...formData }),
      });
      trackLead("shopify-lead", "shopify-lead-form", res.ok, res.status);
      if (!res.ok) {
        setFormStatus("error");
        return;
      }
      setFormStatus("success");
      setFormData({ name: "", email: "", store: "", revenue: "", message: "" });
    } catch {
      trackLead("shopify-lead", "shopify-lead-form", false);
      setFormStatus("error");
    }
  };

  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[#8DD9BF]">Sengar</span> Consultancy
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#team" className="hover:text-white transition-colors">Team</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8DD9BF] text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#A3E4CF] transition-colors"
          >
            Free Strategy Call
          </a>
        </div>
      </nav>

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Shopify Experts", href: "/shopify-experts" }]} />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center pt-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8DD9BF]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8DD9BF]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="hero-rise">
              <div className="inline-flex items-center gap-2 bg-[#8DD9BF]/10 border border-[#8DD9BF]/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#8DD9BF] animate-pulse" />
                <span className="text-sm text-[#8DD9BF] font-medium">
                  CTO-Led Shopify Experts
                </span>
              </div>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                We Build Shopify Stores
                <br />
                That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DD9BF] to-[#6bc4a6]">
                  Print Money
                </span>
              </h1>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                Senior Shopify specialists, led by CTO Mohit Sengar. We don&apos;t
                just build stores — we engineer revenue machines. From theme
                customization to CRO, speed optimization, and full-stack growth
                operations.
              </p>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-16">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Free Strategy Call
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                >
                  See Our Services
                </a>
              </div>
            </div>

            {/* Stats bar */}
            <div className="hero-rise" style={{ animationDelay: "0.4s" }}>
              <div className="grid grid-cols-3 gap-6 md:gap-8">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + i * STAGGER.normal,
                      duration: 0.6,
                      ease: EASE_OUT,
                    }}
                    className="text-center md:text-left"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-[#8DD9BF]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-y border-white/5 py-8 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/30 text-sm font-medium">
            <span>CTO-Led Delivery</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Theme &amp; Store Builds</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>CRO &amp; Speed</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Shopify Plus</span>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / AGITATE ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4">
                Sound familiar?
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Your Shopify Store Is Leaving
                <br />
                Money on the Table
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-4 text-lg text-white/50 leading-relaxed">
                <p>
                  Slow load times killing your conversions. A checkout flow that
                  leaks revenue. A theme that looks generic. No one owning the
                  numbers.
                </p>
                <p>
                  You&apos;ve hired freelancers who copy-paste from ChatGPT. Agencies
                  that bill hours but don&apos;t move metrics. Developers who build
                  what you ask but never what you need.
                </p>
                <p className="text-white/80 font-medium">
                  You don&apos;t need another developer. You need a{" "}
                  <span className="text-[#8DD9BF]">
                    Shopify growth partner
                  </span>{" "}
                  who owns your revenue outcomes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              What We Do
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              What Shopify Services Do We Offer?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Every service you need to launch, optimize, and scale your Shopify
              store — under one roof, from one expert team.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * STAGGER.fast}>
                <div className="group relative bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 hover:border-[#8DD9BF]/20 transition-all h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRY VERTICALS ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              Industry Expertise
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              Built for Your Kind of Store
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Each kind of store converts differently. These are the patterns we
              plan for before we write a single line of code.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <Reveal key={industry.name} delay={i * STAGGER.fast}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: industry.color }}
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold">{industry.name}</h3>
                  </div>
                  <p className="text-sm text-white/50">{industry.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              How It Works
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              How Does Working With Us Actually Work?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * STAGGER.normal}>
                <div className="relative">
                  <div className="text-6xl font-bold text-[#8DD9BF]/10 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-white/10 text-2xl">
                      &rarr;
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="team" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              Your Dedicated Team
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              A Full Shopify Squad,
              <br />
              Not a Solo Freelancer
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              When you hire us, you get an entire cross-functional team — developers,
              designers, CRO specialists, and strategists — all working on your
              store. Led by Mohit Sengar, a Dubai-based CTO with 7+ years in the
              seat and 14+ years building software.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={member.role} delay={i * STAGGER.fast}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-[#8DD9BF]/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#8DD9BF]/10 flex items-center justify-center mb-4">
                    <span className="text-[#8DD9BF] font-bold text-lg">
                      {member.role.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.role}</h3>
                  <p className="text-sm text-[#8DD9BF]/60 mb-3">
                    {member.years} experience
                  </p>
                  <p className="text-sm text-white/40">{member.expertise}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Leadership highlight */}
          <Reveal delay={0.3}>
            <div className="mt-12 bg-gradient-to-r from-[#8DD9BF]/10 to-transparent border border-[#8DD9BF]/15 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 rounded-full bg-[#8DD9BF]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#8DD9BF] font-bold text-2xl">MS</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Led by Mohit Sengar
                  </h3>
                  <p className="text-[#8DD9BF] text-sm font-medium mb-4">
                    7+ Years as a CTO &bull; 14+ Years Building Software
                    &bull; 40+ Companies
                  </p>
                  <p className="text-white/50 leading-relaxed max-w-2xl">
                    Every engagement is personally overseen by Mohit, a CTO who
                    has led technology for startups and enterprises across AI,
                    ecommerce, blockchain, and digital transformation. He
                    doesn&apos;t just manage your project; he architects your
                    growth strategy.
                  </p>
                  <p className="text-white/35 text-xs mt-4">
                    Credentials: Outstanding Leadership Award, Internet 2.0
                    Conference, Dubai, February 2024.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING PACKAGES ─── */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              Transparent Pricing
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              How Much Does a Shopify Expert Cost?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Three clear packages. No hidden fees. No scope creep. Pick the one
              that matches where you are — and where you want to go.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * STAGGER.normal}>
                <div
                  className={`relative bg-[#1A1A1A] rounded-2xl p-8 h-full flex flex-col ${
                    pkg.highlighted
                      ? "border-2 border-[#8DD9BF] shadow-[0_0_40px_rgba(141,217,191,0.1)]"
                      : "border border-white/5"
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8DD9BF] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#8DD9BF]">
                        {pkg.price}
                      </span>
                      <span className="text-sm text-white/40">{pkg.period}</span>
                    </div>
                    <p className="text-white/50 mt-3 text-sm leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/60"
                      >
                        <svg
                          className="w-5 h-5 text-[#8DD9BF] flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-4 rounded-full font-semibold transition-all ${
                      pkg.highlighted
                        ? "bg-[#8DD9BF] text-black hover:bg-[#A3E4CF]"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {pkg.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              Questions & Answers
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEAD CAPTURE / BOOK CALL (Bottom of Funnel) ─── */}
      <section id="book-call" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4">
                  Let&apos;s Talk Growth
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  Book Your Free
                  <br />
                  <span className="text-[#8DD9BF]">Strategy Call</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  30 minutes. Zero obligation. We&apos;ll audit your store live,
                  identify your biggest revenue leaks, and give you a concrete
                  action plan — whether you hire us or not.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="space-y-4">
                  {[
                    "Live store audit with actionable insights",
                    "Conversion bottleneck identification",
                    "Custom growth roadmap for your niche",
                    "Transparent pricing — no surprises",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#8DD9BF] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Book a call
                  </a>
                  <span className="text-sm text-white/50">
                    Pick a 30-minute slot on the calendar: the fastest way to reach us.
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.2} direction="right">
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 md:p-10">
                {formStatus === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#8DD9BF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-[#8DD9BF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      We&apos;ll Be In Touch!
                    </h3>
                    <p className="text-white/50">
                      Expect a response within 24 hours. Check your inbox for
                      next steps.
                    </p>
                  </div>
                ) : (
                  <form id="shopify-lead-form" onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#8DD9BF]/50 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#8DD9BF]/50 transition-colors"
                        placeholder="john@brand.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Shopify Store URL
                      </label>
                      <input
                        type="text"
                        name="store"
                        autoComplete="url"
                        value={formData.store}
                        onChange={(e) =>
                          setFormData({ ...formData, store: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#8DD9BF]/50 transition-colors"
                        placeholder="yourbrand.myshopify.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Monthly Revenue Range
                      </label>
                      <select
                        name="revenue"
                        value={formData.revenue}
                        onChange={(e) =>
                          setFormData({ ...formData, revenue: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8DD9BF]/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-[#1A1A1A]">
                          Select range
                        </option>
                        <option value="pre-launch" className="bg-[#1A1A1A]">
                          Pre-launch
                        </option>
                        <option value="0-10k" className="bg-[#1A1A1A]">
                          $0 - $10K/mo
                        </option>
                        <option value="10k-50k" className="bg-[#1A1A1A]">
                          $10K - $50K/mo
                        </option>
                        <option value="50k-100k" className="bg-[#1A1A1A]">
                          $50K - $100K/mo
                        </option>
                        <option value="100k+" className="bg-[#1A1A1A]">
                          $100K+/mo
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        What&apos;s your biggest challenge right now?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#8DD9BF]/50 transition-colors resize-none"
                        placeholder="e.g. Low conversion rate, slow store, need redesign..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[#8DD9BF] text-black py-4 rounded-full font-semibold text-base hover:bg-[#A3E4CF] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Book My Free Strategy Call"}
                    </button>
                    {formStatus === "error" && (
                      <p className="text-sm text-red-400/90 text-center">
                        Couldn&apos;t send right now.{" "}
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8DD9BF] hover:underline"
                        >
                          Book a call on the calendar
                        </a>{" "}
                        instead, or email{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="text-[#8DD9BF] hover:underline"
                        >
                          {CONTACT_EMAIL}
                        </a>{" "}
                        and we&apos;ll get back within 24 hours.
                      </p>
                    )}
                    <p className="text-xs text-white/30 text-center">
                      No spam. No obligation. Just a genuine conversation about
                      growing your store.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── URGENCY / FINAL CTA ─── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#8DD9BF]/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Your Competitors Are Optimizing.
              <br />
              <span className="text-[#8DD9BF]">Are You?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Every day you wait is revenue you leave on the table. The strongest
              Shopify stores are constantly testing, optimizing, and scaling.
              Let&apos;s get you there.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Claim Your Free Strategy Call Now
              <svg
                className="ml-3 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
