"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, MessageSquare, MapPin, Send, 
  Github, Instagram, Linkedin, ShieldAlert,
  Sparkles, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Umum",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from("contacts")
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          subject: formData.subject, 
          message: formData.message 
        }
      ]);

    if (!error) {
      setIsSent(true);
      setFormData({ name: "", email: "", subject: "Umum", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-36 pb-24 font-sans selection:bg-emerald-100">
      
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-16 md:mb-24"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-[10px] uppercase tracking-[0.3em]">
          <Sparkles size={14} /> Hubungkan Pikiran
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase italic leading-[0.95]">
          Kritik, Saran, <br className="hidden md:block" />
          & <span className="text-emerald-500">Kolaborasi.</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
          Punya ide untuk pengembangan MindHaven? Kami selalu siap mendengarkan setiap masukan untuk menciptakan ruang aman yang lebih baik.
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 space-y-6 md:space-y-8"
        >
          <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full" />
            <h3 className="text-xl md:text-2xl font-black uppercase italic mb-8 relative z-10">Informasi Kontak</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                  <Mail size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-emerald-500 tracking-widest mb-1">Email Resmi</p>
                  <p className="text-sm font-bold break-all">support@mindhaven.app</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-emerald-500 tracking-widest mb-1">Lokasi Kami</p>
                  <p className="text-sm font-bold leading-relaxed">Malang, Jawa Timur,<br />Indonesia.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all"><Github size={18} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex items-start gap-4 md:gap-5">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-200">
              <ShieldAlert size={20} />
            </div>
            <div className="space-y-1 md:space-y-2">
              <h4 className="font-black text-rose-900 uppercase text-[10px] tracking-widest">Kondisi Darurat?</h4>
              <p className="text-[11px] md:text-xs text-rose-700/80 font-bold leading-relaxed">
                Formulir ini bukan untuk krisis. Jika Anda butuh bantuan segera, gunakan 
                <Link href="/bantuan-profesional" className="text-rose-600 underline ml-1 font-black">Panic Button</Link>.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Nama Lengkap</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nama Anda"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Aktif</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Topik</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm cursor-pointer appearance-none"
              >
                <option value="Umum">Tanya Umum</option>
                <option value="Bug">Laporan Error</option>
                <option value="Saran">Saran Fitur</option>
                <option value="Kerja Sama">Kolaborasi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Isi Pesan</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tuliskan pesan Anda..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-50 rounded-[1.5rem] md:rounded-[2rem] focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm resize-none"
              ></textarea>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
                isSent 
                ? 'bg-emerald-500 text-slate-950' 
                : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-xl'
              } disabled:opacity-50`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSent ? (
                <> <CheckCircle2 size={16} /> Terkirim! </>
              ) : (
                <> <Send size={16} /> Kirim Pesan </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-slate-100 text-center space-y-4"
      >
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
          <MessageSquare size={20} />
        </div>
        <h4 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">Tetap Sehat, Tetap Berani.</h4>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2026 MindHaven Platform</p>
      </motion.footer>

    </div>
  );
}