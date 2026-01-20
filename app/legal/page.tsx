import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | AnonX",
  description: "Learn more about our policies and features.",
};

export default function Legal() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">


      <div className="relative w-full max-w-3xl glass-card-heavy sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col my-8">
        {/* Modern Top bar */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5 sticky top-0 z-10">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Legal Information</span>
          <Link href="/" className="text-[10px] font-semibold text-brand-green hover:text-white transition-colors uppercase tracking-widest">
            Back
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase">Legal Info</h1>
            <p className="text-xs font-mono text-brand-green/60 uppercase tracking-widest underline decoration-brand-green/20 underline-offset-8">Privacy & Terms</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Privacy Section */}
            <section className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 space-y-6">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] opacity-40">Privacy Policy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400 leading-relaxed">
                <div className="space-y-2">
                  <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Data Collection</p>
                  <p>We collect minimal data: account alias and transmissions you choose to host.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Usage</p>
                  <p>Transmissions are for your eyes only. We do not aggregate or distribute your communications.</p>
                </div>
              </div>
            </section>

            {/* Terms Section */}
            <section className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 space-y-6">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] opacity-40">Terms of Operation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400 leading-relaxed">
                <div className="space-y-2">
                  <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Acceptable Use</p>
                  <p>No harassment or toxic transmissions. Anonymity level: High. Integrity level: Mandatory.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-brand-green/60 font-mono text-[10px] uppercase"># Responsibility</p>
                  <p>Operators are responsible for their transmitted content. Service provided &ldquo;as is&rdquo;.</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="glass-card rounded-2xl p-6 md:p-8 border border-brand-green/20 bg-brand-green/5 space-y-4">
              <h2 className="text-xs font-bold text-brand-green uppercase tracking-[0.2em]">Contact</h2>
              <div className="text-sm text-gray-300">
                <p>Inquiries regarding protocols: <span className="text-white font-mono">henrybassey2007@gmail.com</span></p>
                <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest font-mono">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </section>
          </div>

          {/* Footer Footer */}
          <div className="text-center pt-10 border-t border-white/5 pb-6">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
              Stay Secure • Stay Anonymous • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
