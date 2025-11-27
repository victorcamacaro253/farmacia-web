import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartPage({
  onCheckout,
  onContinueShopping,
}: CartPageProps) {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              Agregá productos para comenzar tu compra
            </p>
            <button
              onClick={onContinueShopping}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-6 border-b last:border-b-0"
                >
                  <img
                    src={item.product.images[0] || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.product.brand}
                    </p>
                    <p className="text-blue-600 font-bold text-lg">
                      ${item.product.price.toLocaleString('es-AR')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.min(item.product.stock, item.quantity + 1)
                          )
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-lg font-bold text-gray-800">
                      $
                      {(item.product.price * item.quantity).toLocaleString(
                        'es-AR'
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Resumen de Compra</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} productos)</span>
                  <span>${totalPrice.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>
                    {totalPrice >= 15000 ? (
                      <span className="text-green-600 font-semibold">
                        ¡Gratis!
                      </span>
                    ) : (
                      `$${(1500).toLocaleString('es-AR')}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">
                    $
                    {(totalPrice >= 15000
                      ? totalPrice
                      : totalPrice + 1500
                    ).toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {totalPrice < 15000 && (
                <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-4">
                  Agregá $
                  {(15000 - totalPrice).toLocaleString('es-AR')} más para envío
                  gratis
                </div>
              )}

              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold mb-3"
              >
                Finalizar Compra
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
