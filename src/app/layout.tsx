import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

const cormorantNormal = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "normal",
  variable: "--font-cormorant-normal",
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-cormorant-italic",
});

export const metadata: Metadata = {
  title: "IRA Jewels — B2B Jewellery Manufacturing Partner",
  description: "IRA Jewels is a B2B jewellery manufacturing partner offering secure wholesale catalogues and dependable production support for retailers, wholesalers, and jewellery brands. Apply for a trade account today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorantNormal.variable} ${cormorantItalic.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
