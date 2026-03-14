import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindHaven | Ruang Aman untuk Pikiranmu",
  description: "Platform kesehatan mental dan edukasi dari AETHER CODE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#F8FAF5] text-slate-800 m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}