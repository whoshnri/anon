import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Welcome to AnonX',
  description: 'Speak your mind through Anonymous Q/A',
  openGraph: {
    title: 'Welcome to AnonX',
    description: 'Join the fun anonymously.',
    url: 'https://myapp.com',
    siteName: 'AnonX',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased bg-bg-dark min-h-screen selection:bg-brand-green/30 selection:text-brand-green overflow-x-hidden`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.05),transparent_50%)] pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
