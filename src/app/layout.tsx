import type { Metadata } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

// ponytail: stand-in Google fonts; swap to next/font/local once the Figma font files arrive
const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const display = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Digiland 2025",
  description:
    "Signature annual event Telkom Indonesia: Digiland Run, Digiland Music, dan Pasar Rakyat UMKM.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-white font-sans text-neutral-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
