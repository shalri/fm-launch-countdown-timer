import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redhat = Red_Hat_Text({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "次に(tsugini) | FScode",
  description: "A basic NextJS template for Frontend Mentor Challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redhat.className} flex min-h-screen flex-col scroll-smooth bg-gradient-to-b from-lc-very-dark-blue to-lc-bottom-gradient antialiased`}
      >
        <div className="absolute h-full w-full bg-[url(/images/bg-stars.svg)] bg-contain" />
        {children}
      </body>
    </html>
  );
}
