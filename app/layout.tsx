import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  Nav  from '@/app/ui/nav'
import '@/app/ui/global.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="h-screen">
        <div className="w-full flex-none">
        <Nav />
      </div>
      <div className="px-3 flex-grow p-1 md:overflow-y-auto">
        {children}
      </div>
      </body>
    </html>
  );
}
