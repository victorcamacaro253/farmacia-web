// services/OrderService.ts
import { Order, OrderItem } from '../types';
import mockData from '../data/data.json';

class OrderService {
  // Guardamos todo el mockData
  private data: any = {...mockData};
  
  // Accesores para facilitar el uso
  private get orders(): Order[] {
    return this.data.orders || [];
  }

  private set orders(orders: Order[]) {
    this.data.orders = orders;
  }

  constructor() {
    console.log('🔄 OrderService inicializado');
    console.log('📊 Órdenes iniciales:', this.orders.length);
  }

  // Obtener todas las órdenes de un usuario
  getOrdersByUser(userId: string): Order[] {
    return this.orders.filter(order => order.user_id === userId);
  }

  // Obtener una orden por ID
  getOrderById(id: string): Order | null {
    return this.orders.find(order => order.id === id) || null;
  }

  // Crear una nueva orden
  createOrder(orderData: Omit<Order, 'id'>): Order {
    console.log('📝 Creando nueva orden con datos:', orderData);
    
    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
      // Asegurar que branch_id sea string
      branch_id: orderData.branch_id || '',
      // Asegurar que shipping_address tenga estructura correcta
      shipping_address: orderData.shipping_address || {
        full_name: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        phone: ''
      }
    };

    console.log('✅ Nueva orden creada:', newOrder);
    
    // IMPORTANTE: Acceder al array de órdenes correctamente
    this.data.orders = [...this.orders, newOrder];
    
    // Verificación
    console.log('📊 Total de órdenes después de crear:', this.data.orders.length);
    console.log('🔍 Última orden agregada:', this.data.orders[this.data.orders.length - 1]);
    
    // Mostrar estructura completa (solo para debug)
    console.log('📄 Estado actual del sistema:');
    console.log(JSON.stringify({
      total_orders: this.data.orders.length,
      last_5_orders: this.data.orders.slice(-5).map(o => ({
        id: o.id,
        user_id: o.user_id,
        total: o.total,
        status: o.status
        
      }))
    }, null, 2));

    return newOrder;
  }

  // Método alternativo más simple
  createOrderAlternative(orderData: Omit<Order, 'id'>): Order {
    console.log('📝 Método alternativo - Creando orden...');
    
    // 1. Crear la nueva orden
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      ...orderData,
      branch_id: orderData.branch_id || ''
    };

    // 2. Asegurarse de que shipping_address no sea null
    if (!newOrder.shipping_address) {
      newOrder.shipping_address = {
        full_name: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        phone: ''
      };
    }

    // 3. Actualizar el array de órdenes (CORRECTO)
    // Primero, asegurar que this.data.orders sea un array
    if (!Array.isArray(this.data.orders)) {
      this.data.orders = [];
    }
    
    // Agregar la nueva orden usando spread operator
    this.data.orders = [...this.data.orders, newOrder];
    
    console.log('✅ Orden creada exitosamente!');
    console.log(`📊 Ahora hay ${this.data.orders.length} órdenes en total`);
    
    // Verificar que se agregó
    const orderExists = this.data.orders.some(o => o.id === newOrder.id);
    console.log(`🔍 ¿Orden ${newOrder.id} existe en el sistema? ${orderExists ? '✅ SÍ' : '❌ NO'}`);
    
    return newOrder;
  }

  // Actualizar el estado de una orden
  updateOrderStatus(orderId: string, status: Order['status']): Order | null {
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      console.log(`❌ No se encontró la orden ${orderId}`);
      return null;
    }
    
    // Actualizar la orden
    this.data.orders[orderIndex] = {
      ...this.data.orders[orderIndex],
      status
    };
    
    console.log(`✅ Orden ${orderId} actualizada a estado: ${status}`);
    return this.data.orders[orderIndex];
  }

  // Obtener todas las órdenes (para debug)
  getAllOrders(): Order[] {
    console.log('📋 Total de órdenes:', this.orders.length);
    this.orders.forEach((order, index) => {
      console.log(`${index + 1}. ${order.id} - ${order.user_id} - $${order.total} - ${order.status}`);
    });
    return this.orders;
  }

  // Verificar si una orden existe
  verifyOrder(orderId: string): void {
    const found = this.orders.some(order => order.id === orderId);
    if (found) {
      const order = this.orders.find(o => o.id === orderId);
      console.log(`✅ Orden ${orderId} encontrada:`, order);
    } else {
      console.log(`❌ Orden ${orderId} NO encontrada`);
    }
  }
}

export const orderService = new OrderService();