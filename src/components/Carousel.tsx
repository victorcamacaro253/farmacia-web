import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../types';

// Elimina esta línea si no usas ProductCard en este archivo
// import ProductCard from '../components/ProductCard';

interface HorizontalCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
  onProductClick: (slug: string) => void;
  onAddToCart: (product: Product) => void;
}

// Exporta el componente correctamente
export const HorizontalCarousel = ({
  products,
  title,
  subtitle,
  onProductClick,
  onAddToCart
}: HorizontalCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [products]);

  if (products.length === 0) return null;

  return (
    <section className="mb-10 sm:mb-12 md:mb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 mt-1 text-sm sm:text-base">{subtitle}</p>
          )}
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm flex items-center gap-1 self-start sm:self-auto">
          Ver todos
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className="relative group">
        {/* Flecha izquierda */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 hidden sm:flex items-center justify-center w-10 h-10"
            aria-label="Desplazar hacia la izquierda"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Flecha derecha */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 hidden sm:flex items-center justify-center w-10 h-10"
            aria-label="Desplazar hacia la derecha"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Contenedor del carousel */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 hide-scrollbar snap-x snap-mandatory"
          style={{ 
            scrollBehavior: 'smooth',
            scrollPadding: '0 16px'
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 snap-start"
              style={{ minWidth: '280px' }}
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
                {/* Imagen + badges */}
                <div className="relative flex-1">
                  <img
                    src={product.images[0] || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
                    alt={product.name}
                    className="w-full h-32 sm:h-36 md:h-40 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => onProductClick(product.slug)}
                  />
                  
                  {/* Badges superpuestos como en el ejemplo */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.is_on_sale && (
                      <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <span>🔥</span>
                        {product.compare_at_price && (
                          <span>
                            -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                          </span>
                        )}
                      </div>
                    )}
                    {product.is_featured && (
                      <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Destacado
                      </div>
                    )}
                  </div>

                  {/* Bandas de oferta como en el ejemplo */}
                  {product.is_on_sale && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1">
                      {product.compare_at_price && (
                        <span>
                          Oferta Especial -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-3 flex flex-col flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-1 uppercase">
                    {product.brand}
                  </div>
                  <h3
                    className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors leading-tight flex-1"
                    onClick={() => onProductClick(product.slug)}
                  >
                    {product.name}
                  </h3>

                  {/* Precios */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-lg font-bold text-blue-600">
                        ${product.price.toLocaleString('es-AR')}
                      </span>
                      {product.compare_at_price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.compare_at_price.toLocaleString('es-AR')}
                        </span>
                      )}
                    </div>

                    {/* Stock bajo */}
                    {product.stock > 0 && product.stock < 10 && (
                      <p className="text-xs text-orange-600 mb-2">
                        ¡Últimas {product.stock} unidades!
                      </p>
                    )}

                    {/* Botón de agregar */}
                    {product.stock > 0 ? (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <span>Agregar</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
                      >
                        Sin stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de scroll para móvil */}
        <div className="flex justify-center gap-1 mt-4 sm:hidden">
          {products.slice(0, 4).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// También puedes exportar por defecto si prefieres
// export default HorizontalCarousel;