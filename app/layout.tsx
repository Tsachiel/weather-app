import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Weather forecast application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <div className="bg-gray-600 text-white p-4 shadow-md border-b border-gray-500 flex justify-between">
            <h1 className="text-2xl md:text-4xl font-bold">
              Weather Dashboard
            </h1>
            <nav>
              <Link href="/" className="text-white mx-4">Home</Link>
              <Link href="/about" className="text-white mx-4">About</Link>
            </nav>
          </div>
        </header>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
