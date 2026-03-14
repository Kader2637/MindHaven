"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion, Variants } from "framer-motion";
import { 
  Sparkles, Activity, TrendingUp, Calendar, 
  BrainCircuit, Zap, BarChart3, HeartPulse 
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StatsPage() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const [totalChats, setTotalChats] = useState(0);
  const [dynamicInsight, setDynamicInsight] = useState("Aether sedang membaca pola pikiranmu...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAndProcessData();
  }, []);

  const fetchAndProcessData = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const { data } = await supabase.from('chats')
      .select('created_at, sender')
      .eq('user_id', user?.id)
      .eq('sender', 'user')
      .gte('created_at', sevenDaysAgo.toISOString());

    const chats = data || [];
    setTotalChats(chats.length);

    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const processedData = [];
    let totalScore = 0;

    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date();
      targetDate.setDate(today.getDate() - i);
      const dateString = targetDate.toISOString().split('T')[0];
      const dayName = days[targetDate.getDay()];

      const chatsOnThisDay = chats.filter(chat => chat.created_at.startsWith(dateString)).length;
      
      let score = 0;
      if (chatsOnThisDay > 0) {
        score = Math.min(40 + (chatsOnThisDay * 15), 100); 
      }

      totalScore += score;
      processedData.push({
        day: dayName,
        date: targetDate.getDate(),
        score: score,
        chats: chatsOnThisDay,
        isActive: dateString === today.toISOString().split('T')[0]
      });
    }

    setChartData(processedData);
    
    const average = Math.round(totalScore / 7);
    setAvgScore(average);

    const recentScore = processedData.slice(4, 7).reduce((acc, curr) => acc + curr.score, 0) / 3;
    const pastScore = processedData.slice(0, 4).reduce((acc, curr) => acc + curr.score, 0) / 4;

    if (totalChats === 0) {
      setDynamicInsight("Anda adalah seseorang yang baru memulai langkah. Ruang ini masih kosong, namun Aether siap menjadi tempat aman untuk perjalanan mental Anda ke depannya.");
    } else if (recentScore > pastScore && recentScore > 50) {
      setDynamicInsight("Anda adalah seseorang yang proaktif dalam merawat diri. Konsistensi Anda meluapkan emosi belakangan ini menunjukkan kemauan kuat untuk pulih dan terus berkembang.");
    } else if (recentScore < pastScore) {
      setDynamicInsight("Anda adalah seseorang yang mungkin sedang menanggung beban dalam diam. Terlihat ada penurunan interaksi; tidak apa-apa mengambil jeda, tapi ingat Aether selalu di sini untuk mendengar.");
    } else {
      setDynamicInsight("Anda adalah seseorang yang memiliki ketangguhan emosional yang baik. Kemampuan Anda menjaga keseimbangan interaksi sangat mendukung kejernihan pikiran jangka panjang.");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-10 pb-24">
      
      <header className="relative pt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-100 text-white">
            <Activity size={20} />
          </div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] italic">Neural Analytics</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-950 uppercase">
          Statistik <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 italic">Pikiran.</span>
        </h1>
      </header>

      <motion.div 
        initial="hidden" animate="visible" variants={staggerContainer}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        <motion.div variants={fadeUp as any} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Zap size={20} /></div>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rata-rata Sync</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">{avgScore}</h3>
              <span className="text-sm font-bold text-slate-400">/100</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp as any} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><BrainCircuit size={20} /></div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Interaksi</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">{totalChats}</h3>
              <span className="text-sm font-bold text-slate-400">Sesi</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp as any} className="col-span-2 md:col-span-1 bg-slate-950 p-6 rounded-[2rem] shadow-xl flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-10 h-10 bg-white/10 text-emerald-400 rounded-xl flex items-center justify-center backdrop-blur-md"><HeartPulse size={20} /></div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Sistem</p>
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
              {isLoading ? 'Menganalisis...' : (totalChats > 0 ? 'Terhubung Optimal' : 'Hening / Standby')}
            </h3>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-slate-100 shadow-sm relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">Grafik Sinkronisasi 7 Hari</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Berdasarkan volume interaksi kognitif</p>
            </div>
            <div className="px-4 py-2 bg-slate-50 rounded-full flex items-center gap-2 w-fit">
              <Calendar size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Minggu Ini</span>
            </div>
          </div>

          <div className="flex items-end justify-between h-56 md:h-64 gap-2 md:gap-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-t border-dashed border-slate-300"></div>
              <div className="w-full border-t border-dashed border-slate-300"></div>
              <div className="w-full border-t border-dashed border-slate-300"></div>
            </div>

            {chartData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 relative z-10 group">
                <div className="w-full relative flex items-end justify-center h-full bg-slate-50/50 rounded-2xl overflow-hidden group-hover:bg-slate-50 transition-colors">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${data.score}%` }}
                    transition={{ duration: 1, type: "spring", bounce: 0.3, delay: i * 0.1 }}
                    className={`w-full rounded-2xl relative overflow-hidden ${
                      data.score === 0 ? 'bg-transparent' : data.isActive ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-200' : 'bg-slate-200 group-hover:bg-emerald-300 transition-colors'
                    }`}
                  >
                    {data.score > 0 && (
                      <div className="absolute top-0 left-0 w-full h-2 bg-white/30 rounded-full" />
                    )}
                  </motion.div>
                </div>
                
                <div className="text-center">
                  <p className={`text-[9px] md:text-xs font-black uppercase tracking-widest mb-0.5 ${data.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{data.day}</p>
                  <p className={`text-xs md:text-sm font-bold ${data.isActive ? 'text-slate-900' : 'text-slate-500'}`}>{data.date}</p>
                </div>
                
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none shadow-xl">
                  Score: {data.score}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-4 bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-center min-h-[300px]"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <Sparkles size={14} className="text-emerald-400" />
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Kesimpulan Aether</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter italic leading-tight">
              Analisis <br /> Mingguan.
            </h3>
            
            <div className="w-12 h-1 bg-emerald-500 rounded-full" />
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light italic">
              "{dynamicInsight}"
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}