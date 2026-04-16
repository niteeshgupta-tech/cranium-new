import React from "react";

import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import { FiHome, FiActivity, FiBookOpen } from "react-icons/fi";



const nav = [

  { to: "/", label: "Home", icon: FiHome },

  { to: "/dashboard", label: "Dashboard", icon: FiActivity },

  { to: "/journal", label: "AI Journal", icon: FiBookOpen },

];



export default function Sidebar({ open, onClose }) {

  const visible = open;



  return (

    <>

      {/* Mobile overlay */}

      <motion.div

        className="fixed inset-0 z-40 bg-black/40"

        initial={false}

        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}

        transition={{ duration: 0.18 }}

        onClick={onClose}

      />



      <motion.aside

        className="fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-midnight/75 backdrop-blur"

        initial={false}

        animate={{ x: visible ? 0 : "-100%" }}

        transition={{ type: "spring", stiffness: 300, damping: 30 }}

      >

        <div className="flex h-14 items-center justify-between px-5 border-b border-white/10">

          <p className="text-xs font-semibold tracking-wider text-slate-200/70">

            Navigation

          </p>

          <button

            type="button"

            onClick={onClose}

            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"

          >

            Close

          </button>

        </div>



        <nav className="p-4">

          <div className="space-y-2">

            {nav.map((item) => {

              const Icon = item.icon;

              return (

                <NavLink

                  key={item.to}

                  to={item.to}

                  onClick={onClose}

                  className={({ isActive }) =>

                    [

                      "flex items-center gap-3 rounded-xl border px-4 py-3 transition",

                      isActive

                        ? "border-aurora/40 bg-aurora/10 text-aurora"

                        : "border-white/10 bg-white/0 text-slate-200/90 hover:bg-white/5 hover:border-white/20",

                    ].join(" ")

                  }

                >

                  <Icon className="text-lg" />

                  <span className="text-sm font-semibold">{item.label}</span>

                </NavLink>

              );

            })}

          </div>



          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow">

            <p className="text-xs font-semibold text-slate-200/70">Demo Tip</p>

            <p className="mt-2 text-sm leading-relaxed text-slate-200/85">

              Use the dashboard to experience risk alerts, wellness charts, and

              mood check-ins with mock fallback.

            </p>

          </div>

        </nav>

      </motion.aside>

    </>

  );

}



