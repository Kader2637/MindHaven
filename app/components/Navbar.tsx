"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ArrowUpRight, ShieldAlert, ChevronRight, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    checkUser();
  }, [pathname]);

  useEffect(() => setIsOpen(false), [pathname]);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Fitur Platform", href: "/fitur" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm" : "py-6 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5 z-[130] group">
          <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
            <Heart className="text-white" size={18} fill="white" />
          </div>
          <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">
            Mind<span className="text-emerald-600">Haven</span>
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="relative group">
                <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                  isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-900"
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-emerald-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-xl active:scale-95">
                Mulai Gratis
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center gap-2">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          )}
          
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 text-slate-900 z-[130] bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[120] lg:hidden flex flex-col px-8 pt-28 pb-12"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Menu Navigasi</p>
              {menuItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.name}
                >
                  <Link 
                    href={item.href} 
                    className="flex items-center justify-between py-5 border-b border-slate-50 text-2xl font-black text-slate-900 tracking-tighter uppercase italic group"
                  >
                    {item.name}
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <Link href="/panic" className="flex items-center gap-4 p-5 bg-rose-600 text-white rounded-[2rem] shadow-2xl shadow-rose-200 group">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <ShieldAlert size={24} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-widest">Tombol Panik</span>
                  <span className="text-[10px] opacity-70 font-bold uppercase tracking-wider">Akses Bantuan Darurat</span>
                </div>
                <ArrowUpRight size={20} className="ml-auto opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              {!user ? (
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" className="flex items-center justify-center p-5 bg-slate-50 text-slate-900 font-black uppercase text-[11px] tracking-widest rounded-2xl border border-slate-100">
                    Masuk
                  </Link>
                  <Link href="/register" className="flex items-center justify-center p-5 bg-emerald-600 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-lg shadow-emerald-100">
                    Daftar
                  </Link>
                </div>
              ) : (
                <Link href="/dashboard" className="flex items-center justify-center p-5 bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-2xl">
                  Buka Dashboard
                </Link>
              )}

              <div className="text-center pt-2">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.5em]">MindHaven Digital Platform</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}