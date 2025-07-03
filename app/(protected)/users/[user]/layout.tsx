import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ✅ DYNAMIC METADATA
export async function generateMetadata({ params }: { params: { user: string } }): Promise<Metadata> {
  return {
    title: `${params.user} | AnonX`,
    description: 'Speak your mind through Anonymous Q/A',
    openGraph: {
      title: `${params.user}`,
      description: 'All the fun happens here.',
      url: `https://myapp.com/${params.user}`,
      siteName: 'AnonX',
      type: 'website',
    },
  };
}

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const cookie = cookies().get('auth_user');

  if (!cookie || cookie.value !== params.user) {
    redirect('/auth');
  }

  return (
    <div className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  );
}
