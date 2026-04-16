const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Journal = require("../models/Journal");
const User = require("../models/User");
const { DEMO_EMAIL } = require("../utils/seedData");
const { analyzeJournal } = require("../services/geminiService");
const { successResponse, errorResponse } = require("../utils/responseFormatter");

const resolveUserId = async (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (error) {
      // fallback to demo user
    }
  }

  const demoUser = await User.findOne({ email: DEMO_EMAIL }).lean();
  return demoUser?._id;
};

const analyzeAndSaveJournal = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()[0].msg));
    }

    const rawContent = String(req.body.content || "");
    const content = rawContent.replace(/\s+/g, " ").trim();

    if (!content) {
      return res.status(400).json(errorResponse("Journal content is required"));
    }

    const userId = await resolveUserId(req);
    const analysis = await analyzeJournal(content);

    const journal = await Journal.create({
      userId,
      content,
      ...analysis,
    });

    return res.status(201).json(
      successResponse("Journal analyzed successfully", {
        id: journal._id,
        content: journal.content,
        mood: journal.mood,
        stressLevel: journal.stressLevel,
        burnoutRisk: journal.burnoutRisk,
        emotionalTone: journal.emotionalTone,
        summary: journal.summary,
        suggestions: journal.suggestions,
        confidence: journal.confidence,
        createdAt: journal.createdAt,
      })
    );
  } catch (error) {
    return next(error);
  }
};

const getJournalHistory = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const journals = await Journal.find({ userId }).sort({ createdAt: -1 }).limit(30).lean();
    return res.json(successResponse("Journal history fetched successfully", journals));
  } catch (error) {
    return next(error);
  }
};

const getJournalById = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const journal = await Journal.findOne({ _id: req.params.id, userId }).lean();
    if (!journal) {
      return res.status(404).json(errorResponse("Journal entry not found"));
    }
    return res.json(successResponse("Journal fetched successfully", journal));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  analyzeAndSaveJournal,
  getJournalHistory,
  getJournalById,
};
