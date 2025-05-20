'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(`/api/products${search ? `?query=${encodeURIComponent(search)}` : ''}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Catálogo de Productos
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Encuentra el producto que necesitas
        </p>
        <SearchBar onSearch={setSearch} />
      </section>
      <section>
        {loading ? (
          <div className="text-center text-gray-500">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                code={product.code}
                brand={product.brand}
                model={product.model}
                image={product.image}
                price={product.price}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 