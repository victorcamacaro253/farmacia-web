import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import mockData from '../data/data.json';
import type { Product } from '../types';

interface ProductPageProps {
  productSlug: string;
  onAddToCart: (product: Product, quantity?: number) => void;
  onProductClick: (slug: string) => void;
}

export default function ProductPage({
  productSlug,
  onAddToCart,
  onProductClick,
}: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadProductData();
  }, [productSlug]);

  const loadProductData = () => {
    // Buscar el producto por slug
    const productData = mockData.products.find(p => p.slug === productSlug);

    if (productData) {
      setProduct(productData);

      // Buscar productos relacionados (misma categoría, excluyendo el actual)
      const related = mockData.products.filter(
        p => p.category_id === productData.category_id && p.id !== productData.id
      ).slice(0, 4);

      setRelatedProducts(related);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
    }
  };

  const discount = product?.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) / product.compare_at_price) *
          100
      )
    : 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImage] || product.images[0] || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-blue-600'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                {product.requires_prescription && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                    Requiere Receta Médica
                  </span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-600">{product.short_description}</p>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                {product.compare_at_price && (
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg text-gray-400 line-through">
                      ${product.compare_at_price.toLocaleString('es-AR')}
                    </p>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      {discount}% OFF
                    </span>
                  </div>
                )}
                <p className="text-4xl font-bold text-blue-600">
                  ${product.price.toLocaleString('es-AR')}
                </p>
              </div>

              {product.stock > 0 ? (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <label className="font-semibold">Cantidad:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-2 font-semibold">{quantity}</span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {product.stock} disponibles
                    </p>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold text-lg mb-4"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al Carrito
                  </button>
                </div>
              ) : (
                <div className="bg-gray-100 text-gray-600 py-4 rounded-lg text-center font-semibold">
                  Producto sin stock
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Envío gratis</p>
                    <p className="text-xs text-gray-600">
                      En compras mayores a $15.000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Compra segura</p>
                    <p className="text-xs text-gray-600">
                      Protección al comprador
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Entrega rápida</p>
                    <p className="text-xs text-gray-600">24-48hs en CABA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Descripción</h2>
            <div className="text-gray-700 leading-relaxed">
              {product.description}
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id}
                  product={related}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}