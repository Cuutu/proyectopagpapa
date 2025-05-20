import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-10">
      <section className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f1f1f1] tracking-tight">Bienvenido a <span className="text-[#00bcd4]">Catálogo Repuestos</span></h1>
        </div>
        <p className="text-lg sm:text-xl text-[#b3b3b3] font-light">
          Somos una empresa familiar con más de 20 años de experiencia en el rubro de autopartes. Ofrecemos un catálogo online actualizado y la posibilidad de descargar nuestro catálogo completo en PDF. ¡Encontrá lo que buscás de manera fácil y rápida!
        </p>
      </section>
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <Link href="/catalogo" className="inline-block px-8 py-4 rounded-full bg-[#00bcd4] text-white text-lg font-semibold shadow-md hover:bg-[#00acc1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:ring-offset-2">
          Catálogo Online
        </Link>
        <Link href="/pdf" className="inline-block px-8 py-4 rounded-full border border-[#00bcd4] text-[#00bcd4] text-lg font-semibold hover:bg-[#00acc1]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00bcd4] focus:ring-offset-2">
          Catálogo PDF
        </Link>
      </div>
    </div>
  );
}
