'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    brand: '',
    model: '',
    category: '',
    year: '',
    image: '',
    price: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = formData.image;

    // Si hay archivo, subirlo primero
    if (imageFile) {
      const imgData = new FormData();
      imgData.append('image', imageFile);
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: imgData,
      });
      const data = await res.json();
      if (res.ok) {
        imageUrl = data.url;
      } else {
        alert('Error al subir la imagen');
        setUploading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (response.ok) {
        router.refresh();
        setFormData({
          name: '',
          code: '',
          brand: '',
          model: '',
          category: '',
          year: '',
          image: '',
          price: ''
        });
        setImageFile(null);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setFormData(prev => ({ ...prev, image: '' })); // Limpiar URL si se sube archivo
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Código
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            id="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Año
          </label>
          <input
            type="number"
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-[#b3b3b3]">
            Imagen del producto
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00bcd4] focus:ring-[#00bcd4] bg-[#181818] text-[#f1f1f1]"
          />
          <div className="text-xs text-[#b3b3b3] mt-1">O pega una URL de imagen:</div>
          <input
            type="url"
            name="image"
            id="image-url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00bcd4] focus:ring-[#00bcd4] bg-[#181818] text-[#f1f1f1]"
            disabled={!!imageFile}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[#00bcd4] text-white hover:bg-[#00acc1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00bcd4] transition-colors"
        >
          {uploading ? 'Subiendo...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
} 