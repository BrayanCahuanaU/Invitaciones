import type { Metadata } from "next";
import { Birthstone, Cormorant_Garamond, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const display = Birthstone({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const cinematicDisplay = Bebas_Neue({
  variable: "--font-cinematic-display",
  subsets: ["latin"],
  weight: "400",
});

const cinematicBody = Inter({
  variable: "--font-cinematic-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Invitaciones digitales",
  description: "Invitaciones digitales para XV años, bodas y cumpleaños",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${cinematicDisplay.variable} ${cinematicBody.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
