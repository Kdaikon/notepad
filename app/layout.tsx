import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from '@/app/ui/nav'
import '@/app/ui/global.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Fast Note",
  description: "this is a memo tool, but too fast",
  openGraph: {
    title: 'Super Fast Note',
    description: 'this is a memo tool, but too fast',
    images: ['./opengraph-image.jpg'], 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="h-screen bg-gray-50">
        <div className="w-full flex-none">
          <Nav />
        </div>
        <div className="px-3 flex-grow overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
