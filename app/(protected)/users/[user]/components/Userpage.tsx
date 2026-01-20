'use client';

import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  User,
  Dice5,
  Link as LinkIcon,
  Copy,
  Send,
  X,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


interface Question {
  id: number;
  q: string;
}

export const anonymousQuestions: Question[] = [
  { id: 1, q: "What's a thought you've had that you've never told anyone?" },
  { id: 2, q: "If you could erase one memory, what would it be?" },
  { id: 3, q: "What's something you pretend to understand but actually don't?" },
  { id: 4, q: "What's the biggest lie you've ever told?" },
  { id: 5, q: "If everyone could hear your thoughts for 1 minute, what moment would you be most afraid of?" },
  { id: 6, q: "Have you ever caught feelings for someone you shouldn't have?" },
  { id: 7, q: "What's your most embarrassing crush story?" },
  { id: 8, q: "What's the most toxic thing you've ever done (be honest)?" },
  { id: 9, q: "Have you ever flirted with someone while in a relationship?" },
  { id: 10, q: "What's a secret you're taking to the grave?" },
  { id: 11, q: "What's the dumbest way you've injured yourself?" },
  { id: 12, q: "What's the weirdest dream you've had recently?" },
  { id: 13, q: "What's a random talent you have that's completely useless?" },
  { id: 14, q: "If your life were a movie, what genre would it be — and why?" },
  { id: 15, q: "What's the most ridiculous lie you've believed as a kid?" },
  { id: 16, q: "Do you believe in soulmates — why or why not?" },
  { id: 17, q: "Have you ever caught feelings for a best friend?" },
  { id: 18, q: "What's something romantic you wish someone would do for you?" },
  { id: 19, q: "What's your biggest relationship ick?" },
  { id: 20, q: "Who's the one person you'd drop everything for right now?" },
  { id: 21, q: "Tell me anything!" },
];


type Message = {
  id: number;  // Not string if it’s from DB and used as integer
  content: string;
  prompt: string;
  timestamp: string;
};


interface UserPageProps {
  user: string;
}


const UserPage = ({ user }: UserPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentView = searchParams.get('view') || 'home';
  const home = currentView === 'home';

  const setView = (view: 'home' | 'archives') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}`);
  };

  const [refresh, setRefresh] = useState(true);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editing, setEditing] = useState<boolean>(false)
  const [link, setLink] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [text, setText] = useState<string>(anonymousQuestions[20].q)

  useEffect(() => {
    const anonymousQuestions = async (u: string) => {

      const res = await fetch(`/api/messages?user=${u}`);
      const data = await res.json();
      console.log(data);
      if (data) {
        setMessages(data);
      }
    };

    anonymousQuestions(user);
  }, [refresh, user]);



  useEffect(() => {
    const getLink = (text: string) => {
      const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
      const link = `https://app-anonx.vercel.app/play/${user}/${slug}`
      setLink(link)
    }

    getLink(text)
  }, [text])

  const getText = () => {
    const randomIndex = Math.floor(Math.random() * anonymousQuestions.length);
    setText(anonymousQuestions[randomIndex].q);
  };


  const handleCopy = async (): Promise<void> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };



  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {/* Background Decorative Elements */}
      {/* <div className="absolute top-1/3 -left-20 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} /> */}

      <div className="relative w-full max-w-2xl glass-card-heavy sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col min-h-[500px] md:min-h-[600px] my-4">
        {/* Modern Top bar */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase items-center flex gap-2">
            <div className="w-1.5 h-1.5 bg-brand-green rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            Logged in as {user}
          </span>
          <Link href="/" className="text-[10px] font-semibold text-brand-green hover:text-white transition-colors uppercase tracking-widest">
            Logout
          </Link>
        </div>

        {/* Main Content */}
        {home && (
          <>
            {/* Simple Status */}
            <div className="p-4 text-xs text-white/60 font-medium">
              Welcome back, <span className="text-white">{user}</span>. Your link is active.
            </div>

            {/* Avatar */}
            <div className="flex justify-center mt-8 mb-3">
              <div className="w-20 h-20 border-2 border-green-400/50 rounded-full flex items-center justify-center bg-gray-900/50 backdrop-blur-sm animate-pulse">
                <User className="w-10 h-10 text-green-400" />
              </div>
            </div>

            {/* Question */}
            <div className="relative bg-gray-900/50 border border-green-400/30 rounded px-2 py-1 mb-8 w-[80%] mx-auto">
              <div className="text-white/40 text-[10px] mb-3 items-center grid grid-rows-2 uppercase tracking-widest font-bold">
                <p>
                  Current Question - {
                    editing ?
                      <span className="cursor-pointer text-brand-green hover:underline"
                        onClick={() => { setEditing(!editing) }}>
                        Save</span> :
                      <span className="cursor-pointer text-brand-green hover:underline"
                        onClick={() => { setEditing(!editing) }}>
                        Edit</span>
                  }
                </p>
                {
                  editing ? <input type="text" className="text-lg font-sans font-bold text-white border-b border-brand-green/30 mr-8 py-1 focus:outline-none bg-transparent" value={text} onChange={(e) => setText(e.target.value)} /> :
                    <p className="text-lg font-sans font-bold text-white">{text}</p>
                }
              </div>
              <button
                onClick={getText}
                className="cursor-pointer absolute bottom-1 right-1 w-6 h-6 border border-green-400/50 rounded-lg flex items-center justify-center bg-gray-900/50 hover:bg-green-400/10 transition-colors group"
                aria-label="Get next question"
              >
                <Dice5 className="w-5 h-5 text-green-400 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>

            <div className="space-y-1 w-[80%] mx-auto">
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                Share your link
              </div>

              <div className="bg-gray-900/50 border border-green-400/30 rounded p-4 flex items-center justify-between group hover:border-green-400/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-2 h-2 animate-pulse bg-green-400 rounded-full" />
                  <code className="text-green-400/90 text-xs truncate">{link}</code>
                </div>

                <button
                  onClick={handleCopy}
                  className="ml-3 p-2 border border-green-400/30 rounded-md hover:border-green-400/60 cursor-pointer hover:bg-green-400/10 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <Copy className="w-4 h-4 text-green-400" />
                </button>
              </div>

              {copied && (
                <div className="text-brand-green text-[10px] font-bold tracking-widest uppercase text-center">
                  Copied!
                </div>
              )}
            </div>
          </>
        )}

        {!home && (
          <div className="p-8 md:p-10 space-y-8 animate-fade-in h-full flex flex-col">
            {/* Archive Header */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white tracking-tight">Messages</h2>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Your anonymous messages</p>
              </div>
              <button
                onClick={() => setRefresh(!refresh)}
                className="px-4 py-2 rounded-xl glass-card text-[10px] font-mono text-brand-green hover:bg-brand-green/10 transition-all uppercase tracking-widest cursor-pointer"
              >
                Refresh
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 glass-card rounded-xl border-dashed border-white/10 opacity-50">
                  <MessageCircle className="w-8 h-8 mb-4 text-white/20" />
                  <p className="text-xs font-mono uppercase tracking-widest">No messages yet</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => openMessage(message)}
                    className="glass-card rounded p-4 md:p-6 border border-white/5 hover:border-brand-green/30 hover:bg-white/5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="grid grid-rows-2 gap-3">
                          <span className="text-[10px] w-fit font-mono text-brand-green/60 px-2 py-0.5 rounded-full bg-brand-green/5 border border-brand-green/20 uppercase">
                            #{message.id.toString().padStart(3, '0')}
                          </span>
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{message.timestamp}</span>
                        </div>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest truncate">
                          Prompt: {message.prompt}
                        </p>
                        <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <div className="self-center">
                        <div className="p-2 rounded-full glass-card group-hover:border-brand-green/50 transition-colors">
                          <Send className="w-3 h-3 text-brand-green/50 group-hover:text-brand-green" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {/* Navigation Floating Pill - Sticky at bottom of container */}
        <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center bg-linear-to-t from-bg-dark/80 to-transparent pointer-events-none">
          <div className="glass-card-heavy rounded-2xl p-1.5 flex items-center gap-1 border border-white/10 shadow-2xl backdrop-blur-2xl pointer-events-auto max-w-[280px] w-full">
            <button
              onClick={() => setView('home')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group ${home ? 'bg-brand-green text-bg-dark font-bold shadow-[0_0_20px_rgba(74,222,128,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest">Home</span>
            </button>

            <button
              onClick={() => setView('archives')}
              className={`flex-1 py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group ${!home ? 'bg-brand-green text-bg-dark font-bold shadow-[0_0_20px_rgba(74,222,128,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Send className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest">Messages</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popups and Overlays */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-lg glass-card-heavy rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10 animate-scale-in">
            <button
              onClick={closeMessage}
              className="absolute top-6 right-6 p-2 rounded-xl glass-card hover:bg-white/5 transition-all text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="grid grid-rows-2 gap-3">
                <span className="text-[10px] w-fit font-mono text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20 uppercase tracking-widest">
                  Message #{selectedMessage.id}
                </span>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{selectedMessage.timestamp}</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">Context</p>
                  <p className="text-xs font-bold text-brand-green uppercase tracking-wide px-4 py-3 rounded-2xl glass-card border border-brand-green/10">
                    {selectedMessage.prompt}
                  </p>
                </div>

                <div className="space-y-1 pt-4">
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">Message Content</p>
                  <div className="text-base md:text-lg text-white leading-relaxed font-sans px-1">
                    {selectedMessage.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
