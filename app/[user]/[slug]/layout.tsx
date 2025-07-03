import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  { params }: { params: { user: string; slug: string } }
): Promise<Metadata> {
  const { user, slug } = params;

  return {
    title: `Message ${user}, anonymously! | AnonX`,
    description: `Send ${user} an anonymous message`,
    openGraph: {
      title: slug,
      description: `Send a reply to ${user}`,
      url: `https://myapp.com/${user}/${slug}`,
      siteName: 'AnonX',
    },
    twitter: {
      title: `Send a message | AnonX`,
      description: `Send ${user} an anonymous message`,
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </div>
  );
}
