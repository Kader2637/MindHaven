"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { 
  Send, Mic, Sparkles, MicOff, Users, 
  Plus, MessageSquare, History, X, ArrowRight, Trash2, Menu, Clock, AlertTriangle, SearchX
} from "lucide-react";

// --- KOMPONEN PEMBANTU: TYPEWRITER EFFECT ---
const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(i));
      i++;
      if (i === text.length) clearInterval(timer);
    }, 20); // Kecepatan ngetik (ms)
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- SISTEM 10 MENIT & UI ---
  const [startTime, setStartTime] = useState(new Date());
  const [showMatchPrompt, setShowMatchPrompt] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    fetchSessions();
    setupSpeechRecognition();
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      fetchMessages(currentSessionId);
      setIsSidebarOpen(false);
      setStartTime(new Date()); 
      setShowMatchPrompt(false);
      setShowOptions(false);
    } else {
      setMessages([]);
      setShowOptions(true);
    }
  }, [currentSessionId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      if (diff > 600000 && messages.length > 4 && !showMatchPrompt) {
        setShowMatchPrompt(true);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [messages, startTime, showMatchPrompt]);

  const fetchSessions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from('chats').select('session_id, message, created_at').eq('user_id', user.id).eq('sender', 'user').order('created_at', { ascending: false });
    if (data) {
      const uniqueSessions = Array.from(new Map(data.map(item => [item.session_id, item])).values());
      setSessions(uniqueSessions);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    setIsLoading(true);
    const { data } = await supabase.from('chats').select('*').eq('session_id', sessionId).order('created_at', { ascending: true });
    if (data) setMessages(data.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.message, id: m.id })));
    setIsLoading(false);
  };

  const executeDelete = async () => {
    if (!sessionToDelete) return;
    const { error } = await supabase.from('chats').delete().eq('session_id', sessionToDelete);
    if (!error) {
      if (currentSessionId === sessionToDelete) {
        setCurrentSessionId(null);
        setMessages([]);
      }
      fetchSessions();
      setSessionToDelete(null);
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;
    const { data: { user } } = await supabase.auth.getUser();
    const sessionId = currentSessionId || crypto.randomUUID();
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput("");
    setIsLoading(true);
    setShowOptions(false);

    try {
      const res = await fetch('/api/chat', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ message: text, history: messages }) 
      });
      const data = await res.json();
      
      const aiResponse = { role: 'assistant', content: data.content, isNew: true };
      setMessages(prev => [...prev, aiResponse]);

      await supabase.from('chats').insert([
        { session_id: sessionId, user_id: user?.id, message: text, sender: 'user' },
        { session_id: sessionId, user_id: user?.id, message: data.content, sender: 'ai' }
      ]);
      
      if (!currentSessionId) { setCurrentSessionId(sessionId); fetchSessions(); }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, sistem sedang sibuk. Coba lagi nanti ya. 🌿" }]);
    } finally { setIsLoading(false); }
  };

  const setupSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "id-ID";
      recognitionRef.current.onresult = (e: any) => setInput(e.results[0][0].transcript);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] gap-0 lg:gap-6 max-w-7xl mx-auto relative bg-white lg:bg-transparent overflow-hidden">
      
      {/* SIDEBAR */}
      <AnimatePresence>
        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 z-[100] w-[85%] sm:w-80 bg-white lg:relative lg:flex lg:flex-col lg:rounded-[2.5rem] lg:border border-slate-100 shadow-2xl lg:shadow-none"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8 px-2">
                <div>
                  <p className="font-black text-[10px] text-emerald-600 uppercase tracking-[0.4em]">Memory Lab</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase leading-none mt-1">{sessions.length} Percakapan</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400"><X size={20}/></button>
              </div>
              
              <button 
                onClick={() => { setCurrentSessionId(null); setMessages([]); setIsSidebarOpen(false); }} 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] mb-6 flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
              >
                <Plus size={18} /> New Session
              </button>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                {sessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                    <div className="p-4 bg-slate-50 rounded-2xl mb-4 text-slate-300"><SearchX size={32} /></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Belum ada riwayat</p>
                  </div>
                ) : (
                  sessions.map((s) => (
                    <div key={s.session_id} onClick={() => setCurrentSessionId(s.session_id)} className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${currentSessionId === s.session_id ? 'bg-emerald-50 border-emerald-100 shadow-sm' : 'hover:bg-slate-50 border-transparent'}`}>
                      <div className="flex items-start gap-3 overflow-hidden">
                        <MessageSquare size={16} className={`mt-0.5 ${currentSessionId === s.session_id ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <p className={`text-xs font-bold truncate max-w-[140px] ${currentSessionId === s.session_id ? 'text-emerald-900' : 'text-slate-600'}`}>{s.message}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSessionToDelete(s.session_id); }} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* CHAT AREA */}
      <div className="flex-1 bg-white lg:border border-slate-100 lg:rounded-[3rem] shadow-sm flex flex-col relative overflow-hidden h-full">
        <div className="p-4 lg:p-6 border-b border-slate-50 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-slate-50 rounded-2xl text-slate-600"><Menu size={20}/></button>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100"><Sparkles size={20} /></div>
            <div>
              <h2 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-900 leading-none uppercase">Aether Support</h2>
              <p className="text-[9px] font-bold text-emerald-600 uppercase mt-1 italic leading-none">CBT Mode • Active</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8 scrollbar-hide">
          <AnimatePresence>
            {messages.length === 0 && !currentSessionId && showOptions && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full text-center space-y-8">
                <div className="p-6 bg-emerald-50 rounded-[2.5rem] text-emerald-600 shadow-inner"><MessageSquare size={40} /></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tight text-slate-900 uppercase italic">Ruang Aman Anda.</h3>
                  <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto italic">Apa yang sedang memenuhi pikiranmu hari ini? Ceritain aja, aku dengerin.</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center max-w-md">
                  {["Aku lagi sedih banget", "Cemas soal masa depan", "Lagi butuh temen ngobrol", "Sulit tidur akhir-akhir ini"].map((opt) => (
                    <button key={opt} onClick={() => handleSend(opt)} className="px-6 py-3 bg-white border border-slate-100 rounded-full text-[11px] font-bold text-slate-500 hover:bg-emerald-600 hover:text-white transition-all active:scale-90 shadow-sm">
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-5 lg:p-6 rounded-[2rem] text-sm font-medium shadow-sm leading-relaxed max-w-[85%] lg:max-w-[75%] ${
                  m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' : 'bg-white border border-slate-50 text-slate-600 rounded-tl-none'
                }`}>
                  {/* TYPEWRITER HANYA UNTUK PESAN AI YANG BARU MUNCUL */}
                  {m.role === 'assistant' && (i === messages.length - 1) && !currentSessionId ? (
                    <Typewriter text={m.content} />
                  ) : (
                    m.content
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-white border border-slate-50 p-6 rounded-[2rem] rounded-tl-none shadow-sm flex items-center gap-2">
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse italic">Aether sedang mengetik...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={scrollRef} />
        </div>

        {/* AJAKAN MATCHING (10 MENIT) */}
        <AnimatePresence>
          {showMatchPrompt && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="absolute bottom-32 left-4 right-4 lg:left-8 lg:right-8 bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl z-20 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20">
              <div className="flex items-center gap-4 text-left">
                <div className="p-4 bg-emerald-500 rounded-2xl shadow-lg"><Users size={24} /></div>
                <div>
                   <p className="text-xs font-black uppercase tracking-tight italic">Butuh teman bicara manusia?</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Ada seseorang yang merasakan hal serupa. Mau aku hubungkan?</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowMatchPrompt(false)} className="p-4 text-slate-500 hover:text-white"><X size={20}/></button>
                <button className="bg-emerald-500 px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all">Hubungkan Sekarang</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT AREA */}
        <div className="p-4 lg:p-8 bg-white border-t border-slate-50">
          <div className="max-w-4xl mx-auto bg-slate-100/50 rounded-[2rem] p-2 flex items-center gap-3 border border-slate-200 shadow-inner focus-within:bg-white transition-all">
            <button onClick={() => { setIsRecording(!isRecording); isRecording ? recognitionRef.current?.stop() : recognitionRef.current?.start(); }} className={`p-4 rounded-full transition-all ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-emerald-600'}`}>
              {isRecording ? <MicOff size={22}/> : <Mic size={22} />}
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ceritain aja di sini..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold py-3 placeholder:italic" />
            <button onClick={() => handleSend()} disabled={isLoading} className="bg-slate-900 text-white p-4 rounded-full hover:bg-emerald-600 active:scale-95 transition-all shadow-xl shadow-slate-200"><Send size={20} /></button>
          </div>
        </div>
      </div>

      {/* --- CUSTOM DELETE MODAL --- */}
      <AnimatePresence>
        {sessionToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSessionToDelete(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 text-center shadow-2xl">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6"><AlertTriangle size={32} /></div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2 italic">Hapus Memori?</h3>
              <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed italic">Sesi ini akan dihapus permanen dari sistem intelijen Aether.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setSessionToDelete(null)} className="py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all active:scale-95">Batal</button>
                <button onClick={executeDelete} className="py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all">Hapus</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden" />}
    </div>
  );
}