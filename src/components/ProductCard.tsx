import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  brand: string;
  model: string;
  image: string;
  price: number;
}

export default function ProductCard({
  id,
  name,
  code,
  brand,
  model,
  image,
  price,
}: ProductCardProps) {
  return (
    <Link href={`/producto/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-1">Código: {code}</p>
          <p className="text-sm text-gray-600 mb-1">
            {brand} - {model}
          </p>
          <p className="text-lg font-bold text-blue-600 mt-2">
            ${price.toLocaleString('es-AR')}
          </p>
        </div>
      </div>
    </Link>
  );
} 