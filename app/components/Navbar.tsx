"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ArrowUpRight, Siren, ShieldAlert, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menutup menu saat pindah halaman
  useEffect(() => setIsOpen(false), [pathname]);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Fitur Platform", href: "/fitur" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/50" : "py-5 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 z-[130]">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Heart className="text-white" size={18} fill="white" />
          </div>
          <span className="text-base font-black text-slate-900 tracking-tighter uppercase">
            Mind<span className="text-emerald-600">Haven</span>
          </span>
        </Link>
        
        {/* DESKTOP MENU (Minimalist) */}
        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-900"
              }`}>
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
            Masuk
          </Link>
          <Link href="/register" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
            Mulai Gratis
          </Link>
          
          {/* HAMBURGER (Garis 3) */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-900 z-[130] hover:bg-slate-100 rounded-xl transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Rombak Total: Clean & Professional) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 bg-white z-[120] lg:hidden flex flex-col px-8 pt-24 pb-12"
          >
            {/* Navigasi Links */}
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Navigasi Utama</p>
              {menuItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                >
                  <Link 
                    href={item.href} 
                    className="flex items-center justify-between py-4 border-b border-slate-50 text-xl font-bold text-slate-900 tracking-tight group"
                  >
                    {item.name}
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section (Fixed to Bottom) */}
            <div className="mt-auto space-y-4">
              <Link href="/bantuan-profesional" className="flex items-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
                <Siren size={20} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-tight">Layanan Darurat</span>
                  <span className="text-[10px] opacity-70 uppercase tracking-wider font-medium">Bantuan Profesional 24/7</span>
                </div>
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" className="flex items-center justify-center p-4 bg-slate-50 text-slate-900 font-bold rounded-2xl text-sm border border-slate-100">
                  Masuk
                </Link>
                <Link href="/register" className="flex items-center justify-center p-4 bg-emerald-600 text-white font-bold rounded-2xl text-sm shadow-lg shadow-emerald-200">
                  Daftar <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="pt-4 text-center">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Aether Code | UNMER Project</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}