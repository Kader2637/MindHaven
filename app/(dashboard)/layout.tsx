"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, MessageCircle, CheckSquare, 
  BarChart3, Heart, LogOut, Menu, X, ShieldAlert 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Ikhtisar", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Konsultasi AI", href: "/chat", icon: <MessageCircle size={20} /> },
    { name: "Tugas Harian", href: "/tasks", icon: <CheckSquare size={20} /> },
    { name: "Statistik Mood", href: "/stats", icon: <BarChart3 size={20} /> },
    { name: "Capsule of Hope", href: "/hope", icon: <Heart size={20} /> },
  ];

  if (!mounted) return null;

  return (
    // Tambahkan h-screen dan overflow-hidden di container utama
    <div className="flex h-screen bg-[#FDFDFD] relative overflow-hidden">
      
      {/* 1. MOBILE NAVBAR (Tetap Fixed di Atas) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-[60]">
        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Aether</p>
        <div className="flex items-center gap-3">
          <Link href="/panic" className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <ShieldAlert size={20} />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-slate-50 rounded-xl text-slate-600"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* 2. SIDEBAR SYSTEM (Dibuat Fixed / Sticky) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-[80] w-72 bg-white border-r border-slate-100 flex flex-col p-8 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0 lg:h-full shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex justify-between items-center mb-12">
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Aether MindHaven</p>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-hide">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-bold transition-all ${
                pathname === item.href 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-50 space-y-3 shrink-0">
          <Link 
            href="/panic" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-black bg-rose-600 text-white shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all"
          >
            <ShieldAlert size={20} /> DARURAT
          </Link>
          <button className="flex items-center gap-4 px-5 py-4 text-slate-300 font-bold text-sm hover:text-rose-500 transition-colors w-full text-left">
            <LogOut size={20} /> Keluar
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT (Area ini yang bisa di-scroll) */}
      <main className="flex-1 h-full overflow-y-auto scroll-smooth">
        <div className="p-6 md:p-12 pt-24 lg:pt-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}