// pages/CheckoutPage.tsx
import { useState, useEffect } from 'react';
import { CreditCard, MapPin, Building } from 'lucide-react';
import { useCart } from '../context/CartContext';
import mockData from '../data/data.json';
import type { Branch } from '../types';

interface CheckoutPageProps {
  onSuccess: () => void;
}

export default function CheckoutPage({ onSuccess }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });

  // Cargar sucursales desde mockData
  useEffect(() => {
    const openBranches = mockData.branches.filter(branch => branch.is_open);
    setBranches(openBranches);
    if (openBranches.length > 0) {
      setSelectedBranch(openBranches[0].id); // seleccionar la primera por defecto
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (deliveryMethod === 'pickup' && !selectedBranch) {
      alert('Por favor seleccioná una sucursal para el retiro');
      return;
    }

    if (!paymentMethod) {
      alert('Por favor seleccioná un método de pago');
      return;
    }

    // Aquí podrías guardar el pedido en localStorage o simular una API
    console.log('Pedido confirmado', {
      items,
      deliveryMethod,
      selectedBranch: deliveryMethod === 'pickup' ? selectedBranch : null,
      formData,
      paymentMethod,
      total: finalTotal,
    });

    clearCart();
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const shippingCost = totalPrice >= 15000 ? 0 : 1500;
  const finalTotal = deliveryMethod === 'delivery' ? totalPrice + shippingCost : totalPrice;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Finalizar Compra
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Método de Entrega
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={(e) => setDeliveryMethod(e.target.value as 'delivery')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">Envío a domicilio</p>
                      <p className="text-sm text-gray-600">
                        {shippingCost === 0 ? '¡Envío gratis en compras mayores a $15.000!' : `$${shippingCost.toLocaleString('es-AR')}`}
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value as 'pickup')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">Retiro en sucursal</p>
                      <p className="text-sm text-gray-600">Sin cargo</p>
                    </div>
                  </label>
                </div>

                {deliveryMethod === 'pickup' && (
                  <div className="mt-4">
                    <label className="block font-semibold mb-2">
                      Seleccionar Sucursal
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar...</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name} - {branch.address}, {branch.city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nombre completo"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Teléfono"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Dirección"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ciudad"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="Provincia"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Código Postal"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Método de Pago
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">Tarjeta de Crédito</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit_card"
                      checked={paymentMethod === 'debit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">Tarjeta de Débito</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={paymentMethod === 'mercadopago'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">Mercado Pago</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold">
                      Efectivo {deliveryMethod === 'pickup' ? 'en sucursal' : 'contra entrega'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                      </span>
                    </div>
                  ))}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Subtotal</span>
                      <span>${totalPrice.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Envío</span>
                      <span>
                        {deliveryMethod === 'pickup' || shippingCost === 0
                          ? 'Gratis'
                          : `$${shippingCost.toLocaleString('es-AR')}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-3 border-t">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${finalTotal.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}