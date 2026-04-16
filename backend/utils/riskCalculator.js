const moodPenaltyMap = {
  happy: 0,
  calm: 2,
  neutral: 5,
  tired: 10,
  anxious: 14,
  stressed: 18,
  sad: 20,
  overwhelmed: 24,
};

const classifyRisk = (stressScore) => {
  if (stressScore <= 30) return "healthy";
  if (stressScore <= 60) return "moderate";
  return "high";
};

const toAlertLevel = (status) => {
  if (status === "healthy") return "low";
  if (status === "moderate") return "moderate";
  return "high";
};

const calculateStressScore = ({
  sleepHours = 7,
  screenTime = 4,
  typingSpeed = 50,
  socialInteraction = 5,
  mood = "neutral",
}) => {
  const normalizedMood = String(mood || "neutral").toLowerCase();
  const moodPenalty = moodPenaltyMap[normalizedMood] ?? 8;
  const socialPenalty = Math.max(0, 5 - Number(socialInteraction || 0)) * 3;

  const score =
    (10 - Number(sleepHours || 0)) * 10 +
    Number(screenTime || 0) * 4 +
    (30 - Number(typingSpeed || 0)) * 2 +
    socialPenalty +
    moodPenalty;

  const bounded = Math.max(0, Math.min(100, Math.round(score)));
  return {
    stressScore: bounded,
    status: classifyRisk(bounded),
    alertLevel: toAlertLevel(classifyRisk(bounded)),
  };
};

module.exports = {
  calculateStressScore,
  classifyRisk,
  toAlertLevel,
};
