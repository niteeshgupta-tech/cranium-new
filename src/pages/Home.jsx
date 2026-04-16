import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCpu, FiCheckCircle, FiShield, FiZap } from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const features = [
  {
    icon: <FiZap className="text-aurora" />,
    title: "Ambient AI signals",
    desc: "Turn subtle patterns into wellness insights you can act on.",
  },
  {
    icon: <FiCpu className="text-lilac" />,
    title: "Burnout early warning",
    desc: "Detect hidden stress before it turns into a crisis moment.",
  },
  {
    icon: <FiShield className="text-coral" />,
    title: "Human-centered & trustworthy",
    desc: "Supportive suggestions - no judgment, just clarity and next steps.",
  },
];

const steps = [
  {
    title: "Log a quick mood check-in",
    desc: "Capture how you feel right now. The model learns your baseline.",
  },
  {
    title: "See your wellness trajectory",
    desc: "Charts reveal patterns in stress trend and recovery signals.",
  },
  {
    title: "Get calm, actionable alerts",
    desc: "If risk rises, follow guided actions to reduce strain.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-aurora/20 blur-3xl"
          animate={{ x: [0, 26, 0], y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-12rem] top-[-6rem] h-[32rem] w-[32rem] rounded-full bg-lilac/15 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-14rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-coral/10 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Additional creative light effects */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[25rem] w-[25rem] rounded-full bg-gradient-to-br from-aurora/15 via-lilac/10 to-coral/15 blur-2xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.div
          className="absolute top-[20%] right-[15%] h-[15rem] w-[15rem] rounded-full bg-lilac/20 blur-xl"
          animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[20%] h-[12rem] w-[12rem] rounded-full bg-aurora/25 blur-xl"
          animate={{ x: [0, -25, 25, 0], y: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[10%] left-[10%] h-[18rem] w-[18rem] rounded-full bg-coral/12 blur-2xl"
          animate={{ rotate: [0, 360], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Light Rays */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[60rem] w-[0.5rem] bg-gradient-to-t from-aurora/25 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, -100%) rotate(0deg)', transformOrigin: 'bottom center' }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[60rem] w-[0.5rem] bg-gradient-to-t from-lilac/20 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, -100%) rotate(60deg)', transformOrigin: 'bottom center' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[60rem] w-[0.5rem] bg-gradient-to-t from-coral/25 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, -100%) rotate(120deg)', transformOrigin: 'bottom center' }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[60rem] w-[0.5rem] bg-gradient-to-t from-aurora/20 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, -100%) rotate(180deg)', transformOrigin: 'bottom center' }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[60rem] w-[0.5rem] bg-gradient-to-t from-lilac/25 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, -100%) rotate(240deg)', transformOrigin: 'bottom center' }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[60rem] w-[0.5rem] bg-gradient-to-t from-coral/20 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, -100%) rotate(300deg)', transformOrigin: 'bottom center' }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Moving Clouds */}
        <motion.div
          className="absolute top-8 left-0 h-20 w-80 bg-white/25 rounded-full blur-lg"
          animate={{ x: [-400, 1600] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 0 }}
        />
        <motion.div
          className="absolute top-16 right-0 h-16 w-64 bg-white/20 rounded-full blur-lg"
          animate={{ x: [1600, -400] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
        />
        <motion.div
          className="absolute top-4 left-1/4 h-24 w-72 bg-white/30 rounded-full blur-lg"
          animate={{ x: [-400, 1600] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 10 }}
        />

        {/* Rays from Sky Under Clouds */}
        <motion.div
          className="absolute top-1/4 left-1/2 h-[50rem] w-[0.8rem] bg-gradient-to-b from-white/40 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, 0) rotate(0deg)', transformOrigin: 'top center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/2 h-[50rem] w-[0.8rem] bg-gradient-to-b from-white/35 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, 0) rotate(45deg)', transformOrigin: 'top center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/2 h-[50rem] w-[0.8rem] bg-gradient-to-b from-white/45 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, 0) rotate(90deg)', transformOrigin: 'top center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/2 h-[50rem] w-[0.8rem] bg-gradient-to-b from-white/30 to-transparent blur-sm"
          style={{ transform: 'translate(-50%, 0) rotate(135deg)', transformOrigin: 'top center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-aurora" />
                <span className="text-xs font-semibold text-slate-100/90">
                  Calm analytics for mental wellbeing
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
                Silent Suffering Detector
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-200/80 md:text-lg">
                Detect burnout, stress, and emotional decline before crisis happens.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  as={Link}
                  to="/dashboard"
                  className="shadow-glow"
                >
                  Start Monitoring
                </Button>
                <Button variant="secondary" as={Link} to="/dashboard">
                  Preview Dashboard
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                    { label: "Wellness score", value: "0-100" },
                  { label: "Risk alerts", value: "Calm + actionable" },
                  { label: "Charts", value: "Stress trend" },
                ].map((k) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <p className="text-xs font-semibold text-slate-200/70">{k.label}</p>
                    <p className="mt-1 text-base font-bold text-slate-100/95">
                      {k.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-midnight/40 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <FiCpu className="text-aurora" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-slate-100/95">
                        Wellness Overview
                      </p>
                      <p className="text-xs text-slate-200/75">Last updated just now</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-aurora/30 bg-aurora/10 px-3 py-1">
                    <p className="text-xs font-bold text-aurora">Demo Mode</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "Typing Speed", value: "52 wpm", accent: "aurora" },
                    { title: "Sleep Hours", value: "6.1 hrs", accent: "lilac" },
                    { title: "Mood", value: "Mixed", accent: "coral" },
                    { title: "Screen Time", value: "4.8 hrs", accent: "aurora" },
                  ].map((c, idx) => (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + idx * 0.05 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs font-semibold text-slate-200/70">{c.title}</p>
                      <p
                        className={[
                          "mt-1 text-sm font-bold",
                          c.accent === "aurora"
                            ? "text-aurora"
                            : c.accent === "lilac"
                            ? "text-lilac"
                            : "text-coral",
                        ].join(" ")}
                      >
                        {c.value}
                      </p>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className={[
                            "h-full rounded-full",
                            c.accent === "aurora"
                              ? "bg-aurora/60"
                              : c.accent === "lilac"
                              ? "bg-lilac/60"
                              : "bg-coral/60",
                          ].join(" ")}
                          style={{ width: `${58 + idx * 7}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-midnight/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-100/95">
                        Suggested today
                      </p>
                      <p className="mt-1 text-sm text-slate-200/80">
                        Take a 2-minute breathing reset.
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <FiCheckCircle className="text-aurora" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-aurora/20 blur-2xl"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-10 md:px-6 md:pb-14">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <Card title={f.title} className="h-full hover:scale-105 hover:shadow-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{f.icon}</div>
                    <p className="text-sm leading-relaxed text-slate-200/80">
                      {f.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
                How it works
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200/80 md:text-base">
                A calm workflow designed for trust, clarity, and faster action.
              </p>
            </div>

            <div className="grid gap-4 justify-items-center md:mx-auto md:max-w-xl">
              {steps.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="w-full"
                >
                  <Card className="p-0 hover:scale-105 hover:shadow-2xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex gap-4 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-bold text-aurora">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-100/95">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-200/80">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
            <div className="grid gap-8 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
                  Why it matters
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/80 md:text-base">
                  Silent burnout is real. The earlier you notice, the more options you
                  have to protect your wellbeing.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { title: "Early warning", desc: "Catch subtle signals before they compound." },
                  { title: "Better support", desc: "Turn anxiety into a next step." },
                  { title: "Continuous clarity", desc: "Track trends without judgment." },
                ].map((q) => (
                  <motion.div
                    key={q.title}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-white/10 bg-midnight/30 p-4 hover:scale-105 hover:shadow-2xl hover:bg-midnight/50 transition-all duration-300"
                  >
                    <p className="text-sm font-semibold text-slate-100/95">
                      {q.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-200/80">{q.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" as={Link} to="/dashboard">
                Start Monitoring
              </Button>
              <Button variant="ghost" as={Link} to="/dashboard">
                Explore Wellness Charts
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-midnight/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="text-sm text-slate-200/70">
            Built for demos with mock fallback. Designed with care for mental wellbeing.
          </p>
          <div className="flex gap-3">
            {["Privacy", "Safety", "Support"].map((x) => (
              <span
                key={x}
                className="text-xs font-semibold text-slate-200/70 rounded-full border border-white/10 bg-white/5 px-3 py-1"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}