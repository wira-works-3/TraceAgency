"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Send, Loader2, CheckCircle } from "lucide-react";

export default function Kontak() {
  const [formState, setFormState] = useState("idle"); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("loading");
    
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      // Reset after 3 seconds
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="kontak" className="py-32 bg-background relative overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Hubungi kami
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              Siap wujudkan <br />
              <span className="text-text-secondary">sesuatu yang luar biasa?</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-md">
              Punya ide event atau butuh talent profesional untuk kampanye Anda? Hubungi kami sekarang dan mari wujudkan visi Anda bersama Trace Agency.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-1">Email</h4>
                  <a href="mailto:traceagencys@gmail.com" className="text-xl font-medium text-foreground hover:text-gray-300 transition-colors">
                    traceagencys@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-1">WhatsApp</h4>
                  <a
                    href="https://wa.me/6285191641608"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-medium text-foreground hover:text-gray-300 transition-colors underline-offset-4 hover:underline"
                  >
                    +62 851-9164-1608
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                  <Instagram size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-1">Instagram</h4>
                  <a
                    href="https://www.instagram.com/sewaspg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-medium text-foreground hover:text-gray-300 transition-colors underline-offset-4 hover:underline"
                  >
                    @sewaspg
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-surface rounded-[2rem] p-8 md:p-12 border border-border">
              {formState === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-8">
                    <CheckCircle className="text-white" size={48} />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground mb-4">Pesan Terkirim!</h4>
                  <p className="text-text-secondary text-lg">Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">Nama Lengkap</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">Email / WhatsApp</label>
                    <input 
                      type="text" 
                      id="contact" 
                      required
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-text-secondary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">Kebutuhan / Pesan</label>
                    <textarea 
                      id="message" 
                      required
                      rows={5}
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-text-secondary transition-all resize-none"
                      placeholder="Ceritakan detail kebutuhan event Anda..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formState === "loading"}
                    className="w-full bg-foreground text-background font-bold rounded-xl px-4 py-5 flex items-center justify-center gap-3 hover:bg-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
