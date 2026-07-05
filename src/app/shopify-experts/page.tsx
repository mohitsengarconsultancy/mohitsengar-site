"use client";

import { useState, useRef, FormEvent, ReactNode } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

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

const STATS = [
  { value: "$501K+", label: "Client Revenue Managed" },
  { value: "40+", label: "Brands Trusted Us" },
  { value: "100%", label: "Job Success Rate" },
  { value: "28+", label: "Shopify Stores Built" },
];

const SERVICES = [
  {
    icon: "🎨",
    title: "Theme Customization & Design",
    description:
      "Pixel-perfect Shopify themes built for conversions. Shrine, Dawn, and custom theme expertise that turns visitors into buyers.",
    clients: "21 clients served",
  },
  {
    icon: "⚙️",
    title: "Store Setup & Configuration",
    description:
      "End-to-end Shopify store setup — from product architecture to payment gateways, shipping rules, and tax configuration.",
    clients: "20 clients served",
  },
  {
    icon: "📈",
    title: "CRO & Conversion Optimization",
    description:
      "Data-driven conversion rate optimization that increases your revenue without increasing ad spend. A/B testing, funnel analysis, and checkout optimization.",
    clients: "19 clients served",
  },
  {
    icon: "⚡",
    title: "Speed & Performance Optimization",
    description:
      "Sub-2-second load times. We audit, optimize, and supercharge your Shopify store speed for higher rankings and better conversions.",
    clients: "18 clients served",
  },
  {
    icon: "🔌",
    title: "App Development & Integration",
    description:
      "Custom Shopify apps and third-party integrations — CRMs, ERPs, marketing tools, and payment processors wired seamlessly.",
    clients: "10 clients served",
  },
  {
    icon: "🚀",
    title: "DTC Growth & Operations",
    description:
      "Full-stack DTC operator support — growth strategy, landing pages, product merchandising, and fulfillment optimization.",
    clients: "7 clients served",
  },
];

const INDUSTRIES = [
  {
    name: "Health & Supplements",
    percentage: 25,
    color: "#8DD9BF",
    description: "Subscription models, compliance-ready, high-AOV funnels",
  },
  {
    name: "General Ecommerce",
    percentage: 25,
    color: "#7BC4E8",
    description: "Multi-product catalogs, merchandising, cross-sell engines",
  },
  {
    name: "Fashion & Streetwear",
    percentage: 21,
    color: "#D4A5E5",
    description: "Lookbooks, size guides, drop launches, brand storytelling",
  },
  {
    name: "Electronics & Tech",
    percentage: 14,
    color: "#F5C87A",
    description: "Spec-heavy PDPs, comparison tools, warranty management",
  },
  {
    name: "Fitness & Sports",
    percentage: 7,
    color: "#FF8A8A",
    description: "Community-driven, challenge funnels, subscription bundles",
  },
  {
    name: "Beauty & Skincare",
    percentage: 4,
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
      "Priority support (48hr SLA)",
      "Monthly growth review calls",
      "Revenue-tied KPI tracking",
    ],
    cta: "Apply for Retainer",
    highlighted: false,
  },
];

const CASE_STUDIES = [
  {
    client: "Thomas M.",
    industry: "Health & Supplements DTC",
    spend: "$501K+",
    result:
      "Built and scaled a full DTC supplement brand on Shopify. Theme customization, subscription setup, CRO optimization, and ongoing growth operations.",
    metrics: ["3x conversion lift", "Sub-1.8s load time", "40% repeat purchase rate"],
  },
  {
    client: "Sam M.",
    industry: "Sports & Fitness App",
    spend: "$44K+",
    result:
      "Custom Shopify Plus build with sports app integration, inventory management, and mobile-first checkout optimization.",
    metrics: ["2.5x mobile conversion", "Custom app integration", "65% faster checkout"],
  },
  {
    client: "Lampros C.",
    industry: "Premium Supplements",
    spend: "$35K+",
    result:
      "Shrine theme expertise — premium theme customization, ingredient transparency pages, and subscription-first architecture.",
    metrics: ["Shrine theme mastery", "45% AOV increase", "Premium brand positioning"],
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

const FAQS = [
  {
    question: "What makes you a top 1% Shopify expert?",
    answer:
      "We maintain a 100% job success rate across 40+ clients, with over $501K in managed client revenue. Our team specializes exclusively in the Shopify ecosystem — theme customization, CRO, speed optimization, and full DTC growth. We have deep vertical expertise in health, fashion, supplements, and electronics.",
  },
  {
    question: "What Shopify services do you offer?",
    answer:
      "We offer comprehensive Shopify services: Store Setup & Configuration, Theme Customization & Design (including Shrine and Dawn), Conversion Rate Optimization, Speed & Performance Optimization, Custom App Development, Product Listing & Merchandising, Landing Page Design, DTC Growth Operations, and Dropshipping & Fulfillment setup.",
  },
  {
    question: "How much does it cost to hire your Shopify experts?",
    answer:
      "We offer three engagement models: a one-time Shopify Store Audit ($497), a 60-day CRO Sprint ($2,997), and an ongoing Growth Retainer ($4,997/month). Each is scoped to your store's needs with clear deliverables. Book a free strategy call for a custom quote.",
  },
  {
    question: "Which industries do you specialize in?",
    answer:
      "Health & Supplements (25%), General Ecommerce (25%), Fashion & Streetwear (21%), Electronics & Tech (14%), Fitness & Sports (7%), and Beauty & Skincare. Our vertical expertise means we understand the unique conversion patterns, compliance needs, and customer behavior in each industry.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Typically within 48 hours of signing. For urgent needs like broken stores, critical bugs, or launch deadlines, we offer priority onboarding. Book a free strategy call to discuss your timeline.",
  },
  {
    question: "Do you work with Shopify Plus stores?",
    answer:
      "Yes. We work across all Shopify plans including Shopify Plus. Our enterprise clients benefit from custom checkout, Shopify Scripts, Flow automations, and multi-currency/multi-language setups.",
  },
  {
    question: "Can you be our long-term Shopify partner?",
    answer:
      "Absolutely. Our Growth Retainer is designed for brands that want an ongoing Shopify development and growth partner. 58% of our high-spend clients chose this model because they need a team that owns revenue outcomes, not just task execution.",
  },
  {
    question: "Do you offer a guarantee?",
    answer:
      "We stand behind our work. Our Store Audit comes with a money-back guarantee if you don't find it valuable. For CRO Sprints, we set measurable KPIs upfront and report against them weekly. Our 100% job success rate across 40+ clients speaks for itself.",
  },
];

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
  return (
    <Reveal delay={index * STAGGER.fast}>
      <div className="border border-white/10 rounded-2xl overflow-hidden hover:border-[#8DD9BF]/20 transition-colors">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
          aria-expanded={isOpen}
        >
          <span className="text-lg font-medium text-white pr-4">
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#8DD9BF] text-2xl flex-shrink-0"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <p className="px-6 pb-6 text-white/60 leading-relaxed">
                {answer}
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
      if (!res.ok) {
        setFormStatus("error");
        return;
      }
      setFormStatus("success");
      setFormData({ name: "", email: "", store: "", revenue: "", message: "" });
    } catch {
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
            <a href="#results" className="hover:text-white transition-colors">Results</a>
            <a href="#team" className="hover:text-white transition-colors">Team</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href="#book-call"
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
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#8DD9BF]/10 border border-[#8DD9BF]/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#8DD9BF] animate-pulse" />
                <span className="text-sm text-[#8DD9BF] font-medium">
                  Top 1% Shopify Experts on Upwork
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                We Build Shopify Stores
                <br />
                That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DD9BF] to-[#6bc4a6]">
                  Print Money
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                The top 1% Shopify experts trusted by 40+ DTC brands. We don&apos;t
                just build stores — we engineer revenue machines. From theme
                customization to CRO, speed optimization, and full-stack growth
                operations.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a
                  href="#book-call"
                  className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Free Strategy Call
                  <svg
                    className="ml-2 w-5 h-5"
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
                <a
                  href="#results"
                  className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                >
                  See Our Results
                </a>
              </div>
            </Reveal>

            {/* Stats bar */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
                    <div className="text-sm text-white/40 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-y border-white/5 py-8 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/30 text-sm font-medium">
            <span>Shopify Partners</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>100% Job Success</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Top Rated Plus</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>40+ Happy Clients</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Upwork Expert-Vetted</span>
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
                  <p className="text-sm text-[#8DD9BF]/60 font-medium">
                    {service.clients}
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
              We Know Your Niche
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Deep vertical expertise means we understand your customers,
              compliance requirements, and conversion patterns — before we write
              a single line of code.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <Reveal key={industry.name} delay={i * STAGGER.fast}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{industry.name}</h3>
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${industry.color}15`,
                        color: industry.color,
                      }}
                    >
                      {industry.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: industry.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${industry.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-sm text-white/40">{industry.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES / RESULTS ─── */}
      <section id="results" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              Proven Results
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              Real Stores. Real Revenue.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              We don&apos;t show mockups. We show revenue numbers. Here&apos;s what
              happens when you partner with the top 1%.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study, i) => (
              <Reveal key={study.client} delay={i * STAGGER.normal}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-lg font-semibold">{study.client}</p>
                      <p className="text-sm text-white/40">{study.industry}</p>
                    </div>
                    <span className="text-2xl font-bold text-[#8DD9BF]">
                      {study.spend}
                    </span>
                  </div>
                  <p className="text-white/50 leading-relaxed mb-6 flex-1">
                    {study.result}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="text-xs bg-[#8DD9BF]/10 text-[#8DD9BF] px-3 py-1.5 rounded-full font-medium"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
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
              store. Led by Mohit Sengar, an award-winning CTO with 14+ years of
              enterprise experience.
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
                    Award-Winning CTO &bull; 14+ Years Enterprise Experience
                    &bull; Internet 2.0 Conference Dubai 2024
                  </p>
                  <p className="text-white/50 leading-relaxed max-w-2xl">
                    Every engagement is personally overseen by Mohit — an
                    award-winning CTO who has led technology for startups and
                    enterprises across AI, ecommerce, blockchain, and digital
                    transformation. He doesn&apos;t just manage your project; he
                    architects your growth strategy.
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
                    href="#book-call"
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

      {/* ─── SOCIAL PROOF STRIP ─── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#8DD9BF] mb-2">
                    58%
                  </p>
                  <p className="text-white/40 text-sm">
                    of high-spend clients choose us as their long-term growth
                    partner, not just a one-time vendor
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#8DD9BF] mb-2">
                    40%
                  </p>
                  <p className="text-white/40 text-sm">
                    faster deal close with experienced $5K+ buyers who recognize
                    expert-level work immediately
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#8DD9BF] mb-2">
                    3-5x
                  </p>
                  <p className="text-white/40 text-sm">
                    higher average ticket size on enterprise & AI integration
                    projects beyond standard Shopify work
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
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
                  <form onSubmit={handleSubmit} className="space-y-5">
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
                        Couldn&apos;t send right now — email{" "}
                        <a
                          href="mailto:mohit@sengarconsultancy.org"
                          className="text-[#8DD9BF] hover:underline"
                        >
                          mohit@sengarconsultancy.org
                        </a>{" "}
                        directly and we&apos;ll get back within 24 hours.
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
              Every day you wait is revenue you leave on the table. The top 1% of
              Shopify stores are constantly testing, optimizing, and scaling.
              Let&apos;s get you there.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#book-call"
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
