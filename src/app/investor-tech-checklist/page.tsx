"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/contact";

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
    <p className="itc-accent text-sm uppercase tracking-widest text-mint/60 mb-4 text-center">{children}</p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRINT STYLES
   Light page, no nav/footer/buttons, every item fully visible
   (Reveal leaves off-screen blocks at opacity 0 until scrolled to).
   ═══════════════════════════════════════════════════════════════ */
const PRINT_CSS = `
.itc-print-only { display: none; }
@media print {
  @page { margin: 14mm; }
  html, body { background: #ffffff !important; }
  .itc-root { background: #ffffff !important; color: #111111 !important; overflow: visible !important; }
  .itc-root * {
    color: #111111 !important;
    background: transparent !important;
    border-color: #d4d4d4 !important;
    box-shadow: none !important;
    text-shadow: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
  .itc-root .itc-accent { color: #1f6f56 !important; }
  .itc-root .itc-muted { color: #444444 !important; }
  .itc-root nav, .itc-root footer, .itc-no-print { display: none !important; }
  .itc-print-only { display: block !important; }
  .itc-root section { padding-top: 10px !important; padding-bottom: 10px !important; min-height: 0 !important; }
  .itc-area { break-before: auto; }
  .itc-area h2 { break-after: avoid; }
  .itc-item { break-inside: avoid; padding-top: 8px !important; padding-bottom: 8px !important; }
  .itc-card { break-inside: avoid; page-break-inside: avoid; }
  .itc-hero-inner { padding-top: 8px !important; padding-bottom: 8px !important; }
  .itc-howto { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 20px !important; }
  .itc-howto .itc-step { font-size: 28px !important; line-height: 1 !important; margin-bottom: 6px !important; }
  .itc-root a { text-decoration: none !important; }
  .itc-root input[type="checkbox"] { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

interface ChecklistItem {
  q: string;
  good: string;
}

interface ChecklistArea {
  id: string;
  title: string;
  intro: string;
  items: ChecklistItem[];
}

const AREAS: ChecklistArea[] = [
  {
    id: "architecture",
    title: "Architecture & scalability",
    intro: "Can the system carry the growth in your plan?",
    items: [
      {
        q: "Can you draw the system on one page and explain why it is built this way?",
        good: "A current architecture diagram, and someone who can explain each major choice and its trade-off.",
      },
      {
        q: "What breaks first if usage grows ten times?",
        good: "You know the bottleneck (database, a third-party API, a background job) and have a plan and a rough cost to fix it.",
      },
      {
        q: "Where are the single points of failure?",
        good: "Critical services, data stores and people are listed, each with a fallback or recovery plan.",
      },
      {
        q: "How much of the product depends on platforms you don't control?",
        good: "Key vendors are listed, with what happens if one raises prices, rate-limits you or goes down.",
      },
      {
        q: "Can a new engineer run the product locally and ship a change in their first week?",
        good: "Documented setup, a staging environment and a short onboarding guide that someone has actually followed.",
      },
    ],
  },
  {
    id: "code",
    title: "Code quality & testing",
    intro: "Can the team change the product safely and quickly?",
    items: [
      {
        q: "How are changes reviewed before they reach production?",
        good: "Every change goes through a pull request with review and automated checks; nobody pushes straight to production.",
      },
      {
        q: "What is tested automatically, and what isn't?",
        good: "Tests cover the paths that make or lose money (sign-up, payments, the core workflow), run on every change, and the gaps are known.",
      },
      {
        q: "How often do you release, and how often does a release cause an incident?",
        good: "Small, regular releases, with a simple record of incidents and rollbacks you can show.",
      },
      {
        q: "How much technical debt is there, and is it written down?",
        good: "A short, prioritised list of known debt with rough effort, not a vague sense that the code is messy.",
      },
      {
        q: "How much of the code was AI-generated, and who has reviewed it?",
        good: "The team knows where AI-generated code lives, and a human has reviewed the security-critical parts.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & data protection",
    intro: "Is customer data safe, and do you know which rules apply to it?",
    items: [
      {
        q: "Where are secrets such as API keys and database passwords kept, and who can see them?",
        good: "In a secrets manager or environment config, never in the code, the browser bundle or git history, and rotated when people leave.",
      },
      {
        q: "How is access to customer data controlled?",
        good: "Rules enforced on the server or in the database (for example row-level security), tested as a second user, with least-privilege admin access.",
      },
      {
        q: "What personal data do you hold, where is it stored, and which laws apply to it?",
        good: "A simple data map (what, where, why, for how long) and a view, confirmed with a lawyer, of which regimes apply, such as the UAE PDPL or the EU GDPR.",
      },
      {
        q: "Has anyone outside the team tested your security?",
        good: "An independent review or penetration test that fits your stage, with the findings tracked until closed.",
      },
      {
        q: "What happens if you are breached?",
        good: "A written incident plan: who decides, who is told, how keys are rotated and how customers are informed.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure, reliability & cloud cost",
    intro: "Will it stay up, and will the bill scale sensibly?",
    items: [
      {
        q: "Are backups automatic, and when did you last test a restore?",
        good: "Automated backups, and a restore that has actually been tested, with a known recovery time.",
      },
      {
        q: "How do you know the product is down before customers tell you?",
        good: "Error tracking, uptime monitoring and alerts that reach a named person.",
      },
      {
        q: "How do you deploy, and how do you roll back a bad release?",
        good: "Automated, repeatable deploys, and a rollback that more than one person knows how to run.",
      },
      {
        q: "What does infrastructure cost each month, and how will that grow with customers?",
        good: "You know the monthly bill, what drives it, and roughly the cost per customer or per transaction.",
      },
      {
        q: "Are production, staging and development kept separate?",
        good: "Separate environments and data, and no testing on real customers' data.",
      },
    ],
  },
  {
    id: "team",
    title: "Team, process & key-person risk",
    intro: "Can this team deliver the roadmap the money is paying for?",
    items: [
      {
        q: "If your lead engineer left tomorrow, what would stop working?",
        good: "Knowledge is written down and shared, and access and credentials don't depend on one person.",
      },
      {
        q: "Who makes technical decisions, and how are they recorded?",
        good: "A named technical owner, and short written records of the major decisions and why they were made.",
      },
      {
        q: "How is work planned, prioritised and tracked?",
        good: "A visible backlog, a regular planning rhythm, and a clear line from the roadmap to what engineers are doing this week.",
      },
      {
        q: "How do you work with agencies or contractors?",
        good: "Clear contracts and deliverables, code in your own repositories, and someone on your side able to judge the work.",
      },
      {
        q: "What is the hiring plan for the next 12 to 18 months?",
        good: "Roles tied to the roadmap and the budget, with a realistic view of how long each hire takes.",
      },
    ],
  },
  {
    id: "ip",
    title: "IP & ownership",
    intro: "Does the company actually own what it is selling?",
    items: [
      {
        q: "Are code repositories, cloud accounts, domains and app-store accounts owned by the company?",
        good: "All in company-controlled accounts with at least two admins; none in a founder's, freelancer's or agency's personal name.",
      },
      {
        q: "Has everyone who wrote code or designs assigned their IP to the company?",
        good: "Signed IP-assignment and confidentiality terms for employees and contractors, including early freelancers.",
      },
      {
        q: "Which open-source licences does the product use?",
        good: "A licence scan of your dependencies, with any copyleft licences (such as GPL or AGPL) reviewed against how you ship or host the product.",
      },
      {
        q: "Do you rely on code, data or models you may not have the rights to use?",
        good: "Third-party code, datasets and model terms reviewed, with commercial use permitted.",
      },
      {
        q: "Could you move to another hosting provider or key vendor if you had to?",
        good: "You know your lock-in points and the rough effort to move off each one.",
      },
    ],
  },
  {
    id: "product",
    title: "Product & data",
    intro: "Do you know how the product is used, and is the data fit for the next stage?",
    items: [
      {
        q: "What do you measure about how customers use the product?",
        good: "Analytics on the key actions, and a handful of metrics the team actually reviews.",
      },
      {
        q: "Will the data model support the next stage of the roadmap?",
        good: "The core entities and relationships can carry the planned features without a rewrite.",
      },
      {
        q: "How good is your data, and who owns its quality?",
        good: "Validation where data comes in, a named owner, and known gaps written down.",
      },
      {
        q: "Can customers export or delete their data?",
        good: "A working, tested way to handle export and deletion requests.",
      },
      {
        q: "How does the roadmap connect to revenue and customer feedback?",
        good: "Each major roadmap item traces back to customer evidence or a business goal.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI/LLM usage",
    intro: "If AI is in the product or the pitch, investors will ask how it is controlled.",
    items: [
      {
        q: "Which AI models and vendors does the product depend on, and what happens if one changes?",
        good: "Models and vendors listed, with a tested fallback or a clear plan to switch.",
      },
      {
        q: "How do you know the AI output is good enough?",
        good: "An evaluation set of real examples, re-run whenever prompts or models change.",
      },
      {
        q: "How is the product protected against prompt injection and misuse?",
        good: "Untrusted input kept apart from instructions, tools given the least permissions they need, and checks before sensitive actions.",
      },
      {
        q: "What customer data is sent to AI providers, and can they train on it?",
        good: "You know exactly what is sent, it is kept to the minimum, and the providers' retention and training terms have been reviewed.",
      },
      {
        q: "What does AI cost per customer, and is it capped?",
        good: "Cost per request tracked, with rate limits and budget alerts in place.",
      },
    ],
  },
];

const TOTAL = AREAS.reduce((n, a) => n + a.items.length, 0);

const HOW_TO = [
  {
    step: "01",
    title: "Sit down with whoever knows the tech",
    desc: "Your CTO, your lead developer or your agency. Set aside an hour or two; it goes faster with the person who built it.",
  },
  {
    step: "02",
    title: "Tick only what you can prove",
    desc: "Tick a question only if you could answer it today with evidence: a document, a dashboard, a link. “I think so” doesn't count.",
  },
  {
    step: "03",
    title: "Fix the gaps before an investor asks",
    desc: "Start with anything touching money, customer data and ownership. Those are the gaps that slow a round down.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`itc-no-print inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/15 transition-all cursor-pointer ${className}`}
    >
      <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print / Save as PDF
    </button>
  );
}

function CtaButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`itc-no-print inline-flex items-center justify-center bg-mint text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-mint-hover transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function InvestorTechChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const score = Object.values(checked).filter(Boolean).length;

  const toggle = (key: string) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main className="itc-root bg-[#0A0A0A] text-white overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            Mohit <span className="text-mint">Sengar</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#how-to-use" className="hover:text-white transition-colors">How to Use</a>
            <a href="#checklist" className="hover:text-white transition-colors">The Checklist</a>
            <a href="#review" className="hover:text-white transition-colors">Get a Review</a>
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

      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Investor Tech Checklist", href: "/investor-tech-checklist" },
        ]}
      />

      {/* Print-only header */}
      <div className="itc-print-only px-6 pb-2">
        <p className="itc-accent text-xs uppercase tracking-widest">mohitsengar.org/investor-tech-checklist</p>
        <p className="itc-muted text-xs">
          Mohit Sengar, fractional CTO, Dubai · {CONTACT_EMAIL}
        </p>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-6">
        <div className="itc-no-print absolute inset-0 bg-gradient-to-b from-mint/5 via-transparent to-transparent pointer-events-none" />
        <div className="itc-no-print absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-mint/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="itc-hero-inner relative max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
          <div className="hero-rise">
            <div className="itc-no-print inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="text-sm text-mint font-medium">Free checklist · No email needed</span>
            </div>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
              Investor Tech{" "}
              <span className="itc-accent text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-dark">
                Due-Diligence Checklist
              </span>
            </h1>
            <p className="itc-muted text-xl md:text-2xl text-white/70 font-medium mb-6">
              The questions investors ask about your technology
            </p>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.2s" }}>
            <p className="itc-muted text-lg text-white/60 max-w-3xl mb-4 leading-relaxed">
              When an investor gets serious, someone technical starts asking about your system, your
              team and who owns what. These are the {TOTAL} questions that come up, grouped into 8
              areas, each with a one-line description of what a good answer looks like.
            </p>
            <p className="itc-muted text-sm text-white/50 mb-10">
              By Mohit Sengar, Dubai-based fractional CTO · Published 22 October 2026
            </p>
          </div>
          <div className="hero-rise" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <PrintButton />
              <a
                href="#checklist"
                className="itc-no-print inline-flex items-center justify-center bg-mint text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-mint-hover transition-all"
              >
                Start the Checklist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW TO USE ─── */}
      <section id="how-to-use" className="py-20 md:py-24 border-y border-white/5 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>How to use it</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Three Steps, One Sitting</h2>
          <div className="itc-howto grid md:grid-cols-3 gap-8">
            {HOW_TO.map((s) => (
              <div key={s.step}>
                <div className="itc-accent itc-step text-5xl font-bold text-mint/15 mb-3">{s.step}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="itc-muted text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="itc-muted text-center text-xs text-white/50 mt-12 max-w-2xl mx-auto leading-relaxed">
            This checklist is not legal advice. Where a question touches on law, such as data
            protection or IP, use it to prepare for a conversation with your lawyer.
          </p>
        </div>
      </section>

      {/* ─── CHECKLIST ─── */}
      <section id="checklist" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          {/* Area index + score */}
          <div className="itc-no-print bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 md:p-7 mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <p className="text-lg font-semibold" aria-live="polite">
                You can answer <span className="text-mint">{score}</span> of {TOTAL} today
              </p>
              {score > 0 && (
                <button
                  type="button"
                  onClick={() => setChecked({})}
                  className="text-sm text-white/50 hover:text-white transition-colors self-start sm:self-auto cursor-pointer"
                >
                  Clear ticks
                </button>
              )}
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-6" aria-hidden="true">
              <div
                className="h-full bg-mint rounded-full transition-all duration-500"
                style={{ width: `${(score / TOTAL) * 100}%` }}
              />
            </div>
            <ul className="flex flex-wrap gap-2">
              {AREAS.map((a, i) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    className="inline-block bg-white/[0.03] border border-white/[0.08] hover:border-mint/30 rounded-full px-4 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {String(i + 1).padStart(2, "0")} {a.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-16">
            {AREAS.map((area, ai) => {
              const areaScore = area.items.filter((_, ii) => checked[`${area.id}-${ii}`]).length;
              return (
                <div key={area.id} id={area.id} className="itc-area scroll-mt-24">
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      <span className="itc-accent text-mint/50 mr-3">{String(ai + 1).padStart(2, "0")}</span>
                      {area.title}
                    </h2>
                    <span className="itc-muted text-sm text-white/50 flex-shrink-0 tabular-nums">
                      {areaScore}/{area.items.length}
                    </span>
                  </div>
                  <p className="itc-muted text-white/50 mb-4">{area.intro}</p>
                  <ol className="divide-y divide-white/[0.06]">
                    {area.items.map((item, ii) => {
                      const key = `${area.id}-${ii}`;
                      const n = AREAS.slice(0, ai).reduce((sum, a) => sum + a.items.length, 0) + ii + 1;
                      return (
                        <li key={key} className="itc-item py-5">
                          <label className="flex items-start gap-4 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={!!checked[key]}
                              onChange={() => toggle(key)}
                              className="mt-1 w-5 h-5 flex-shrink-0 accent-[#8DD9BF] cursor-pointer"
                            />
                            <span>
                              <span className="block text-white font-medium leading-snug md:text-lg group-hover:text-mint transition-colors">
                                <span className="itc-muted text-white/50 tabular-nums mr-2">{n}.</span>
                                {item.q}
                              </span>
                              <span className="itc-muted block text-white/55 text-sm md:text-base leading-relaxed mt-2">
                                <span className="itc-accent text-mint/80 font-medium">What good looks like: </span>
                                {item.good}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>

          <div className="itc-no-print flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 md:p-7">
            <p className="text-lg font-semibold">
              Your score: <span className="text-mint">{score}</span> of {TOTAL}
            </p>
            <PrintButton className="w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* ─── GET A REVIEW ─── */}
      <section id="review" className="py-24 md:py-32 bg-[#111]/50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionLabel>Want an independent answer?</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight">
              Get an Independent View on Your Answers
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="itc-muted text-white/50 text-center max-w-2xl mx-auto mb-14">
              Investors trust an independent view more than a founder&apos;s self-assessment. These
              are the fixed-fee ways to get one.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <a
                href="/readiness-review"
                className="itc-card group block h-full bg-[#1A1A1A] border-2 border-mint rounded-2xl p-8 shadow-[0_0_40px_rgba(141,217,191,0.1)]"
              >
                <p className="itc-accent text-xs uppercase tracking-widest text-mint mb-3">Founders</p>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-mint transition-colors">
                  Production &amp; Investor Readiness Review
                </h3>
                <p className="itc-accent text-mint font-semibold">AED 27,500 / $7,500 · 2 weeks</p>
                <p className="itc-muted text-white/50 text-sm leading-relaxed mt-3">
                  An independent view on the areas investors probe most, in a report you can forward
                  to investors, presented live.
                </p>
                <p className="itc-no-print text-mint text-sm font-medium mt-5">See the review &rarr;</p>
              </a>
            </Reveal>
            <Reveal delay={STAGGER.normal}>
              <a
                href="/readiness-review#investors"
                className="itc-card group block h-full bg-[#1A1A1A] border border-white/5 hover:border-mint/20 rounded-2xl p-8 transition-colors"
              >
                <p className="itc-accent text-xs uppercase tracking-widest text-mint/70 mb-3">Investors</p>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-mint transition-colors">
                  Buy-side Technical Due Diligence
                </h3>
                <p className="itc-accent text-mint font-semibold">From AED 35,000 / from $9,500</p>
                <p className="itc-muted text-white/50 text-sm leading-relaxed mt-3">
                  1 to 3 weeks, fixed scope, reporting to you before a deal closes.
                </p>
                <p className="itc-no-print text-mint text-sm font-medium mt-5">See buy-side diligence &rarr;</p>
              </a>
            </Reveal>
            <Reveal delay={STAGGER.normal * 2}>
              <a
                href="/launch-check"
                className="itc-card group block h-full bg-[#1A1A1A] border border-white/5 hover:border-mint/20 rounded-2xl p-8 transition-colors"
              >
                <p className="itc-accent text-xs uppercase tracking-widest text-mint/70 mb-3">AI-built MVPs</p>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-mint transition-colors">Launch Check</h3>
                <p className="itc-accent text-mint font-semibold">AED 9,500 / $2,500 · 5 days</p>
                <p className="itc-muted text-white/50 text-sm leading-relaxed mt-3">
                  Built with Lovable, Bolt, Cursor or similar? Security, Supabase RLS, auth,
                  payments, tests and load, with a keep, fix or rebuild verdict.
                </p>
                <p className="itc-no-print text-mint text-sm font-medium mt-5">See the Launch Check &rarr;</p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── ABOUT THE AUTHOR ─── */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="itc-card bg-gradient-to-r from-mint/10 to-transparent border border-mint/15 rounded-2xl p-8 md:p-10">
              <p className="itc-accent text-sm uppercase tracking-widest text-mint/60 mb-4">Who wrote this</p>
              <p className="itc-muted text-white/65 leading-relaxed mb-4">
                I&apos;m Mohit Sengar, a Dubai-based CTO with 7 years in the seat and 14+ years
                building software for 40+ companies. I take AI-built and agency-built products to
                production and make them investor-ready, and then I stay on as your part-time CTO
                until you&apos;re ready to hire a full-time one. You work with me directly.
              </p>
              <p className="itc-muted text-sm text-white/50">
                Outstanding Leadership Award, Internet 2.0 Conference, Dubai, February 2024
                <span className="itc-no-print">
                  {" · "}
                  <a href="/fractional-cto" className="text-mint hover:underline">
                    Fractional CTO
                  </a>
                  {" · "}
                  <a href="/resume" className="text-mint hover:underline">
                    Resume
                  </a>
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="itc-no-print py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-mint/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Raising Soon?
              <br />
              <span className="text-mint">Talk It Through in 30 Minutes.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Book a free fit call. Bring the questions you couldn&apos;t tick, and we&apos;ll work
              out which ones matter for your round and what to do about them.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton className="px-10 py-5 text-lg">Book a Free Fit Call</CtaButton>
              <PrintButton className="px-10 py-5 text-lg" />
            </div>
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

      {/* Print-only footer */}
      <div className="itc-print-only px-6 pt-4 pb-2 border-t">
        <p className="itc-muted text-xs leading-relaxed">
          Want an independent view? Production &amp; Investor Readiness Review,
          2 weeks, AED 27,500 / $7,500: mohitsengar.org/readiness-review · Book a free fit call:{" "}
          {CALENDLY_URL.replace(/^https?:\/\//, "")} · {CONTACT_EMAIL}
        </p>
      </div>

      <div className="itc-no-print">
        <SiteFooter />
      </div>
    </main>
  );
}
