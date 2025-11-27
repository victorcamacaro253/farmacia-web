// components/HorizontalOfferCarousel.tsx
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OfferProductCard from './OfferProductCard';
import type { Product } from '../types';

interface HorizontalOfferCarouselProps {
  products: Product[];
  onProductClick: (slug: string) => void;
  title: string;
}

export default function HorizontalOfferCarousel({
  products,
  onProductClick,
  title
}: HorizontalOfferCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 300;
    containerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => container.removeEventListener('scroll', checkScroll);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="relative">
          {/* Botón izquierda */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Contenedor deslizable */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 hide-scrollbar scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.map((product) => (
              <OfferProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>

          {/* Botón derecha */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}