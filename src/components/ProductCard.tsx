// components/ProductCard.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Ajusta la ruta según tu estructura
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  showSubcategory?: boolean;
  subcategoryName?: string;
}

export default function ProductCard({
  product,
  viewMode,
  showSubcategory,
  subcategoryName,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleProductClick = () => {
    navigate(`/producto/${product.slug}`);
  };

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    setIsAdding(true);
    addToCart(product);
    // Opcional: feedback visual temporal
    setTimeout(() => setIsAdding(false), 500);
  };

  const discount = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) / product.compare_at_price) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative cursor-pointer" onClick={handleProductClick}>
        <img
          src={product.images[0] || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.is_on_sale && discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {discount}% OFF
          </div>
        )}
        {product.requires_prescription && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Receta
          </div>
        )}
      </div>

      <div className="p-4">
        {showSubcategory && subcategoryName && (
          <p className="text-xs text-purple-600 font-medium mb-1">
            {subcategoryName}
          </p>
        )}

        <div className="cursor-pointer" onClick={handleProductClick}>
          <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
            {product.name}
          </h3>
        </div>

        <div className="mb-3">
          {product.compare_at_price && (
            <p className="text-xs text-gray-400 line-through">
              ${product.compare_at_price.toLocaleString('es-AR')}
            </p>
          )}
          <p className="text-2xl font-bold text-blue-600">
            ${product.price.toLocaleString('es-AR')}
          </p>
        </div>

        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Agregando...' : 'Agregar'}
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed font-medium"
          >
            Sin stock
          </button>
        )}
      </div>
    </div>
  );
}