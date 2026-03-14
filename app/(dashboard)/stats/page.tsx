"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";

export default function StatsPage() {
  const [moodData, setMoodData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMood = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // Mengambil 7 data chat terakhir untuk dianalisis skornya
      const { data } = await supabase.from('chats')
        .select('message, created_at')
        .eq('user_id', user?.id)
        .eq('sender', 'user')
        .order('created_at', { ascending: false })
        .limit(7);
      setMoodData(data || []);
    };
    fetchMood();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black tracking-tighter uppercase text-slate-900">Statistik Suasana Hati</h1>
        <p className="text-slate-400 font-medium italic">Memahami pola emosi Anda dalam satu minggu terakhir.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm flex flex-col items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 mb-10">Grafik Keseimbangan Emosi</h3>
          <div className="flex items-end gap-3 h-48 w-full">
            {moodData.reverse().map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                {/* Simulasi Grafik berdasarkan panjang teks (atau bisa diganti skor asli dari AI) */}
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${Math.min(data.message.length * 2, 100)}%` }}
                  className="w-full bg-emerald-400 rounded-xl shadow-lg shadow-emerald-50"
                />
                <span className="text-[8px] font-bold text-slate-300 uppercase italic">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-center">
          <h2 className="text-4xl font-black tracking-tighter mb-4 italic">Kesimpulan Aether.</h2>
          <p className="text-slate-400 text-sm leading-relaxed font-medium">
            Berdasarkan analisis interaksi terakhir, suasana hati Anda cenderung stabil namun membutuhkan lebih banyak waktu istirahat di sore hari.
          </p>
        </div>
      </div>
    </div>
  );
}