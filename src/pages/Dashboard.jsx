import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ScoreCard from "../components/dashboard/ScoreCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import RiskChart from "../components/dashboard/RiskChart";
import InsightsCard from "../components/dashboard/InsightsCard";
import AlertPanel from "../components/dashboard/AlertPanel";
import Modal from "../components/ui/Modal";
import useDashboardData from "../hooks/useDashboardData";
import useMoodCheckIn from "../hooks/useMoodCheckIn";
import { getRiskFromWellnessScore } from "../utils/risk";

export default function Dashboard() {
  const { loading, error, stats, alerts, trends, refresh } = useDashboardData();
  const mood = useMemo(() => stats?.stats?.mood?.value, [stats]);

  const riskLevel = useMemo(() => {
    return stats?.status || getRiskFromWellnessScore(stats?.wellnessScore);
  }, [stats]);

  const [checkInOpen, setCheckInOpen] = useState(false);
  const [moodScore, setMoodScore] = useState(62);
  const [energy, setEnergy] = useState(55);
  const [notes, setNotes] = useState("");

  const moodCheckIn = useMoodCheckIn();

  const lastUpdated = stats?.lastUpdated;

  const onSubmitCheckIn = async () => {
    const payload = {
      moodScore,
      energy,
      notes,
    };

    const res = await moodCheckIn.submit(payload);
    if (res) {
      setCheckInOpen(false);
      await refresh();
    }
  };

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Mental wellbeing analytics with calm, explainable alerts."
    >
      {loading ? <Loader text="Building your wellness picture..." /> : null}

      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 rounded-2xl border border-coral/30 bg-coral/10 p-4 text-sm text-coral"
        >
          {error}. Showing mock data instead.
        </motion.div>
      ) : null}

      {stats ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          {/* Top header row */}
          <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-slate-100 md:text-xl">
                        Saarthi (Wellness Tracker)
                      </h2>
                      <Badge risk={riskLevel} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200/80">
                      Wellness score is an early signal - use it for support, not
                      judgment.
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <p className="text-xs font-semibold text-slate-200/70">
                      Wellness score
                    </p>
                    <p className="mt-1 text-3xl font-bold text-slate-100">
                      {Math.round(stats.wellnessScore)}
                      <span className="ml-2 text-sm font-semibold text-slate-200/70">
                        / 100
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-slate-200/70">
                      Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    onClick={() => setCheckInOpen(true)}
                    icon={<span className="text-lg">+</span>}
                  >
                    Mood check-in
                  </Button>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200/80">
                    Current mood: <span className="font-semibold text-slate-100">{mood || "-"}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ScoreCard / confidence block */}
            <div>
              <ScoreCard
                wellnessScore={stats.wellnessScore}
                status={riskLevel}
                lastUpdated={stats.lastUpdated}
              />
            </div>
          </div>

          {/* Stats */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <StatsGrid stats={stats.stats} />
          </motion.section>

          {/* Charts (full width row) + Insights (full width row) */}
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <RiskChart
                stressTrend={trends?.stressTrend || []}
                wellnessScoreHistory={trends?.wellnessScoreHistory || []}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.04 }}
            >
              <InsightsCard insights={stats.insights} />
            </motion.div>
          </section>

          {/* Alerts */}
          <section className="grid gap-6 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <AlertPanel
                  risk={riskLevel}
                  alerts={alerts}
                  onAction={(key) => {
                    // For hackathon demo: keep action guidance local.
                    setCheckInOpen(true);
                    if (key === "breathe") {
                      setNotes("Breathing reset (demo): inhale 4s, hold 2s, exhale 6s x 5 rounds. If possible, unclench jaw & shoulders.");
                    }
                    if (key === "notify")
                      setNotes(
                        'Message idea: "I care about you. Want to take a short break together?"'
                      );
                    if (key === "break")
                      setNotes(
                        "Break idea: 5 minutes away from screens + water + slow breathing. Then log one honest mood check-in."
                      );
                    if (key === "counselor")
                      setNotes(
                        "Counselor message: \"I'm noticing more stress lately. Could we talk about coping steps?\""
                      );
                  }}
                />
              </motion.div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5">
                <p className="text-sm font-semibold text-slate-100">
                  What you can do next
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200/80">
                  Choose one tiny supportive action. Consistency beats intensity.
                </p>
                <div className="mt-4 grid gap-2">
                  {[
                    { t: "2-minute reset", d: "Slow breathing + relaxed shoulders." },
                    { t: "Single-task focus", d: "Pick one small step, then stop." },
                    { t: "Log how you feel", d: "Mood check-in helps the AI learn your baseline." },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs font-semibold text-slate-100/95">{x.t}</p>
                      <p className="mt-1 text-xs text-slate-200/70">{x.d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Button variant="ghost" fullWidth onClick={() => setCheckInOpen(true)}>
                    Open mood check-in
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <Modal
            open={checkInOpen}
            title="Mood check-in (calm + quick)"
            onClose={() => setCheckInOpen(false)}
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-200/80">
                  Mood score: {moodScore}
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={moodScore}
                  onChange={(e) => setMoodScore(Number(e.target.value))}
                  className="mt-2 w-full accent-aurora"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-200/80">
                  Energy level: {energy}
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="mt-2 w-full accent-lilac"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-200/80">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100 outline-none focus:border-aurora/40"
                  placeholder="Example: 'I slept late and felt tense today.'"
                />
              </div>

              {moodCheckIn.error ? (
                <p className="text-xs text-coral">{moodCheckIn.error}</p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={onSubmitCheckIn}
                  loading={moodCheckIn.loading}
                >
                  Submit check-in
                </Button>
                <Button variant="secondary" onClick={() => setCheckInOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </motion.div>
      ) : null}
    </PageContainer>
  );
}