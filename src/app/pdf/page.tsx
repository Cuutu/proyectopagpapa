'use client';

import { useState } from 'react';

export default function PDFPage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('PDF subido exitosamente');
      } else {
        throw new Error('Error al subir el PDF');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir el PDF');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#121212] text-gray-200 min-h-[70vh] py-10">
      <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-white mb-2">Catálogo en PDF</h1>
        <p className="text-gray-400 mb-6">Descarga nuestro catálogo completo en formato PDF</p>
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-lg">
          {/* Descargar */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">Descargar Catálogo</h2>
            <a
              href="/catalogo.pdf"
              download
              className="bg-[#00bcd4] hover:bg-[#00acc1] text-white py-2 px-4 rounded-md font-medium transition shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Descargar PDF
            </a>
          </div>
          <hr className="my-6 border-gray-700" />
          {/* Subir */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Subir Nuevo Catálogo</h2>
            <label className="block text-sm text-gray-300 mb-2">Seleccionar archivo PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="bg-[#2a2a2a] text-gray-100 border border-[#3a3a3a] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] file:bg-[#00bcd4] file:text-white file:rounded-md file:border-0 file:py-2 file:px-4 file:font-semibold file:shadow-sm file:hover:bg-[#00acc1] file:transition"
            />
            {isUploading && (
              <p className="mt-2 text-sm text-gray-400">Subiendo archivo...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 