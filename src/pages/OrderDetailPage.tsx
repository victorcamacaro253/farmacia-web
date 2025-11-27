// pages/OrderDetailPage.tsx
import { useState, useEffect } from 'react';
import { ArrowLeft, Package, MapPin, Clock } from 'lucide-react';
import mockData from '../data/data.json';
import type { Order, OrderItem, Branch, Product } from '../types';

interface OrderDetailPageProps {
  orderId: string;
  onBack: () => void;
}

export default function OrderDetailPage({ orderId, onBack }: OrderDetailPageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [items, setItems] = useState<Array<{ product: Product; quantity: number; price: number }>>([]);

  useEffect(() => {
    // Buscar la orden
    const foundOrder = mockData.orders.find(o => o.id === orderId);
    if (!foundOrder) return;

    // Buscar la sucursal
    const foundBranch = mockData.branches.find(b => b.id === foundOrder.branch_id) || null;

    // Buscar los productos
    const orderItems = mockData.order_items.filter(item => item.order_id === orderId);
    const enrichedItems = orderItems.map(item => {
      const product = mockData.products.find(p => p.id === item.product_id);
      return {
        product: product || {
          id: item.product_id,
          name: 'Producto no disponible',
          slug: '',
          price: item.price,
          images: [],
          brand: '',
          stock: 0,
        },
        quantity: item.quantity,
        price: item.price,
      };
    });

    setOrder(foundOrder);
    setBranch(foundBranch);
    setItems(enrichedItems);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Orden no encontrada.</p>
          <button
            onClick={onBack}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            ← Volver al perfil
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al historial
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Detalle de la orden</h1>
              <p className="text-gray-600 mt-1">#{order.id}</p>
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <p className="text-sm text-gray-500">Estado</p>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Completado
              </span>
            </div>
          </div>

          {/* Información de la orden */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Fecha y hora
              </h2>
              <p className="text-gray-600">{formatDate(order.created_at)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Sucursal
              </h2>
              {branch ? (
                <>
                  <p className="font-medium">{branch.name}</p>
                  <p className="text-gray-600 text-sm">{branch.address}, {branch.city}</p>
                  <p className="text-gray-600 text-sm">Tel: {branch.phone}</p>
                </>
              ) : (
                <p className="text-gray-500">Sucursal no disponible</p>
              )}
            </div>
          </div>

          {/* Productos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Productos
            </h2>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        ❌
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">Marca: {item.product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">x{item.quantity}</p>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toLocaleString('es-AR')} c/u
                    </p>
                    <p className="font-bold text-gray-900">
                      ${(item.quantity * item.price).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.total.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${order.total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}