"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { 
  Sparkles, Circle, CheckCircle2, Calendar, 
  ArrowRight, MessageCircle, Send, Star, Loader2, SearchX, 
  X, Layers, Zap, Target 
} from "lucide-react";

export default function TasksPage() {
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [activeTask, setActiveTask] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
  const getWeekDays = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  useEffect(() => {
    setMounted(true);
    fetchTasks();
  }, [selectedDate]);

  const fetchTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    let query = supabase.from('tasks').select('*').eq('user_id', user.id);
    if (selectedDate) {
      const start = new Date(selectedDate); start.setHours(0,0,0,0);
      const end = new Date(selectedDate); end.setHours(23,59,59,999);
      query = query.gte('created_at', start.toISOString()).lte('created_at', end.toISOString());
    }
    const { data } = await query.order('created_at', { ascending: false });
    if (data && data.length > 0) setTasks(data);
    else {
      setTasks([]);
      if (selectedDate?.toDateString() === new Date().toDateString()) autoGenerateTasks(user.id);
    }
  };

  const autoGenerateTasks = async (userId: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/tasks/generate', { method: 'POST', body: JSON.stringify({ history: [] }) });
      const { tasks: aiTitles } = await res.json();
      const newTasks = aiTitles.map((title: string) => ({ title, user_id: userId, is_completed: false }));
      await supabase.from('tasks').insert(newTasks);
      fetchTasks();
    } catch (e) { console.error(e); } finally { setIsGenerating(false); }
  };

  const submitEvaluation = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/tasks/evaluate', { method: 'POST', body: JSON.stringify({ taskTitle: activeTask.title, userResponse: userAnswer }) });
      const result = await res.json();
      await supabase.from('tasks').update({ response: userAnswer, ai_evaluation: result.feedback, score: result.score, is_completed: true }).eq('id', activeTask.id);
      fetchTasks(); setActiveTask(null); setUserAnswer("");
    } finally { setIsEvaluating(false); }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 md:px-10">
      
      {/* 1. CYBER HEADER DENGAN AKSEN NEON */}
      <header className="relative pt-6">
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-[100px] rounded-full" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2.5 bg-slate-900 rounded-2xl shadow-xl text-emerald-400">
            <Target size={20} />
          </div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] italic">Evolution Path</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighterLEADING-NONE text-slate-950 uppercase relative z-10">
          Tugas <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Harian.</span>
        </h1>
      </header>

      {/* 2. NEUMORPHIC FLOATING FILTER BAR (SANGAT RESPONSIVE) */}
      <div className="sticky top-24 z-40 bg-white/60 backdrop-blur-2xl p-2 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30 flex items-center gap-2 overflow-x-auto scrollbar-hide mx-[-10px] px-[10px] md:mx-0 md:px-2">
        
        {/* Tombol Semua - Sticky di kiri filter */}
        <button 
          onClick={() => setSelectedDate(null)}
          className={`shrink-0 h-14 w-14 md:w-32 rounded-[2rem] md:rounded-3xl flex items-center justify-center gap-3 transition-all duration-300 ${
            selectedDate === null 
            ? 'bg-slate-950 text-white shadow-xl rotate-0' 
            : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          <Layers size={20} />
          <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Semua</span>
        </button>

        <div className="w-[1.5px] h-10 bg-slate-100 shrink-0 mx-1" />

        {/* List Hari - Scrollable */}
        <div className="flex-1 overflow-x-auto scrollbar-hide py-1">
          <div className="flex gap-2 min-w-max">
            {getWeekDays().map((date, i) => {
              const active = selectedDate && date.toDateString() === selectedDate.toDateString();
              return (
                <button 
                  key={i} 
                  onClick={() => setSelectedDate(date)} 
                  className={`h-14 min-w-[65px] md:min-w-[90px] rounded-[1.8rem] md:rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ${
                    active 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200 scale-105' 
                    : 'bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <span className={`text-[8px] font-black uppercase mb-1 ${active ? 'text-emerald-50 opacity-80' : 'text-slate-300'}`}>
                    {days[date.getDay()]}
                  </span>
                  <span className="text-xl font-black leading-none tracking-tight">{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        
        {/* 3. TASK LIST AREA - Lebih Berwarna & Hidup */}
        <div className="lg:col-span-7 space-y-5">
          {isGenerating ? (
             <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 blur-[50px] rounded-full" />
                <Loader2 className="animate-spin mx-auto text-emerald-500 mb-4" size={40} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Menghubungkan Neural Path...</p>
             </div>
          ) : tasks.length === 0 ? (
            <div className="p-20 text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 opacity-60 relative overflow-hidden">
              <SearchX className="mx-auto mb-4 text-slate-300" size={50} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Hening di sini. Belum ada langkah.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {tasks.map((task) => (
                <motion.div 
                  key={task.id} 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  onClick={() => !task.is_completed && setActiveTask(task)}
                  className={`group relative p-1 rounded-[2.5rem] md:rounded-[3rem] transition-all cursor-pointer overflow-hidden ${
                    task.is_completed 
                    ? 'bg-slate-100/50 border border-transparent opacity-60' 
                    : 'bg-white border border-slate-100 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] shadow-sm'
                  }`}
                >
                  {/* Glowing Border Hover Effect */}
                  {!task.is_completed && (
                    <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  )}
                  
                  <div className="relative z-10 bg-white rounded-[2.3rem] md:rounded-[2.8rem] p-6 md:p-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 min-w-0">
                      <div className="shrink-0 relative">
                        {task.is_completed ? (
                          <div className="w-14 h-14 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <CheckCircle2 size={28} />
                          </div>
                        ) : (
                          <div className="w-14 h-14 border-4 border-slate-100 rounded-3xl flex items-center justify-center group-hover:border-emerald-500 transition-all duration-300">
                             <div className="absolute w-3 h-3 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className={`text-base md:text-lg font-bold tracking-tight ${task.is_completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {task.title}
                        </h4>
                        {task.score && (
                          <div className="flex items-center gap-2 mt-2">
                             <div className="px-3 py-1 bg-emerald-50 rounded-full flex items-center gap-1.5 border border-emerald-100">
                                <Star size={12} className="text-emerald-600 fill-emerald-500/20" />
                                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter italic">Sync Score: {task.score}</span>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {!task.is_completed && <ArrowRight size={20} className="text-slate-200 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 4. PREMIUM INSIGHT SIDEBAR (DARK MODE CONCEPT) */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
          <div className="bg-slate-950 rounded-[3rem] p-10 shadow-3xl shadow-slate-300 relative overflow-hidden text-white border border-slate-800">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-[100px] rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full -ml-10 -mb-10" />

            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 text-emerald-400 shadow-inner">
                  <Sparkles size={20} fill="currentColor" />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">Aether Insight</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Saran & Evaluasi Mental</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Active</span>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              {tasks.filter(t => t.ai_evaluation).length > 0 ? (
                tasks.filter(t => t.ai_evaluation).slice(0, 3).map((t, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group shadow-inner"
                  >
                    <div className="flex justify-between items-start mb-2.5">
                       <p className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] leading-none">{t.title}</p>
                       <Zap size={12} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-[13px] text-slate-300 font-medium italic leading-relaxed opacity-90 leading-relaxed">
                      "{t.ai_evaluation}"
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="py-16 text-center flex flex-col items-center gap-6 px-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-700 border border-white/5">
                    <MessageCircle size={32} />
                  </div>
                  <p className="text-sm text-slate-500 font-bold italic leading-relaxed">Selesaikan tugas harianmu. Aether akan menganalisis progres mentalmu di sini.</p>
                </div>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] relative z-10">
               Secure Mental Health Monitoring v3.0
            </div>
          </div>
        </div>
      </div>

      {/* 5. MODAL JAWAB - Lebih Luas & Premium (Drawer Style Mobile) */}
      <AnimatePresence>
        {activeTask && (
          <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveTask(null)} className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white rounded-t-[3.5rem] md:rounded-[4rem] p-10 shadow-2xl border-t md:border border-slate-100 overflow-hidden"
            >
              {/* Glow in Modal */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full -mr-32 -mt-32" />
              
              <div className="flex justify-between items-center mb-10 relative z-10">
                 <div className="p-4 bg-emerald-500 text-white rounded-[2rem] shadow-xl shadow-emerald-200">
                    <MessageCircle size={28}/>
                 </div>
                 <button onClick={() => setActiveTask(null)} className="p-3 text-slate-300 hover:text-rose-500 bg-slate-50 rounded-full transition-all"><X size={24}/></button>
              </div>

              <div className="mb-10 relative z-10 space-y-2">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-1 leading-none italic">MindHaven Check-in</p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight italic">
                  "{activeTask.title}"
                </h3>
              </div>
              
              <textarea 
                value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Bagaimana perasaanmu setelah melakukannya? Adakah kendala atau hal positif yang kamu temukan hari ini?"
                className="w-full h-56 bg-slate-50 border-none rounded-[2.5rem] p-8 text-base font-semibold focus:ring-4 focus:ring-emerald-100 transition-all resize-none mb-8 shadow-inner placeholder:text-slate-300"
              />
              
              <button 
                onClick={submitEvaluation} disabled={isEvaluating}
                className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl hover:bg-emerald-600"
              >
                {isEvaluating ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>}
                {isEvaluating ? "SYNCHRONIZING..." : "KONFIRMASI SELESAI"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}