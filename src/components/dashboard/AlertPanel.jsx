import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { FiAlertCircle, FiPhone, FiMessageSquare, FiCoffee, FiWind } from "react-icons/fi";
import Card from "../ui/Card";

const actionButtons = [
  { key: "breathe", label: "Breathe", icon: <FiWind /> },
  { key: "notify", label: "Notify Friend", icon: <FiMessageSquare /> },
  { key: "break", label: "Take Break", icon: <FiCoffee /> },
  { key: "counselor", label: "Talk to Counselor", icon: <FiPhone /> },
];

export default function AlertPanel({ risk = "moderate", alerts = [], onAction }) {
  const isHigh = risk === "high";

  if (!isHigh) {
    return (
      <Card glass className="h-full">
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="text-sm font-semibold text-slate-100/95">You're steady</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200/80">
              No critical alerts right now. Keep logging your mood to improve the model's accuracy.
            </p>
          </div>
          <div className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200/80">
            Calm Mode
          </div>
        </div>
      </Card>
    );
  }

  const primaryAlert = alerts?.[0];

  return (
    <Card glass className="h-full">
      <motion.div
        className="flex items-start gap-4 p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-coral/40 bg-coral/10"
          animate={["pulse", "ring"]}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiAlertCircle className="text-coral" />
          <span className="absolute inset-0 rounded-2xl bg-coral/15" />
        </motion.div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-100/95">High Risk Detected</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200/80">
            {primaryAlert?.title || "Your stress pattern is escalating."}
          </p>
          <p className="mt-3 text-xs text-slate-200/70">
            {primaryAlert?.message || "Take a guided action to reduce strain now."}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {actionButtons.map((b) => (
              <Button
                key={b.key}
                variant="secondary"
                onClick={() => onAction?.(b.key)}
                className="h-11 w-full"
                icon={<span className="text-base">{b.icon}</span>}
              >
                {b.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </Card>
  );
}

