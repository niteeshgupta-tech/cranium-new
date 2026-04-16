const modelName = "gemini-1.5-flash";

const jsonPromptTemplate = (content) => `
Analyze the following daily journal entry for emotional wellness.

Do NOT diagnose any disease.
Do NOT mention therapy unless necessary.
Be supportive and practical.

Return ONLY valid JSON in this exact format:

{
  "mood": "",
  "stressLevel": "low/moderate/high",
  "burnoutRisk": "low/moderate/high",
  "emotionalTone": "",
  "summary": "",
  "suggestions": ["", "", ""],
  "confidence": 0
}

Journal Entry:
${content}
`;

const cleanJsonText = (raw) =>
  String(raw || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

const extractFirstJsonObject = (text) => {
  const raw = cleanJsonText(text);
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return raw.slice(start, end + 1);
};

const analyzeWithHeuristics = (content) => {
  const text = String(content || "").toLowerCase();

  const countHits = (words) =>
    words.reduce((acc, w) => acc + (text.includes(w) ? 1 : 0), 0);

  const stressHits = countHits([
    "stress",
    "stressed",
    "anxious",
    "anxiety",
    "overwhelmed",
    "pressure",
    "deadline",
    "panic",
    "worried",
    "worry",
    "tense",
  ]);
  const fatigueHits = countHits([
    "tired",
    "exhausted",
    "burnt out",
    "burned out",
    "burnout",
    "drained",
    "fatigue",
    "sleep",
    "insomnia",
  ]);
  const positiveHits = countHits([
    "grateful",
    "gratitude",
    "calm",
    "peace",
    "relieved",
    "happy",
    "hope",
    "excited",
    "proud",
    "content",
    "better",
  ]);
  const negativeHits = countHits([
    "sad",
    "down",
    "depressed",
    "lonely",
    "hopeless",
    "angry",
    "frustrated",
    "guilty",
    "ashamed",
    "cry",
  ]);

  const signal = stressHits + fatigueHits + negativeHits - positiveHits;

  const stressLevel = signal >= 5 ? "high" : signal >= 2 ? "moderate" : "low";
  const burnoutRisk = fatigueHits >= 3 || (fatigueHits >= 2 && stressHits >= 2) ? "high" : signal >= 3 ? "moderate" : "low";

  const emotionalTone =
    positiveHits > 0 && negativeHits > 0
      ? "mixed but coping"
      : positiveHits > negativeHits
        ? "steady and hopeful"
        : signal >= 4
          ? "strained and overloaded"
          : negativeHits > 0
            ? "low and heavy"
            : "balanced";

  const mood =
    positiveHits > negativeHits && stressHits <= 1
      ? "grounded"
      : negativeHits >= 2 && fatigueHits >= 2
        ? "drained"
        : stressHits >= 3
          ? "overwhelmed"
          : positiveHits >= 2
            ? "uplifted"
            : "reflective";

  const summary = (() => {
    const short = String(content || "").replace(/\s+/g, " ").trim().slice(0, 220);
    if (!short) return "Your entry reflects a mix of emotions today. Try to notice the strongest feeling and what triggered it.";
    if (stressLevel === "high" && burnoutRisk === "high") {
      return `Your entry suggests high stress and fatigue signals. The themes point toward overload and reduced recovery time. (“${short}${short.length >= 220 ? "…" : ""}”)`;
    }
    if (stressLevel === "low" && positiveHits > 0) {
      return `Your entry reads relatively steady with some positive momentum. Keep reinforcing what helped today. (“${short}${short.length >= 220 ? "…" : ""}”)`;
    }
    return `Your entry suggests a meaningful emotional load with room for small recovery steps. (“${short}${short.length >= 220 ? "…" : ""}”)`;
  })();

  const suggestions = (() => {
    if (burnoutRisk === "high") {
      return [
        "Pick one must-do task and defer the rest; reduce scope for today.",
        "Take a 10-minute walk or stretch break to reset your nervous system.",
        "Aim for an earlier wind-down: dim lights, no heavy work 45 minutes before sleep.",
      ];
    }
    if (stressLevel === "high") {
      return [
        "Do a 2-minute breathing reset (slow exhale) before your next task.",
        "Write your next single step on paper; focus only on that.",
        "Message someone you trust for a quick check-in, even if brief.",
      ];
    }
    if (positiveHits > negativeHits) {
      return [
        "Write down one thing that worked today so you can repeat it tomorrow.",
        "Schedule a small reward or rest block to maintain momentum.",
        "Share your win with someone supportive to reinforce the habit.",
      ];
    }
    return [
      "Name the strongest feeling you had today and what triggered it.",
      "Do one short recovery break today without screens.",
      "List your top 2 priorities for tomorrow to reduce mental clutter.",
    ];
  })();

  const confidence = Math.max(
    45,
    Math.min(
      92,
      50 +
        Math.min(18, (String(content || "").length || 0) / 90) +
        Math.min(22, Math.abs(signal) * 4) +
        Math.min(8, (stressHits + fatigueHits) * 2)
    )
  );

  return { mood, stressLevel, burnoutRisk, emotionalTone, summary, suggestions, confidence: Math.round(confidence) };
};

const fallbackAnalysis = (content) => analyzeWithHeuristics(content);

const normalizeAnalysis = (analysis) => {
  const safeLevel = (value) =>
    ["low", "moderate", "high"].includes(String(value || "").toLowerCase())
      ? String(value).toLowerCase()
      : "moderate";

  return {
    mood: String(analysis?.mood || "reflective").slice(0, 40),
    stressLevel: safeLevel(analysis?.stressLevel),
    burnoutRisk: safeLevel(analysis?.burnoutRisk),
    emotionalTone: String(analysis?.emotionalTone || "balanced").slice(0, 60),
    summary: String(analysis?.summary || "").slice(0, 1000),
    suggestions: Array.isArray(analysis?.suggestions)
      ? analysis.suggestions
          .map((item) => String(item || "").trim())
          .filter(Boolean)
          .slice(0, 5)
      : [],
    confidence: Math.max(0, Math.min(100, Number(analysis?.confidence) || 64)),
  };
};

const analyzeJournal = async (content) => {
  if (!process.env.GEMINI_API_KEY) {
    return normalizeAnalysis(fallbackAnalysis(content));
  }

  try {
    // Lazy import so the backend still runs without the dependency installed
    // (e.g. in restricted environments). If Gemini isn't available, we'll
    // fall back to heuristic analysis below.
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = client.getGenerativeModel({ model: modelName });
    const response = await model.generateContent(jsonPromptTemplate(content));
    const text = response?.response?.text?.() || "";
    const jsonText = extractFirstJsonObject(text);
    if (!jsonText) {
      return normalizeAnalysis(fallbackAnalysis(content));
    }
    return normalizeAnalysis(JSON.parse(jsonText));
  } catch (error) {
    return normalizeAnalysis(fallbackAnalysis(content));
  }
};

module.exports = {
  analyzeJournal,
  fallbackAnalysis,
};
