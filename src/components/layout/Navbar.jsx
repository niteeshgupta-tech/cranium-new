import React from "react";



import { motion } from "framer-motion";



import { FiMenu, FiCpu } from "react-icons/fi";







export default function Navbar({ onToggleSidebar }) {



  return (



    <motion.header



      initial={{ opacity: 0, y: -8 }}



      animate={{ opacity: 1, y: 0 }}



      transition={{ duration: 0.35 }}



      className="sticky top-0 z-40 w-full border-b border-white/10 bg-midnight/60 backdrop-blur"



    >



      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">



        <div className="flex items-center gap-3">



          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-glow">



            <FiCpu className="text-aurora" />



          </div>



          <div className="leading-tight">



            <p className="text-sm font-semibold text-slate-100/95">Saarthi (Wellness Tracker)</p>



            <p className="text-xs text-slate-200/70">Ambient AI × Mental Health</p>



          </div>



        </div>







        <button



          type="button"



          onClick={onToggleSidebar}



          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100/90 transition hover:bg-white/10 focus:outline-none"



          aria-label="Open navigation"



        >



          <FiMenu />



        </button>



      </div>



    </motion.header>



  );



}







