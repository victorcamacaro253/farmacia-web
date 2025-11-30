// OrderSuccessPage.tsx
import { CheckCircle, Package, CreditCard, MapPin, Home, Store } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import mockData from '../data/data.json';
import type { Product, Branch } from '../types';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  // Si no hay datos, mostrar mensaje genérico
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Pedido realizado con éxito!
            </h1>
            <p className="text-gray-600 mb-8">
              Gracias por tu compra.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Obtener nombres de productos y sucursal
  const enrichedItems = order.items.map(item => {
    const product = mockData.products.find(p => p.id === item.product.id);
    return {
      ...item,
      name: product?.name || 'Producto no disponible',
      brand: product?.brand || '',
    };
  });

  const branch = order.selectedBranch
    ? mockData.branches.find(b => b.id === order.selectedBranch)
    : null;

  // Formatear método de pago
  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      credit_card: 'Tarjeta de Crédito',
      debit_card: 'Tarjeta de Débito',
      mercadopago: 'Mercado Pago',
      cash: order.deliveryMethod === 'pickup' ? 'Efectivo en sucursal' : 'Efectivo contra entrega',
    };
    return labels[method] || method;
  };

  // Formatear fecha
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
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">¡Pedido confirmado!</h1>
          <p className="text-gray-600 mt-2">
            Gracias por tu compra. Tu pedido está siendo procesado.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Detalles del pedido
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Orden:</span> {order.id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Fecha:</span> {formatDate(order.createdAt)}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total:</span> ${order.total.toLocaleString('es-AR')}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Método de pago
              </h2>
              <p className="text-gray-600">{getPaymentMethodLabel(order.paymentMethod)}</p>
            </div>
          </div>

          {/* Entrega */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              {order.deliveryMethod === 'pickup' ? (
                <Store className="w-5 h-5" />
              ) : (
                <Home className="w-5 h-5" />
              )}
              {order.deliveryMethod === 'pickup' ? 'Retiro en sucursal' : 'Envío a domicilio'}
            </h2>
            {order.deliveryMethod === 'pickup' ? (
              branch ? (
                <p className="text-gray-600">
                  <span className="font-medium">{branch.name}</span>
                  <br />
                  {branch.address}, {branch.city}
                  <br />
                  Tel: {branch.phone}
                </p>
              ) : (
                <p className="text-gray-600">Sucursal no disponible</p>
              )
            ) : (
              <p className="text-gray-600">
                <span className="font-medium">{order.formData?.fullName}</span>
                <br />
                {order.formData?.address}, {order.formData?.city}, {order.formData?.province}
                <br />
                CP: {order.formData?.postalCode} | Tel: {order.formData?.phone}
              </p>
            )}
          </div>

          {/* Productos */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Productos
            </h2>
            <div className="space-y-3">
              {enrichedItems.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b pb-2">
                  <div>
                     <img
                    src={item.product.images[0] || 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  </div>
                  <div>
                    
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <div className="text-right">
                    <p>x{item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toLocaleString('es-AR')} c/u
                    </p>
                    <p className="font-medium">
                      ${(item.quantity * item.product.price).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}