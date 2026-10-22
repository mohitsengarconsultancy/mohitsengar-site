"use client";

import { useState, useRef, useEffect, useId, FormEvent, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/contact";
import { trackLead } from "@/lib/analytics";
import { QA_FAQS } from "./faqs";

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
  { value: "40+", label: "Companies Worked With" },
  { value: "7+", label: "Years as a CTO" },
  { value: "14+", label: "Years Engineering" },
  { value: "10+", label: "QE Disciplines" },
];

const SERVICES = [
  {
    icon: "🤖",
    title: "Test Automation & Self-Healing",
    description:
      "Resilient, AI-driven automation that survives UI changes. We rebuild fragile suites with multi-locator, self-healing frameworks so false failures stop eroding trust.",
    tag: "Playwright · testRigor · Katalon",
  },
  {
    icon: "🧠",
    title: "AI & LLM System Testing",
    description:
      "Evaluate what traditional testing can't — hallucinations, bias, toxicity, relevance and prompt-injection — using LLM-as-a-Judge harnesses with defined metrics.",
    tag: "DeepEval · Langfuse · Promptfoo",
  },
  {
    icon: "⚡",
    title: "Performance & Load Testing",
    description:
      "Shift performance left. Component-level load testing and micro-benchmarking inside development, catching regressions before they reach production.",
    tag: "Grafana k6 · Locust · OpenTelemetry",
  },
  {
    icon: "🔒",
    title: "Continuous Security & DevSecOps",
    description:
      "Security in every pipeline, not a final checkpoint. Automated SAST, DAST and Software Composition Analysis running continuously in CI/CD.",
    tag: "Snyk · SonarQube · OWASP ZAP",
  },
  {
    icon: "🔗",
    title: "Microservice & Integration Testing",
    description:
      "Contract testing and service virtualization so you can validate service expectations without waiting on unstable or unavailable dependencies.",
    tag: "PactFlow · WireMock · Tricentis",
  },
  {
    icon: "📊",
    title: "Observability-Driven QA",
    description:
      "Shift right. Real-user sessions, crash data, latency and production telemetry feed straight into QA, so you test how customers actually behave.",
    tag: "Datadog · Dynatrace · Honeycomb",
  },
];

const PROBLEMS = [
  {
    n: "01",
    title: "Test Script Flakiness & Selector Fragility",
    problem: "UI changes break static selectors, causing false positives.",
    solution: "AI self-healing frameworks with multi-locators.",
    tools: "Playwright · testRigor · Katalon",
  },
  {
    n: "02",
    title: "Test Data Management & Privacy",
    problem: "GDPR/CCPA restrict production data in test environments.",
    solution: "Synthetic data & production mirroring via LLMs/GANs.",
    tools: "Tonic.ai · Delphix · K2view",
  },
  {
    n: "03",
    title: "Testing Non-Deterministic AI & LLM Systems",
    problem: "Variable outputs, hallucinations & safety risks.",
    solution: "LLM-as-a-Judge with guardrails & evaluation metrics.",
    tools: "DeepEval · Langfuse · Promptfoo",
  },
  {
    n: "04",
    title: "Requirement Ambiguity (Shift-Left Gaps)",
    problem: "Unclear requirements cause rework & defects.",
    solution: "AI-driven analysis & BDD scenarios before development.",
    tools: "Cucumber · Jira AI · Copilot",
  },
  {
    n: "05",
    title: "Microservice Integration & Unstable Mocking",
    problem: "Unstable external services break integration tests.",
    solution: "Contract testing & dynamic service virtualization.",
    tools: "PactFlow · WireMock · Tricentis Tosca",
  },
  {
    n: "06",
    title: "Device/Browser Fragmentation & Scaling Cost",
    problem: "Device/browser variety and infrastructure costs.",
    solution: "Containerized, scalable execution (Docker/K8s).",
    tools: "Sauce Labs · BrowserStack · Cypress",
  },
  {
    n: "07",
    title: "Blind-Spot Regression (Inefficient Suites)",
    problem: "Every change triggers huge, slow test suites.",
    solution: "Predictive impact analysis & risk-based testing.",
    tools: "Launchable · SeaLights",
  },
  {
    n: "08",
    title: "Continuous Security Gaps (DevSecOps Latency)",
    problem: "Vulnerabilities slip past functional QA.",
    solution: "Automated DAST, SAST & SCA in CI/CD.",
    tools: "Snyk · SonarQube · OWASP ZAP",
  },
  {
    n: "09",
    title: "No Real-World Telemetry (Siloed Testing)",
    problem: "User issues go unnoticed in test environments.",
    solution: "Observability-driven testing (Shift-Right).",
    tools: "Datadog · Dynatrace · Honeycomb",
  },
  {
    n: "10",
    title: "Late Performance Testing in Microservices",
    problem: "Perf issues found too late, after the build.",
    solution: "Micro-benchmarking & service virtualization in PRs.",
    tools: "Grafana k6 · Locust · OpenTelemetry",
  },
];

/* Illustrative examples of what the work involves. Not client results. */
const OUTCOMES = [
  {
    client: "Example: fintech SaaS team",
    industry: "Regulated · High-stakes releases",
    tag: "Shift-Left Security",
    result:
      "What the work would involve: rebuilding a flaky end-to-end suite on self-healing automation and moving SAST, DAST and dependency scanning into every pull request, so security stops being a launch-week scramble.",
    metrics: ["Self-healing automation", "Security checks in every PR"],
  },
  {
    client: "Example: AI product (LLM)",
    industry: "Generative AI · Customer-facing",
    tag: "AI/LLM Testing",
    result:
      "What the work would involve: an evaluation harness for hallucination, bias and relevance with prompt-injection guardrails, turning 'it feels right' into repeatable release criteria.",
    metrics: ["LLM-as-a-Judge evals", "Prompt-injection guardrails"],
  },
  {
    client: "Example: high-traffic ecommerce",
    industry: "Scale · Peak-load events",
    tag: "Performance & Scale",
    result:
      "What the work would involve: containerized cross-browser execution on Kubernetes and load testing shifted left with micro-benchmarks in pull requests, so performance regressions show up before peak traffic does.",
    metrics: ["Parallel headless grid", "Load tests in PRs"],
  },
];

const TEAM_MEMBERS = [
  {
    role: "QA Automation Lead",
    expertise: "Playwright, Selenium, Cypress, self-healing frameworks",
    years: "9+ years",
  },
  {
    role: "SDET / Test Engineer",
    expertise: "API, contract & integration testing, test data design",
    years: "7+ years",
  },
  {
    role: "Performance Engineer",
    expertise: "Grafana k6, Locust, JMeter, OpenTelemetry, load modelling",
    years: "8+ years",
  },
  {
    role: "DevSecOps / Security Engineer",
    expertise: "SAST, DAST, SCA, OWASP, secrets & pipeline hardening",
    years: "8+ years",
  },
  {
    role: "AI / LLM QA Specialist",
    expertise: "DeepEval, Langfuse, Promptfoo, evaluation & guardrails",
    years: "5+ years",
  },
  {
    role: "QE Strategist / Test Architect",
    expertise: "Shift-left/right strategy, risk-based testing, CI/CD quality gates",
    years: "10+ years",
  },
];

/*
 * QA is the delivery bench behind the CTO offer, not a separate price list.
 * These cards route buyers into the approved ladder.
 */
const PACKAGES = [
  {
    name: "Launch Check",
    price: "AED 9,500",
    period: "$2,500 · £2,000 · 5 working days",
    description:
      "For AI-built MVPs (Lovable, Bolt, Cursor, Base44, Replit, v0): tests, load, security and payments checked by hand.",
    features: [
      "What is tested today, and the critical gaps",
      "A basic load test on key flows",
      "Security: exposed keys, Supabase RLS, auth",
      "Payments and webhooks",
      "Written report with a keep / fix / rebuild verdict",
    ],
    cta: "See the Launch Check",
    href: "/launch-check",
    highlighted: false,
  },
  {
    name: "Production & Investor Readiness Review",
    price: "AED 27,500",
    period: "$7,500 · 2 weeks",
    description:
      "Code quality and testing reviewed alongside architecture, security, team and delivery process.",
    features: [
      "Tests on the critical paths, CI and release safety",
      "Architecture, security and infrastructure",
      "Team and delivery process",
      "Investor-forwardable written report, presented live",
    ],
    cta: "See the Readiness Review",
    href: "/readiness-review",
    highlighted: true,
  },
  {
    name: "Fractional CTO",
    price: "AED 45,000",
    period: "$14,000 per month · 2 days a week",
    description:
      "Ongoing quality engineering as part of the CTO role: automation, quality gates, security and performance, owned by someone accountable.",
    features: [
      "Test automation and CI/CD quality gates",
      "Continuous security in the pipeline",
      "Performance and observability",
      "Weekly steering call plus written updates",
    ],
    cta: "See Fractional CTO",
    href: "/fractional-cto",
    highlighted: false,
  },
];

const FAQS = QA_FAQS;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Fit Call",
    description: "A 30-minute call about your testing, pipeline, and biggest quality risks. No obligation.",
  },
  {
    step: "02",
    title: "Quality Strategy",
    description: "A prioritized roadmap: what to automate, where to shift left and right, and the right tooling for your stack.",
  },
  {
    step: "03",
    title: "Implement & Automate",
    description: "We build resilient suites, wire quality gates into CI/CD, and harden security and performance — with weekly reports.",
  },
  {
    step: "04",
    title: "Continuous Quality",
    description: "Ongoing quality engineering and observability, with release-confidence reporting so every ship is calm.",
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

/* ─── Problem card: shows the problem first, then resolves to the solution ─── */
function ProblemCard({ p }: { p: (typeof PROBLEMS)[number] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setSolved(true), 700);
    return () => clearTimeout(id);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`bg-[#1A1A1A] border rounded-2xl p-7 transition-colors duration-700 h-full ${
        solved ? "border-[#8DD9BF]/20" : inView ? "border-red-400/25" : "border-white/5"
      }`}
    >
      <div className="flex items-start gap-4 mb-5">
        <span
          className={`text-3xl font-bold leading-none flex-shrink-0 transition-colors duration-700 ${
            solved ? "text-[#8DD9BF]/40" : "text-red-400/40"
          }`}
        >
          {p.n}
        </span>
        <h3 className="text-lg font-semibold leading-snug pt-1">{p.title}</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex gap-2">
          <span className="text-red-400/70 font-semibold flex-shrink-0 w-16">Problem</span>
          <span className={`transition-colors duration-700 ${solved ? "text-white/40" : "text-white/70"}`}>
            {p.problem}
          </span>
        </div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={solved ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <span className="text-[#8DD9BF] font-semibold flex-shrink-0 w-16">Solution</span>
          <span className="text-white/70">{p.solution}</span>
        </motion.div>
        <motion.div
          className="flex gap-2 pt-1 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: solved ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <span className="text-white/30 font-semibold flex-shrink-0 w-16 pt-2">Tools</span>
          <span className="text-[#8DD9BF]/50 text-xs pt-2">{p.tools}</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function QaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    stage: "",
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
        body: JSON.stringify({ type: "qa-lead", ...formData }),
      });
      trackLead("qa-lead", "qa-lead-form", res.ok, res.status);
      if (!res.ok) {
        setFormStatus("error");
        return;
      }
      setFormStatus("success");
      setFormData({ name: "", email: "", company: "", stage: "", message: "" });
    } catch {
      trackLead("qa-lead", "qa-lead-form", false);
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
            <a href="#problems" className="hover:text-white transition-colors">The 10 Problems</a>
            <a href="#approach" className="hover:text-white transition-colors">Approach</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8DD9BF] text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#A3E4CF] transition-colors"
          >
            Book a Fit Call
          </a>
        </div>
      </nav>

      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "QA & Testing", href: "/qa" }]} />

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
                  Better Testing. Stronger Software.
                </span>
              </div>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                We Build QA That Ships
                <br />
                Software That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DD9BF] to-[#6bc4a6]">
                  Doesn&apos;t Break
                </span>
              </h1>
            </div>

            <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                CTO-led quality engineering for teams shipping fast. From
                self-healing test automation and AI/LLM testing to security in
                CI/CD, shift-left performance, and observability — we solve the
                ten biggest testing problems of 2026.
              </p>
              <p className="text-sm md:text-base text-white/45 max-w-2xl -mt-6 mb-10 leading-relaxed">
                QA is part of Mohit Sengar&apos;s{" "}
                <a href="/fractional-cto" className="text-[#8DD9BF] hover:underline">
                  fractional CTO practice
                </a>
                : it&apos;s my delivery bench, the quality-engineering
                capability behind every CTO engagement.
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
                  Book a Free Fit Call
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
                  href="#problems"
                  className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all"
                >
                  See the 10 Problems
                </a>
                <a
                  href="#book-call"
                  className="inline-flex items-center justify-center border border-[#8DD9BF]/40 text-[#8DD9BF] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#8DD9BF]/10 transition-all"
                >
                  Send a Message
                </a>
              </div>
            </div>

            {/* Stats bar */}
            <div className="hero-rise" style={{ animationDelay: "0.4s" }}>
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
            <span>AI-Driven Testing</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Shift-Left &amp; Shift-Right</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>DevSecOps</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Continuous Testing</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>Observability-Driven</span>
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
                Your Users Find the Bugs
                <br />
                Your Tests Don&apos;t
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-4 text-lg text-white/50 leading-relaxed">
                <p>
                  Flaky tests fail for no reason. Regression takes hours. AI
                  features behave differently every run. Security surfaces the
                  week before launch. Performance problems appear in production.
                </p>
                <p>
                  You&apos;ve tried adding more tests, more manual QA, more
                  overtime. But 2026 software is more connected and ships faster
                  than that approach can handle.
                </p>
                <p className="text-white/80 font-medium">
                  You don&apos;t need to test more. You need to{" "}
                  <span className="text-[#8DD9BF]">test smarter</span> — with
                  quality engineered into every release.
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
              What QA Services Do We Offer?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Every discipline of modern quality engineering — under one roof,
              from one senior team that owns your release confidence.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * STAGGER.fast}>
                <div className="group relative bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 hover:border-[#8DD9BF]/20 transition-all h-full">
                  <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <p className="text-sm text-[#8DD9BF]/60 font-medium">
                    {service.tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE 10 PROBLEMS ─── */}
      <section id="problems" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              2026 Edition
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              The Top 10 Testing Problems We Solve
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              The biggest challenges in Quality Engineering today — and the
              modern solution and tooling we bring to each one.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.n} delay={(i % 2) * STAGGER.fast}>
                <ProblemCard p={p} />
              </Reveal>
            ))}
          </div>

          {/* Infographic visual */}
          <Reveal delay={0.1}>
            <div className="mt-16 max-w-3xl mx-auto">
              <p className="text-center text-sm text-white/30 uppercase tracking-widest mb-6">
                The full picture, at a glance
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/qa/testing-problems-2026.jpg"
                alt="Top 10 Software Testing Problems and Solutions in 2026 — problem, solution and tools for each, by Sengar Consultancy"
                width={1024}
                height={1536}
                loading="lazy"
                className="w-full h-auto rounded-2xl border border-white/10"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── OUTCOMES / RESULTS ─── */}
      <section id="results" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4 text-center">
              What Changes
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              What the Work Looks Like
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Illustrative examples, not client results: the kind of work
              quality engineering involves when it&apos;s done right.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {OUTCOMES.map((study, i) => (
              <Reveal key={study.client} delay={i * STAGGER.normal}>
                <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-lg font-semibold">{study.client}</p>
                      <p className="text-sm text-white/40">{study.industry}</p>
                    </div>
                    <span className="text-xs bg-[#8DD9BF]/10 text-[#8DD9BF] px-3 py-1.5 rounded-full font-medium">
                      {study.tag}
                    </span>
                  </div>
                  <p className="text-white/50 leading-relaxed mb-6 flex-1">
                    {study.result}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="text-xs bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-full font-medium"
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

      {/* ─── APPROACH / PROCESS ─── */}
      <section id="approach" className="py-24 md:py-32">
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
              A Full QE Squad,
              <br />
              Not a Solo Tester
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              When you hire us, you get a cross-functional quality-engineering
              team — automation leads, SDETs, performance and security
              engineers, and an AI/LLM QA specialist. Led by Mohit Sengar, a
              Dubai-based CTO with 7+ years in the seat and 14+ years building
              software.
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
                    has led technology and quality for startups and enterprises
                    across AI, e-commerce, blockchain, and digital
                    transformation. This QA practice is the delivery bench
                    behind his{" "}
                    <a href="/fractional-cto" className="text-[#8DD9BF] hover:underline">
                      fractional CTO
                    </a>{" "}
                    work. He doesn&apos;t just run your test suite; he
                    architects your release confidence.
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
              How Do You Buy Quality Engineering?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Quality engineering is my delivery bench, so it isn&apos;t sold as a
              separate package. You get it through these fixed-fee reviews and
              retainers, at my published prices.
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
                      Most Common
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#8DD9BF]">
                        {pkg.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/50 mt-1">{pkg.period}</p>
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
                          aria-hidden="true"
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
                    href={pkg.href}
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
                    Risk-Based
                  </p>
                  <p className="text-white/50 text-sm">
                    regression with predictive test selection instead of running
                    the whole suite on every change
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#8DD9BF] mb-2">
                    Shift-Left
                  </p>
                  <p className="text-white/40 text-sm">
                    security, performance and requirements validated before code
                    ships — not discovered the week before launch
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#8DD9BF] mb-2">
                    24/7
                  </p>
                  <p className="text-white/40 text-sm">
                    continuous testing in CI/CD so every commit is release-ready,
                    with observability feeding real behaviour back into QA
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
              Questions &amp; Answers
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

      {/* ─── LEAD CAPTURE / BOOK CALL ─── */}
      <section id="book-call" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <Reveal>
                <p className="text-sm uppercase tracking-widest text-[#8DD9BF]/60 mb-4">
                  Let&apos;s Talk Quality
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  Book a Free
                  <br />
                  <span className="text-[#8DD9BF]">Fit Call</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  30 minutes. Zero obligation. Tell me about your tests, pipeline
                  and release risks, and you&apos;ll get an honest read on what to
                  fix first and which next step fits.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="space-y-4">
                  {[
                    "Your tests, pipeline and coverage, talked through",
                    "An honest read on your biggest quality risks",
                    "Which first step fits: Launch Check, Readiness Review or a retainer",
                    "Published prices — no surprises",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-[#8DD9BF] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
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
                    Pick a 30-minute slot on my calendar: the fastest way to reach me.
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
                        aria-hidden="true"
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
                  <form id="qa-lead-form" onSubmit={handleSubmit} className="space-y-5">
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
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Company / Product
                      </label>
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#8DD9BF]/50 transition-colors"
                        placeholder="Acme, or acme.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Where are you now?
                      </label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={(e) =>
                          setFormData({ ...formData, stage: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8DD9BF]/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-[#1A1A1A]">
                          Select one
                        </option>
                        <option value="no-automation" className="bg-[#1A1A1A]">
                          Little or no automation
                        </option>
                        <option value="flaky-tests" className="bg-[#1A1A1A]">
                          Have tests, but they&apos;re flaky
                        </option>
                        <option value="slow-pipeline" className="bg-[#1A1A1A]">
                          Slow CI / long regression
                        </option>
                        <option value="ai-llm" className="bg-[#1A1A1A]">
                          Testing an AI / LLM product
                        </option>
                        <option value="post-incident" className="bg-[#1A1A1A]">
                          Recovering from an incident
                        </option>
                        <option value="scaling" className="bg-[#1A1A1A]">
                          Scaling and need release confidence
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        What&apos;s your biggest testing challenge?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#8DD9BF]/50 transition-colors resize-none"
                        placeholder="e.g. Flaky tests, slow releases, no AI test strategy, security gaps..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[#8DD9BF] text-black py-4 rounded-full font-semibold text-base hover:bg-[#A3E4CF] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send My Message"}
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
                          Book a call on my calendar
                        </a>{" "}
                        instead, or email{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="text-[#8DD9BF] hover:underline"
                        >
                          {CONTACT_EMAIL}
                        </a>{" "}
                        and I&apos;ll get back within 24 hours.
                      </p>
                    )}
                    <p className="text-xs text-white/30 text-center">
                      No spam. No obligation. Just a genuine conversation about
                      shipping better software.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#8DD9BF]/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Your Users Will Find the Bugs You Don&apos;t.
              <br />
              <span className="text-[#8DD9BF]">Let&apos;s Fix That.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Every release without real quality engineering is a bet. Better
              testing means faster, calmer ships and software that holds up when
              it matters. Let&apos;s engineer that into your pipeline.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Your Free Fit Call
              <svg
                className="ml-3 w-5 h-5"
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
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
