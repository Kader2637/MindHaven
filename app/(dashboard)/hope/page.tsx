"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Sparkles, Heart, Lock, Calendar, 
  Send, Loader2, ArchiveX, ShieldCheck, 
  Trash2, Edit3, AlertTriangle, X, CheckSquare
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function HopePage() {
  const [mounted, setMounted] = useState(false);
  const [hopes, setHopes] = useState<any[]>([]);
  const [newHope, setNewHope] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk Edit & Delete
  const [hopeToDelete, setHopeToDelete] = useState<string | null>(null);
  const [hopeToEdit, setHopeToEdit] = useState<any>(null);
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    fetchHopes();
  }, []);

  const fetchHopes = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase.from('hopes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (data) setHopes(data);
    setIsLoading(false);
  };

  // --- FUNGSI TAMBAH ---
  const handleSaveHope = async () => {
    if (!newHope.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('hopes').insert([
      { user_id: user.id, message: newHope }
    ]);

    if (!error) {
      setNewHope("");
      fetchHopes();
    }
    setIsSubmitting(false);
  };

  // --- FUNGSI HAPUS ---
  const executeDelete = async () => {
    if (!hopeToDelete) return;
    const { error } = await supabase.from('hopes').delete().eq('id', hopeToDelete);
    if (!error) {
      setHopes(hopes.filter(h => h.id !== hopeToDelete));
      setHopeToDelete(null);
    }
  };

  // --- FUNGSI EDIT ---
  const executeUpdate = async () => {
    if (!hopeToEdit || !editMessage.trim()) return;
    setIsSubmitting(true);
    const { error } = await supabase.from('hopes').update({ message: editMessage }).eq('id', hopeToEdit.id);
    
    if (!error) {
      setHopes(hopes.map(h => h.id === hopeToEdit.id ? { ...h, message: editMessage } : h));
      setHopeToEdit(null);
      setEditMessage("");
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-10 pb-24">
      
      {/* HEADER */}
      <header className="relative pt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-amber-500 rounded-2xl shadow-lg shadow-amber-100 text-white">
            <Heart size={20} />
          </div>
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] italic">Time Capsule</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-950 uppercase">
          Kapsul <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 italic">Harapan.</span>
        </h1>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* KOLOM KIRI: FORM INPUT */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="lg:col-span-5 bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden lg:sticky lg:top-28"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full -ml-10 -mb-10" />

          <div className="relative z-10 flex flex-col h-full space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Tulis Kenangan</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight italic mb-3">
                Simpan Cahaya <br /> Untuk Nanti.
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Tuliskan hal-hal kecil yang membuatmu tersenyum hari ini. Sistem akan menyimpannya dengan aman dan membukanya kembali saat kamu sedang melewati hari yang berat.
              </p>
            </div>

            <div className="space-y-4">
              <textarea 
                value={newHope}
                onChange={(e) => setNewHope(e.target.value)}
                placeholder="Hari ini aku bersyukur karena..."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none shadow-inner"
              />
              
              <motion.button 
                onClick={handleSaveHope}
                disabled={isSubmitting || !newHope.trim()}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl ${
                  !newHope.trim() ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-amber-500/20'
                }`}
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                {isSubmitting ? "MENYIMPAN..." : "SEGEL KAPSUL"}
              </motion.button>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Enkripsi Memori Aktif</p>
            </div>
          </div>
        </motion.div>

        {/* KOLOM KANAN: LIST KENANGAN */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 px-2 mb-4">
            <Lock size={18} className="text-slate-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Vault Kenangan</h3>
          </div>

          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center text-center">
                <Loader2 className="animate-spin text-amber-500 mb-4" size={40} />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Membuka Vault...</p>
              </div>
            ) : hopes.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col items-center justify-center text-center opacity-70">
                <ArchiveX size={64} className="text-slate-300 mb-6" />
                <p className="text-sm font-bold text-slate-500 mb-2">Belum ada kenangan yang disegel.</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tulis sesuatu yang indah hari ini.</p>
              </motion.div>
            ) : (
              <motion.div initial="hidden" animate="visible" variants={staggerContainer as any} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {hopes.map((hope) => (
                  <motion.div 
                    key={hope.id} variants={fadeUp as any} layout
                    className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar size={14} className="text-amber-500" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formatDate(hope.created_at)}</span>
                        </div>
                        <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed italic">
                          "{hope.message}"
                        </p>
                      </div>
                      
                      {/* ACTION BUTTONS (HANYA MUNCUL SAAT DI HOVER/DI KLIK) */}
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => { setHopeToEdit(hope); setEditMessage(hope.message); }}
                             className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                             title="Edit Kenangan"
                           >
                             <Edit3 size={16} />
                           </button>
                           <button 
                             onClick={() => setHopeToDelete(hope.id)}
                             className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                             title="Hapus Kenangan"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Secured</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- MODAL EDIT KENANGAN --- */}
      <AnimatePresence>
        {hopeToEdit && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setHopeToEdit(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative w-full max-w-lg bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-slate-100"
            >
              <div className="flex justify-between items-center mb-8">
                 <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><Edit3 size={24}/></div>
                 <button onClick={() => setHopeToEdit(null)} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-full"><X size={20}/></button>
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">Edit Kenangan</h3>
              
              <textarea 
                value={editMessage} onChange={(e) => setEditMessage(e.target.value)}
                className="w-full h-40 bg-slate-50 border-none rounded-[2rem] p-6 text-sm font-semibold focus:ring-4 focus:ring-emerald-50 transition-all resize-none mb-8 placeholder:text-slate-300 shadow-inner"
              />
              
              <button 
                onClick={executeUpdate} disabled={isSubmitting || !editMessage.trim()}
                className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl hover:bg-emerald-600"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <CheckSquare size={16}/>}
                {isSubmitting ? "MEMPERBARUI..." : "SIMPAN PERUBAHAN"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL HAPUS KENANGAN --- */}
      <AnimatePresence>
        {hopeToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setHopeToDelete(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 text-center shadow-2xl border border-slate-100"
            >
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6"><AlertTriangle size={32} /></div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2 italic">Hapus Kenangan?</h3>
              <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed italic">Kenangan ini akan dihapus selamanya dari kapsul waktu Anda.</p>
              
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setHopeToDelete(null)} className="py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all active:scale-95">Batal</button>
                <button onClick={executeDelete} className="py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all active:scale-95">Hapus</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}