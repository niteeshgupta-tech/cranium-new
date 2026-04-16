import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import JournalForm from "../components/journal/JournalForm";
import JournalResult from "../components/journal/JournalResult";
import JournalHistory from "../components/journal/JournalHistory";
import { analyzeJournalEntry, getJournalHistory } from "../api/axios";

export default function Journal() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    const response = await getJournalHistory();
    const items = Array.isArray(response) ? response : response?.data || [];
    setHistory(items);
    setHistoryLoading(false);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    const response = await analyzeJournalEntry({ content });

    if (!response?.success) {
      setError(response?.message || "Journal analysis failed");
      setLoading(false);
      return;
    }

    setResult(response.data);
    await loadHistory();
    setLoading(false);
  };

  return (
    <PageContainer
      title="AI Journal"
      subtitle="Write your full day reflection and receive emotional wellness insights."
    >
      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 rounded-2xl border border-coral/40 bg-coral/10 p-3 text-sm text-coral"
        >
          {error}
        </motion.div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <JournalForm
          content={content}
          onChange={setContent}
          onAnalyze={handleAnalyze}
          loading={loading}
        />
        <JournalResult result={result} loading={loading} />
      </div>

      <div className="mt-6">
        {historyLoading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300/80">
            Loading journal history...
          </div>
        ) : (
          <JournalHistory items={history} />
        )}
      </div>
    </PageContainer>
  );
}
