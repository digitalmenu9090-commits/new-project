export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string; // preserve exact format like "50/75", "125 / 145 / 195", "300/330", "220"
  image_url: string;
  category_id: string;
  is_popular: boolean;
  is_available: boolean;
  created_at: string;
  dietary?: 'veg' | 'non-veg' | 'beverage';
}

export interface Category {
  id: string;
  name: string;
  sort_order: number;
  image_url?: string;
  item_count_label?: string;
}

export interface CafeSettings {
  id: string;
  cafe_name: string;
  address: string;
  phone: string;
  secondary_phone?: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  maps_url: string;
  opening_time: string; // "07:00" or "7:00 AM"
  closing_time: string; // "21:00" or "9:00 PM"
  opening_days: string;
  about_text: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image: string;
  is_force_closed?: boolean;
  announcement_enabled?: boolean;
  announcement_text?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  aspect?: 'tall' | 'wide' | 'square';
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  tableNumber?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Unpaid';
  paymentMethod: 'Cash' | 'Fonepay (QR)' | 'Card';
  createdAt: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinedDate: string;
  notes?: string;
  favoriteItem?: string;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  validUntil: string;
  minOrderAmount: number;
  isActive: boolean;
  description: string;
  timesUsed: number;
}

export interface CafeService {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  category: string;
  badge?: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  phone: string;
}

export type AdminViewTab =
  | 'overview'
  | 'orders'
  | 'menu'
  | 'customers'
  | 'offers'
  | 'services'
  | 'analytics'
  | 'settings';
