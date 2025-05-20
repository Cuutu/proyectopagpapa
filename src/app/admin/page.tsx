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
  // Reutilizamos el formulario anterior, pero en modal
  // ...
  // Por simplicidad, lo implemento en el siguiente paso si confirmás este dashboard
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181818] rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
        {/* Aquí va el formulario de alta/edición, lo implemento en el siguiente paso */}
        <div className="text-center text-gray-400">(Formulario de alta/edición aquí)</div>
      </div>
    </div>
  );
} 