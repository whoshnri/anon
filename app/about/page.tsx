import Link from "next/link"
import { Metadata } from 'next';
import { User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | AnonX',
  description: 'Learn more about our application and creator.',
};

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
    
      <div className="relative w-full max-w-3xl glass-card-heavy sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col my-8">
        {/* Modern Top bar */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5 sticky top-0 z-10">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">About the Creator</span>
          <Link href="/" className="text-[10px] font-semibold text-brand-green hover:text-white transition-colors uppercase tracking-widest">
            Back
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-brand-green/10 border border-brand-green/20">
              <User className="w-10 h-10 text-brand-green" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase">The Creator</h1>
            <p className="text-sm font-mono text-brand-green/60 uppercase tracking-widest">Anonymous Developer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Section */}
            <section className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] opacity-40">Mission</h2>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Purpose</p>
                <p>Sometimes we need to share thoughts without the weight of identity. This space is for honest communication where ideas matter more than personas.</p>
                <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Values</p>
                <p>Privacy first. Zero tracking. Authentic connection. Simplified interaction.</p>
              </div>
            </section>

            {/* Philosophy Section */}
            <section className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] opacity-40">Philosophy</h2>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Anonymity</p>
                <p>&ldquo;True freedom is the ability to speak without the fear of judgment, yet with the integrity of truth.&rdquo;</p>
                <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Simplicity</p>
                <p>Tools should be elegant, focused, and powerful. One goal, perfectly executed.</p>
              </div>
            </section>
          </div>

          {/* Connect & Tech */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Stack */}
            <section className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] opacity-40">Engine</h2>
              <div className="grid grid-cols-1 gap-2 text-[11px] font-mono text-brand-green/80 uppercase tracking-widest">
                <div className="flex gap-2"><span>&gt;</span> Next.js 15</div>
                <div className="flex gap-2"><span>&gt;</span> TypeScript</div>
                <div className="flex gap-2"><span>&gt;</span> Tailwind 4</div>
                <div className="flex gap-2"><span>&gt;</span> Neon Postgres</div>
              </div>
            </section>

            {/* Links */}
            <section className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] opacity-40">Connect</h2>
              <div className="space-y-2">
                <a href="mailto:henrybassey2007@gmail.com" className="block text-xs text-gray-400 hover:text-brand-green transition-colors">henrybassey2007@gmail.com</a>
                <a href="https://github.com/whoshnri" className="block text-xs text-gray-400 hover:text-brand-green transition-colors">github.com/whoshnri</a>
              </div>
            </section>
          </div>

          {/* Footer Footer */}
          <div className="text-center pt-10 border-t border-white/5">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
              Stay Anonymous • V2.0 • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
