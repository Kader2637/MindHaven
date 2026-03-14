"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { 
  Leaf, CheckSquare, BarChart3, BookText, 
  TrendingUp, ArrowRight, Star, Wind, 
  ShieldAlert, Heart, MessageCircle, Mic
} from "lucide-react";
import Link from "next/link";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({
    profile: null,
    totalChats: 0,
    taskCompletion: 0,
    latestJournal: null,
    moodHistory: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // 1. Ambil Profil
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        
        // 2. Ambil Statistik Chat
        const { count } = await supabase.from('chats')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // 3. Ambil Status Tugas
        const { data: tasks } = await supabase.from('tasks').select('*').eq('user_id', user.id);
        const completed = tasks?.filter(t => t.is_completed).length || 0;
        const totalTasks = tasks?.length || 0;

        // 4. Ambil Jurnal Terakhir
        const { data: journals } = await supabase.from('journals')
          .select('*').eq('user_id', user.id)
          .order('created_at', { ascending: false }).limit(1);

        // Simulasi data grafik suasana hati
        const mockMoodData = [
          { day: 'Sen', score: 65 }, { day: 'Sel', score: 50 },
          { day: 'Rab', score: 80 }, { day: 'Kam', score: 70 },
          { day: 'Jum', score: 90 }, { day: 'Sab', score: 85 },
          { day: 'Min', score: 95 },
        ];

        setStats({
          profile: prof,
          totalChats: count || 0,
          taskCompletion: totalTasks > 0 ? (completed / totalTasks) * 100 : 0,
          latestJournal: journals?.[0],
          moodHistory: mockMoodData
        });
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
              Sistem Intelijen Aether
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
            Dashboard Utama
          </h1>
          <p className="text-slate-400 font-medium italic">Selamat datang kembali, {stats.profile?.full_name?.split(' ')[0] || 'Pengguna'}.</p>
        </div>
        <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl"><Star size={20} fill="currentColor" /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Poin Disiplin</p>
            <p className="text-lg font-black text-slate-800 leading-none">1,240</p>
          </div>
        </div>
      </header>

      {/* BENTO GRID SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
        
        {/* 1. MOOD STATISTICS (Visualisasi Data) */}
        <div className="md:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Tren Suasana Hati</h3>
              <p className="text-xs text-slate-400 font-medium">Analisis emosional 7 hari terakhir</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp size={14} /> +12% Stabil
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.moodHistory}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#cbd5e1'}} dy={10} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  itemStyle={{fontWeight: 'bold', color: '#10b981'}}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorMood)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. MOOD GARDEN (Gamifikasi) */}
        <div className="md:col-span-4 bg-emerald-600 rounded-[3rem] p-8 text-white flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl shadow-emerald-100">
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 6 }}
            className="z-10 mb-6"
          >
            <Leaf size={120} fill="white" />
          </motion.div>
          <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Taman Digital</h3>
          <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
            Level {Math.floor(stats.totalChats / 10) + 1} • {stats.totalChats} Interaksi
          </p>
        </div>

        {/* 1 & 4. AI PEER SUPPORT & VOICE INTERACTION (Quick Access) */}
        <Link href="/chat" className="md:col-span-4 bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between hover:scale-[0.98] transition-all group">
          <div className="flex justify-between">
            <div className="p-3 bg-white/10 rounded-2xl"><MessageCircle size={24} /></div>
            <div className="p-3 bg-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all"><Mic size={20} /></div>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase leading-tight">Mulai<br/>Konsultasi AI</h3>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Mendukung Suara & Teks</p>
          </div>
        </Link>

        {/* 3. INTERACTIVE BREATHING (Relaksasi) */}
        <Link href="/relax" className="md:col-span-4 bg-blue-500 rounded-[3rem] p-8 text-white flex flex-col justify-between hover:scale-[0.98] transition-all shadow-xl shadow-blue-100">
          <div className="p-3 bg-white/10 rounded-2xl w-fit"><Wind size={24} /></div>
          <div>
            <h3 className="text-xl font-black uppercase leading-tight">Latihan<br/>Pernapasan</h3>
            <p className="text-[9px] font-bold text-blue-100 uppercase tracking-widest mt-2">Panduan Visual Aktif</p>
          </div>
        </Link>

        {/* 6. SISTEM DETEKSI KRISIS (Bantuan Darurat) */}
        <Link href="/panic" className="md:col-span-4 bg-rose-600 rounded-[3rem] p-8 text-white flex flex-col justify-between hover:scale-[0.98] transition-all shadow-xl shadow-rose-100">
          <div className="p-3 bg-white/10 rounded-2xl w-fit"><ShieldAlert size={24} /></div>
          <div>
            <h3 className="text-xl font-black uppercase leading-tight">Bantuan<br/>Darurat</h3>
            <p className="text-[9px] font-bold text-rose-100 uppercase tracking-widest mt-2">Hotline 119 Tersedia</p>
          </div>
        </Link>

        {/* 5. CAPSULE OF HOPE */}
        <Link href="/hope" className="md:col-span-4 bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all group">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <Heart size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Capsule of Hope</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pesan untuk Masa Depan</p>
          </div>
        </Link>

        {/* PROGRES TUGAS & JURNAL (Ringkasan) */}
        <div className="md:col-span-4 bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <h4 className="text-4xl font-black text-slate-900">{Math.round(stats.taskCompletion)}%</h4>
            <CheckSquare size={20} className="text-emerald-500 mb-2" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Progres Tugas Harian</p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${stats.taskCompletion}%` }} className="bg-emerald-500 h-full" />
          </div>
        </div>

        <div className="md:col-span-4 bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm flex flex-col justify-center overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><BookText size={20} /></div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Catatan Terakhir</p>
          </div>
          <h4 className="text-sm font-bold text-slate-600 italic truncate">
            "{stats.latestJournal?.content || "Belum ada catatan."}"
          </h4>
        </div>

      </div>
    </div>
  );
}