// services/OrderService.ts
import { Order, OrderItem } from '../types';



class OrderService {
  private readonly STORAGE_KEY = 'farmasalud_orders';

  private getOrders(): Order[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
  }

  // Obtener todas las órdenes de un usuario
  getOrdersByUser(userId: string): Order[] {
    const orders = this.getOrders();
    console.log('All Orders:', orders);
    return orders.filter(order => order.user_id === userId);
  }

  // Obtener una orden por ID
  getOrderById(id: string): Order | null {
    const orders = this.getOrders();
    return orders.find(order => order.id === id) || null;
  }

  // Crear una nueva orden
  createOrder(orderData: Omit<Order, 'id'>): Order {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      ...orderData
    };

    const orders = this.getOrders();
    orders.push(newOrder);
    this.saveOrders(orders);

    return newOrder;
  }

  // Actualizar el estado de una orden (opcional)
  updateOrderStatus(orderId: string, status: Order['status']): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(order => order.id === orderId);

    if (index === -1) return null;

    orders[index] = { ...orders[index], status };
    this.saveOrders(orders);
    return orders[index];
  }

  // Eliminar una orden (solo para admin o pruebas)
  deleteOrder(orderId: string): boolean {
    const orders = this.getOrders();
    const initialLength = orders.length;
    const filtered = orders.filter(order => order.id !== orderId);

    if (filtered.length < initialLength) {
      this.saveOrders(filtered);
      return true;
    }
    return false;
  }
}

export const orderService = new OrderService();