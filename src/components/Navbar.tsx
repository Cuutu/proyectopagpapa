'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/70 border-b border-[#222]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2 text-[#00bcd4] font-bold text-2xl tracking-tight">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
          <span className="text-white">Catálogo</span>
        </Link>
        <div className="hidden md:flex gap-8">
          <NavLink href="/" text="Inicio" />
          <NavLink href="/catalogo" text="Catálogo" />
          <NavLink href="/pdf" text="Descargar PDF" />
          <NavLink href="/admin" text="Admin" />
        </div>
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Menú mobile */}
      {open && (
        <div className="md:hidden bg-[#181818] border-t border-[#222] px-4 pb-4 pt-2 space-y-2 animate-fade-in-down">
          <NavLink href="/" text="Inicio" onClick={() => setOpen(false)} />
          <NavLink href="/catalogo" text="Catálogo" onClick={() => setOpen(false)} />
          <NavLink href="/pdf" text="Descargar PDF" onClick={() => setOpen(false)} />
          <NavLink href="/admin" text="Admin" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}

function NavLink({ href, text, onClick }: { href: string; text: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative text-white font-medium transition-colors duration-200 px-2 py-1 hover:text-[#00bcd4] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#00bcd4] after:transition-all after:duration-300"
    >
      {text}
    </Link>
  );
} 