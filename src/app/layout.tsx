import type { Metadata } from "next";
import { Birthstone, Cormorant_Garamond, Great_Vibes, Inter, Jost } from "next/font/google";
import "./globals.css";

const display = Birthstone({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const script = Birthstone({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const body = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const cinematicDisplay = Cormorant_Garamond({
  variable: "--font-cinematic-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinematicBody = Inter({
  variable: "--font-cinematic-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const elegantBody = Jost({
  variable: "--font-elegant-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const elegantScript = Great_Vibes({
  variable: "--font-elegant-script",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="es" className={`${display.variable} ${script.variable} ${body.variable} ${cinematicDisplay.variable} ${cinematicBody.variable} ${elegantBody.variable} ${elegantScript.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
