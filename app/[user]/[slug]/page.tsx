'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from "next/link"





const QPage = () => {
  const params = useParams();
  const [q, setQ] =  useState<string>()
  const [question, setQuestion] = useState<string>()
  const [errors, setErrors] = useState<string>()
  const [submit, submitting] = useState<boolean>(false)
  const user = params?.user;


  const sendMessages = async() => {
      const req = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: user,
        prompt: q,
        content: question?.trim(),
      }),
    });

      const res = await req.json()
      if(res.success){
        setErrors("Submitted successfully")
      }
      if(res.error){
        setErrors(res.error)
      }



    }

  useEffect(() => {

    const slug = params?.slug
      const unslugify = (slug: string)=> {
      setQ(slug
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim())
      };

      unslugify(slug as string)

  }, [])

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrors("")
    setQuestion(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitting(true)

    sendMessages()

    setTimeout(() => {
      submitting(false);
    }, 2000);
    setQuestion("");
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
        <span>{user}@anons_msg</span>
      </div>


      <div className="p-4 overflow-hidden relative w-fit mx-auto rounded-full my-3">
        <MessageCircle className="w-16 h-16 stroke-green-400"/>
        <div className="animate-pulse absolute bg-white/20 top-0 bottom-0 left-0 right-0"></div>
      </div>
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4"
    >
      <label
        htmlFor="question"
        className="block text-sm lowercase w-fit mx-auto text-green-200/40 mb-2"
      >
        [Submit your anonymous message]
      </label>
      <h1 className="uppercase text-xl text-green-400 space-x-1 py-5">{"["}{q}{"]"} - [{user}]</h1>
      <textarea
        id="question"
        required
        value={question}
        onChange={handleChange}
        placeholder="Type your message..."
        className="w-full border border-green-400/60 rounded-md p-2 text-xs text-green-400 focus:outline-none focus:ring-0"
        rows={4}
      />
      {errors && <p className="text-xs text-green-400 ">{errors}</p>}

      <button
        type="submit"
        className="mt-3 cursor-pointer px-4 py-2 border border-green-400/60 rounded-md text-xs text-green-400/60 hover:bg-green-100/10 transition"
      >
         {submit? <p className="w-4 h-4 animate-spin border border-t-transparent border-green-500 rounded-full"></p> : "Submit"}
      </button>
    </form>

    <div className="w-fit grid grid-col  gap-1 mx-auto mt-3">
    <Link
        href="/auth"
        className="text-green-400 w-fit text-xs underline"
    >[get_your_own_anonymous_messages?]</Link>
    <Link
        href="/"
        className="text-green-400 mx-auto w-fit text-xs underline"
    >[home_page]</Link>
    </div>
    </div>

  )
}

export default QPage
