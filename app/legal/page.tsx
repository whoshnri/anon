import Link from "next/link"
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Legal | AnonX',
  description: 'Learn more about our application, policies and features.',
};

export default function Legal() {
  return (
    <div className="relative xs:w-[90vw] xs:h-[90vh] bg-gray-900/95 h-[90vh] w-[90vw] mx-auto rounded-lg mt-[5vh] font-mono shadow-2xl border border-gray-700/50 overflow-hidden">
      {/* Terminal top bar */}
      <div className="p-4 rounded-t-lg flex gap-4 text-sm bg-gradient-to-r from-gray-800/80 to-gray-700/80 items-center border-b border-gray-600/30 sticky top-0">
        <div className="w-fit flex gap-2">
          <div className="rounded-full bg-red-500 h-3 w-3 shadow-sm"></div>
          <div className="rounded-full bg-yellow-500 h-3 w-3 shadow-sm"></div>
          <div className="rounded-full bg-green-500 h-3 w-3 shadow-sm"></div>
        </div>
        <span className="text-gray-300 font-medium">legal_documents.txt</span>
        <Link href="/" className="ml-auto text-green-400 hover:text-green-300 text-xs">[back_to_app]</Link>
      </div>

      <div className="p-8 space-y-8 overflow-y-auto h-[90%]">
        {/* Privacy Policy */}
        <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[privacy_policy]</h2>
          <div className="text-gray-300 text-sm space-y-3">
            <p className="text-green-500"># Data Collection</p>
            <p>We collect minimal data: email for account creation, messages you send/receive.</p>

            <p className="text-green-500"># Data Usage</p>
            <p>Your data is used solely for app functionality. We don't sell or share personal information.</p>

            <p className="text-green-500"># Data Storage</p>
            <p>Messages are encrypted. Data stored securely on our servers. You can delete your account anytime.</p>

            <p className="text-green-500"># Your Rights</p>
            <p>Access, modify, or delete your data by contacting us. Data deletion is permanent.</p>
          </div>
        </section>

        {/* Cookie Policy */}
        <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[cookie_policy]</h2>
          <div className="text-gray-300 text-sm space-y-3">
            <p className="text-green-500"># Essential Cookies</p>
            <p>We use necessary cookies for login sessions and app functionality.</p>

            <p className="text-green-500"># No Tracking</p>
            <p>No analytics, advertising, or tracking cookies. Your browsing stays private.</p>

            <p className="text-green-500"># Cookie Control</p>
            <p>Disable cookies in browser settings, but app functionality may be limited.</p>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[terms_and_conditions]</h2>
          <div className="text-gray-300 text-sm space-y-3">
            <p className="text-green-500"># Acceptable Use</p>
            <p>No harassment, spam, illegal content, or abuse. Be respectful in anonymous interactions.</p>

            <p className="text-green-500"># Service Availability</p>
            <p>Service provided "as is". We may modify or discontinue features with notice.</p>

            <p className="text-green-500"># User Responsibility</p>
            <p>You're responsible for your messages and account security. Keep login details safe.</p>

            <p className="text-green-500"># Limitation of Liability</p>
            <p>We're not liable for user-generated content or service interruptions.</p>

            <p className="text-green-500"># Termination</p>
            <p>We may suspend accounts for policy violations. You can delete your account anytime.</p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
          <h2 className="text-green-400 text-xl font-bold mb-4 uppercase tracking-wide">[contact]</h2>
          <div className="text-gray-300 text-sm">
            <p className="text-green-500"># Questions or Concerns?</p>
            <p>Email us at: <span className="text-green-400">henrybassey2007@gmail.com</span></p>
            <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
