import Link from "next/link"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Route Error',
  description: 'This page doesnt exist on AnonX',
}


export default function NotFound() {
  return (
    <div className="relative xs:w-[90vw] xs:h-[90vh] bg-gray-900/90 h-[90vh] w-[90vw] mx-auto rounded-lg mt-[5vh] font-mono">
      {/* Terminal top bar */}
      <div className="p-3 rounded-t-lg flex gap-4 text-xs bg-white/10 items-center">
        <div className="w-fit flex gap-1">
          <div className="rounded-full bg-red-500 h-2 w-2"></div>
          <div className="rounded-full bg-blue-500 h-2 w-2"></div>
          <div className="rounded-full bg-green-500 h-2 w-2"></div>
        </div>
        <span className="text-white/50 ml-4">404.txt</span>
      </div>

      {/* Main content */}
      <div className="h-full w-full flex flex-col justify-center items-center text-center px-4 text-white">
        <h1 className="text-3xl font-bold mb-2">[404]</h1>
        <p className="text-gray-400 mb-4">
          [the_user_or_page_you&apos;re_looking_for_doesn&apos;t_exist]
        </p>
        <Link
          href="/"
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-sm rounded transition"
        >
          [homepage]
        </Link>
      </div>
    </div>
  );
}
