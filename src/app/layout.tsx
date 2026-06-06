import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Sidebar } from '@/components/layout/Sidebar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Resume Tracker',
  description: 'Personal resume tracking and analytics dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sidebar />
        <main className="ml-64 min-h-screen bg-gray-50 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}