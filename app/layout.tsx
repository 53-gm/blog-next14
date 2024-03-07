import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import {
  baseMetadata,
  openGraphMetadata,
  siteMeta,
  twitterMetadata,
} from "@/lib/metadata";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Viewport } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const ZenKakuGothicNewFont = Zen_Kaku_Gothic_New({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-ZenKakuGothicNew",
});

export const viewport: Viewport = {
  width: "device-width",
};

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...openGraphMetadata,
  },
  twitter: {
    ...twitterMetadata,
  },
};

const { siteLang } = siteMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteLang}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.11.1/tocbot.css"
        />
      </head>
      <body className={ZenKakuGothicNewFont.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
