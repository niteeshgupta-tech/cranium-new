import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          aria-label="Close modal"
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="relative mx-auto mt-20 w-[92%] max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-100/95">{title}</h3>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
          <div className="px-5 py-5">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

