export function getRiskFromWellnessScore(wellnessScore) {
  const score = typeof wellnessScore === "number" ? wellnessScore : 0;
  if (score >= 70) return "healthy";
  if (score >= 40) return "moderate";
  return "high";
}

export function riskLabel(risk) {
  if (risk === "healthy") return "Healthy";
  if (risk === "moderate") return "Moderate Risk";
  if (risk === "high") return "High Risk";
  return "Moderate Risk";
}

