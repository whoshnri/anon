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


    if (isLogin) {
      const res = await fetch(`/api/users?username=${username}&password=${password}`, {
        method: 'GET',
        next: { revalidate: 0 },
      });
      const data = await res.json();
    if (res.ok && data?.username) {
      router.push(`/users/${username}`);
    } else {
      setFeedback(data?.error || 'Authentication failed');
      setSubmitting(false);
    }
    } else {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
    if (res.ok && data?.username) {
      router.push(`/users/${username}`);
    } else {
      setFeedback(data?.error || 'Authentication failed');
      setSubmitting(false);
    }
    }


};


  return (
     <div className="relative xs:w-[90vw] xs:h-[90vh] bg-gray-900/90 h-[90vh] w-[90vw] mx-auto rounded-sm mt-[5vh] font-mono  rounded-lg">
      {/* Terminal top bar */}
        <div className="p-3 rounded-t-lg flex gap-8 text-xs bg-white/10 items-center">
          <div className="w-fit flex gap-1">
            <div className="rounded-full bg-red-500 h-2 w-2"></div>
            <div className="rounded-full bg-blue-500 h-2 w-2"></div>
            <div className="rounded-full bg-green-500 h-2 w-2"></div>
          </div>
          <span>{isLogin ? "welcome_back" : "new_user"}@anons_msg</span>
        </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto mt-16 p-6 space-y-4"
      >
        <h1 className="text-xs text-green-400 text-center tracking-wide uppercase">
          {isLogin ? '[Login]' : '[Register]'}
        </h1>

        <input
          type="text"
          placeholder="[username]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border border-green-400/60 rounded-md p-2 text-xs text-green-700/60 placeholder-green-700/40 focus:outline-none"
        />

        <input
          type="password"
          placeholder="[password]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-green-400/60 rounded-md p-2 text-xs text-green-700/60 placeholder-green-700/40 focus:outline-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full border border-green-400/60 text-xs text-green-400 cursor-pointer rounded-md py-2 hover:bg-green-100/10 transition"
        >
          {submitting ? (
            <div className="w-4 h-4 mx-auto border border-t-transparent border-green-400 rounded-full animate-spin" />
          ) : isLogin ? 'Login' : 'Register'}
        </button>

        <p className="text-xs text-center text-green-400 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '[No_account? Register_here]' : '[Already_have an_account? Login]'}
        </p>

        {feedback && (
          <p className="text-xs text-center text-green-700/60">{feedback}</p>
        )}

        <p className="text-xs mt-6 text-center uppercase text-green-500 cursor-pointer underline">
        <Link href="/">
          [Back_to_home_page]
        </Link>
        </p>
      </form>


    </div>
  );
};

export default AuthForm;
