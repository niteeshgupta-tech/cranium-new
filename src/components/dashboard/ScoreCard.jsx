import React from "react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { formatIsoToLocal } from "../../utils/format";

export default function ScoreCard({ wellnessScore = 0, status = "moderate", lastUpdated }) {
  const pct = Math.max(0, Math.min(100, Math.round(wellnessScore)));
  return (
    <Card glass className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shadow-glow">
            <div className="text-center">
              <div className="text-xs font-semibold text-slate-200/70">Wellness</div>
              <div className="text-lg font-bold text-slate-100">{pct}</div>
            </div>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-3">
              <Badge risk={status} />
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200/80">
                <FiHeart className="text-aurora" />
                Trustworthy signal estimate
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-200/75">
              <FiRefreshCw />
              <span>Last updated {formatIsoToLocal(lastUpdated)}</span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <div className="text-xs font-semibold text-slate-200/70">Confidence</div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-aurora/70" style={{ width: `${clamp(pct, 10, 100)}%` }} />
          </div>
          <p className="mt-1 text-xs text-slate-200/75">
            {pct >= 70 ? "Steady" : pct >= 40 ? "Watch closely" : "Prioritize support"}
          </p>
        </div>
      </motion.div>
    </Card>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

