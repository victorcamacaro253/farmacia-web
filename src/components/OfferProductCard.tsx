// components/OfferProductCard.tsx
import { ArrowRight } from 'lucide-react';
import type { Product } from '../types';

interface OfferProductCardProps {
  product: Product;
  onProductClick: (slug: string) => void;
}

export default function OfferProductCard({ product, onProductClick }: OfferProductCardProps) {
  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const offerText = product.offer_text || 'Oferta especial';

  return (
    <div 
      className="w-48 sm:w-56 flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer"
      onClick={() => onProductClick(product.slug)}
    >
      {/* Imagen como fondo */}
      <div 
        className="w-full h-40 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${product.images[0] || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&h=160'})` }}
      >
        {/* Banda de oferta arriba */}
        <div className="absolute top-2 left-0 right-0 px-2">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded inline-block">
            {offerText}
          </span>
        </div>

        {/* Badge de descuento */}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2">
            <div className="relative">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="font-bold text-xs text-gray-800">-{discountPercent}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay con flecha al hacer hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/90 p-2 rounded-full">
          <ArrowRight className="w-4 h-4 text-gray-800" />
        </div>
      </div>

      {/* Nombre y precio (opcional, según diseño) */}
      <div className="p-2">
        <h4 className="text-xs font-medium text-gray-800 line-clamp-1">{product.name}</h4>
        <p className="text-sm font-bold text-blue-600">${product.price.toLocaleString('es-AR')}</p>
      </div>
    </div>
  );
}