import React, { useMemo, useState } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();

  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/journal", element: <Journal /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onToggleSidebar = () => setSidebarOpen(true);
  const onCloseSidebar = () => setSidebarOpen(false);

  // Keep this memoized to avoid re-rendering the shell unnecessarily.
  const shellClassName = useMemo(
    () =>
      "min-h-screen bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(110,231,249,0.14),transparent_45%),radial-gradient(900px_circle_at_90%_10%,rgba(167,139,250,0.12),transparent_40%),linear-gradient(to_bottom,#0b1020,black)]",
    []
  );

  return (
    <BrowserRouter>
      <div className={shellClassName}>
        <Navbar onToggleSidebar={onToggleSidebar} />
        <div className="pt-16 md:flex">
          <Sidebar open={sidebarOpen} onClose={onCloseSidebar} />
          <div className="w-full flex-1">
            <AnimatedRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}