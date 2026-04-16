const express = require("express");
const { getStats, getTrends, getInsights } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getStats);
router.get("/trends", getTrends);
router.get("/insights", getInsights);

module.exports = router;
