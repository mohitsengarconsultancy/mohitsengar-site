"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef, FormEvent, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ANIMATION SYSTEM — Nubien-inspired premium motion tokens
   Tweak speed/intensity by modifying these constants.
   ═══════════════════════════════════════════════════════════════ */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

const REVEAL = {
  duration: 0.8,
  ease: EASE_OUT,
  distance: 40, // px to travel
};

const STAGGER = {
  fast: 0.08,
  normal: 0.12,
  slow: 0.18,
};

/* ─── Reusable Reveal Component ─── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const directionMap = {
    up: { y: REVEAL.distance, x: 0 },
    down: { y: -REVEAL.distance, x: 0 },
    left: { x: REVEAL.distance, y: 0 },
    right: { x: -REVEAL.distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
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

/* ─── Stagger Container ─── */
function StaggerContainer({
  children,
  className = "",
  stagger = STAGGER.normal,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

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

/* ─── Stagger Item ─── */
function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left";
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: direction === "up" ? 30 : 0, x: direction === "left" ? 30 : 0 },
        visible: { opacity: 1, y: 0, x: 0, transition: { duration: REVEAL.duration, ease: EASE_OUT } },
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
const PROJECTS = [
  { img: "/images/project-apcoa.jpg", url: "https://www.apcoa.com/", name: "APCOA Parking", result: "Enterprise parking management platform across Europe" },
  { img: "/images/project-ferrari.jpg", url: "https://www.ferrariworldabudhabi.com/", name: "Ferrari World Abu Dhabi", result: "Theme park operations & digital experience platform" },
  { img: "/images/project-social27.jpg", url: "https://www.social27.com/", name: "Social27", result: "AI-powered virtual event & networking platform" },
  { img: "/images/project-vourity.png", url: "https://vourity.com/", name: "Vourity", result: "Payment-integrated parking solutions for Scandinavia" },
  { img: "/images/project-5.png", url: "https://www.mohitsengar.org/", name: "Custom Platform", result: "Bespoke enterprise application development" },
  { img: "/images/project-atlas.jpg", url: "https://www.atlashxm.com/", name: "Atlas HXM", result: "HR & human experience management platform" },
];

const TESTIMONIALS = [
  { img: "/images/testimonial-talal.jpg", name: "Talal Alhabib", role: "XR Conference Speaker", text: "I had the pleasure of engaging with Mohit in a fireside chat on Extended Reality (XR) at the Internet 2.0 conference. His command over XR technology and its applications across various sectors is truly impressive." },
  { img: "/images/testimonial-nathan.jpeg", name: "Nathan Jaskot", role: "Client", text: "Working with Mohit has been great! He is a technical expert in all things development! I can consistently rely on him to provide great advice, technical expertise and well developed solutions. Highly recommended." },
  { img: "/images/testimonial-erlend.jpeg", name: "Erlend B\u00e5rli-Olsen", role: "APCOA Parkings GmbH", text: "My absolute pleasure to endorse Mohit — an invaluable asset and the pivotal force behind our success at APCOA Parkings GmbH. He has consistently demonstrated exceptional technical acumen and unwavering dedication to our projects." },
  { img: "/images/testimonial-emma.jpeg", name: "Emma Lucas", role: "Client", text: "I highly recommend Mohit for his exceptional support, timely actions, and platform development skills. His expertise and dedication have been invaluable to our project's success. A skilled and reliable developer." },
  { img: "/images/testimonial-max.jpeg", name: "Max Aronsson", role: "Long-term Collaborator", text: "Competent and trustworthy fullstack developer. Mohit is communicative and a great team player. Always available and open to new ideas — he thrived in a fast changing environment. Solved complex problems during many years of collaboration." },
  { img: "/images/testimonial-nadia.jpeg", name: "Nadia O.", role: "Legal Tech Founder", text: "Your contributions have helped us bring our idea to life and positioned our application as a game-changer in the legal tech domain. Your efforts as a full-stack software engineer are exceptional." },
];

const GALLERY_IMAGES = ["/images/gallery1.jpeg", "/images/gallery2.jpeg", "/images/gallery3.jpeg", "/images/gallery4.jpeg"];

const ENGAGEMENT_MODELS = [
  {
    title: "Fractional CTO",
    desc: "Ongoing strategic tech leadership for 10-20 hours/week. Architecture decisions, team hiring, vendor selection, and delivery oversight.",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    visual: (
      <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-mint font-semibold">Delivery Dashboard</span>
          <span className="text-white/30">Live</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ l: "On-Time", v: "98%", c: "text-emerald-400" }, { l: "Sprints", v: "12", c: "text-mint" }, { l: "Bug Rate", v: "0.3%", c: "text-emerald-400" }].map((s) => (
            <div key={s.l} className="bg-white/[0.04] rounded-lg p-2 text-center">
              <div className={`text-sm font-bold ${s.c}`}>{s.v}</div>
              <div className="text-[9px] text-white/30 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] text-white/25">
          <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse" />
          Weekly sync &bull; Architecture reviews &bull; Release approvals
        </div>
      </div>
    ),
  },
  {
    title: "Technical Due Diligence",
    desc: "Pre-investment or pre-acquisition deep-dive into a company's codebase, team, and infrastructure. Delivered as a written report with risk assessment.",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    visual: (
      <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-mint font-semibold">Due Diligence Report</span>
          <span className="bg-mint/10 text-mint px-1.5 py-0.5 rounded text-[9px]">7-day delivery</span>
        </div>
        <div className="space-y-1.5">
          {[{ l: "Code Quality", r: "Low Risk", c: "bg-emerald-400" }, { l: "Security", r: "Med Risk", c: "bg-amber-400" }, { l: "Scalability", r: "High Risk", c: "bg-red-400" }, { l: "Team & Process", r: "Low Risk", c: "bg-emerald-400" }].map((s) => (
            <div key={s.l} className="flex items-center justify-between bg-white/[0.03] rounded-lg px-2.5 py-1.5">
              <span className="text-[10px] text-white/50">{s.l}</span>
              <span className={`flex items-center gap-1 text-[9px] text-white/60`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.c}`} />
                {s.r}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Team Building & Hiring",
    desc: "I help you define roles, vet candidates, and build an engineering culture that retains talent and ships on schedule.",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    visual: (
      <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
        <div className="text-[10px] text-mint font-semibold mb-1">Hiring Pipeline</div>
        <div className="grid grid-cols-3 gap-1.5">
          {[{ stage: "Sourced", count: "12" }, { stage: "Interviews", count: "5" }, { stage: "Hired", count: "2" }].map((s, i) => (
            <div key={s.stage} className="text-center">
              <div className={`rounded-lg py-2 text-xs font-bold ${i === 2 ? "bg-mint/15 text-mint" : "bg-white/[0.04] text-white/50"}`}>{s.count}</div>
              <div className="text-[9px] text-white/30 mt-1">{s.stage}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {["Sr. Backend — Hired ✓", "Frontend Lead — Interviewing", "DevOps — Sourcing"].map((t) => (
            <span key={t} className="text-[8px] bg-white/[0.05] text-white/40 px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Architecture & Scaling Review",
    desc: "One-time engagement to audit your current system and deliver a scaling roadmap — so your architecture doesn't break at the next growth stage.",
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" /></svg>,
    visual: (
      <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
        <div className="text-[10px] text-mint font-semibold mb-2">System Architecture</div>
        <div className="flex items-center justify-between gap-1">
          {[
            { label: "Frontend", sub: "Next.js", color: "border-blue-400/30" },
            { label: "API", sub: "Gateway", color: "border-purple-400/30" },
            { label: "Services", sub: "Microservices", color: "border-amber-400/30" },
            { label: "Database", sub: "Postgres", color: "border-emerald-400/30" },
          ].map((n, i) => (
            <div key={n.label} className="flex items-center">
              <div className={`bg-white/[0.04] border ${n.color} rounded-lg px-2 py-1.5 text-center`}>
                <div className="text-[9px] text-white/50 font-medium">{n.label}</div>
                <div className="text-[8px] text-white/25">{n.sub}</div>
              </div>
              {i < 3 && <svg className="w-3 h-3 text-white/15 mx-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[8px]">
          <span className="bg-red-400/10 text-red-400/60 px-1.5 py-0.5 rounded">⚠ Bottleneck</span>
          <span className="bg-emerald-400/10 text-emerald-400/60 px-1.5 py-0.5 rounded">✓ Optimized</span>
        </div>
      </div>
    ),
  },
];

const FAQS = [
  { q: "What does the first engagement look like?", a: "We start with a free 30-minute call where I learn about your business, tech stack, and goals. If there's a fit, I'll propose an engagement model — fractional, project-based, or advisory — with clear scope and timeline. No pressure, no obligation." },
  { q: "What is a fractional CTO?", a: "A fractional CTO is an experienced technology executive who provides part-time CTO services to companies that need strategic technology leadership but may not require or afford a full-time CTO. I bring 14+ years of enterprise experience to help with technology strategy, team building, architecture decisions, and digital transformation — typically 10-20 hours per week." },
  { q: "How much does it cost to work with you?", a: "It depends on the engagement model. Fractional CTO retainers, project-based architecture reviews, and one-time due diligence assessments are all priced differently. I'm transparent about pricing from the first call — no surprises." },
  { q: "What if it's not a good fit?", a: "No hard feelings. The initial call is free, and I only propose next steps if I genuinely believe I can help. I've turned down work that wasn't the right match — my 100% success rate depends on it." },
  { q: "Can you work with my existing team?", a: "Absolutely. Most of my engagements involve integrating with existing developers. I don't replace your team — I make them more effective through better architecture, clearer processes, and strategic technical direction." },
  { q: "How quickly can you start?", a: "Typically within 1-2 weeks. For urgent needs, I can prioritize availability. Let's discuss your timeline on the strategy call." },
];

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mohitsengarr/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { name: "Instagram", url: "https://www.instagram.com/mohitsengarr/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
  { name: "YouTube", url: "https://www.youtube.com/@mohitsengarr", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
  { name: "GitHub", url: "https://github.com/mohitsengarr", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg> },
];

const SERVICE_LINKS = [
  { label: "Fractional CTO", desc: "Ongoing tech leadership", href: "#services" },
  { label: "QA & Quality Engineering", desc: "Testing that ships", href: "/qa" },
  { label: "Shopify Experts", desc: "Store growth & builds", href: "/shopify-experts" },
  { label: "Vibe Coding", desc: "Lovable to production", href: "/vibe-coding" },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "#contact" },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

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

/* ─── Services dropdown (desktop) ─── */
function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  // Hover opens the menu; the click that usually follows must not close it again.
  const openedByHover = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        openedByHover.current = false;
        setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 py-2"
      >
        Services
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
          >
            <div className="bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/40">
              {SERVICE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <span className="block text-sm text-white group-hover:text-mint transition-colors">{link.label}</span>
                  <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">{link.desc}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sticky Header ─── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[var(--color-nav-bg)] backdrop-blur-xl shadow-2xl shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="text-white font-bold text-lg tracking-tight">Mohit Sengar</a>
        <nav className="hidden md:flex items-center gap-8">
          <ServicesMenu />
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors duration-300 py-2">
              {link.label}
            </a>
          ))}
          <a
            href="https://calendly.com/mohitsengarr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mint hover:bg-mint-hover active:bg-mint-pressed text-black font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-mint/20"
          >
            Book a Call
          </a>
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <p className="px-6 pt-4 pb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Services</p>
            {SERVICE_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="block px-6 py-3 pl-9 text-[var(--color-text-secondary)] hover:text-mint hover:bg-white/5 transition-colors text-base"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="mx-6 my-2 border-t border-white/5" />
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="block px-6 py-4 text-[var(--color-text-secondary)] hover:text-mint hover:bg-white/5 transition-colors text-base"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Back to Top ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 md:bottom-8 right-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors active:scale-95 border border-white/10"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.06}>
      <div className="border-b border-[var(--color-border)]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center py-6 px-2 text-left min-h-[56px] group"
          aria-expanded={open}
        >
          <span className="text-base md:text-lg font-medium pr-4 text-white group-hover:text-mint transition-colors duration-300">{q}</span>
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
              <p className="px-2 pb-6 text-[var(--color-text-secondary)] leading-relaxed">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ─── Email Capture ─── */
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "playbook", email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
        <p className="text-[var(--color-success)] font-semibold text-lg">Thanks! You&apos;re in.</p>
        <a
          href="/downloads/ai-app-production-checklist.pdf"
          download
          className="inline-block mt-3 bg-mint hover:bg-mint-hover text-black font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Download the Checklist (PDF) ↓
        </a>
        <p className="text-[var(--color-text-muted)] text-xs mt-3">47 production checks — a copy is on its way to your inbox too.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full bg-surface-2 border border-[var(--color-border)] text-white placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint/60 min-h-[48px] transition-all duration-300"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-95 text-black font-semibold px-6 py-3 rounded-full transition-all whitespace-nowrap min-h-[48px] hover:shadow-lg hover:shadow-mint/20 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Get the Checklist"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-sm text-[var(--color-text-muted)] text-center mt-3">
          Couldn&apos;t send right now — email{" "}
          <a href="mailto:mohit@sengarconsultancy.org" className="text-mint hover:underline">
            mohit@sengarconsultancy.org
          </a>{" "}
          and I&apos;ll send the checklist directly.
        </p>
      )}
    </div>
  );
}

/* ─── AI News Section ─── */
interface NewsItem {
  title: string;
  url: string;
  date: string;
  source: string;
  summary: string;
}

function AINewsSection({
  initialNews = [],
  newsUpdatedAt = "",
}: {
  initialNews?: NewsItem[];
  newsUpdatedAt?: string;
}) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(initialNews.length === 0);
  const [lastUpdated, setLastUpdated] = useState(newsUpdatedAt);

  useEffect(() => {
    // Server already provided news — nothing to fetch.
    if (initialNews.length > 0) return;
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.news) {
          setNews(data.news);
          setLastUpdated(
            data.lastUpdated
              ? new Date(data.lastUpdated).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [initialNews.length]);

  // Inject NewsArticle structured data for SEO
  useEffect(() => {
    if (!news.length) return;
    const existingScript = document.getElementById("news-schema");
    if (existingScript) existingScript.remove();

    const newsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "AI News & Insights curated by Mohit Sengar",
      description: "Daily curated breaking AI news by Mohit Sengar, award-winning CTO and technology leader.",
      itemListElement: news.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "NewsArticle",
          headline: item.title,
          url: item.url,
          datePublished: item.date,
          publisher: { "@type": "Organization", name: item.source },
          description: item.summary,
        },
      })),
    };

    const script = document.createElement("script");
    script.id = "news-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(newsSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("news-schema");
      if (el) el.remove();
    };
  }, [news]);

  if (loading) {
    return (
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]" id="news" aria-label="AI News & Insights">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-14 md:mb-16">
            <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Latest in AI</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">AI News & Insights</h2>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-busy="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 animate-pulse" role="listitem">
                <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
                <div className="h-5 bg-white/10 rounded w-full mb-2" />
                <div className="h-5 bg-white/10 rounded w-2/3 mb-4" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!news.length) return null;

  return (
    <section className="py-24 md:py-32 px-6 bg-[#0A0A0A] border-y border-white/5" id="news" aria-label="AI News & Insights">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <header className="text-center mb-14 md:mb-16">
            <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Latest in AI</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
              AI News & Insights
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
              Curated breaking news from the world of artificial intelligence,
              updated daily by Mohit Sengar.
            </p>
            {lastUpdated && (
              <p className="text-white/20 text-xs mt-3">
                <time dateTime={new Date().toISOString().split("T")[0]}>Last updated: {lastUpdated}</time>
              </p>
            )}
          </header>
        </Reveal>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {news.map((item, i) => (
            <StaggerItem key={i}>
              <article itemScope itemType="https://schema.org/NewsArticle" className="h-full">
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="block bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-mint/20 transition-all duration-500 p-6 h-full group"
                  itemProp="url"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[var(--color-accent-label)] text-xs font-medium uppercase tracking-wider" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                      <span itemProp="name">{item.source}</span>
                    </span>
                    <span className="text-[var(--color-text-placeholder)] text-xs" aria-hidden="true">&bull;</span>
                    <time className="text-[var(--color-text-muted)] text-xs" itemProp="datePublished" dateTime={item.date}>
                      {item.date}
                    </time>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white group-hover:text-mint transition-colors duration-300 mb-3 leading-snug line-clamp-3" itemProp="headline">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3" itemProp="description">
                      {item.summary}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-[var(--color-accent-label)] group-hover:text-mint text-xs font-medium transition-colors duration-300" aria-label={`Read full article: ${item.title}`}>
                    Read more
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.a>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* SEO: noscript fallback for crawlers */}
        <noscript>
          <div className="text-center mt-8 text-white/40 text-sm">
            <p>This section displays the latest AI news curated by Mohit Sengar, updated daily. Enable JavaScript to view the latest articles.</p>
          </div>
        </noscript>
      </div>
    </section>
  );
}

/* ─── Premium Card with Glow ─── */
function PremiumCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  }

  return (
    <Reveal delay={delay}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE_OUT } }}
        className={`card-glow bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:border-mint/20 transition-colors duration-500 relative ${className}`}
      >
        <div className="relative z-10">{children}</div>
      </motion.div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE (client shell — rendered by the server component in page.tsx,
   which passes server-fetched news so crawlers see real content)
   ═══════════════════════════════════════════════════════════════ */
export default function HomeClient({
  initialNews = [],
  newsUpdatedAt = "",
}: {
  initialNews?: NewsItem[];
  newsUpdatedAt?: string;
}) {
  const testimonialCarousel = useCarousel(TESTIMONIALS.length, 5000);

  /* Parallax for hero image */
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#0A0A0A] text-white" role="main">
      <Header />
      <BackToTop />

      {/* ═══ Floating Mobile CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl px-4 py-3 border-t border-white/5">
        <a
          href="https://calendly.com/mohitsengarr"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-[0.98] text-black font-semibold py-3.5 rounded-full transition-all text-center text-base"
        >
          Book a Free Strategy Session
        </a>
      </div>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-start overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/images/hero.jpg"
            alt="Mohit Sengar speaking at technology conference"
            fill
            sizes="100vw"
            className="object-cover object-top scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/30 to-[#0A0A0A]" />
        </motion.div>

        <motion.div
          className="relative z-10 text-left text-white px-6 md:px-16 lg:px-24 max-w-7xl w-full pt-32 md:pt-20"
          style={{ opacity: heroOpacity }}
        >
          {/* Staggered hero entrance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
            className="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-accent-label)] mb-6 font-medium"
          >
            Mohit Sengar &mdash; Official Website
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 max-w-3xl tracking-tight text-white"
          >
            I Help Founders Build Engineering Teams That Actually Ship
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
            className="text-base md:text-lg text-[var(--color-text-secondary)] mb-10 max-w-xl leading-relaxed"
          >
            14 years. 40+ companies. 100% job success rate. Mohit Sengar is an award-winning
            fractional CTO based in Dubai who plugs into your startup and builds the tech org
            you need &mdash; without the $400K/year salary.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.9 }}
            href="https://calendly.com/mohitsengarr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-95 text-black font-semibold px-8 py-4 rounded-full transition-all text-base hover:shadow-xl hover:shadow-mint/20"
          >
            Book a Free 30-Min Strategy Session &rarr;
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-mint rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-[#0A0A0A] border-y border-white/5 py-10 md:py-14">
        <StaggerContainer className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { num: "40+", label: "Clients Worldwide", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> },
            { num: "100%", label: "Job Success Rate", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> },
            { num: "14+", label: "Years Experience", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.77.672c-.992 0-1.929-.245-2.77-.672" /></svg> },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 bg-mint/10 rounded-xl flex items-center justify-center text-mint">
                  {s.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-mint tracking-tight">{s.num}</div>
              <div className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-2 uppercase tracking-wider">{s.label}</div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ PROBLEM / AGITATION ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-5xl font-bold mb-12 text-center tracking-tight text-white">Sound Familiar?</h2>
          </Reveal>
          <div className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed space-y-8 text-left">
            <Reveal delay={0.1}>
              <p>
                You&apos;ve got a product vision but your engineering team keeps
                missing deadlines. You&apos;ve hired developers &mdash; some
                great, some not &mdash; but nobody&apos;s connecting the dots
                between business goals and technical execution.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Your CTO search has been going on for months, and you can&apos;t
                afford to wait anymore. Meanwhile, technical debt is piling up,
                your architecture won&apos;t scale past the next funding round,
                and every week you delay costs you runway.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white font-semibold text-lg md:text-2xl text-center !leading-snug">
                You don&apos;t need another developer. You need a technical leader
                who&apos;s built this before &mdash; 40 times.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ HOW I WORK WITH YOU — Signature Section ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]" id="services">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Services</p>
              <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                How I Work With You
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                Every engagement starts with a free 30-minute strategy call where
                I assess your situation and recommend next steps &mdash; no obligation.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {ENGAGEMENT_MODELS.map((m, i) => (
              <PremiumCard key={m.title} delay={i * 0.1} className="p-6 md:p-8">
                <div className="w-12 h-12 bg-mint/10 rounded-xl flex items-center justify-center mb-5 text-mint">
                  {m.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-white">{m.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">{m.desc}</p>
                {m.visual}
              </PremiumCard>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="text-center mt-12 md:mt-16">
              <a
                href="https://calendly.com/mohitsengarr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-mint hover:bg-mint-hover active:bg-mint-pressed active:scale-95 text-black font-semibold px-8 py-4 rounded-full transition-all text-base md:text-lg hover:shadow-xl hover:shadow-mint/20"
              >
                Book a Free Strategy Session &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TRACK RECORD ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]" id="about">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/stats-photo.jpeg"
                  alt="Mohit Sengar - Award-winning CTO"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Track Record</p>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                  Why Companies Trust Me
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed text-sm md:text-base">
                  I&apos;ve spent 14 years building technology that works &mdash;
                  for 40+ companies across healthcare, fintech, e-commerce,
                  parking management, and theme park operations.
                </p>
              </Reveal>
              <StaggerContainer className="space-y-4" stagger={0.08}>
                {[
                  "Collaborated with 40+ clients across diverse industries worldwide",
                  "100% job success rate — I don't take on work I can't deliver",
                  "14+ years of hands-on engineering leadership experience",
                  "Outstanding Leadership Award — Internet 2.0 Conference, Dubai 2024",
                ].map((stat, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-3 md:gap-4 items-start">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 bg-mint/20 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">{stat}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEAD MAGNET ═══ */}
      <section className="py-16 md:py-24 px-6 bg-surface border-y border-[var(--color-divider)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Playbook mock cover */}
            <Reveal direction="left" className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 md:w-56 aspect-[3/4] bg-gradient-to-br from-[#1A1A1A] to-[#111] rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50 p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-mint/5 rounded-full blur-[40px]" />
                  <div className="relative z-10">
                    <div className="text-[9px] text-mint uppercase tracking-[0.2em] font-semibold mb-2">Free Checklist</div>
                    <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                      The AI App Production Checklist
                    </h3>
                    <div className="w-8 h-0.5 bg-mint/40 mt-3 rounded-full" />
                  </div>
                  <div className="relative z-10 space-y-1.5 mt-4">
                    {["47 checks before real users arrive", "Auth, RLS, payments, backups", "Score it: ship, fix, or get help"].map((b) => (
                      <div key={b} className="flex items-start gap-1.5">
                        <svg className="w-3 h-3 text-mint/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        <span className="text-[9px] text-white/40 leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className="relative z-10 mt-4 pt-3 border-t border-white/[0.06]">
                    <div className="text-[8px] text-white/25">By Mohit Sengar</div>
                  </div>
                </div>
                {/* Shadow / depth effect */}
                <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/30 rounded-b-xl blur-sm -z-10" />
              </div>
            </Reveal>
            {/* Text + form */}
            <Reveal className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold mb-4 tracking-tight text-white">
                Not Ready to Talk Yet? No Problem.
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed text-sm md:text-base">
                Get the free <strong className="text-white">AI App Production Checklist</strong> &mdash; the 47
                checks I run before any Lovable, Bolt or AI-built app faces real users.
              </p>
              <EmailCapture />
              <p className="text-[var(--color-text-placeholder)] text-xs mt-4">No spam. Unsubscribe anytime.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ AWARD ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]" id="awards">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Recognition</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight text-white">
                Outstanding Leadership Award
              </h2>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                Honored at Dubai&apos;s Internet 2.0 Conference, February 2024,
                for transformative impact in steering Invatu Technologies towards
                innovation and success.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" stagger={STAGGER.fast}>
            {GALLERY_IMAGES.map((src, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="relative aspect-[3/2] rounded-xl overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Mohit Sengar at Internet 2.0 Conference Dubai - photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ VIDEO ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface" id="video">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">
                Watch
              </p>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                Technology Leadership &amp; Innovation
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                Hear directly from Mohit on engineering leadership, building
                high-performing teams, and the approach behind 40+ successful
                projects with a 100% delivery rate.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/EY4CJU8LNAE?rel=0&modestbranding=1"
                  title="Mohit Sengar — Technology Leadership & Innovation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]" id="projects">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Portfolio</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight text-white">
                Companies I&apos;ve Worked With
              </h2>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                From enterprise parking systems across Europe to theme park digital
                experiences in Abu Dhabi &mdash; I&apos;ve delivered across
                industries and continents.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5" stagger={0.08}>
            {PROJECTS.map((p, i) => (
              <StaggerItem key={i}>
                <motion.a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="block bg-white/[0.03] rounded-xl overflow-hidden border border-white/[0.06] hover:border-mint/20 transition-colors duration-500 group"
                >
                  <div className="relative aspect-[3/2] bg-white/[0.02] flex items-center justify-center">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-contain p-6 md:p-10 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-bold text-sm md:text-base text-white/90">{p.name}</h3>
                    <p className="text-[var(--color-text-muted)] text-xs md:text-sm mt-1">{p.result}</p>
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface border-y border-[var(--color-divider)]" id="testimonials">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Social Proof</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                What Clients Say
              </h2>
            </div>
          </Reveal>
          <div className="relative overflow-hidden">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${testimonialCarousel.index * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="carousel-slide flex flex-col items-center text-center px-4 md:px-6">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-5 ring-2 ring-white/10">
                    <Image src={t.img} alt={t.name} fill sizes="80px" className="object-cover" loading="lazy" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">{t.name}</h3>
                  <span className="text-sm text-[var(--color-text-muted)] mb-4">{t.role}</span>
                  <p className="text-[var(--color-text-secondary)] max-w-xl leading-relaxed italic text-sm md:text-base">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-10">
            <button onClick={testimonialCarousel.prev} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full w-11 h-11 flex items-center justify-center transition-all active:scale-95" aria-label="Previous testimonial">
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => testimonialCarousel.setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === testimonialCarousel.index ? "bg-mint w-6" : "bg-white/20"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={testimonialCarousel.next} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full w-11 h-11 flex items-center justify-center transition-all active:scale-95" aria-label="Next testimonial">
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ AI NEWS ═══ */}
      <AINewsSection initialNews={initialNews} newsUpdatedAt={newsUpdatedAt} />

      {/* ═══ FRACTIONAL vs FULL-TIME CTO ═══ */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">Why Fractional?</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                Full-Time CTO vs Fractional CTO
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
                Get the same strategic impact at a fraction of the cost &mdash; without the 6-month hiring process.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Full-Time */}
              <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-[30px]" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white/60">Full-Time CTO</h3>
                    <p className="text-xs text-white/30">Traditional hiring</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Annual Cost", value: "$300K-$450K+", sub: "salary + equity + benefits" },
                    { label: "Time to Hire", value: "3-6 months", sub: "search, interviews, onboarding" },
                    { label: "Risk", value: "High", sub: "wrong hire = 6-12 months lost" },
                    { label: "Flexibility", value: "Low", sub: "committed regardless of stage" },
                  ].map((row) => (
                    <div key={row.label} className="bg-white/[0.03] rounded-lg px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40 uppercase tracking-wider">{row.label}</span>
                        <span className="text-sm font-semibold text-white/50">{row.value}</span>
                      </div>
                      <p className="text-[10px] text-white/20 mt-0.5">{row.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Fractional */}
              <div className="bg-white/[0.03] rounded-2xl border border-mint/20 p-6 md:p-8 relative overflow-hidden shadow-lg shadow-mint/5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-mint/10 rounded-full blur-[30px]" />
                <div className="absolute top-4 right-4 bg-mint/10 text-mint text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-mint/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Fractional CTO</h3>
                    <p className="text-xs text-mint/60">With Mohit Sengar</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Annual Cost", value: "70-80% less", sub: "pay only for hours you need" },
                    { label: "Time to Start", value: "1-2 weeks", sub: "no search, immediate impact" },
                    { label: "Risk", value: "Minimal", sub: "proven track record, 40+ clients" },
                    { label: "Flexibility", value: "High", sub: "scale up, down, or pause anytime" },
                  ].map((row) => (
                    <div key={row.label} className="bg-white/[0.04] rounded-lg px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40 uppercase tracking-wider">{row.label}</span>
                        <span className="text-sm font-semibold text-mint">{row.value}</span>
                      </div>
                      <p className="text-[10px] text-white/30 mt-0.5">{row.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]" id="faq">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[var(--color-accent-label)] text-sm uppercase tracking-[0.2em] mb-4">FAQ</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                Common Questions
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
        {/* Subtle radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-mint/5 rounded-full blur-[120px]" />
        </div>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Ready to Stop Worrying About Engineering?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg mb-10 max-w-xl mx-auto">
              Book a free 30-minute strategy session. I&apos;ll audit your current
              situation and give you 3 actionable recommendations &mdash; no
              strings attached.
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://calendly.com/mohitsengarr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-mint hover:bg-mint-hover active:bg-mint-pressed text-black font-semibold px-10 md:px-12 py-4 md:py-5 rounded-full transition-colors text-base md:text-lg shadow-2xl shadow-mint/20 hover:shadow-mint/30"
            >
              Book Your Free Strategy Session &rarr;
            </motion.a>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-[var(--color-text-muted)]">
              {[
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, text: "No obligation" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "30-min session" },
                { icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>, text: "3 free recommendations" },
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
      <footer className="bg-[#050505] text-white py-16 md:py-20 px-6 pb-28 md:pb-20 border-t border-[var(--color-divider)]" id="contact" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <Reveal>
              <div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">Mohit Sengar</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-sm md:text-base">
                  Award-winning CTO and fractional technology leader. 14+ years
                  helping companies build engineering teams that ship.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-5">
                  Pages
                </h3>
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li>
                    <a href="/qa" className="hover:text-mint transition-colors duration-300 py-1 inline-block">QA &amp; Quality Engineering</a>
                  </li>
                  <li>
                    <a href="/shopify-experts" className="hover:text-mint transition-colors duration-300 py-1 inline-block">Shopify Experts</a>
                  </li>
                  <li>
                    <a href="/vibe-coding" className="hover:text-mint transition-colors duration-300 py-1 inline-block">Vibe Coding — Lovable to Production</a>
                  </li>
                  <li>
                    <a href="/blog" className="hover:text-mint transition-colors duration-300 py-1 inline-block">Blog</a>
                  </li>
                  <li>
                    <a href="/resume" className="hover:text-mint transition-colors duration-300 py-1 inline-block">Resume</a>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-5">
                  Get in Touch
                </h3>
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li>
                    <a href="mailto:mohit@sengarconsultancy.org" className="hover:text-mint transition-colors duration-300 py-2 inline-block">
                      mohit@sengarconsultancy.org
                    </a>
                  </li>
                  <li className="text-sm text-[var(--color-text-muted)]">Based in Dubai &amp; India, working globally</li>
                  <li>
                    <a
                      href="https://calendly.com/mohitsengarr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-mint transition-colors duration-300 py-2 inline-block"
                    >
                      Schedule a Call &rarr;
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-5">
                  Connect
                </h3>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-muted)] hover:text-mint transition-all duration-300 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-[var(--color-border)]"
                      aria-label={`${link.name} profile`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
                <p className="text-[var(--color-text-placeholder)] text-sm mt-6">
                  NGO collaborations: Dream Girl Foundation, Donate an Hour
                </p>
              </div>
            </Reveal>
          </div>
          <div className="pt-8 border-t border-[var(--color-divider)] text-sm text-[var(--color-text-placeholder)] text-center">
            {`© ${new Date().getFullYear()} Mohit Sengar — Official Site. All rights reserved.`}
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Icons ─── */
function ChevronLeft() {
  return <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
}

function ChevronRight() {
  return <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
}
