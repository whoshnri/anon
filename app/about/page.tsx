import Link from "next/link"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | AnonX',
  description: 'Learn more about our application and creator.',
};

export default function About() {
  return (
    <div className="relative xs:w-[90vw] xs:h-[90vh] bg-gray-900/95 h-[90vh] w-[90vw] mx-auto rounded-lg mt-[5vh] font-mono shadow-2xl border border-gray-700/50 overflow-hidden">
      {/* Terminal top bar */}
      <div className="p-4 rounded-t-lg flex gap-4 text-sm bg-gradient-to-r from-gray-800/80 to-gray-700/80 items-center border-b border-gray-600/30 sticky top-0">
        <div className="w-fit flex gap-2">
          <div className="rounded-full bg-red-500 h-3 w-3 shadow-sm"></div>
          <div className="rounded-full bg-yellow-500 h-3 w-3 shadow-sm"></div>
          <div className="rounded-full bg-green-500 h-3 w-3 shadow-sm"></div>
        </div>
        <span className="text-gray-300 font-medium">creator.md</span>
        <Link href="/" className="ml-auto text-green-400 hover:text-green-300 text-xs">[back_to_app]</Link>
      </div>

      <div className="p-8 space-y-8 h-[90%] overflow-y-auto">
        {/* Creator Profile */}
        <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full shadow-lg">
              <svg viewBox="0 0 200 200" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="60" fill="#000000"/>
                <ellipse cx="100" cy="95" rx="50" ry="20" fill="#111111"/>
                <ellipse cx="85" cy="90" rx="6" ry="4" fill="#ffffff"/>
                <ellipse cx="115" cy="90" rx="6" ry="4" fill="#ffffff"/>
                <rect x="50" y="92" width="100" height="2" fill="#222222"/>
              </svg>
            </div>
            <div>
              <h1 className="text-green-400 text-lg xs:text-2xl font-bold uppercase tracking-wide">[creator_profile]</h1>
              <p className="text-gray-400 text-sm">Anonymous Developer</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[mission]</h2>
          <div className="text-gray-300 text-sm space-y-3">
            <p className="text-green-500"># Why This App Exists</p>
           <p>
  Sometimes we need to share thoughts without the weight of identity. This app creates a space for honest, anonymous communication where ideas matter more than who&apos;s behind them. BTW don&apos;t compare me to NGL please!
</p>

<p className="text-green-500"># Core Values</p>
<p>
  Privacy first. NO ADS (yet). No tracking. No data mining. Just authentic human connection through anonymous messaging.
</p>
</div>
</section>

{/* Philosophy */}
<section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
  <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[philosophy]</h2>
  <div className="text-gray-300 text-sm space-y-3">
    <p className="text-green-500"># On Anonymity</p>
    <p>&quot;Anonymity isn&apos;t about hiding from consequences. It&apos;s about removing barriers to truth.&quot;</p>

    <p className="text-green-500"># On Technology</p>
    <p>Simple tools solve complex problems. This app does one thing well: facilitate anonymous communication.</p>

    <p className="text-green-500"># On Community</p>
    <p>Real connections happen when we focus on ideas, not personas. Anonymity can foster genuine understanding.</p>
  </div>
</section>

{/* Tech Stack */}
<section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
  <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[tech_stack]</h2>
  <div className="text-gray-300 text-sm space-y-3">
    <p className="text-green-500"># Built With</p>
    <div className="grid grid-cols-2 gap-2 text-xs">
      <span>├─ Next.js</span>
      <span>├─ TypeScript</span>
      <span>├─ Tailwind CSS</span>
      <span>├─ SQLite</span>
      <span>└─ Daisy UI (kinda)</span>
    </div>

    <p className="text-green-500"># Design Principles</p>
    <p>Terminal aesthetics. Minimal UI. Maximum privacy. Clean code. No bloat.</p>
  </div>
</section>

{/* Contact */}
<section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
  <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[connect]</h2>
  <div className="text-gray-300 text-sm space-y-3">
    <p className="text-green-500"># Get In Touch</p>
    <p>Questions, feedback, or just want to chat to the creator?</p>

    <div className="mt-4 space-y-2">
      <p>Email: <span className="text-green-400">henrybassey2007@gmail.com</span></p>
      <p>GitHub: <span className="text-green-400">@whoshnri</span></p>
      <p>Twitter: <span className="text-green-400">@xyz_07hb</span></p>
    </div>

    <p className="text-gray-500 text-xs mt-4">
      &quot;COYG!&quot; - Creator
    </p>
  </div>
</section>


        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-gray-500 text-xs">
            [Made with ❤️ by someone who was bored lol]
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Version 1.0 • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
