// Mock data used when the backend API is unavailable.
// Keep structures aligned with what the UI expects.

const nowIso = () => new Date().toISOString();

const riskFromWellnessScore = (wellnessScore) => {
  const score = typeof wellnessScore === "number" ? wellnessScore : 0;
  if (score >= 70) return "healthy";
  if (score >= 40) return "moderate";
  return "high";
};

const moodTextFromScore = (wellnessScore) => {
  const score = typeof wellnessScore === "number" ? wellnessScore : 0;
  if (score >= 70) return "Steady";
  if (score >= 40) return "Mixed";
  return "Overwhelmed";
};

export const mockDashboardStats = () => {
  const wellnessScore = 38; // Default to “High Risk” for wow factor
  const status = riskFromWellnessScore(wellnessScore);

  return {
    wellnessScore,
    status,
    lastUpdated: nowIso(),
    stats: {
      typingSpeed: { label: "Typing Speed", value: "52 wpm" },
      sleepHours: { label: "Sleep Hours", value: "6.1 hrs" },
      mood: { label: "Mood", value: moodTextFromScore(wellnessScore), score: wellnessScore },
      screenTime: { label: "Screen Time", value: "4.8 hrs" },
    },
    insights: {
      aiSummary:
        "Your signals suggest increasing cognitive strain during late hours. The pattern looks like stress is building quietly rather than spiking suddenly.",
      riskExplanation:
        "Reduced sleep consistency and slower mood recovery can correlate with burnout risk. This doesn’t diagnose—it's an early warning indicator.",
      suggestedAction:
        "Try a 2-minute breathing reset tonight, shift your focus to one small task, and log one honest mood check-in to improve the model’s context.",
    },
  };
};

export const mockAlerts = () => {
  return [
    {
      id: "a1",
      severity: "high",
      title: "Potential Burnout Window",
      message:
        "Your recent pattern indicates elevated stress carry-over. Consider a short break and a supportive check-in.",
      createdAt: nowIso(),
    },
  ];
};

export const mockTrends = () => {
  return {
    stressTrend: [
      { name: "Mon", value: 26 },
      { name: "Tue", value: 32 },
      { name: "Wed", value: 29 },
      { name: "Thu", value: 41 },
      { name: "Fri", value: 46 },
      { name: "Sat", value: 38 },
      { name: "Sun", value: 43 },
    ],
    wellnessScoreHistory: [
      { name: "Mon", value: 42 },
      { name: "Tue", value: 40 },
      { name: "Wed", value: 39 },
      { name: "Thu", value: 37 },
      { name: "Fri", value: 36 },
      { name: "Sat", value: 34 },
      { name: "Sun", value: 33 },
    ],
  };
};

export const mockMoodCheckIn = async (payload) => {
  // payload: { moodScore, energy, notes? }
  const wellnessScore =
    typeof payload?.moodScore === "number" ? payload.moodScore : 64;

  const status = riskFromWellnessScore(wellnessScore);
  const base = mockDashboardStats();

  return {
    ...base,
    wellnessScore,
    status,
    lastUpdated: nowIso(),
    stats: {
      ...base.stats,
      mood: { ...base.stats.mood, value: moodTextFromScore(wellnessScore), score: wellnessScore },
    },
  };
};

