"use client";

import { useState, useRef, useEffect, FormEvent, ReactNode } from "react";
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
  { value: "40+", label: "Engagements Shipped" },
  { value: "100%", label: "Completion Record" },
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

const OUTCOMES = [
  {
    client: "Fintech SaaS Team",
    industry: "Regulated · High-stakes releases",
    tag: "Shift-Left Security",
    result:
      "Rebuilt a flaky end-to-end suite on self-healing automation and moved SAST, DAST and dependency scanning into every pull request — so security stopped being a launch-week scramble.",
    metrics: ["Flaky rate → near zero", "Security in every PR", "Faster, calmer releases"],
  },
  {
    client: "AI Product (LLM)",
    industry: "Generative AI · Customer-facing",
    tag: "AI/LLM Testing",
    result:
      "Stood up an evaluation harness for hallucination, bias and relevance with prompt-injection guardrails, turning 'it feels right' into measurable, repeatable release criteria.",
    metrics: ["LLM-as-a-Judge evals", "Prompt-injection guardrails", "Release confidence"],
  },
  {
    client: "High-Traffic Ecommerce",
    industry: "Scale · Peak-load events",
    tag: "Performance & Scale",
    result:
      "Containerized cross-browser execution on Kubernetes and shifted load testing left with micro-benchmarks in PRs, catching performance regressions before peak-season traffic did.",
    metrics: ["Regression: hours → minutes", "Parallel headless grid", "Perf caught in PRs"],
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

const PACKAGES = [
  {
    name: "QA Health Audit",
    price: "$997",
    period: "one-time",
    description:
      "A deep review of your testing, pipeline, security and performance posture — with a prioritized plan to fix it.",
    features: [
      "Test coverage & flakiness audit",
      "CI/CD pipeline & quality-gate review",
      "Security & performance posture check",
      "Prioritized remediation roadmap",
      "30-minute strategy walkthrough call",
    ],
    cta: "Book Your Audit",
    highlighted: false,
  },
  {
    name: "Test Automation Sprint",
    price: "$4,997",
    period: "60-day engagement",
    description:
      "An aggressive 60-day sprint to build resilient automation, kill flaky tests, and wire quality into your pipeline.",
    features: [
      "Everything in QA Health Audit",
      "Self-healing test automation build-out",
      "CI/CD integration & quality gates",
      "Flaky-test elimination",
      "Risk-based regression selection",
      "Weekly progress reports",
      "Dedicated Slack channel",
    ],
    cta: "Start Your Sprint",
    highlighted: true,
  },
  {
    name: "Quality Engineering Retainer",
    price: "$6,997",
    period: "per month",
    description:
      "Your fractional quality engineering team — automation, AI/LLM testing, security, performance and observability, owned end to end.",
    features: [
      "Everything in Automation Sprint",
      "AI / LLM system testing",
      "Continuous security in CI (DevSecOps)",
      "Shift-left performance testing",
      "Observability-driven QA",
      "Release-confidence reporting",
      "Priority support (48hr SLA)",
    ],
    cta: "Apply for Retainer",
    highlighted: false,
  },
];

const FAQS = [
  {
    question: "What does a QA and quality engineering engagement include?",
    answer:
      "Modern quality engineering across the whole delivery lifecycle: resilient test automation, AI/LLM system testing, performance and load testing shifted left, continuous security (SAST, DAST, SCA) in CI/CD, microservice contract testing and service virtualization, and observability-driven testing that feeds real production behaviour back into your suite. The focus is testing smarter, not just testing more.",
  },
  {
    question: "How do you fix flaky tests?",
    answer:
      "Most flakiness comes from selector fragility against dynamic DOM structures — a small UI change breaks an XPath or CSS selector and a test fails even though the app works. We rebuild suites on self-healing frameworks (Playwright, testRigor, Katalon) that use multiple locators and context to find elements even when the original selector changes, so false failures stop eroding trust in automation.",
  },
  {
    question: "Can you test AI and LLM features?",
    answer:
      "Yes. Because a large language model can return different responses to similar inputs, we evaluate qualities rather than a single expected output — hallucinations, bias, toxicity, truthfulness, relevance and prompt-injection resistance — using an LLM-as-a-Judge approach with tools like DeepEval, Langfuse and Promptfoo.",
  },
  {
    question: "How much does QA cost?",
    answer:
      "Three engagement models: a one-time QA Health Audit from $997, a 60-day Test Automation Sprint from $4,997, and an ongoing Quality Engineering Retainer from $6,997/month. Each is scoped to your stack and risk profile with clear deliverables and timelines. Book a free QA audit call for a custom quote.",
  },
  {
    question: "What testing tools do you use?",
    answer:
      "We are tool-agnostic and pick what fits your stack: Playwright, testRigor and Katalon for automation; DeepEval, Langfuse and Promptfoo for AI/LLM evaluation; Grafana k6, Locust and OpenTelemetry for performance; Snyk, SonarQube and OWASP ZAP for security; PactFlow, WireMock and Tricentis for integration; Tonic.ai, Delphix and K2view for test data; and Datadog, Dynatrace and Honeycomb for observability.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "QA audits and rescues usually start within a week. For a launch on fire — a broken pipeline, a security scare, or a release deadline — we offer priority onboarding. Book a free QA audit to discuss your timeline.",
  },
  {
    question: "Do you work with our existing team and CI/CD?",
    answer:
      "Yes. We plug into your existing engineers, repositories and pipelines rather than replacing them — reviewing what you have, writing a remediation plan, and either implementing it ourselves or handing your team a clear spec. Most engagements end with a durable QA capability owned by your permanent team.",
  },
  {
    question: "Who leads the engagement?",
    answer:
      "Every engagement is overseen by Mohit Sengar, an award-winning CTO with 14+ years of enterprise experience across AI, e-commerce, blockchain and digital transformation, and a 100% completion record across 40+ engagements. You get senior quality-engineering leadership, not a hand-off to juniors.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free QA Audit",
    description: "A 30-minute deep dive into your testing, pipeline, and biggest quality risks. No obligation.",
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
            aria-hidden="true"
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
      if (!res.ok) {
        setFormStatus("error");
        return;
      }
      setFormStatus("success");
      setFormData({ name: "", email: "", company: "", stage: "", message: "" });
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
            <a href="#problems" className="hover:text-white transition-colors">The 10 Problems</a>
            <a href="#approach" className="hover:text-white transition-colors">Approach</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href="#book-call"
            className="bg-[#8DD9BF] text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#A3E4CF] transition-colors"
          >
            Free QA Audit
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
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#8DD9BF]/10 border border-[#8DD9BF]/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#8DD9BF] animate-pulse" />
                <span className="text-sm text-[#8DD9BF] font-medium">
                  Better Testing. Stronger Software.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                We Build QA That Ships
                <br />
                Software That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DD9BF] to-[#6bc4a6]">
                  Doesn&apos;t Break
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                CTO-led quality engineering for teams shipping fast. From
                self-healing test automation and AI/LLM testing to security in
                CI/CD, shift-left performance, and observability — we solve the
                ten biggest testing problems of 2026.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a
                  href="#book-call"
                  className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Free QA Audit
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
              What Good QA Actually Delivers
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Representative engagements — the kind of change quality
              engineering makes when it&apos;s done right.
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
              engineers, and an AI/LLM QA specialist. Led by Mohit Sengar, an
              award-winning CTO with 14+ years of enterprise experience.
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
                    award-winning CTO who has led technology and quality for
                    startups and enterprises across AI, e-commerce, blockchain,
                    and digital transformation. He doesn&apos;t just run your
                    test suite; he architects your release confidence.
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
              How Much Does Quality Engineering Cost?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 text-center max-w-2xl mx-auto mb-16">
              Three clear engagements. No hidden fees. No scope creep. Pick the
              one that matches where your quality is today — and where it needs
              to be.
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
                    10x
                  </p>
                  <p className="text-white/40 text-sm">
                    faster regression with predictive, risk-based test selection
                    instead of running the whole suite on every change
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
                  Book Your Free
                  <br />
                  <span className="text-[#8DD9BF]">QA Audit</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  30 minutes. Zero obligation. We&apos;ll review your testing and
                  pipeline live, pinpoint your biggest quality risks, and give
                  you a concrete plan — whether you hire us or not.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="space-y-4">
                  {[
                    "Live review of your tests, pipeline & coverage",
                    "Your top quality and release risks, ranked",
                    "A prioritized plan for your stack",
                    "Transparent pricing — no surprises",
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
                        : "Book My Free QA Audit"}
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
              href="#book-call"
              className="inline-flex items-center justify-center bg-[#8DD9BF] text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#A3E4CF] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Claim Your Free QA Audit Now
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
