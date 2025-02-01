import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
          <div className="bg-gray-600 text-white p-4 shadow-md border-b border-gray-500">
            <h1 className="text-2xl md:text-4xl font-bold">
              Weather Dashboard
            </h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
