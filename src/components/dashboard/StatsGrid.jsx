import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { FiClock, FiMoon, FiSmile, FiType } from "react-icons/fi";

const iconByKey = {
  typingSpeed: FiType,
  sleepHours: FiMoon,
  mood: FiSmile,
  screenTime: FiClock,
};

export default function StatsGrid({ stats }) {
  if (!stats) return null;

  const cards = [
    { key: "typingSpeed", accent: "aurora" },
    { key: "sleepHours", accent: "lilac" },
    { key: "mood", accent: "coral" },
    { key: "screenTime", accent: "aurora" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, idx) => {
        const item = stats[c.key];
        const Icon = iconByKey[c.key];
        const accentClass =
          c.accent === "aurora"
            ? "text-aurora"
            : c.accent === "lilac"
            ? "text-lilac"
            : "text-coral";

        return (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.03 }}
          >
            <Card title={item?.label} glass className="h-full">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold text-slate-100/95">
                    {item?.value ?? "—"}
                  </p>
                  <p className="mt-1 text-xs text-slate-200/70">
                    Updated from your latest signals
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className={accentClass} />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

