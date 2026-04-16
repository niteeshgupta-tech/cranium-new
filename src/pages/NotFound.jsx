import React from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Button from "../components/ui/Button";



export default function NotFound() {

  return (

    <motion.div

      initial={{ opacity: 0, y: 12 }}

      animate={{ opacity: 1, y: 0 }}

      className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6"

    >

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

        <p className="text-sm font-semibold text-slate-200/80">404</p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">

          Page not found

        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-200/80">

          The Silent Suffering Detector can't find what you're looking for.

          Try returning home.

        </p>

        <div className="mt-6 flex flex-wrap gap-3">

          <Button variant="primary" as={Link} to="/">

            Back to Home

          </Button>

          <Button variant="secondary" as={Link} to="/dashboard">

            Open Dashboard

          </Button>

        </div>

      </div>

    </motion.div>

  );

}



