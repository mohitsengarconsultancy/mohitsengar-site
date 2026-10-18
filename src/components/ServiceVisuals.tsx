"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CountUp } from "./motion";

/*
 * Animated mockups for the homepage service cards. Each plays once when it scrolls
 * into view and settles on the same final state the static version showed.
 * Figures are illustrative, so each mockup carries a small "Example" label.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function useOnceInView<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return [ref, inView] as const;
}

function ExampleTag() {
  return <span className="text-white/25 text-[9px] uppercase tracking-wider">Example</span>;
}

export function DeliveryDashboardViz() {
  const [ref, inView] = useOnceInView<HTMLDivElement>();
  const stats = [
    { l: "On-Time", v: "98%", c: "text-emerald-400" },
    { l: "Sprints", v: "12", c: "text-mint" },
    { l: "Bug Rate", v: "0.3%", c: "text-emerald-400" },
  ];
  return (
    <div ref={ref} className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-mint font-semibold">Delivery Dashboard</span>
        <span className="flex items-center gap-2">
          <ExampleTag />
          <span className="text-white/30">Live</span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <div key={s.l} className="bg-white/[0.04] rounded-lg p-2 text-center">
            <div className={`text-sm font-bold ${s.c}`}>
              <CountUp value={s.v} delay={i * 0.15} />
            </div>
            <div className="text-[9px] text-white/30 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
      {/* sprint progress */}
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full bg-mint/70 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 0.98 : 0 }}
          transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.2 }}
        />
      </div>
      <div className="flex items-center gap-2 text-[9px] text-white/25">
        <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse" />
        Weekly sync &bull; Architecture reviews &bull; Release approvals
      </div>
    </div>
  );
}

export function DueDiligenceViz() {
  const [ref, inView] = useOnceInView<HTMLDivElement>();
  const rows = [
    { l: "Code Quality", r: "Low Risk", c: "bg-emerald-400" },
    { l: "Security", r: "Med Risk", c: "bg-amber-400" },
    { l: "Scalability", r: "High Risk", c: "bg-red-400" },
    { l: "Team & Process", r: "Low Risk", c: "bg-emerald-400" },
  ];
  return (
    <div ref={ref} className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-mint font-semibold">Due Diligence Report</span>
        <span className="flex items-center gap-2">
          <ExampleTag />
          <span className="bg-mint/10 text-mint px-1.5 py-0.5 rounded text-[9px]">7-day delivery</span>
        </span>
      </div>
      <div className="space-y-1.5">
        {rows.map((s, i) => (
          <motion.div
            key={s.l}
            className="flex items-center justify-between bg-white/[0.03] rounded-lg px-2.5 py-1.5"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + i * 0.22 }}
          >
            <span className="text-[10px] text-white/50">{s.l}</span>
            <span className="flex items-center gap-1 text-[9px] text-white/60">
              <motion.span
                className={`w-1.5 h-1.5 rounded-full ${s.c}`}
                initial={{ scale: 0 }}
                animate={{ scale: inView ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.35 + i * 0.22 }}
              />
              {s.r}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function HiringPipelineViz() {
  const [ref, inView] = useOnceInView<HTMLDivElement>();
  const stages = [
    { stage: "Sourced", count: "12", w: 1 },
    { stage: "Interviews", count: "5", w: 5 / 12 },
    { stage: "Hired", count: "2", w: 2 / 12 },
  ];
  const tags = ["Sr. Backend — Hired ✓", "Frontend Lead — Interviewing", "DevOps — Sourcing"];
  return (
    <div ref={ref} className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px] mb-1">
        <span className="text-mint font-semibold">Hiring Pipeline</span>
        <ExampleTag />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {stages.map((s, i) => (
          <div key={s.stage} className="text-center">
            <div className={`relative overflow-hidden rounded-lg py-2 text-xs font-bold ${i === 2 ? "bg-mint/15 text-mint" : "bg-white/[0.04] text-white/50"}`}>
              {/* funnel fill: narrows stage by stage */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 bg-mint/10 origin-left"
                style={{ width: "100%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? s.w : 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 + i * 0.35 }}
              />
              <span className="relative">
                <CountUp value={s.count} duration={0.9} delay={0.2 + i * 0.35} />
              </span>
            </div>
            <div className="text-[9px] text-white/30 mt-1">{s.stage}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {tags.map((t, i) => (
          <motion.span
            key={t}
            className="text-[8px] bg-white/[0.05] text-white/40 px-1.5 py-0.5 rounded"
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.2 + i * 0.12 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureViz() {
  const [ref, inView] = useOnceInView<HTMLDivElement>();
  const reduce = useReducedMotion();
  // The Services node starts as the bottleneck, then gets fixed.
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setFixed(true);
      return;
    }
    const id = setTimeout(() => setFixed(true), 1900);
    return () => clearTimeout(id);
  }, [inView, reduce]);

  const nodes = [
    { label: "Frontend", sub: "Next.js", color: "border-blue-400/30" },
    { label: "API", sub: "Gateway", color: "border-purple-400/30" },
    { label: "Services", sub: "Microservices", color: "border-amber-400/30" },
    { label: "Database", sub: "Postgres", color: "border-emerald-400/30" },
  ];

  return (
    <div ref={ref} className="mt-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
      <div className="flex items-center justify-between text-[10px] mb-2">
        <span className="text-mint font-semibold">System Architecture</span>
        <ExampleTag />
      </div>
      <div className="flex items-center justify-between gap-1">
        {nodes.map((n, i) => {
          const isBottleneck = n.label === "Services";
          const border = isBottleneck
            ? fixed
              ? "border-emerald-400/50"
              : "border-red-400/50"
            : n.color;
          return (
            <div key={n.label} className="flex items-center">
              <motion.div
                className={`bg-white/[0.04] border ${border} rounded-lg px-2 py-1.5 text-center transition-colors duration-500`}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.15 }}
              >
                <div className="text-[9px] text-white/50 font-medium">{n.label}</div>
                <div className="text-[8px] text-white/25">{n.sub}</div>
              </motion.div>
              {i < 3 && (
                <span className="relative mx-0.5 flex-shrink-0 w-3 h-3">
                  <svg className="w-3 h-3 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  {/* request packet travelling down the stack */}
                  {inView && !reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute top-1/2 -mt-[2px] left-0 w-1 h-1 rounded-full bg-mint"
                      initial={{ x: -4, opacity: 0 }}
                      animate={{ x: [-4, 10], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, delay: 0.7 + i * 0.3, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                    />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-[8px] h-4">
        <motion.span
          key={fixed ? "ok" : "warn"}
          initial={{ opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.35, ease: EASE_OUT, delay: fixed ? 0 : 0.8 }}
          className={
            fixed
              ? "bg-emerald-400/10 text-emerald-400/70 px-1.5 py-0.5 rounded"
              : "bg-red-400/10 text-red-400/70 px-1.5 py-0.5 rounded"
          }
        >
          {fixed ? "✓ Services bottleneck optimized" : "⚠ Bottleneck: Services"}
        </motion.span>
      </div>
    </div>
  );
}

/** Full-time vs fractional annual cost: the fractional bar shrinks from full-time cost to ~25%. */
export function CostCompareBar() {
  const [ref, inView] = useOnceInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mb-8 md:mb-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 space-y-4">
      <div className="text-xs text-white/40 uppercase tracking-wider">Annual cost of CTO-level leadership</div>
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-white/50">Full-time CTO</span>
          <span className="text-white/50 font-semibold">$300K-$450K+</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/[0.08]" />
      </div>
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-mint">Fractional CTO</span>
          <motion.span
            className="text-mint font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            70-80% less
          </motion.span>
        </div>
        <div className="h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-mint origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: inView ? 0.25 : 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}
