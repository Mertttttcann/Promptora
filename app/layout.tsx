import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Promptora — AI Otomasyon Stüdyosu",
  description:
    "Emlak ve turizm sektörü için yapay zeka chatbot'ları, sesli AI agent'lar ve özel otomasyonlar. İşletmenize 7/24 çalışan AI ekibi.",
  keywords: [
    "AI otomasyon",
    "yapay zeka asistan",
    "emlak chatbot",
    "otel chatbot",
    "AI sesli agent",
    "WhatsApp bot",
    "Türkiye AI ajansı",
  ],
  authors: [{ name: "Promptora" }],
  openGraph: {
    title: "Promptora — AI Otomasyon Stüdyosu",
    description:
      "İşletmeniz için 7/24 çalışan yapay zeka asistanları. Emlak ve turizm sektörü için özel çözümler.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
