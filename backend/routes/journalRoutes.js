const express = require("express");
const { body, param } = require("express-validator");
const {
  analyzeAndSaveJournal,
  getJournalHistory,
  getJournalById,
} = require("../controllers/journalController");

const router = express.Router();

router.post(
  "/analyze",
  [
    body("content")
      .isString()
      .withMessage("Journal content must be text")
      .trim()
      .isLength({ min: 20, max: 6000 })
      .withMessage("Journal content must be 20-6000 characters"),
  ],
  analyzeAndSaveJournal
);

router.get("/history", getJournalHistory);
router.get("/:id", [param("id").isMongoId().withMessage("Invalid journal id")], getJournalById);

module.exports = router;
