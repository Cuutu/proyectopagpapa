import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { Suspense } from 'react';

async function getProducts(searchParams: { search?: string }) {
  const queryString = searchParams.search ? `?query=${encodeURIComponent(searchParams.search)}` : '';
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products${queryString}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Error al cargar los productos');
  }
  
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const products = await getProducts(searchParams);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Catálogo de Productos
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Encuentra el producto que necesitas
        </p>
        <SearchBar onSearch={(query) => console.log(query)} />
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<div>Cargando productos...</div>}>
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
          </Suspense>
        </div>
      </section>
    </div>
  );
}
