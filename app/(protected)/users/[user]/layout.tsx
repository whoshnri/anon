import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ user: string }>;
}

// ✅ Async metadata using dynamic param
export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params;
  const user = params.user;

  return {
    title: `${user} | AnonX`,
    description: 'Speak your mind through Anonymous Q/A',
    openGraph: {
      title: `${user}`,
      description: 'All the fun happens here.',
      url: `https://myapp.com/${user}`,
      siteName: 'AnonX',
      type: 'website',
    },
  };
}

// ✅ Layout function, safely ignores params
export default function UserLayout({ children }: LayoutProps) {
  return (
    <div className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  );
}
