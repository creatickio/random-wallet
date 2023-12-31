import { Archivo } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const archivo = Archivo({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Random Wallet",
  description: "Start trading in cryptocurrency today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={archivo.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
