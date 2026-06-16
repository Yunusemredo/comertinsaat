import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATM Cömert İnşaat | Konya Lüks Konut ve Ticari Yapı Projeleri",
  description: "ATM Cömert İnşaat ile geleceğiniz yükseliyor. Konya Karatay Almira Konakları başta olmak üzere modern mimari ve lüks yaşam alanlarımızı keşfedin.",
  keywords: ["ATM Cömert İnşaat", "Cömert İnşaat", "Almira Konakları", "Konya inşaat", "Karatay satılık daire", "Konya satılık dükkan", "lüks konut Konya"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy-950 font-sans">{children}</body>
    </html>
  );
}
