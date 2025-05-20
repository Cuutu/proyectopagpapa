import Image from 'next/image';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

async function getProduct(id: string) {
  await connectDB();
  const product = await Product.findById(id);
  
  if (!product) {
    notFound();
  }
  
  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Imagen del producto */}
        <div className="relative h-96 lg:h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Información del producto */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Información del producto</h2>
            <p className="text-3xl text-gray-900">${product.price.toLocaleString('es-AR')}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Detalles</h3>
            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                <span className="font-medium">Código:</span> {product.code}
              </p>
              <p className="text-base text-gray-500">
                <span className="font-medium">Marca:</span> {product.brand}
              </p>
              <p className="text-base text-gray-500">
                <span className="font-medium">Modelo:</span> {product.model}
              </p>
              <p className="text-base text-gray-500">
                <span className="font-medium">Categoría:</span> {product.category}
              </p>
              <p className="text-base text-gray-500">
                <span className="font-medium">Año:</span> {product.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 