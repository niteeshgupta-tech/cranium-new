import React from "react";
import { motion } from "framer-motion";

export default function PageContainer({ title, subtitle, children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6"
    >
      {title || subtitle ? (
        <header className="mb-6">
          {title ? (
            <h1 className="text-xl font-bold tracking-tight text-slate-100 md:text-2xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-200/80">{subtitle}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </motion.main>
  );
}

