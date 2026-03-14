"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Wind, X, Play, Square, Activity } from "lucide-react";

type BreathingPhase = "idle" | "inhale" | "hold" | "exhale";

export default function RelaxPage() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      if (phase === "idle") {
        setPhase("inhale");
        setTimeLeft(4);
      } else if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        if (phase === "inhale") {
          setPhase("hold");
          setTimeLeft(7);
        } else if (phase === "hold") {
          setPhase("exhale");
          setTimeLeft(8);
        } else if (phase === "exhale") {
          setCycleCount(prev => prev + 1);
          setPhase("inhale");
          setTimeLeft(4);
        }
      }
    } else {
      setPhase("idle");
      setTimeLeft(0);
    }
    return () => clearTimeout(timer);
  }, [isActive, phase, timeLeft]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase("idle");
      setCycleCount(0);
    }
  };

  const getOrbAnimation = () => {
    switch (phase) {
      case "inhale":
        return { scale: 2.2, opacity: 0.8, backgroundColor: "#10b981", transition: { duration: 4, ease: "linear" } };
      case "hold":
        return { scale: 2.2, opacity: 1, backgroundColor: "#059669", transition: { duration: 7, ease: "linear" } };
      case "exhale":
        return { scale: 1, opacity: 0.3, backgroundColor: "#3b82f6", transition: { duration: 8, ease: "linear" } };
      default:
        return { scale: 1, opacity: 0.2, backgroundColor: "#64748b", transition: { duration: 1 } };
    }
  };

  const getInstruction = () => {
    switch (phase) {
      case "inhale": return "Tarik Napas";
      case "hold": return "Tahan";
      case "exhale": return "Hembuskan";
      default: return "Siap?";
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950 flex flex-col items-center justify-between py-16 px-8 overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
      
      <div className="w-full max-w-5xl flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
            <Activity className="text-emerald-400" size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] leading-none mb-1">Deep Breathing</p>
            <p className="text-xs font-bold text-white uppercase tracking-widest leading-none">Metode 4-7-8</p>
          </div>
        </div>
        
        <Link href="/dashboard" className="w-12 h-12 bg-white/5 hover:bg-rose-500/20 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all group">
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </Link>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center w-full">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <motion.div
            animate={getOrbAnimation()}
            className="absolute w-40 h-40 rounded-full blur-[80px]"
          />
          <motion.div
            animate={getOrbAnimation()}
            className="absolute w-32 h-32 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-white/10"
          />
          
          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key={timeLeft}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="text-7xl font-black text-white tracking-tighter"
                >
                  {timeLeft}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Wind size={60} className="text-emerald-500/30" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 text-center min-h-[100px]">
          <motion.h2
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic"
          >
            {getInstruction()}
          </motion.h2>
          {cycleCount > 0 && (
            <p className="mt-4 text-emerald-500 font-bold tracking-[0.4em] text-[10px] uppercase animate-pulse">
              Siklus Ke-{cycleCount} Selesai
            </p>
          )}
        </div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <button
          onClick={toggleBreathing}
          className={`w-full py-6 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${
            isActive 
            ? 'bg-transparent border border-white/10 text-white hover:bg-rose-500/10 hover:border-rose-500/30' 
            : 'bg-emerald-500 text-slate-950 shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:bg-emerald-400 hover:scale-[1.02]'
          }`}
        >
          {isActive ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          {isActive ? "Akhiri Sesi" : "Mulai Napas"}
        </button>
      </div>

    </div>
  );
}