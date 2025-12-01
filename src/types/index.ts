export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parent_id: string | null;
  created_at: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
  latitude: number;
  longitude: number;
  hours: BranchHours;
  is_open: boolean;
  created_at: string;
}

export interface BranchHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price: number | null;
  category_id: string;
  subcategory_id: string | null;
  brand: string;
  requires_prescription: boolean;
  stock: number;
  images: string[];
  tags: string[];
  is_featured: boolean;
  is_on_sale: boolean;
  created_at: string;
  category?: Category;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  preferred_branch_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  branch_id: string | null;
  status: string;
  total: number;
  shipping_address: ShippingAddress;
  payment_method: string;
  created_at: string;
   items: OrderItem[];
}

export interface ShippingAddress {
  full_name: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  product?: Product;
}

export interface LocalCartItem {
  product: Product;
  quantity: number;
}
