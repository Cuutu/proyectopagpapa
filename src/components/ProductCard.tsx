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
    <Link href={`/producto/${id}`} className="block">
      <div className="bg-[#1f1f1f] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 border border-[#232323]">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-[#f1f1f1] mb-1 truncate">{name}</h3>
          <p className="text-xs text-[#00bcd4] font-mono mb-1">Código: {code}</p>
          <p className="text-sm text-[#b3b3b3] mb-1">
            {brand} - {model}
          </p>
          <p className="text-lg font-bold text-[#00bcd4] mt-2">
            ${price.toLocaleString('es-AR')}
          </p>
        </div>
      </div>
    </Link>
  );
} 