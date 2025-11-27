// pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { User, MapPin, Mail, Phone, LogOut, Package, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { Branch, Product } from '../types';
import mockData from '../data/data.json';

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  branch_id: string;
  total: number;
  created_at: string;
  items: OrderItem[];
}

interface ProfilePageProps {
  onLogout: () => void;
  onBranchClick: () => void;
  onOrderClick: (orderId: string) => void;
}

type ActiveSection = 'profile' | 'orders';

export default function ProfilePage({ onLogout, onBranchClick }: ProfilePageProps) {
  const { user } = useAuth();
  const [savedBranch, setSavedBranch] = useState<Branch | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

  useEffect(() => {
    const branchId = localStorage.getItem('selectedBranch');
    if (branchId) {
      const branch = mockData.branches.find(b => b.id === branchId);
      if (branch) setSavedBranch(branch);
    }

    const userId = 'user-1'; // En producción: user?.id
    const userOrders = mockData.orders.filter(order => order.user_id === userId);
    const enrichedOrders: Order[] = userOrders.map(order => {
      const items = mockData.order_items
        .filter(item => item.order_id === order.id)
        .map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        }));
      return {
        id: order.id,
        branch_id: order.branch_id,
        total: order.total,
        created_at: order.created_at,
        items,
      };
    });
    setOrders(enrichedOrders);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Debes iniciar sesión para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Cuenta</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Aside de navegación */}
          <aside className="lg:w-60 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                      activeSection === 'profile'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Perfil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('orders')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                      activeSection === 'orders'
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Historial de compras
                  </button>
                </li>
              </ul>

              {/* Acciones (Cerrar sesión) - siempre visible */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            </nav>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1">
            {activeSection === 'profile' ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </h2>
                <div className="space-y-6">
                  {/* Datos personales */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                      <p className="mt-1 text-gray-900">{user.full_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{user.email}</p>
                    </div>
                    {user.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <p className="mt-1 text-gray-900">{user.phone}</p>
                      </div>
                    )}
                    {user.address && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Dirección</label>
                        <p className="mt-1 text-gray-900">
                          {user.address}, {user.city}, {user.province} ({user.postal_code})
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Sucursal preferida */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Sucursal Preferida
                      </h3>
                      <button
                        onClick={onBranchClick}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Cambiar
                      </button>
                    </div>
                    {savedBranch ? (
                      <div className="space-y-2">
                        <p className="font-medium">{savedBranch.name}</p>
                        <p className="text-gray-600">{savedBranch.address}, {savedBranch.city}</p>
                        <p className="text-gray-600">Tel: {savedBranch.phone}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No has seleccionado una sucursal preferida.</p>
                    )}
                  </div>

                  {/* Soporte */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-3">Soporte</h3>
                    <div className="space-y-2">
                      <a
                        href="mailto:contacto@farmasalud.com.ar"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                      >
                        <Mail className="w-4 h-4" />
                        contacto@farmasalud.com.ar
                      </a>
                      <a
                        href="tel:080055532762"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                      >
                        <Phone className="w-4 h-4" />
                        0800-555-FARMA (32762)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Historial de compras */
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Historial de Compras
                </h2>

                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sucursal</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => {
                          const branch = mockData.branches.find(b => b.id === order.branch_id);
                          const products = order.items.map(item => {
                            const product = mockData.products.find(p => p.id === item.product_id);
                            return {
                              name: product?.name || 'Producto no disponible',
                              quantity: item.quantity,
                            };
                          });

                          return (
                            <tr key={order.id} className="hover:bg-gray-50">
                                
                              <td className="px-4 py-4 whitespace-nowrap">
                                      <button
                                          onClick={() => onOrderClick(order.id)} // 👈 pasa la función
                                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                      >
                                          #{order.id}
                                      </button>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(order.created_at)}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">
                                {branch?.name || 'Sucursal no encontrada'}
                                <div className="text-xs text-gray-500 mt-1">{branch?.city}</div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-600">
                                <ul className="space-y-1 max-w-xs">
                                  {products.map((product, idx) => (
                                    <li key={idx} className="flex justify-between">
                                      <span>{product.name}</span>
                                      <span className="text-gray-500">x{product.quantity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                ${order.total.toLocaleString('es-AR')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No tienes compras registradas aún.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}