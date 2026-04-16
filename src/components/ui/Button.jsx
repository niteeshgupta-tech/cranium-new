import React from "react";

import { motion } from "framer-motion";



const base =

  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all select-none";



const variantStyles = {

  primary:

    "bg-aurora/15 border border-aurora/40 text-aurora hover:bg-aurora/20 shadow-glow focus:outline-none",

  secondary:

    "bg-white/5 border border-white/10 text-slate-100 hover:bg-white/10 focus:outline-none",

  danger:

    "bg-coral/15 border border-coral/40 text-coral hover:bg-coral/20 focus:outline-none",

  ghost: "bg-transparent border border-white/10 text-slate-100 hover:bg-white/5 focus:outline-none",

};



export default function Button({

  variant = "primary",

  loading = false,

  icon,

  fullWidth = false,

  as: AsComponent,

  className = "",

  children,

  disabled,

  ...props

}) {

  const isDisabled = Boolean(disabled || loading);

  const Icon = icon ? <span className="inline-flex">{icon}</span> : null;

  const MotionComponent = AsComponent ? motion(AsComponent) : motion.button;



  return (

    <MotionComponent

      whileHover={isDisabled ? {} : { scale: 1.02 }}

      whileTap={isDisabled ? {} : { scale: 0.98 }}

      transition={{ type: "spring", stiffness: 400, damping: 28 }}

      className={[

        base,

        variantStyles[variant] || variantStyles.primary,

        fullWidth ? "w-full" : "",

        isDisabled ? "opacity-60 cursor-not-allowed" : "",

        className,

      ].join(" ")}

      {...(AsComponent ? {} : { disabled: isDisabled })}

      {...props}

    >

      {loading ? (

        <span className="inline-flex items-center justify-center">

          <span className="h-4 w-4 animate-spin rounded-full border-2 border-aurora/50 border-t-aurora" />

        </span>

      ) : (

        <>

          {Icon}

          {children}

        </>

      )}

    </MotionComponent>

  );

}



