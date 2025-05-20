import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description: "Catálogo dinámico de productos con búsqueda y filtros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="bg-[#121212] text-[#f1f1f1]">
      <body className={`${inter.variable} font-sans bg-[#121212] text-[#f1f1f1] min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-20">{/* pt-20 por navbar fija */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
