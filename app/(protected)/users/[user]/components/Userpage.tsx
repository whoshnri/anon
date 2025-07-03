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
  const [home, setHome] = useState(true);
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


  useEffect(() =>{
    const getLink = (text: string)=> {
    const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    const link = `https://app-anonx.vercel.app/${user}/${slug}`
    setLink(link)
  }

  getLink(text)
  },[text])

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

  const openMessage = (message:Message) => {
        setSelectedMessage(message);
    };

  const closeMessage = () => {
    setSelectedMessage(null);
    };



  return (
    <div className="relative xs:w-[90vw] xs:h-[90vh] bg-gray-900/90 h-[90vh] w-[90vw] mx-auto rounded-sm mt-[5vh] font-mono  rounded-lg">
      {/* Terminal top bar */}
      <div className="p-3 rounded-t-lg flex gap-4 text-xs bg-white/10 items-center">
        <div className="w-fit flex gap-1">
          <div className="rounded-full bg-red-500 h-2 w-2"></div>
          <div className="rounded-full bg-blue-500 h-2 w-2"></div>
          <div className="rounded-full bg-green-500 h-2 w-2"></div>
        </div>
        <span>{user}@anons_msg</span>
        <Link href="/" className="ml-auto text-green-400 hover:text-green-300 text-xs">[back_to_app]</Link>
      </div>

      {/* Main Content */}
      {home && (
        <>
          {/* Boot message */}
          <div className="font-mono p-3 text-xs text-green-400/70 leading-relaxed">
            <p>&gt; Initializing anonymous protocols 1011.3e4</p>

            <p className="ml-8">&gt; You&apos;re all set <span className="font-bold text-white">{user}</span></p>

          </div>

          {/* Avatar */}
          <div className="flex justify-center mt-8 mb-3">
            <div className="w-20 h-20 border-2 border-green-400/50 rounded-full flex items-center justify-center bg-gray-900/50 backdrop-blur-sm animate-pulse">
              <User className="w-10 h-10 text-green-400" />
            </div>
          </div>

          {/* Question */}
          <div className="relative bg-gray-900/50 border border-green-400/30 rounded-lg px-2 py-1 mb-8 w-[80%] mx-auto">
            <div className="text-green-400/70 text-xs mb-3 items-center grid grid-rows-2">
              <p
              className="uppercase">[QUERY_LOADED] - {
                editing ?
                <span className="cursor-pointer hover:underline"
                 onClick={()=>{setEditing(!editing)}}>
                [click_to_save]</span> :
                <span className="cursor-pointer hover:underline"
                onClick={()=>{setEditing(!editing)}}>
                [click_to_edit]</span>
              }
              </p>
              {
                editing ? <input type="text" className="text-lg font-sans font-bold text-white border border-green-400/30 mr-8 p-1 rounded-lg focus:outline-none" value={text} onChange={(e) => setText(e.target.value)} /> :
                <p className="text-lg font-sans font-bold text-white focus:outline-none">{text}</p>
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

          {/* Share Link */}
          <div className="space-y-1 w-[80%] mx-auto">
            <div className="text-green-400/70 text-xs flex items-center gap-2">
              <span>[SHARE_LINK]</span>
              <LinkIcon className="w-3 h-3" />
            </div>

            <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-4 flex items-center justify-between group hover:border-green-400/50 transition-colors">
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
              <div className="text-green-400 text-xs flex items-center gap-2 justify-center">
                <span>[COPIED_TO_CLIPBOARD]</span>
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
            )}
          </div>
        </>
      )}

        {!home && (
  <>
    {/* messages Content */}
    <div className="p-6 h-full overflow-hidden pb-20">
      {/* Header */}
      <div className="font-mono text-xs text-green-400/70 leading-relaxed mb-6">
        <p>{'>'} Loading message archive...</p>
        <p className="ml-8">
          {'>'} Found {messages?.length} anonymous messages
        </p>
      </div>

      {/* Messages List */}
        <div className="flex justify-between text-green-400/70 text-xs flex items-center gap-2 mb-4 mr-4">
          <span className="flex gap-2">[MESSAGE_ARCHIVE] <MessageCircle className="w-3 h-3" /></span>
          <span onClick={() => setRefresh(!refresh)}
           className="cursor-pointer hover:underline">[refresh]</span>

        </div>
        {
          !(messages.length > 0) &&
            <p
            className="bg-gray-900/50 border border-green-400/30 rounded-lg p-4 cursor-pointer hover:border-green-400/50 text-green-400/60 hover:bg-gray-900/70 transition-colors group"
          >Nothing here yet!</p>
        }
        <div className="overflow-y-auto h-[85%] space-y-3 pb-8">
        {messages.length > 0 && messages.map((message) => (
          <div
            key={message.id}
            onClick={() => openMessage(message)}
            className="bg-gray-900/50 border border-green-400/30 rounded-lg p-2 cursor-pointer hover:border-green-400/50 hover:bg-gray-900/70 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 animate-pulse bg-green-400 rounded-full" />
                  <span className="text-green-400/70 text-xs">MSG_{message.id.toString().padStart(3, '0')}</span>
                  <span className="text-green-400/50 truncate text-xs">{message.timestamp}</span>
                </div>
                <p className="text-green-400 underline text-xs leading-relaxed uppercase line-clamp-2 mb-3">
                  [{message.prompt}]
                </p>
                <p className="text-white text-xs leading-relaxed truncate">
                  RE: {message.content}
                </p>
              </div>
              <div className="text-green-400/50 group-hover:text-green-400/70 transition-colors">
                <span className="text-xs">[CLICK]</span>
              </div>
            </div>
          </div>
        ))}
          </div>


    </div>


    {/* Message Popup */}
    {selectedMessage && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-green-400/50 rounded-lg p-6 max-w-md w-[90%] relative">
          {/* Close Button */}
          <button
            onClick={closeMessage}
            className="absolute top-4 right-4 p-2 border border-green-400/30 rounded-md cursor-pointer hover:border-green-400/60 hover:bg-green-400/10 transition-colors"
            aria-label="Close message"
          >
            <X className="w-4 h-4 text-green-400" />
          </button>

          {/* Message Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 animate-pulse h-2 bg-green-400 rounded-full" />
              <span className="text-green-400/70 text-xs">MSG_{selectedMessage.id.toString().padStart(3, '0')}</span>
              <span className="text-green-400/50 text-xs">{selectedMessage.timestamp}</span>
            </div>
            <div className="text-green-400/70 text-sm font-mono">
              [MESSAGE_PREVIEW]
            </div>
          </div>

          {/* Message Content */}
            <p className="text-green-400 underline text-xs leading-relaxed uppercase mb-3">
                  [{selectedMessage.prompt}]
                </p>
              <div className="text-white text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {selectedMessage.content}
              </div>
            </div>
          </div>
        )}
      </>
    )}



      {/* Bottom menu */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-green-400/30 rounded-full p-2 flex items-center gap-2">
          <button
          onClick={() => setHome(true)}
          className={`${home && 'bg-white/10'} p-3 cursor-pointer rounded-full transition-colors group" aria-label="Games`}>
            <Gamepad2 className="w-5 h-5 text-green-400/70 group-hover:text-green-400" />
          </button>

          <div className="w-px h-6 bg-green-400/30" />

          <button
          onClick={() => setHome(false)}
          className={`${!home && 'bg-white/10'} p-3 cursor-pointer rounded-full transition-colors group`} aria-label="Send message">
            <Send className="w-5 h-5 text-green-400/70 group-hover:text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
