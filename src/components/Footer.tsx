import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#222] text-[#b3b3b3] py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
          <span className="text-[#f1f1f1] font-bold text-lg">Catálogo</span>
        </div>
        <div className="flex gap-6 mb-4 md:mb-0">
          <FooterLink href="/" text="Inicio" />
          <FooterLink href="/catalogo" text="Catálogo" />
          <FooterLink href="/pdf" text="PDF" />
          <FooterLink href="/admin" text="Admin" />
        </div>
        <div className="flex gap-4">
          <FooterIcon href="https://facebook.com" icon={<FacebookIcon />} label="Facebook" />
          <FooterIcon href="https://instagram.com" icon={<InstagramIcon />} label="Instagram" />
          <FooterIcon href="https://wa.me/" icon={<WhatsappIcon />} label="WhatsApp" />
        </div>
      </div>
      <div className="text-center text-xs text-[#444] mt-6 border-t border-[#222] pt-4">
        &copy; {new Date().getFullYear()} Catálogo de Productos. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="hover:text-[#00bcd4] transition-colors duration-200">
      {text}
    </Link>
  );
}

function FooterIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-[#00bcd4] transition-colors duration-200">
      {icon}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
  );
}
function WhatsappIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.67 20.13A10 10 0 1 0 3.87 21.67l2.2-.61a1 1 0 0 1 .94.21l2.1 1.65a1 1 0 0 0 1.18.09 8.12 8.12 0 0 0 3.9-3.9 1 1 0 0 0-.09-1.18l-1.65-2.1a1 1 0 0 1-.21-.94l.61-2.2z" /></svg>
  );
} 