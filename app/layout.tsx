import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MindHaven | Konsultasi AI & Kesehatan Mental",
    template: "%s | MindHaven"
  },
  description: "Ruang aman digital untuk kesehatan mentalmu. Dilengkapi dengan AI Chat Therapy, Mood Tracker, latihan pernapasan, dan bantuan krisis 24/7.",
  keywords: [
    "kesehatan mental", 
    "konsultasi psikologi online", 
    "AI therapy", 
    "mood tracker Indonesia", 
    "terapi CBT online", 
    "meditasi", 
    "MindHaven", 
    "aplikasi kesehatan mental"
  ],
  authors: [{ name: "MindHaven Team" }],
  creator: "MindHaven",
  publisher: "MindHaven",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mindhaven.my.id/",
    siteName: "MindHaven",
    title: "MindHaven | Solusi Cerdas Kesehatan Mental",
    description: "Temukan ketenangan dengan teknologi AI Therapy dan fitur pelacakan mood paling inovatif.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "MindHaven Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MindHaven | Konsultasi AI & Kesehatan Mental",
    description: "Ruang aman digital untuk pikiranmu. Coba AI Therapy sekarang.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={`${inter.className} bg-[#F8FAF5] text-slate-800 m-0 p-0 antialiased`}>
        {children}
      </body>
    </html>
  );
}