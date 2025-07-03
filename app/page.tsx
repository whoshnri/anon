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
    setStatus(result.result === "success" ? "[✅_Sent!]" : "[❌_failed_to_send]");
    setSending(false)
    setData("");
    setTimeout(() => {
      setStatus("");
      }, 3000);
  };

  return (
     <div className="relative xs:w-[90vw] xs:h-[90vh] bg-gray-900/95 h-[90vh] w-[90vw] mx-auto rounded-lg mt-[5vh] font-mono shadow-2xl border border-gray-700/50 overflow-hidden">
      {/* Terminal top bar */}
        <div className="p-4 rounded-t-lg flex gap-4 text-sm bg-gradient-to-r from-gray-800/80 to-gray-700/80 items-center border-b border-gray-600/30">
          <div className="w-fit flex gap-2">
            <div className="rounded-full bg-red-500 h-3 w-3 shadow-sm"></div>
            <div className="rounded-full bg-yellow-500 h-3 w-3 shadow-sm"></div>
            <div className="rounded-full bg-green-500 h-3 w-3 shadow-sm"></div>
          </div>
          <span className="text-gray-300 font-medium">anonymous_messages.app</span>
        </div>

    {/*Hero*/}
    <div className="pb-20 pb-8 overflow-y-auto h-[90%]">
    <div className="pt-12 pb-8 ">
        <div className="mx-auto w-fit mb-6">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-full shadow-lg">
                <UserX className="w-16 h-16 stroke-black"/>
            </div>
        </div>
        <p className="text-green-400 text-2xl mx-auto w-fit font-bold tracking-wide">[get_messages_anonymously]</p>
        <p className="text-gray-400 text-sm mx-auto w-fit mt-2 max-w-md text-center">
            Share thoughts without revealing identity. Connect authentically.
        </p>
    </div>

    <div className="w-[85%] mx-auto mt-8 bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
        <p className="text-green-400 uppercase font-semibold mb-4 text-sm tracking-wider">[Navigate to]</p>
        <div className="space-y-3">
            <div className="flex items-center group">
                <span className="text-green-500 mr-3">├─</span>
                {loading ? <span className="w-3 h-3 border border-t-transparent border-green-400 rounded-full animate-spin"></span> : <Link href={user ? `/users/${user}` : "/auth"} className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium">[my_console]</Link>}

            </div>
             <div className="flex items-center group">
                <span className="text-green-500 mr-3">├─</span>
                <Link href="/auth" className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium">
                    [login/signup]
                </Link>
            </div>
            <div className="flex items-center group">
                <span className="text-green-500 mr-3">├─</span>
                <Link href="/legal" className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium">
                    [legal_stuff]
                </Link>
            </div>
            <div className="flex items-center group">
                <span className="text-green-500 mr-3">└─</span>
                <Link href="/about" className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm font-medium">
                    [about_creator]
                </Link>
            </div>
        </div>
    </div>

    {/* Feedback Form */}
    <form ref={formRef} onSubmit={handleSubmit} className="w-[85%] mx-auto mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400 text-sm">guest@anonymous:~$</span>
            <span className="text-gray-400 text-sm">[send_feedback]</span>
        </div>
        <div className="bg-black/30 rounded border border-gray-600/30 p-3">
            <textarea
                onKeyDown={handleKeyDown}
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="type your anonymous message here..."
                className="w-full bg-transparent text-green-400 text-sm placeholder-gray-600 resize-none outline-none font-mono"
                rows={3}
            />
            <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600 text-xs">press ctrl+enter to send</span>
                <button
              type="submit"
              disabled={sending}
              className={`flex items-center justify-center text-green-400 hover:text-green-300 text-xs bg-gray-700/50 px-3 py-1 rounded border border-gray-600/30 transition-colors ${
                sending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {sending ? (
                <span className="w-4 h-4 border-2 border-t-transparent border-green-400 rounded-full animate-spin" />
              ) : (
                "[send]"
              )}
            </button>

            </div>
        </div>
        <p className="text-xs mx-auto text-green-400 mt-4 w-fit">{status}</p>
    </form>
    </div>


    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <p className="text-gray-500 text-xs uppercase mx-auto w-fit bg-gray-800/70 px-4 py-2 rounded-full border border-gray-700/30">
            [did_you_know?] : [anonymous_feedback_builds_trust]
        </p>
    </div>
   </div>
  );
}
