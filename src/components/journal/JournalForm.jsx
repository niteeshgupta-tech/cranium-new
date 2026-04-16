import React from "react";
import { motion } from "framer-motion";
import { FiSend, FiZap } from "react-icons/fi";

const demoPrefill =
  "Today I felt tired all day. I could not focus in class. I avoided talking to friends, spent hours scrolling my phone, and feel stressed about exams.";

export default function JournalForm({
  content,
  onChange,
  onAnalyze,
  loading,
  maxLength = 6000,
  minLength = 20,
}) {
  const characterCount = content.length;

  return (
    <motion.section
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:border-aurora/30"
    >
      <div className="pointer-events-none absolute -left-16 top-4 h-32 w-72 rounded-full bg-gradient-to-r from-aurora/40 via-transparent to-lilac/10 blur-3xl opacity-80" />
      <div className="pointer-events-none absolute right-0 top-20 h-24 w-40 rounded-full bg-gradient-to-br from-sky-300/20 to-transparent blur-3xl opacity-70" />
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-100">Daily Journal</h2>
        <button
          type="button"
          onClick={() => onChange(demoPrefill)}
          className="inline-flex items-center gap-2 rounded-xl border border-aurora/30 bg-aurora/10 px-3 py-2 text-xs font-semibold text-aurora hover:bg-aurora/20"
        >
          <FiZap />
          Use Demo Entry
        </button>
      </div>

      <p className="mt-2 text-sm text-slate-200/80">
        Write about your day, feelings, stress, social energy, and what felt heavy or supportive.
      </p>

      <textarea
        value={content}
        onChange={(event) => onChange(event.target.value)}
        rows={12}
        maxLength={maxLength}
        placeholder="How was your day? What drained or energized you?"
        className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-midnight/40 p-4 text-sm text-slate-100 outline-none transition duration-300 hover:border-white/20 focus:border-aurora/40 focus:ring-2 focus:ring-aurora/10"
      />

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-slate-300/70">
          {characterCount}/{maxLength} characters (minimum {minLength})
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onAnalyze}
          disabled={loading || characterCount < minLength}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-aurora to-lilac px-4 py-2 text-sm font-semibold text-midnight disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiSend />
          {loading ? "Analyzing..." : "Analyze Journal"}
        </motion.button>
      </div>
    </motion.section>
  );
}
