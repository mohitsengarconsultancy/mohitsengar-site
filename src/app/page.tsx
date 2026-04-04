"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, FormEvent } from "react";

/* ─── Data ─── */
const PROJECTS = [
  { img: "/images/project-apcoa.jpg", url: "https://www.apcoa.com/", name: "APCOA Parking", result: "Enterprise parking management platform across Europe" },
  { img: "/images/project-ferrari.jpg", url: "https://www.ferrariworldabudhabi.com/", name: "Ferrari World Abu Dhabi", result: "Theme park operations & digital experience platform" },
  { img: "/images/project-social27.jpg", url: "https://www.social27.com/", name: "Social27", result: "AI-powered virtual event & networking platform" },
  { img: "/images/project-vourity.png", url: "https://vourity.com/", name: "Vourity", result: "Payment-integrated parking solutions for Scandinavia" },
  { img: "/images/project-5.png", url: "https://www.mohitsengar.org/", name: "Custom Platform", result: "Bespoke enterprise application development" },
  { img: "/images/project-atlas.jpg", url: "https://www.atlashxm.com/", name: "Atlas HXM", result: "HR & human experience management platform" },
];

const TESTIMONIALS = [
  {
    img: "/images/testimonial-talal.jpg",
    name: "Talal Alhabib",
    role: "XR Conference Speaker",
    text: "I had the pleasure of engaging with Mohit in a fireside chat on Extended Reality (XR) at the Internet 2.0 conference. His command over XR technology and its applications across various sectors is truly impressive.",
  },
  {
    img: "/images/testimonial-nathan.jpeg",
    name: "Nathan Jaskot",
    role: "Client",
    text: "Working with Mohit has been great! He is a technical expert in all things development! I can consistently rely on him to provide great advice, technical expertise and well developed solutions. Highly recommended.",
  },
  {
    img: "/images/testimonial-erlend.jpeg",
    name: "Erlend B\u00e5rli-Olsen",
    role: "APCOA Parkings GmbH",
    text: "My absolute pleasure to endorse Mohit — an invaluable asset and the pivotal force behind our success at APCOA Parkings GmbH. He has consistently demonstrated exceptional technical acumen and unwavering dedication to our projects.",
  },
  {
    img: "/images/testimonial-emma.jpeg",
    name: "Emma Lucas",
    role: "Client",
    text: "I highly recommend Mohit for his exceptional support, timely actions, and platform development skills. His expertise and dedication have been invaluable to our project's success. A skilled and reliable developer.",
  },
  {
    img: "/images/testimonial-max.jpeg",
    name: "Max Aronsson",
    role: "Long-term Collaborator",
    text: "Competent and trustworthy fullstack developer. Mohit is communicative and a great team player. Always available and open to new ideas — he thrived in a fast changing environment. Solved complex problems during many years of collaboration.",
  },
  {
    img: "/images/testimonial-nadia.jpeg",
    name: "Nadia O.",
    role: "Legal Tech Founder",
    text: "Your contributions have helped us bring our idea to life and positioned our application as a game-changer in the legal tech domain. Your efforts as a full-stack software engineer are exceptional.",
  },
];

const GALLERY_IMAGES = [
  "/images/gallery1.jpeg",
  "/images/gallery2.jpeg",
  "/images/gallery3.jpeg",
  "/images/gallery4.jpeg",
];

const ENGAGEMENT_MODELS = [
  {
    title: "Fractional CTO",
    desc: "Ongoing strategic tech leadership for 10-20 hours/week. Architecture decisions, team hiring, vendor selection, and delivery oversight.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Technical Due Diligence",
    desc: "Pre-investment or pre-acquisition deep-dive into a company's codebase, team, and infrastructure. Delivered as a written report with risk assessment.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Team Building & Hiring",
    desc: "I help you define roles, vet candidates, and build an engineering culture that retains talent and ships on schedule.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Architecture & Scaling Review",
    desc: "One-time engagement to audit your current system and deliver a scaling roadmap — so your architecture doesn't break at the next growth stage.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: "What does the first engagement look like?",
    a: "We start with a free 30-minute call where I learn about your business, tech stack, and goals. If there's a fit, I'll propose an engagement model — fractional, project-based, or advisory — with clear scope and timeline. No pressure, no obligation.",
  },
  {
    q: "What is a fractional CTO?",
    a: "A fractional CTO is an experienced technology executive who provides part-time CTO services to companies that need strategic technology leadership but may not require or afford a full-time CTO. I bring 14+ years of enterprise experience to help with technology strategy, team building, architecture decisions, and digital transformation — typically 10-20 hours per week.",
  },
  {
    q: "How much does it cost to work with you?",
    a: "It depends on the engagement model. Fractional CTO retainers, project-based architecture reviews, and one-time due diligence assessments are all priced differently. I'm transparent about pricing from the first call — no surprises.",
  },
  {
    q: "What if it's not a good fit?",
    a: "No hard feelings. The initial call is free, and I only propose next steps if I genuinely believe I can help. I've turned down work that wasn't the right match — my 100% success rate depends on it.",
  },
  {
    q: "Can you work with my existing team?",
    a: "Absolutely. Most of my engagements involve integrating with existing developers. I don't replace your team — I make them more effective through better architecture, clearer processes, and strategic technical direction.",
  },
  {
    q: "How quickly can you start?",
    a: "Typically within 1-2 weeks. For urgent needs, I can prioritize availability. Let's discuss your timeline on the strategy call.",
  },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mohitsengarr/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/mohitsengarr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/mohitsengar",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
  },
];

/* ─── Carousel Hook ─── */
function useCarousel(length: number, interval = 4000) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);
  useEffect(() => {
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval]);
  return { index, next, prev, setIndex };
}

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold pr-4">{q}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
}

/* ─── Email Capture ─── */
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="text-mint font-semibold text-lg">Thanks! Check your inbox.</p>
        <p className="text-gray-500 text-sm mt-1">The playbook is on its way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-mint"
      />
      <button
        type="submit"
        className="bg-mint hover:bg-mint-dark text-black font-semibold px-6 py-3 rounded-md transition-colors whitespace-nowrap"
      >
        Get the Playbook
      </button>
    </form>
  );
}

/* ─── Page ─── */
export default function Home() {
  const testimonialCarousel = useCarousel(TESTIMONIALS.length, 5000);

  return (
    <main className="bg-white text-black">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Mohit Sengar speaking at technology conference"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            I Help Founders Build Engineering Teams That Actually Ship
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            14 years. 47+ companies. $0 in missed deadlines. As a fractional
            CTO, I plug into your startup and build the tech org you need
            &mdash; without the $400K/year salary.
          </p>
          <a
            href="https://calendly.com/mohitsengarr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-mint hover:bg-mint-dark text-black font-semibold px-8 py-4 rounded-md transition-colors text-lg"
          >
            Book a Free 30-Min Strategy Session &rarr;
          </a>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-black text-white py-6">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "47+", label: "Clients Worldwide" },
            { num: "100%", label: "Job Success Rate" },
            { num: "29,000+", label: "Hours Delivered" },
            { num: "Top 1%", label: "Upwork (Top Rated Plus)" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-mint">{s.num}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROBLEM / AGITATION ═══ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Sound Familiar?</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-6 text-left">
            <p>
              You&apos;ve got a product vision but your engineering team keeps
              missing deadlines. You&apos;ve hired developers &mdash; some
              great, some not &mdash; but nobody&apos;s connecting the dots
              between business goals and technical execution.
            </p>
            <p>
              Your CTO search has been going on for months, and you can&apos;t
              afford to wait anymore. Meanwhile, technical debt is piling up,
              your architecture won&apos;t scale past the next funding round,
              and every week you delay costs you runway.
            </p>
            <p className="text-black font-semibold text-xl text-center">
              You don&apos;t need another developer. You need a technical leader
              who&apos;s built this before &mdash; 47 times.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ HOW I WORK WITH YOU ═══ */}
      <section className="py-20 px-6 bg-gray-50" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How I Work With You
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every engagement starts with a free 30-minute strategy call where
              I assess your situation and recommend next steps &mdash; no
              obligation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {ENGAGEMENT_MODELS.map((m) => (
              <div
                key={m.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-mint/15 rounded-lg flex items-center justify-center mb-4 text-mint">
                  {m.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                <p className="text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-mint hover:bg-mint-dark text-black font-semibold px-8 py-4 rounded-md transition-colors text-lg"
            >
              Book a Free Strategy Session &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══ TRACK RECORD ═══ */}
      <section className="py-20 px-6 bg-white" id="about">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/stats-photo.jpeg"
                alt="Mohit Sengar - Award-winning CTO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Companies Trust Me
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I&apos;ve spent 14 years building technology that works &mdash;
                for 47+ companies across healthcare, fintech, e-commerce,
                parking management, and theme park operations. Here&apos;s what
                that track record looks like:
              </p>
              <ul className="space-y-5">
                {[
                  "Collaborated with 47+ clients across diverse industries worldwide",
                  "100% job success rate — I don't take on work I can't deliver",
                  "Top Rated Plus on Upwork — reserved for the top 1% of freelancers",
                  "29,000+ hours of engineering leadership delivered",
                  "Outstanding Leadership Award — Internet 2.0 Conference, Dubai 2024",
                ].map((stat, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="mt-1 flex-shrink-0 w-6 h-6 bg-mint rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 leading-relaxed">{stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEAD MAGNET / EMAIL CAPTURE ═══ */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Not Ready to Talk Yet? No Problem.
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Get my free <strong>Fractional CTO Playbook</strong> &mdash; how to
            get CTO-level strategy without the full-time salary. Sent straight
            to your inbox.
          </p>
          <EmailCapture />
          <p className="text-gray-500 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ═══ AWARD ═══ */}
      <section className="py-20 px-6 bg-gray-50" id="awards">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Outstanding Leadership Award
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Honored at Dubai&apos;s Internet 2.0 Conference, February 2024,
              for transformative impact in steering Invatu Technologies towards
              innovation and success.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                <Image
                  src={src}
                  alt={`Mohit Sengar at Internet 2.0 Conference Dubai - photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="py-20 px-6 bg-white" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Companies I&apos;ve Worked With
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            From enterprise parking systems across Europe to theme park digital
            experiences in Abu Dhabi &mdash; I&apos;ve delivered across
            industries and continents.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="relative aspect-[3/2] bg-white flex items-center justify-center">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-contain p-10"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.result}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 px-6 bg-gray-50" id="testimonials">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Clients Say
          </h2>
          <div className="relative overflow-hidden">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${testimonialCarousel.index * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="carousel-slide flex flex-col items-center text-center px-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5">
                    <Image src={t.img} alt={t.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <span className="text-sm text-mint mb-4">{t.role}</span>
                  <p className="text-gray-600 max-w-xl leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={testimonialCarousel.prev} className="bg-white hover:bg-gray-100 shadow-sm rounded-full w-10 h-10 flex items-center justify-center transition-colors" aria-label="Previous testimonial">
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => testimonialCarousel.setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === testimonialCarousel.index ? "bg-mint" : "bg-gray-300"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={testimonialCarousel.next} className="bg-white hover:bg-gray-100 shadow-sm rounded-full w-10 h-10 flex items-center justify-center transition-colors" aria-label="Next testimonial">
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 px-6 bg-white" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common Questions
          </h2>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 px-6 bg-mint/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stop Worrying About Engineering?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Book a free 30-minute strategy session. I&apos;ll audit your current
            situation and give you 3 actionable recommendations &mdash; no
            strings attached.
          </p>
          <a
            href="https://calendly.com/mohitsengarr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-mint hover:bg-mint-dark text-black font-semibold px-10 py-4 rounded-md transition-colors text-lg"
          >
            Book Your Free Strategy Session &rarr;
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-black text-white py-16 px-6" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Mohit Sengar</h3>
              <p className="text-gray-400 leading-relaxed">
                Award-winning CTO and fractional technology leader. 14+ years
                helping companies build engineering teams that ship.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Get in Touch
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="mailto:mohitsingh.shiv@gmail.com" className="hover:text-mint transition-colors">
                    mohitsingh.shiv@gmail.com
                  </a>
                </li>
                <li>Based in India, working globally</li>
                <li>
                  <a
                    href="https://calendly.com/mohitsengarr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mint transition-colors"
                  >
                    Schedule a Call &rarr;
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Connect
              </h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-mint transition-colors"
                    aria-label={`${link.name} profile`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                NGO collaborations: Dream Girl Foundation, Donate an Hour
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Mohit Sengar. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Icons ─── */
function ChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
