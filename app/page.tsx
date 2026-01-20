"use client";
import { UserX } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(true);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      const json = await res.json();
      setUser(json.user);
    }
    fetchUser();
    setloading(false)
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      formRef.current?.requestSubmit()
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true)

    const res = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setStatus(result.result === "success" ? "Sent!" : "Failed to send");
    setSending(false)
    setData("");
    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {/* Background Decorative Elements */}

      <div className="relative w-full max-w-2xl glass-card-heavy sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        {/* Modern top bar */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/5" />
          </div>
          <span className="text-[10px] md:text-xs font-mono tracking-widest text-white/40 uppercase">Welcome to AnonX</span>
          <div className="text-[10px] font-mono text-brand-green/60 px-2 py-0.5 rounded-full border border-brand-green/20 bg-brand-green/5">
            ONLINE
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-brand-green/20 to-emerald-500/10 border border-brand-green/30 shadow-[0_0_40px_rgba(74,222,128,0.1)] relative group">
              <div className="absolute inset-0 bg-brand-green/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <UserX className="w-12 h-12 md:w-16 md:h-16 text-brand-green relative z-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white underline decoration-brand-green underline-offset-8">
                Anon<span className="text-brand-green">X</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed pt-2">
                Connect authentically through the power of anonymity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            {/* Navigation Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] ml-2 font-mono">Go to</h3>
              <div className="space-y-2">
                {[
                  { href: user ? `/users/${user}` : "/auth", label: user ? "View Profile" : "Get Started", icon: "→" },
                  { href: "/auth", label: "Login / Register", icon: "•" },
                  { href: "/legal", label: "Privacy & Terms", icon: "•" },
                  { href: "/about", label: "About Creator", icon: "•" },
                ].map((link, i) => (
                  <Link
                    key={link.href + i}
                    href={link.href}
                    className="flex items-center justify-between group px-5 py-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-300"
                  >
                    <span className="text-sm font-medium text-gray-300 group-hover:text-brand-green transition-colors">{link.label}</span>
                    <span className="text-brand-green/50 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">{link.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] ml-2 font-mono">Send Feedback</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="glass-card rounded-xl p-4 border border-white/10 focus-within:border-brand-green/30 transition-all">
                  <textarea
                    onKeyDown={handleKeyDown}
                    required
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Share your thoughts on the app..."
                    className="w-full bg-transparent text-white text-sm placeholder-white/20 resize-none outline-none min-h-[100px]"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-white/20 font-mono uppercase">Ctrl + Enter</span>
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-brand-green text-bg-dark text-xs font-bold hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                      {sending ? <span className="w-4 h-4 border-2 border-bg-dark/20 border-t-bg-dark rounded-full animate-spin" /> : "SEND"}
                    </button>
                  </div>
                </div>
                {status && (
                  <div className={`text-center py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest ${status.toLowerCase().includes('failed') ? 'bg-red-500/10 text-red-400' : 'bg-brand-green/10 text-brand-green'}`}>
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-10 py-6 border-t border-white/5 bg-white/5 flex items-center justify-center">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">
            Build Trust • Stay Anonymous • Connect
          </p>
        </div>
      </div>
    </div>
  );
}
