
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { AiSuiteProvider } from "@/context/AiSuiteContext";
import { AiSuitePortal } from "@/components/ui/AiSuitePortal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SynTech Consulting | AI & Digital Transformation",
  description: "Leading technology consulting firm specializing in artificial intelligence, enterprise software, and modern digital solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AiSuiteProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <Chatbot />
          <AiSuitePortal />
        </AiSuiteProvider>
      </body>
    </html>
  );
}
