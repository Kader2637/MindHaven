"use client";

import React from "react";
import { motion } from "framer-motion";

interface GardenProps {
  totalChats: number;
  moodScore: number; // 0 - 100
}

export default function MoodGarden({ totalChats, moodScore }: GardenProps) {
  // Hitung Level (1-4)
  const level = Math.min(Math.floor(totalChats / 10) + 1, 4);
  
  // Tentukan warna HANYA sesuai legenda (Tidak ada lagi abu-abu)
  const getMoodColor = () => {
    if (moodScore > 70) return "#fbbf24"; // Emas (Bahagia)
    if (moodScore < 40 && totalChats > 0) return "#60a5fa"; // Biru (Sendu)
    return "#10b981"; // Hijau (Stabil) -> Menjadi Default mutlak
  };

  const themeColor = getMoodColor();

  // Bikin array untuk animasi kunang-kunang/partikel
  const particles = Array.from({ length: 6 });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* 1. Background Glow Dinamis */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 rounded-full blur-[50px] -z-10"
        style={{ backgroundColor: themeColor }}
      />

      {/* 2. Floating Particles (Kunang-kunang) */}
      {particles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: themeColor, filter: "blur(1px)" }}
          animate={{ 
            y: [40, -100], 
            x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
            opacity: [0, 0.8, 0] 
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
        />
      ))}

      {/* 3. SVG Pohon Digital */}
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* LEVEL 1: Batang Utama */}
        {/* Warna batang pakai slate-300 (#cbd5e1) biar kontras dan futuristik di atas background hitam */}
        <motion.path
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
          d="M100 180V140M100 140L85 125M100 140L115 125"
          stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Titik cahaya kecil di ujung batang biar Level 1 tidak mati */}
        <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} cx="85" cy="125" r="4" fill={themeColor} />
        <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} cx="115" cy="125" r="4" fill={themeColor} />

        {/* LEVEL 2: Dahan Tambahan */}
        {level >= 2 && (
          <>
            <motion.path
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
              d="M85 125L70 115M115 125L130 115M100 120V100"
              stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            />
            <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} cx="70" cy="115" r="3" fill={themeColor} />
            <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} cx="130" cy="115" r="3" fill={themeColor} />
            <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} cx="100" cy="100" r="3" fill={themeColor} />
          </>
        )}

        {/* LEVEL 3: Daun (Aura Holografik) */}
        {level >= 3 && (
          <g>
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} cx="70" cy="115" r="16" fill={themeColor} fillOpacity="0.4" />
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.1 }} cx="130" cy="115" r="16" fill={themeColor} fillOpacity="0.4" />
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }} cx="100" cy="95" r="22" fill={themeColor} fillOpacity="0.5" />
          </g>
        )}

        {/* LEVEL 4: Bunga/Inti Merah Merona */}
        {level >= 4 && (
          <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="100" cy="85" r="5" fill="#f43f5e" />
            <circle cx="65" cy="110" r="4" fill="#f43f5e" />
            <circle cx="135" cy="110" r="4" fill="#f43f5e" />
          </motion.g>
        )}
      </svg>

      {/* Label Level Floating */}
      <div className="absolute bottom-4 bg-slate-950/50 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full shadow-xl">
        <p className="text-[10px] font-black text-white uppercase tracking-widest">
          LVL. {level} <span className="mx-2 opacity-30">|</span> {totalChats} CHATS
        </p>
      </div>
    </div>
  );
}