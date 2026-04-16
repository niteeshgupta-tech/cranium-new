import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { FiInfo, FiStar, FiTarget } from "react-icons/fi";

export default function InsightsCard({ insights }) {
  if (!insights) return null;

  const sections = [
    {
      icon: <FiStar className="text-aurora" />,
      title: "AI Summary",
      body: insights.aiSummary,
    },
    {
      icon: <FiInfo className="text-lilac" />,
      title: "Risk Explanation",
      body: insights.riskExplanation,
    },
    {
      icon: <FiTarget className="text-coral" />,
      title: "Suggested Action",
      body: insights.suggestedAction,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sections.map((s, idx) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: idx * 0.04 }}
        >
          <Card className="h-full p-5 hover:scale-105 hover:shadow-2xl hover:bg-white/10 transition-all duration-300" glass>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100/95">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
                  {s.body}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

