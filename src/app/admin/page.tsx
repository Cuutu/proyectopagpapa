'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  code: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  image: string;
  price: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch productos
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert('Error al eliminar');
      }
    } finally {
      setDeletingId(null);
    }
  }

  function handleEdit(product: Product) {
    setEditProduct(product);
    setShowForm(true);
  }

  function handleNew() {
    setEditProduct(null);
    setShowForm(true);
  }

  function handleFormClose(refresh = false) {
    setShowForm(false);
    setEditProduct(null);
    if (refresh) fetchProducts();
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-[#181818] rounded-2xl shadow-lg mt-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard de Productos</h1>
        <button
          onClick={handleNew}
          className="bg-[#00bcd4] hover:bg-[#00acc1] text-white font-semibold py-2 px-4 rounded-md shadow-md transition text-lg"
        >
          + Nuevo producto
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-400 py-12">Cargando productos...</div>
      ) : error ? (
        <div className="text-center text-red-400 py-12">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1e1e1e] border border-[#232323] rounded-xl text-sm">
            <thead>
              <tr className="text-gray-300">
                <th className="px-4 py-3 text-left">Imagen</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Código</th>
                <th className="px-4 py-3 text-left">Marca</th>
                <th className="px-4 py-3 text-left">Modelo</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-left">Año</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-[#232323] hover:bg-[#232323] transition">
                  <td className="px-4 py-2">
                    <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg border border-[#232323]" />
                  </td>
                  <td className="px-4 py-2 text-white font-medium">{product.name}</td>
                  <td className="px-4 py-2 text-gray-300">{product.code}</td>
                  <td className="px-4 py-2 text-gray-300">{product.brand}</td>
                  <td className="px-4 py-2 text-gray-300">{product.model}</td>
                  <td className="px-4 py-2 text-gray-300">{product.category}</td>
                  <td className="px-4 py-2 text-gray-300">{product.year}</td>
                  <td className="px-4 py-2 text-[#00bcd4] font-semibold">${product.price.toLocaleString('es-AR')}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-[#232323] hover:bg-[#00bcd4] hover:text-white text-[#00bcd4] border border-[#00bcd4] px-3 py-1 rounded-md font-medium transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="bg-[#232323] hover:bg-red-600 hover:text-white text-red-400 border border-red-600 px-3 py-1 rounded-md font-medium transition disabled:opacity-60"
                    >
                      {deletingId === product._id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showForm && (
        <ProductFormModal
          product={editProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

// --- Modal de creación/edición ---
function ProductFormModal({ product, onClose }: { product: any, onClose: (refresh?: boolean) => void }) {
  const isEdit = !!product;
  const [formData, setFormData] = useState({
    name: product?.name || '',
    code: product?.code || '',
    brand: product?.brand || '',
    model: product?.model || '',
    category: product?.category || '',
    year: product?.year?.toString() || '',
    image: product?.image || '',
    price: product?.price?.toString() || ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError('');
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
        setError('Error al subir la imagen');
        setUploading(false);
        return;
      }
    }

    try {
      const body = { ...formData, image: imageUrl };
      const res = await fetch(isEdit ? `/api/products/${product._id}` : '/api/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        onClose(true);
      } else {
        setError('Error al guardar el producto');
      }
    } catch (e) {
      setError('Error al guardar el producto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181818] rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
        <h2 className="text-2xl font-bold text-white mb-6">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h2>
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
                {(formData.image || imageFile) && (
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                    alt="preview"
                    className="mt-3 w-24 h-24 object-cover rounded-md border border-[#232323]"
                  />
                )}
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
          {error && <div className="text-center text-red-400 mb-4">{error}</div>}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white font-semibold py-2 px-4 rounded-md shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed text-lg"
          >
            {uploading ? (isEdit ? 'Guardando...' : 'Creando...') : (isEdit ? 'Guardar cambios' : 'Crear producto')}
          </button>
        </form>
      </div>
    </div>
  );
} 