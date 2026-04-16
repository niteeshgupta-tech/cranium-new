import React from "react";
import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      <motion.span
        className="h-5 w-5 rounded-full border-2 border-white/20 border-t-aurora/80"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      {text ? <p className="text-sm text-slate-200/90">{text}</p> : null}
    </div>
  );
}

