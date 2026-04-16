import { useCallback, useEffect, useState } from "react";
import { getAlerts, getDashboardStats, getTrends } from "../api/axios";

export default function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [trends, setTrends] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, alertsRes, trendsRes] = await Promise.all([
        getDashboardStats(),
        getAlerts(),
        getTrends(),
      ]);
      setStats(statsRes);
      setAlerts(alertsRes);
      setTrends(trendsRes);
    } catch (e) {
      // axios layer already falls back to mock, but keep a safety net.
      setError(e?.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, error, stats, alerts, trends, refresh: load };
}

