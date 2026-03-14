"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import MoodGarden from "@/app/components/MoodGarden";
import {
  CheckSquare, BookText, ArrowRight, 
  Star, Wind, Heart, MessageCircle, Mic, 
  Sun, Moon, CloudSun, CheckCircle2, Circle
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({
    profile: null,
    totalChats: 0,
    taskCompletion: 0,
    missions: [],
    latestJournal: null,
    moodHistory: [],
    disciplinePoints: 0,
    dailyInsight: "Sedang menganalisis gelombang pikiranmu..."
  });
  
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 19) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    const fetchDashboardData = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: prof } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();

        const { count } = await supabase.from('chats')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        const today = new Date();
        const todayLocalString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        const { data: hopes } = await supabase.from('hopes')
          .select('message, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        const { data: allChats } = await supabase.from('chats')
          .select('created_at, sender')
          .eq('user_id', user.id)
          .eq('sender', 'user')
          .order('created_at', { ascending: false });

        const hasChattedToday = allChats?.some((c: any) => {
          const cDate = new Date(c.created_at);
          return `${cDate.getFullYear()}-${String(cDate.getMonth() + 1).padStart(2, '0')}-${String(cDate.getDate()).padStart(2, '0')}` === todayLocalString;
        }) || false;

        const hasHopeToday = hopes?.some((h: any) => {
          const hDate = new Date(h.created_at);
          return `${hDate.getFullYear()}-${String(hDate.getMonth() + 1).padStart(2, '0')}-${String(hDate.getDate()).padStart(2, '0')}` === todayLocalString;
        }) || false;
        
        const autoMissions = [
          { title: "Buka MindHaven", done: true },
          { title: "Sapa Aether AI", done: hasChattedToday },
          { title: "Segel 1 Harapan", done: hasHopeToday }
        ];

        const completedMissions = autoMissions.filter(m => m.done).length;
        const taskProgress = (completedMissions / autoMissions.length) * 100;

        let dynamicInsight = "";
        if (!hasChattedToday) {
          dynamicInsight = "Aether menunggumu hari ini. Ceritakan sedikit harimu untuk melepaskan beban.";
        } else if (taskProgress === 100) {
          dynamicInsight = "Luar biasa! Kamu menyelesaikan semua rutinitas mental hari ini.";
        } else {
          dynamicInsight = "Satu langkah lebih baik. Selesaikan misi harianmu untuk memberi nutrisi pada tamanmu.";
        }

        const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        const processedMoodData = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dayName = days[d.getDay()];
          
          const localDateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

          const chatsOnThisDay = allChats?.filter((chat: any) => {
            const chatDate = new Date(chat.created_at);
            const chatLocalDateString = `${chatDate.getFullYear()}-${String(chatDate.getMonth() + 1).padStart(2, '0')}-${String(chatDate.getDate()).padStart(2, '0')}`;
            return chatLocalDateString === localDateString;
          }).length || 0;

          let score = chatsOnThisDay > 0 ? Math.min(40 + (chatsOnThisDay * 15), 100) : 0; 
          processedMoodData.push({ day: dayName, score: score });
        }

        setStats({
          profile: prof,
          totalChats: count || 0,
          taskCompletion: taskProgress,
          missions: autoMissions,
          latestJournal: hopes?.[0]?.message || "Belum ada kenangan tersimpan di kapsul waktu.",
          moodHistory: processedMoodData,
          disciplinePoints: (completedMissions * 50) + ((count || 0) * 10),
          dailyInsight: dynamicInsight
        });
      }
      setIsLoading(false);
    };
    fetchDashboardData();
  }, []);

  const getGreetingIcon = () => {
    if (greeting.includes("Pagi")) return <Sun size={24} className="text-amber-500" />;
    if (greeting.includes("Malam")) return <Moon size={24} className="text-indigo-400" />;
    return <CloudSun size={24} className="text-amber-500" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const DashboardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
      <div className="md:col-span-8 bg-white border border-slate-50 animate-pulse rounded-[3rem] p-8 min-h-[320px] flex flex-col justify-between">
        <div className="w-1/3 h-6 bg-slate-200 rounded-full mb-2"></div>
        <div className="w-1/4 h-4 bg-slate-100 rounded-full"></div>
        <div className="w-full h-32 bg-slate-100 rounded-2xl mt-8"></div>
      </div>
      <div className="md:col-span-4 bg-slate-900 animate-pulse rounded-[3rem] p-8 min-h-[360px] flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-slate-800 rounded-full mb-6"></div>
        <div className="w-1/2 h-6 bg-slate-800 rounded-full mb-2"></div>
        <div className="w-2/3 h-4 bg-slate-800 rounded-full"></div>
      </div>
      <div className="md:col-span-4 bg-slate-100 animate-pulse rounded-[3rem] min-h-[180px]"></div>
      <div className="md:col-span-4 bg-slate-100 animate-pulse rounded-[3rem] min-h-[180px]"></div>
      <div className="md:col-span-4 bg-slate-100 animate-pulse rounded-[3rem] min-h-[180px]"></div>
      <div className="md:col-span-6 bg-white border border-slate-50 animate-pulse rounded-[3rem] p-8 min-h-[180px]">
        <div className="w-1/3 h-4 bg-slate-200 rounded-full mb-4"></div>
        <div className="w-1/4 h-10 bg-slate-200 rounded-2xl mb-8"></div>
        <div className="w-full h-2 bg-slate-100 rounded-full"></div>
      </div>
      <div className="md:col-span-6 bg-white border border-slate-50 animate-pulse rounded-[3rem] p-8 min-h-[180px]">
        <div className="w-1/3 h-4 bg-slate-200 rounded-full mb-4"></div>
        <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
              {!isLoading && stats.taskCompletion === 100 ? "Kondisi Optimal" : "Sistem Menunggu Interaksi"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-2">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{isLoading ? '...' : stats.profile?.full_name?.split(' ')[0] || 'Aetherian'}</span>.
          </h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-2">
            {getGreetingIcon()} <span className="italic">{isLoading ? "Memuat data personal..." : `"${stats.dailyInsight}"`}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white px-6 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 min-w-[200px]"
        >
          <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl"><Star size={24} fill="currentColor" /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Poin Disiplin</p>
            <p className="text-2xl font-black text-slate-800 leading-none">
              {isLoading ? "..." : stats.disciplinePoints.toLocaleString()}
            </p>
          </div>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DashboardSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={containerVariants} initial="hidden" animate="visible"
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto"
          >
            <motion.div variants={itemVariants} className="md:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm flex flex-col justify-between min-h-[320px]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 mb-1">Tren Interaksi Emosional</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">7 Hari Terakhir</p>
                </div>
                <Link href="/stats" className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest bg-emerald-50 hover:bg-emerald-100 transition-colors px-4 py-2 rounded-full">
                  Detail <ArrowRight size={14} />
                </Link>
              </div>
              <div className="h-[200px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.moodHistory}>
                    <defs>
                      <linearGradient id="colorMoodDash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" axisLine={false} tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} 
                      padding={{ left: 10, right: 10 }}
                    />
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} itemStyle={{ fontWeight: '900', color: '#065f46' }} cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorMoodDash)" activeDot={{ r: 6, fill: '#059669', stroke: '#fff', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-4 bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xl min-h-[360px] group">
              <div className="flex-1 flex items-center justify-center w-full">
                <MoodGarden totalChats={stats.totalChats} moodScore={stats.moodHistory.length > 0 ? stats.moodHistory[stats.moodHistory.length - 1].score : 50} />
              </div>
              <div className="mt-4 space-y-2 relative z-10">
                <h3 className="text-lg font-black tracking-tight uppercase">Taman Digital</h3>
                <p className="text-[11px] leading-relaxed text-slate-400 font-medium px-4">
                  {stats.totalChats < 10 && "Bibitmu baru saja ditanam. Teruslah bercerita untuk membantunya tumbuh."}
                  {stats.totalChats >= 10 && stats.totalChats < 30 && "Tunas kecil mulai terlihat! Ini bukti kamu mulai peduli pada dirimu sendiri."}
                  {stats.totalChats >= 30 && stats.totalChats < 60 && "Tamanmu semakin rimbun. Kamu hebat sudah konsisten sejauh ini!"}
                  {stats.totalChats >= 60 && "Luar biasa! Pohonmu sudah berbunga. Ketenangan mulai bersemi di jiwamu."}
                </p>
                <div className="pt-2 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[8px] font-bold text-slate-500 uppercase">Bahagia</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[8px] font-bold text-slate-500 uppercase">Stabil</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-[8px] font-bold text-slate-500 uppercase">Sendu</span></div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-4">
              <Link href="/chat" className="block h-full bg-slate-950 rounded-[3rem] p-8 text-white flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm group-hover:bg-emerald-500 transition-colors"><MessageCircle size={28} /></div>
                  <div className="p-3 bg-emerald-500 text-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0"><ArrowRight size={18} /></div>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase leading-tight mb-2">Konsultasi <br />Aether AI</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mic size={14} className="text-emerald-500" /> Teks & Suara Aktif</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-4">
              <Link href="/relax" className="block h-full bg-blue-500 rounded-[3rem] p-8 text-white flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-blue-100 group overflow-hidden relative">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[40px]" />
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white group-hover:text-blue-600 transition-colors"><Wind size={28} /></div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase leading-tight mb-2">Latihan <br />Pernapasan</h3>
                  <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Metode 4-7-8 Relaksasi</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-4">
              <Link href="/hope" className="block h-full bg-amber-500 rounded-[3rem] p-8 text-white flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-amber-100 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full" />
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white group-hover:text-amber-500 transition-colors"><Heart size={28} /></div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase leading-tight mb-2">Capsule <br />of Hope</h3>
                  <p className="text-[10px] font-bold text-amber-100 uppercase tracking-widest">Pesan Untuk Masa Depan</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-6 bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Misi Harian (Auto-Sync)</p>
                  <h4 className="text-4xl font-black text-slate-900">{Math.round(stats.taskCompletion)}%</h4>
                </div>
                <div className={`p-4 rounded-2xl transition-colors ${stats.taskCompletion === 100 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-300'}`}>
                  <CheckSquare size={24} />
                </div>
              </div>
              
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                <motion.div initial={{ width: 0 }} animate={{ width: `${stats.taskCompletion}%` }} transition={{ duration: 1 }} className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full" />
              </div>

              <div className="space-y-3">
                {stats.missions.map((mission: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    {mission.done ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-300" />}
                    <span className={`text-sm font-bold ${mission.done ? 'text-slate-900' : 'text-slate-400'}`}>{mission.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-6">
              <Link href="/hope" className="block h-full bg-slate-50 border border-slate-100 rounded-[3rem] p-8 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-center overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-200 text-slate-500 rounded-lg group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors"><BookText size={16} /></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memori Terakhir</p>
                </div>
                <h4 className="text-base font-bold text-slate-700 italic leading-relaxed line-clamp-2">
                  "{stats.latestJournal}"
                </h4>
              </Link>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}