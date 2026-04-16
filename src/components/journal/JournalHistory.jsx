import React from "react";
import { motion } from "framer-motion";

export default function JournalHistory({ items = [] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <h3 className="text-lg font-bold text-slate-100">Journal History</h3>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-300/80">
          No entries yet. Write your first full-day reflection to build your emotional trend.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {items.map((entry, index) => (
            <motion.article
              key={entry._id || entry.id || `${entry.createdAt}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="rounded-2xl border border-white/10 bg-midnight/35 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-100">{entry.mood || "Reflective"}</p>
                <p className="text-xs text-slate-300/70">
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "-"}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-200/85">
                {entry.summary || "Insight summary unavailable."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/20 px-2 py-1 text-slate-200/90">
                  Stress: {entry.stressLevel || "moderate"}
                </span>
                <span className="rounded-full border border-white/20 px-2 py-1 text-slate-200/90">
                  Burnout Risk: {entry.burnoutRisk || "moderate"}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
