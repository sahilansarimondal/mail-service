import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/Navbar";
import { Footer } from "./ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mail app",
  description: "Simple authentication demo application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between border-blue-500 min-h-lvh">
          <div>
            <Navbar />
          </div>
          <div>{children}</div>
          <div className="">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
