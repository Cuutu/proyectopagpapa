import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Catálogo
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 transition-colors">
              Catálogo
            </Link>
            <Link href="/pdf" className="text-gray-600 hover:text-blue-600 transition-colors">
              Descargar PDF
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
              Admin
            </Link>
          </div>

          {/* Menú móvil */}
          <button className="md:hidden text-gray-600 hover:text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
} 