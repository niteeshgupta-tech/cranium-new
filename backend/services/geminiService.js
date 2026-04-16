const { GoogleGenerativeAI } = require("@google/generative-ai");

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

const fallbackAnalysis = () => ({
  mood: "reflective",
  stressLevel: "moderate",
  burnoutRisk: "moderate",
  emotionalTone: "mixed but resilient",
  summary:
    "Your journal suggests emotional load with signs of fatigue and pressure, along with willingness to reflect and improve.",
  suggestions: [
    "Take one short recovery break today without screens.",
    "Write down your top 2 priorities for tomorrow to reduce mental clutter.",
    "Reach out to one trusted person for a light check-in.",
  ],
  confidence: 64,
});

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
    summary: String(analysis?.summary || fallbackAnalysis().summary).slice(0, 1000),
    suggestions: Array.isArray(analysis?.suggestions)
      ? analysis.suggestions
          .map((item) => String(item || "").trim())
          .filter(Boolean)
          .slice(0, 5)
      : fallbackAnalysis().suggestions,
    confidence: Math.max(0, Math.min(100, Number(analysis?.confidence) || 64)),
  };
};

const analyzeJournal = async (content) => {
  if (!process.env.GEMINI_API_KEY) {
    return fallbackAnalysis();
  }

  try {
    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = client.getGenerativeModel({ model: modelName });
    const response = await model.generateContent(jsonPromptTemplate(content));
    const text = response?.response?.text?.() || "";
    const cleaned = cleanJsonText(text);
    return normalizeAnalysis(JSON.parse(cleaned));
  } catch (error) {
    return fallbackAnalysis();
  }
};

module.exports = {
  analyzeJournal,
  fallbackAnalysis,
};
