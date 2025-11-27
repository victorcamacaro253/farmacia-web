import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

interface SearchPageProps {
  searchQuery: string;
  onProductClick: (slug: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function SearchPage({
  searchQuery,
  onProductClick,
  onAddToCart,
}: SearchPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      searchProducts();
    }
  }, [searchQuery]);

  const searchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${searchQuery}%`);

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Resultados de búsqueda
            </h1>
          </div>
          <p className="text-gray-600">
            Buscaste: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Buscando productos...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              {products.length} productos encontrados
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Search className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron resultados
            </h2>
            <p className="text-gray-600">
              Intentá buscar con otras palabras clave
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
