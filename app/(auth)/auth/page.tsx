'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"

const AuthForm = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    if (username.includes('%40') || username.includes('@')) {
      setFeedback("Username cannot be an email address.");
      setSubmitting(false);
      return;
    }

    try {
      let res: Response

      if (isLogin) {
        res = await fetch(`/api/user?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
          method: 'GET',
          next: { revalidate: 0 },
        });
      } else {
        res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
      }

      const data = await res.json();

      if (res.ok && data?.username) {
        router.push(`/users/${username}`);
      } else {
        setFeedback(data?.error || 'Authentication failed');
        setSubmitting(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Submission Error:', error);
        setFeedback("Something went wrong. Please try again.");
        setSubmitting(false);
      }
    }
  };



  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative w-full max-w-md glass-card-heavy rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        {/* Top bar */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            {isLogin ? "Authentication" : "Registration"} • V2.0
          </span>
        </div>

        <div className="p-8 md:p-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase">
              {isLogin ? 'Login' : 'Join'}
            </h1>
            <p className="text-sm text-gray-400">
              {isLogin ? "Welcome back to the shadows." : "Create your anonymous identity."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/30 ml-2 tracking-widest">Username</label>
                <div className="glass-card rounded-2xl border border-white/10 focus-within:border-brand-green/30 transition-all px-4 py-3">
                  <input
                    type="text"
                    placeholder="Enter your handle..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-transparent text-white text-sm placeholder-white/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/30 ml-2 tracking-widest">Security Token</label>
                <div className="glass-card rounded-2xl border border-white/10 focus-within:border-brand-green/30 transition-all px-4 py-3">
                  <input
                    type="password"
                    placeholder="Enter your passphrase..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent text-white text-sm placeholder-white/20 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 py-4 rounded-2xl bg-brand-green text-bg-dark text-sm font-bold hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-5 h-5 mx-auto border-2 border-bg-dark/20 border-t-bg-dark rounded-full animate-spin" />
              ) : isLogin ? 'VERIFY IDENTITY' : 'CREATE PROTOCOL'}
            </button>

            {feedback && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-shake">
                {feedback}
              </div>
            )}
          </form>

          <div className="pt-4 space-y-4 border-t border-white/5">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-xs text-gray-400 hover:text-brand-green transition-colors cursor-pointer"
            >
              {isLogin ? "Don't have an alias? Initialize registration" : "Already registered? Login to your console"}
            </button>

            <Link href="/" className="flex items-center justify-center gap-2 group">
              <span className="h-px w-4 bg-white/10" />
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/30 group-hover:text-brand-green transition-colors">
                Return to Core
              </span>
              <span className="h-px w-4 bg-white/10" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
