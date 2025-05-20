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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Catálogo en PDF
        </h1>
        <p className="text-lg text-gray-600">
          Descarga nuestro catálogo completo en formato PDF
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          {/* Sección de descarga */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Descargar Catálogo</h2>
            <a
              href="/catalogo.pdf"
              download
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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

          {/* Sección de subida (solo para admin) */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Subir Nuevo Catálogo
            </h2>
            <div className="max-w-md mx-auto">
              <label className="block">
                <span className="sr-only">Elegir archivo PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </label>
              {isUploading && (
                <p className="mt-2 text-sm text-gray-500">
                  Subiendo archivo...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 