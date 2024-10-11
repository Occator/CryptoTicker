import type { Metadata } from "next";
import { Inter, Roboto_Condensed, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Portfolio Tricker",
  description:
    "This is a side project, which should make it easier to have a better overview of my crypto assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" bg-gray-900 min-h-screen">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
