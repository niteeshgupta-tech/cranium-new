import axios from "axios";
import { mockAlerts, mockDashboardStats, mockMoodCheckIn, mockTrends } from "../data/mock";

const DEFAULT_BASE_URL = "http://localhost:5000/api";

// Single axios instance so we can share baseURL + timeout.
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL,
  timeout: 7000,
});

// API methods expected by the UI.
export async function getDashboardStats() {
  try {
    const res = await apiClient.get("/dashboard/stats");
    return res.data;
  } catch (e) {
    return mockDashboardStats();
  }
}

export async function getAlerts() {
  try {
    const res = await apiClient.get("/alerts");
    return res.data;
  } catch (e) {
    return mockAlerts();
  }
}

export async function postMoodCheckIn(payload) {
  try {
    const res = await apiClient.post("/mood/checkin", payload);
    return res.data;
  } catch (e) {
    return mockMoodCheckIn(payload);
  }
}

export async function getTrends() {
  try {
    const res = await apiClient.get("/trends");
    return res.data;
  } catch (e) {
    return mockTrends();
  }
}

export async function analyzeJournalEntry(payload) {
  try {
    const res = await apiClient.post("/journal/analyze", payload);
    return res.data;
  } catch (e) {
    return {
      success: false,
      message: e?.response?.data?.message || "Journal analysis failed",
    };
  }
}

export async function getJournalHistory() {
  try {
    const res = await apiClient.get("/journal/history");
    return res.data;
  } catch (e) {
    return {
      success: true,
      message: "Journal history unavailable",
      data: [],
    };
  }
}

