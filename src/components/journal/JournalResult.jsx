import React from "react";
import { motion } from "framer-motion";

const badgeClass = (value) => {
  if (value === "high") return "border-coral/40 bg-coral/15 text-coral";
  if (value === "moderate") return "border-amber-300/40 bg-amber-300/10 text-amber-200";
  return "border-emerald-300/40 bg-emerald-300/10 text-emerald-200";
};

export default function JournalResult({ result, loading }) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-20 rounded bg-white/10" />
          <div className="h-16 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <p className="text-sm text-slate-300/80">
          Analyze a journal entry to view emotional wellness insights and supportive suggestions.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
    >
      <h3 className="text-lg font-bold text-slate-100">Wellness Insight</h3>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-midnight/35 p-4">
          <p className="text-xs text-slate-300/70">Mood</p>
          <p className="mt-1 text-sm font-semibold text-slate-100">{result.mood}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-midnight/35 p-4">
          <p className="text-xs text-slate-300/70">Emotional Tone</p>
          <p className="mt-1 text-sm font-semibold text-slate-100">{result.emotionalTone}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass(result.stressLevel)}`}>
          Stress: {result.stressLevel}
        </span>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass(result.burnoutRisk)}`}>
          Burnout Risk: {result.burnoutRisk}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-midnight/35 p-4">
        <p className="text-xs text-slate-300/70">Summary</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200/90">{result.summary}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-midnight/35 p-4">
        <p className="text-xs text-slate-300/70">Supportive Suggestions</p>
        <ul className="mt-2 space-y-2">
          {(result.suggestions || []).map((item, index) => (
            <li key={`${item}-${index}`} className="text-sm text-slate-200/90">
              - {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-300/70">Confidence</p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-aurora to-lilac"
            style={{ width: `${Math.max(0, Math.min(100, Number(result.confidence) || 0))}%` }}
          />
        </div>
        <p className="mt-1 text-xs font-semibold text-slate-200/80">{result.confidence}%</p>
      </div>
    </motion.section>
  );
}
