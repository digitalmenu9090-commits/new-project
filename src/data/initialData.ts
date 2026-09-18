import { MenuItem, Category, CafeSettings, GalleryItem, Order, Customer, Offer, CafeService, AdminProfile } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-cold-coffee',
    name: 'Cold Coffee',
    sort_order: 1,
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chilled Handcrafted Cold Coffees'
  },
  {
    id: 'cat-hot-coffee',
    name: 'Hot Espresso Bar',
    sort_order: 2,
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Freshly Roasted Himalayan Beans'
  },
  {
    id: 'cat-food',
    name: 'Snacks & Momo',
    sort_order: 3,
    image_url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Steamed, Fried & Chili Special Momo'
  },
  {
    id: 'cat-beverages',
    name: 'Teas & Refreshers',
    sort_order: 4,
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Iced Teas, Lemonades & Smoothies'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'cc-1',
    name: 'American',
    description: 'Crisp, invigorating iced espresso poured over crystal clear ice with chilled mountain spring water.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-2',
    name: 'Lutte',
    description: 'Smooth and refreshing iced latte layered with bold espresso and cold velvety fresh milk poured over ice.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-3',
    name: 'cappuccino',
    description: 'Iced espresso vigorously shaken over ice, topped with a dense cloud of cold micro-foam and cocoa dusting.',
    price: '205',
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-4',
    name: 'Americano honey Lemon',
    description: 'Kathmandu signature refresher: crisp iced espresso elevated with fresh lemon juice and pure natural Himalayan honey.',
    price: '245',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-5',
    name: 'Mocha',
    description: 'Decadent dark chocolate mocha sauce blended with bold espresso, chilled whole milk, and ice cubes.',
    price: '215',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:05:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'food-1',
    name: 'Steamed Chicken Momo',
    description: 'Authentic Nepali juicy minced chicken dumplings seasoned with Himalayan spices, served with fresh tomato achar.',
    price: '180',
    image_url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-food',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-10T00:01:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'food-2',
    name: 'C-Momo (Chili Momo)',
    description: 'Crispy fried momo tossed in a fiery wok with bell peppers, onions, ginger, garlic, and special chili sauce.',
    price: '220',
    image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-food',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-10T00:02:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'food-3',
    name: 'Crispy Peri-Peri French Fries',
    description: 'Golden fried Idaho potato batons dusted with savory spicy peri-peri seasoning and served with garlic mayo dip.',
    price: '140',
    image_url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-food',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:03:00.000Z',
    dietary: 'veg'
  }
];

export const INITIAL_CAFE_SETTINGS: CafeSettings = {
  id: 'settings-1',
  cafe_name: 'SIP CAFE',
  address: 'Pipalbot (people boat), Kathmandu, Nepal',
  phone: '9767560484',
  secondary_phone: '9813779214',
  whatsapp: '9767560484',
  instagram: 'https://instagram.com/sipcafe.jp',
  facebook: 'https://facebook.com/sipcafe',
  maps_url: 'https://maps.google.com/?q=Pipalbot,+Kathmandu,+Nepal',
  opening_time: '7:00 AM',
  closing_time: '9:00 PM',
  opening_days: 'Every Day',
  about_text: 'Sip Cafe is your cozy neighborhood sanctuary in Pipalbot, Kathmandu — created for people who appreciate handcrafted cold brews, authentic Himalayan specialty coffee, and refreshing moments with friends. Every drink is prepared fresh to order with pure mountain spring water and locally roasted beans.',
  hero_title: 'SIP CAFE',
  hero_subtitle: 'GOOD FOOD • GREAT COFFEE • BETTER VIBES',
  hero_description: 'Welcome to Sip Cafe at Pipalbot, Kathmandu! Enjoy handcrafted specialty coffee, refreshing drinks, burgers, momo, and delicious food on our relaxing outdoor terrace.',
  hero_image: './sip_cafe_real_original.jpg',
  is_force_closed: false,
  announcement_enabled: false,
  announcement_text: 'Welcome to Sip Cafe Pipalbot! Freshly brewed Himalayan coffee, cold brews, momo & outdoor terrace seating.'
};

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-storefront-real',
    title: 'Sip Café Outdoor Terrace & Storefront • Pipalbot, Kathmandu',
    category: 'Storefront',
    image_url: './sip_cafe_real_original.jpg',
    aspect: 'wide'
  },
  {
    id: 'g-terrace',
    title: 'Warm Outdoor Cafe Terrace & Sunlit Seating',
    category: 'Atmosphere',
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    aspect: 'wide'
  },
  {
    id: 'g-barista',
    title: 'Freshly Brewed Specialty Espresso & Pour-Over',
    category: 'Coffee Bar',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    aspect: 'wide'
  },
  {
    id: 'g1',
    title: 'Iced Americano Honey Lemon with Mountain Honey',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    aspect: 'tall'
  },
  {
    id: 'g2',
    title: 'Chilled American with Crystal Clear Ice',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  },
  {
    id: 'g3',
    title: 'Cozy Second Floor Balcony & Sunlit Corners',
    category: 'Atmosphere',
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    aspect: 'wide'
  },
  {
    id: 'g4',
    title: 'Layered Iced Lutte in Frosty Glass',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    aspect: 'tall'
  },
  {
    id: 'g5',
    title: 'Decadent Iced Mocha with Chocolate Swirls',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  },
  {
    id: 'g6',
    title: 'Iced Cappuccino with Dense Cold Foam',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    aspect: 'tall'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#SIP-1048',
    customerName: 'Aarav Sharma',
    customerPhone: '9841234567',
    orderType: 'Dine-In',
    tableNumber: 'Table 4 (Patio)',
    items: [
      { itemId: 'cc-2', name: 'Lutte (Iced Latte)', quantity: 2, unitPrice: 195, totalPrice: 390 },
      { itemId: 'food-1', name: 'Steamed Chicken Momo', quantity: 1, unitPrice: 180, totalPrice: 180 }
    ],
    subtotal: 570,
    discount: 0,
    totalAmount: 570,
    status: 'Preparing',
    paymentStatus: 'Paid',
    paymentMethod: 'Fonepay (QR)',
    createdAt: '2026-09-18T05:45:00.000Z',
    notes: 'Less ice on one latte please.'
  },
  {
    id: 'ord-102',
    orderNumber: '#SIP-1049',
    customerName: 'Pooja Shrestha',
    customerPhone: '9818765432',
    orderType: 'Takeaway',
    items: [
      { itemId: 'cc-4', name: 'Americano honey Lemon', quantity: 1, unitPrice: 245, totalPrice: 245 },
      { itemId: 'food-3', name: 'Crispy Peri-Peri French Fries', quantity: 1, unitPrice: 140, totalPrice: 140 }
    ],
    subtotal: 385,
    discount: 50,
    totalAmount: 335,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
    createdAt: '2026-09-18T05:58:00.000Z',
    notes: 'Extra ketchup packets for takeaway.'
  },
  {
    id: 'ord-103',
    orderNumber: '#SIP-1050',
    customerName: 'Bikash Adhikari',
    customerPhone: '9860112233',
    orderType: 'Dine-In',
    tableNumber: 'Table 2',
    items: [
      { itemId: 'cc-5', name: 'Mocha (Iced)', quantity: 1, unitPrice: 215, totalPrice: 215 },
      { itemId: 'food-2', name: 'C-Momo (Chili Momo)', quantity: 1, unitPrice: 220, totalPrice: 220 }
    ],
    subtotal: 435,
    discount: 0,
    totalAmount: 435,
    status: 'Ready',
    paymentStatus: 'Paid',
    paymentMethod: 'Fonepay (QR)',
    createdAt: '2026-09-18T05:25:00.000Z'
  },
  {
    id: 'ord-104',
    orderNumber: '#SIP-1051',
    customerName: 'Shrijana Karki',
    customerPhone: '9801998877',
    orderType: 'Delivery',
    items: [
      { itemId: 'cc-1', name: 'American (Iced)', quantity: 3, unitPrice: 175, totalPrice: 525 },
      { itemId: 'food-1', name: 'Steamed Chicken Momo', quantity: 2, unitPrice: 180, totalPrice: 360 }
    ],
    subtotal: 885,
    discount: 100,
    totalAmount: 785,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    createdAt: '2026-09-18T04:15:00.000Z',
    notes: 'Deliver to Apex College gate.'
  },
  {
    id: 'ord-105',
    orderNumber: '#SIP-1052',
    customerName: 'Rohan Thapa',
    customerPhone: '9849554433',
    orderType: 'Dine-In',
    tableNumber: 'Table 7',
    items: [
      { itemId: 'cc-3', name: 'cappuccino (Iced)', quantity: 1, unitPrice: 205, totalPrice: 205 }
    ],
    subtotal: 205,
    discount: 0,
    totalAmount: 205,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
    createdAt: '2026-09-18T03:50:00.000Z'
  },
  {
    id: 'ord-106',
    orderNumber: '#SIP-1053',
    customerName: 'Sunita Maharjan',
    customerPhone: '9813224466',
    orderType: 'Takeaway',
    items: [
      { itemId: 'food-2', name: 'C-Momo (Chili Momo)', quantity: 2, unitPrice: 220, totalPrice: 440 }
    ],
    subtotal: 440,
    discount: 0,
    totalAmount: 440,
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
    createdAt: '2026-09-18T02:10:00.000Z',
    notes: 'Customer canceled due to emergency.'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Aarav Sharma',
    phone: '9841234567',
    email: 'aarav.sharma@gmail.com',
    totalOrders: 14,
    totalSpent: 6840,
    lastOrderDate: '2026-09-18',
    joinedDate: '2026-07-15',
    notes: 'Regular morning coffee customer. Prefers chilled Lutte with oat milk when available.',
    favoriteItem: 'Lutte (Iced Latte)'
  },
  {
    id: 'cust-2',
    name: 'Pooja Shrestha',
    phone: '9818765432',
    email: 'pooja.shrestha@outlook.com',
    totalOrders: 8,
    totalSpent: 3950,
    lastOrderDate: '2026-09-18',
    joinedDate: '2026-08-02',
    notes: 'Prefers takeaway packaging with extra napkins.',
    favoriteItem: 'Americano honey Lemon'
  },
  {
    id: 'cust-3',
    name: 'Bikash Adhikari',
    phone: '9860112233',
    email: 'bikash.adh@gmail.com',
    totalOrders: 19,
    totalSpent: 8720,
    lastOrderDate: '2026-09-18',
    joinedDate: '2026-06-10',
    notes: 'VIP customer. Often brings study group on weekends.',
    favoriteItem: 'C-Momo & Iced Mocha'
  },
  {
    id: 'cust-4',
    name: 'Shrijana Karki',
    phone: '9801998877',
    email: 'shrijana.karki@yahoo.com',
    totalOrders: 6,
    totalSpent: 3420,
    lastOrderDate: '2026-09-18',
    joinedDate: '2026-08-20',
    notes: 'Orders delivery to Apex College students lounge.',
    favoriteItem: 'Steamed Chicken Momo'
  },
  {
    id: 'cust-5',
    name: 'Rohan Thapa',
    phone: '9849554433',
    email: 'rohan.t@gmail.com',
    totalOrders: 11,
    totalSpent: 4280,
    lastOrderDate: '2026-09-18',
    joinedDate: '2026-07-28',
    notes: 'Freelancer, uses patio Wi-Fi.',
    favoriteItem: 'Iced Cappuccino'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: 'Dasani 20% OFF',
    code: 'DASANI20',
    discountType: 'percentage',
    discountValue: 20,
    validUntil: '2026-10-15',
    minOrderAmount: 300,
    isActive: true,
    description: 'Get 20% discount on all cold coffee items and beverages during peak hours.',
    timesUsed: 42
  },
  {
    id: 'off-2',
    title: 'Monsoon Momo Fest रू 50 OFF',
    code: 'MOMOFEST50',
    discountType: 'flat',
    discountValue: 50,
    validUntil: '2026-09-30',
    minOrderAmount: 400,
    isActive: true,
    description: 'Flat रू 50 off when you order 2 or more plates of chicken or veg momo.',
    timesUsed: 67
  },
  {
    id: 'off-3',
    title: 'Student Coffee Delight 15% OFF',
    code: 'SIPSTUDENT15',
    discountType: 'percentage',
    discountValue: 15,
    validUntil: '2026-12-31',
    minOrderAmount: 200,
    isActive: true,
    description: 'Valid for students with college ID on all espresso drinks and cold brews.',
    timesUsed: 115
  },
  {
    id: 'off-4',
    title: 'Weekend Brunch Bundle 10% OFF',
    code: 'WEEKEND10',
    discountType: 'percentage',
    discountValue: 10,
    validUntil: '2026-11-30',
    minOrderAmount: 600,
    isActive: false,
    description: 'Weekend family and friends combo discount on total bill.',
    timesUsed: 29
  }
];

export const INITIAL_SERVICES: CafeService[] = [
  {
    id: 'srv-1',
    title: 'Outdoor Garden & Terrace Seating',
    description: 'Bask in the open air and mountain breeze on our cozy wooden patio surrounded by plants.',
    icon: 'Sun',
    isActive: true,
    category: 'Dining Experience',
    badge: 'Popular'
  },
  {
    id: 'srv-2',
    title: 'Specialty Himalayan Coffee Brewing',
    description: 'Artisanal single-origin beans roasted locally in Nepal, pulled by trained baristas.',
    icon: 'Coffee',
    isActive: true,
    category: 'Beverages',
    badge: 'Signature'
  },
  {
    id: 'srv-3',
    title: 'High-Speed Wi-Fi & Work-Friendly Desks',
    description: 'Dedicated charging ports, quiet corners, and stable 100 Mbps fiber for remote workers.',
    icon: 'Wifi',
    isActive: true,
    category: 'Workspace',
    badge: 'Free'
  },
  {
    id: 'srv-4',
    title: 'Birthday & Private Event Hosting',
    description: 'Book our upper terrace or full cafe for intimate gatherings, music jams, and celebrations.',
    icon: 'PartyPopper',
    isActive: true,
    category: 'Events'
  },
  {
    id: 'srv-5',
    title: 'Quick Curbside Takeaway & Delivery',
    description: 'Pre-order via phone or WhatsApp for prompt pickup or swift local neighborhood drop.',
    icon: 'Bike',
    isActive: true,
    category: 'Delivery'
  },
  {
    id: 'srv-6',
    title: 'Custom Cake & Pastry Pre-Orders',
    description: 'Order handcrafted artisan cakes and desserts 24 hours in advance for your special days.',
    icon: 'Cake',
    isActive: false,
    category: 'Bakery'
  }
];

export const INITIAL_ADMIN_PROFILE: AdminProfile = {
  name: 'Sip Café Management',
  email: 'videographics27@gmail.com',
  role: 'Owner & Store Administrator',
  phone: '9767560484'
};
