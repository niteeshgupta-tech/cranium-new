import React from "react";

const styles = {
  healthy: "bg-healthy/10 border border-healthy/30 text-healthy",
  moderate: "bg-moderate/10 border border-moderate/30 text-moderate",
  high: "bg-high-risk/10 border border-high-risk/30 text-high-risk",
};

export default function Badge({ risk = "moderate", className = "" }) {
  const normalized = risk === "high" ? "high" : risk;
  const label =
    normalized === "healthy"
      ? "Healthy"
      : normalized === "high"
      ? "High Risk"
      : "Moderate";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold backdrop-blur",
        styles[normalized] || styles.moderate,
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

