'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from "next/link"





const QPage = () => {
  const params = useParams();
  const [q, setQ] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const user = params?.user as string;

  useEffect(() => {
    const slug = params?.slug as string;
    if (slug) {
      setQ(slug.replace(/-/g, ' ').replace(/\s+/g, ' ').trim());
    }
  }, [params?.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const req = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: user,
          prompt: q,
          content: message.trim(),
        }),
      });

      const res = await req.json();
      if (res.success) {
        setFeedback({ type: 'success', text: "Sent!" });
        setMessage("");
      } else {
        setFeedback({ type: 'error', text: res.error || "Failed to send." });
      }
    } catch (err) {
      setFeedback({ type: 'error', text: "Connection error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
    
      <div className="relative w-full max-w-xl glass-card-heavy sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col">
        {/* Modern Top bar */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase items-center flex gap-2">
            <div className="w-1.5 h-1.5 bg-brand-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            To: {user}
          </span>
          <Link href="/" className="text-[10px] font-semibold text-brand-green hover:text-white transition-colors uppercase tracking-widest">
            Home
          </Link>
        </div>

        <div className="p-8 md:p-12 flex flex-col items-center space-y-8">
          {/* Visual Indicator */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20 animate-pulse">
              <MessageCircle className="w-10 h-10 text-brand-green" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bg-dark border border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-ping" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-2">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Send a message</p>
            <h1 className="text-2xl font-bold text-white tracking-tight uppercase">
              {q ? `"${q}"` : "Anonymous Message"}
            </h1>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">
                Your message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something honest..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-all resize-none min-h-[120px]"
              />
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center gap-3 animate-fade-in ${feedback.type === 'success' ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${feedback.type === 'success' ? 'bg-brand-green' : 'bg-red-400'}`} />
                {feedback.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-green hover:bg-brand-emerald text-bg-dark font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-bg-dark/20 border-t-bg-dark rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="pt-6 w-full border-t border-white/5 flex flex-col items-center gap-4">
            <Link
              href="/auth"
              className="text-[10px] font-mono text-brand-green hover:text-white transition-colors uppercase tracking-widest underline decoration-brand-green/20 underline-offset-8"
            >
              [Create your own link]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QPage
