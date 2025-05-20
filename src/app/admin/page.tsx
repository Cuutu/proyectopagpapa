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
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-[#181818] rounded-2xl shadow-lg mt-8 mb-12">
      <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">Panel de Administración</h1>
      <form onSubmit={handleSubmit} className="space-y-0">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="text-sm text-gray-300 block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Nombre del producto"
          />
        </div>
        {/* Código */}
        <div className="mb-4">
          <label htmlFor="code" className="text-sm text-gray-300 block mb-1 font-medium">Código</label>
          <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Código único"
          />
        </div>
        {/* Marca */}
        <div className="mb-4">
          <label htmlFor="brand" className="text-sm text-gray-300 block mb-1 font-medium">Marca</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Marca"
          />
        </div>
        {/* Modelo */}
        <div className="mb-4">
          <label htmlFor="model" className="text-sm text-gray-300 block mb-1 font-medium">Modelo</label>
          <input
            type="text"
            name="model"
            id="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Modelo"
          />
        </div>
        {/* Categoría */}
        <div className="mb-4">
          <label htmlFor="category" className="text-sm text-gray-300 block mb-1 font-medium">Categoría</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Categoría"
          />
        </div>
        {/* Año */}
        <div className="mb-4">
          <label htmlFor="year" className="text-sm text-gray-300 block mb-1 font-medium">Año</label>
          <input
            type="number"
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Año"
          />
        </div>
        {/* Imagen */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-1 font-medium">Imagen del producto</label>
          <div className="flex flex-col gap-2">
            <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-4 flex flex-col items-center justify-center bg-[#1e1e1e]">
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                onChange={handleImageChange}
                className="w-full text-gray-300 file:bg-[#00bcd4] file:text-white file:rounded-md file:border-0 file:py-2 file:px-4 file:font-semibold file:shadow-sm file:hover:bg-[#00acc1] file:transition"
              />
              <span className="text-xs text-gray-400 mt-2">Arrastrá una imagen o hacé click para seleccionar</span>
            </div>
            <div className="text-xs text-[#b3b3b3] mt-1">O pega una URL de imagen:</div>
            <input
              type="url"
              name="image"
              id="image-url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4] disabled:opacity-60"
              disabled={!!imageFile}
            />
          </div>
        </div>
        {/* Precio */}
        <div className="mb-8">
          <label htmlFor="price" className="text-sm text-gray-300 block mb-1 font-medium">Precio</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#2a2a2a] rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            placeholder="Precio"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white font-semibold py-2 px-4 rounded-md shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed text-lg"
        >
          {uploading ? 'Subiendo...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
} 