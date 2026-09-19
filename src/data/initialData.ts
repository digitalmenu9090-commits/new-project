import { MenuItem, Category, CafeSettings, GalleryItem, Order, Customer, Offer, CafeService, AdminProfile } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-hot-coffe',
    name: 'HOT COFFE',
    sort_order: 1,
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Single, Double & Slowor Himalayan Brews'
  },
  {
    id: 'cat-cold-coffe',
    name: 'COLD COFFE',
    sort_order: 2,
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chilled Handcrafted Himalayan Brews'
  },
  {
    id: 'cat-tea',
    name: 'TEA',
    sort_order: 3,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Masala, Green Leaf & Ginger Honey Teas'
  },
  {
    id: 'cat-soft-drinks',
    name: 'SOFT DRINKS',
    sort_order: 4,
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chilled Sodas, Red Bull & Mineral Water'
  },
  {
    id: 'cat-breakfast',
    name: 'BREAKFAST',
    sort_order: 5,
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Tost Chana, Butter Tost & Egg Masala'
  },
  {
    id: 'cat-burgers-sandwiches',
    name: 'BURGERS & SANDWICHES',
    sort_order: 6,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Served with Crispy French Fries'
  },
  {
    id: 'cat-milk-sake',
    name: 'MILK SAKE',
    sort_order: 7,
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Vanilla, Chocolate, Oreo & Cold Latte'
  },
  {
    id: 'cat-momo',
    name: 'MOMO & THUKPA',
    sort_order: 8,
    image_url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chicken Momo, Jhol, C-Momo, Chaumin & Thukpa'
  },
  {
    id: 'cat-bakery-soup',
    name: 'BAKERY, MIX & SOUP',
    sort_order: 9,
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Seasonal Smooth, Veg, Chicken & Mushroom Soups'
  },
  {
    id: 'cat-snacks',
    name: 'VEG AND CHICKEN SNACKS',
    sort_order: 10,
    image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chiken Chilly, Lollipop, Sadeko & Sausage'
  },
  {
    id: 'cat-salad-juice',
    name: 'SALAD & JUICE',
    sort_order: 11,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Fresh Juices, Watermelon, Fruit & Veg Salad'
  },
  {
    id: 'cat-katti-role',
    name: 'KATTI ROLE',
    sort_order: 12,
    image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chicken, Veg & Cheese Katti Rolls'
  },
  {
    id: 'cat-khaja-set',
    name: 'NEPALI KHAJA SET ITEMS',
    sort_order: 13,
    image_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Veg, Chicken Khaja, Puri & Alupratha Tarkari'
  },
  {
    id: 'cat-ktma-noodles',
    name: 'KTMA NOODLES',
    sort_order: 14,
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chicken, Egg, Veg & Egg Tomato Noodles'
  },
  {
    id: 'cat-bubble-tea',
    name: 'BUBBLE TEA',
    sort_order: 15,
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Vanilla, Chocolate, Strawberry & Blueberry Boba'
  },
  {
    id: 'cat-lassi',
    name: 'LASSI ITEM',
    sort_order: 16,
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Plain/Sweet, Banana, Flour & Mango Lassi'
  },
  {
    id: 'cat-affogato',
    name: 'BEST AFFOGATO',
    sort_order: 17,
    image_url: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Signature Hot Espresso over Chilled Gelato'
  },
  {
    id: 'cat-rice',
    name: 'RICE ITEM',
    sort_order: 18,
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Plain, Veg, Chicken & Mix Fried Rice'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // ================= 1. HOT COFFE =================
  {
    id: 'hc-1',
    name: 'Esprso sld',
    description: 'Single (125) / Double (145) / Slowor (195). Pure rich Himalayan espresso extracted under high pressure with thick golden crema.',
    price: '125 / 145 / 195',
    image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-01T00:00:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-2',
    name: 'Americano sld',
    description: 'Single (150) / Double (165). Bold Himalayan espresso pulled long and balanced with pure hot mountain water.',
    price: '150 / 165',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-01T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-3',
    name: 'Cappuccino sld',
    description: 'Single (175) / Double (185). Espresso topped with thick velvety microfoam and dusted with dark chocolate.',
    price: '175 / 185',
    image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-01T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-4',
    name: 'Coffe latte sld',
    description: 'Single (185) / Double (195). Silky textured steamed whole milk poured gently over rich espresso.',
    price: '185 / 195',
    image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-01T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-5',
    name: 'Honey latte',
    description: 'Smooth steamed latte sweetened with pure natural wild Himalayan mountain honey.',
    price: '235',
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-01T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-6',
    name: 'Longo',
    description: 'Extended extraction lungo espresso offering a milder yet deeply complex flavor profile.',
    price: '165',
    image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-01T00:05:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-7',
    name: 'Affogato',
    description: 'Piping hot rich espresso poured directly over a scoop of premium vanilla ice cream.',
    price: '235',
    image_url: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-01T00:06:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-8',
    name: 'Happy esprso',
    description: 'Barista signature special blend with notes of roasted caramel and citrus brightness.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-01T00:07:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'hc-9',
    name: 'Hot chocolate',
    description: 'Steaming rich Dutch chocolate melted with velvety whole milk and finished with chocolate flakes.',
    price: '215',
    image_url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-hot-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-01T00:08:00.000Z',
    dietary: 'beverage'
  },

  // ================= 2. COLD COFFE =================
  {
    id: 'cc-1',
    name: 'American',
    description: 'Crisp, invigorating iced espresso poured over crystal clear ice with chilled mountain spring water.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-02T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-2',
    name: 'Fiavored',
    description: 'Cold iced coffee infused with your choice of rich vanilla, buttery caramel, or hazelnut syrup.',
    price: '205',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-02T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-3',
    name: 'Lutte',
    description: 'Smooth and refreshing iced latte layered with bold espresso and cold velvety fresh milk poured over ice.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-02T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-4',
    name: 'Cappuccino',
    description: 'Iced espresso vigorously shaken over ice, topped with a dense cloud of cold micro-foam and cocoa dusting.',
    price: '205',
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-02T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-5',
    name: 'Americano honey Lemon',
    description: 'Kathmandu signature refresher: crisp iced espresso elevated with fresh lemon juice and pure natural Himalayan honey.',
    price: '245',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-02T00:05:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-6',
    name: 'Mocha',
    description: 'Decadent dark chocolate mocha sauce blended with bold espresso, chilled whole milk, and ice cubes.',
    price: '215',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-02T00:06:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-7',
    name: 'Peach ice tea',
    description: 'Freshly steeped organic black tea poured over ice with fragrant sweet peach nectar and lemon slice.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-02T00:07:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-8',
    name: 'Lemonade',
    description: 'Handcrafted fresh squeezed lemon refresher with chilled mountain spring water and refreshing mint.',
    price: '145',
    image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffe',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-02T00:08:00.000Z',
    dietary: 'beverage'
  },

  // ================= 3. TEA =================
  {
    id: 'tea-1',
    name: 'Milk Tea / Masala',
    description: 'Traditional Nepali milk tea (50) or rich aromatic spiced masala chiya (75) brewed with fresh milk and fragrant spices.',
    price: '50/75',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-03T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'tea-2',
    name: 'Black Tea',
    description: 'Pure Himalayan orthodox whole-leaf black tea steeped to perfection.',
    price: '40',
    image_url: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-03T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'tea-3',
    name: 'Lemon tea',
    description: 'Steaming hot black tea lifted with freshly squeezed lemon juice.',
    price: '60',
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-03T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'tea-4',
    name: 'Hot lemon',
    description: 'Warm soothing mountain spring water infused with fresh citrus lemon juice.',
    price: '60',
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-03T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'tea-5',
    name: 'Glreen tea leff',
    description: 'Whole leaf orthodox green tea handpicked in the Himalayan valleys.',
    price: '125',
    image_url: 'https://images.unsplash.com/photo-1508253578933-20b529302151?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-03T00:05:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'tea-6',
    name: 'Steam milk',
    description: 'Warm, velvety steamed fresh whole milk.',
    price: '75',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-03T00:06:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'tea-7',
    name: 'Hot lemon with ginger honey',
    description: 'Classic Kathmandu throat-soothing elixir: crushed fresh ginger, hot lemon, and wild natural honey.',
    price: '145',
    image_url: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-tea',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-03T00:07:00.000Z',
    dietary: 'beverage'
  },

  // ================= 4. SOFT DRINKS =================
  {
    id: 'sd-1',
    name: 'Coca cola',
    description: 'Chilled glass bottle / can of Coca-Cola served with ice and lemon wedge.',
    price: '80',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-2',
    name: 'Fanta',
    description: 'Sparkling sweet citrus orange soda served ice cold.',
    price: '80',
    image_url: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-3',
    name: 'Sprite',
    description: 'Crisp, fizzy lemon-lime refresher served ice cold.',
    price: '80',
    image_url: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-4',
    name: 'Real juice',
    description: 'Pack of refreshing fruit juice served chilled.',
    price: '60',
    image_url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-5',
    name: 'Badam Juice',
    description: 'Rich and creamy crushed almond badam milk drink with saffron essence.',
    price: '160',
    image_url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:05:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-6',
    name: 'Red bull',
    description: 'Premium chilled energy drink can served ice cold.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:06:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-7',
    name: 'Xtreme',
    description: 'Refreshing carbonated energy beverage served ice cold.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:07:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sd-8',
    name: 'Merenaal water',
    description: 'Pure sealed Himalayan mineral water bottle.',
    price: '25',
    image_url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-soft-drinks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-04T00:08:00.000Z',
    dietary: 'beverage'
  },

  // ================= 5. BREAKFAST =================
  {
    id: 'bf-1',
    name: 'Tost chana(2pic)',
    description: '2 pieces of golden crispy toast served with flavorful spiced Nepali chickpea chana.',
    price: '150',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-breakfast',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-05T00:01:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'bf-2',
    name: 'Butter tost(2pic)',
    description: '2 pieces warm freshly toasted bread smothered with rich golden butter.',
    price: '95',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-breakfast',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-05T00:02:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'bf-3',
    name: 'Jam bread tost',
    description: 'Warm toasted golden bread slices generously spread with sweet mixed fruit jam.',
    price: '110',
    image_url: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-breakfast',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-05T00:03:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'bf-4',
    name: 'Bread omelet plain(2pic) egg',
    description: 'Two fluffy farm-fresh eggs folded into an omelet between 2 slices of golden toast.',
    price: '165',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-breakfast',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-05T00:04:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'bf-5',
    name: 'Bread egg masala(2pic)',
    description: 'Nepali spiced 2-egg masala omelet with chopped onions, green chilies, and herbs with 2 toasted slices.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-breakfast',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-05T00:05:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'bf-6',
    name: 'Chana egg(2pic)bread tost butter',
    description: 'Complete morning feast: savory spiced chana, 2 eggs, golden buttered toast.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-breakfast',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-05T00:06:00.000Z',
    dietary: 'non-veg'
  },

  // ================= 6. BURGERS & SANDWICHES =================
  {
    id: 'bg-1',
    name: 'Veg burger',
    description: 'Crispy spiced vegetable patty topped with fresh lettuce, sliced tomatoes, house sauce, and served with french fries.',
    price: '200',
    image_url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-burgers-sandwiches',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-06T00:01:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'bg-2',
    name: 'Chicken burger',
    description: 'Succulent seasoned chicken patty seared to perfection with crunchy lettuce, creamy sauce, and served with french fries.',
    price: '240',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-burgers-sandwiches',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-06T00:02:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'bg-3',
    name: 'Cheese burger',
    description: 'Double cheese melt draped over juicy patty with caramelized onions, pickles, and served with french fries.',
    price: '300',
    image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-burgers-sandwiches',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-06T00:03:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'bg-4',
    name: 'Chicken sandwich',
    description: 'Tender shredded chicken mixed with mild garlic mayo and herbs on toasted crusty bread with french fries.',
    price: '235',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-burgers-sandwiches',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-06T00:04:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'bg-5',
    name: 'Veg sandwich',
    description: 'Layered fresh cucumbers, tomatoes, bell peppers, cheese slice, and green chutney on toast with french fries.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-burgers-sandwiches',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-06T00:05:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'bg-6',
    name: 'Club sandwich',
    description: 'Triple-decker toasted masterpiece loaded with chicken, egg, cheddar cheese, crisp lettuce, and served with french fries.',
    price: '350',
    image_url: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-burgers-sandwiches',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-06T00:06:00.000Z',
    dietary: 'non-veg'
  },

  // ================= 7. MILK SAKE =================
  {
    id: 'ms-1',
    name: 'Vanilla',
    description: 'Creamy thick milkshake made with pure Madagascar vanilla and rich ice cream.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-milk-sake',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-07T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ms-2',
    name: 'Chocolate',
    description: 'Decadent chocolate thick shake blended with cocoa fudge and cold whole milk.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-milk-sake',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ms-3',
    name: 'Strawberry',
    description: 'Sweet luscious strawberry milkshake blended with fresh strawberry syrup and chilled milk.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-milk-sake',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-07T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ms-4',
    name: 'Orea',
    description: 'Real Oreo cookies crushed into a thick, crunchy ice cream milkshake.',
    price: '210',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-milk-sake',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ms-5',
    name: 'Cold latte with chocolate',
    description: 'Cold espresso latte blended with dark chocolate sauce, ice cream, and whipped topping.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-milk-sake',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:05:00.000Z',
    dietary: 'beverage'
  },

  // ================= 8. MOMO & THUKPA =================
  {
    id: 'mo-1',
    name: 'Chicken momo',
    description: '10 pieces authentic Nepali steamed chicken momos with spiced ginger garlic filling and spicy sesame achar.',
    price: '170',
    image_url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-08T00:01:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-2',
    name: 'Chicken jhol momo',
    description: 'Juicy chicken momos served immersed in a bowl of warm, tangy, and spiced sesame soybean soup.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-08T00:02:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-3',
    name: 'Chicken C momo',
    description: 'Golden pan-fried chicken momos wok tossed in a spicy, fiery chili sauce with bell peppers and onions.',
    price: '220',
    image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-08T00:03:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-4',
    name: 'Chicken chaumin',
    description: 'Full (180) / Half (120). Wok-tossed noodles with tender shredded chicken, crunchy cabbage, and savory spices.',
    price: '180/120',
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-08T00:04:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-5',
    name: 'Veg chaumin',
    description: 'Full (140) / Half (90). Classic Nepali street style stir-fried noodles with fresh garden vegetables.',
    price: '140/90',
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-08T00:05:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'mo-6',
    name: 'Mix chaumin',
    description: 'Full (250) / Half (150). Deluxe wok-tossed noodles packed with chicken, scrambled egg, and crisp vegetables.',
    price: '250/150',
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-08T00:06:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-7',
    name: 'Veg thuppa',
    description: 'Steaming bowl of Tibetan style noodle soup loaded with fresh vegetables and aromatic broth.',
    price: '165',
    image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-08T00:07:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'mo-8',
    name: 'Chicken thuppa',
    description: 'Warm, comforting Himalayan noodle soup with tender chicken pieces, greens, and fragrant herbs.',
    price: '220',
    image_url: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-08T00:08:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-9',
    name: 'Mix thuppa',
    description: 'Hearty Himalayan noodle soup with chicken, egg, and mixed seasonal vegetables.',
    price: '275',
    image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-08T00:09:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'mo-10',
    name: 'Egg thuppa',
    description: 'Rich noodle broth topped with farm-fresh egg and shredded scallions.',
    price: '180',
    image_url: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-momo',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-08T00:10:00.000Z',
    dietary: 'non-veg'
  },

  // ================= 9. BAKERY & MIX ITEMS & SOUP =================
  {
    id: 'bk-1',
    name: 'Seasonal Smooth available',
    description: 'Fresh seasonal fruit smoothie blended to a silky smooth consistency with mountain yogurt.',
    price: 'Rs 260',
    image_url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bakery-soup',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-09T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'bk-2',
    name: 'Veg soup',
    description: 'Warm, clear garden vegetable broth simmered with ginger, garlic, and fresh herbs.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bakery-soup',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-09T00:02:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'bk-3',
    name: 'Chicken soup',
    description: 'Rich, comforting chicken broth loaded with tender shredded chicken and ground black pepper.',
    price: '225',
    image_url: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bakery-soup',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-09T00:03:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'bk-4',
    name: 'Mushroom soup',
    description: 'Earthy wild mushroom cream soup finished with fresh cream and butter.',
    price: '295',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bakery-soup',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-09T00:04:00.000Z',
    dietary: 'veg'
  },

  // ================= 10. VEG AND CHICKEN SNACKS =================
  {
    id: 'sn-1',
    name: 'Chiken Chiliy( W/boneless)',
    description: 'With bone (300) / Boneless (330). Crispy fried chicken tossed in hot wok with onions, capsicum, and chili glaze.',
    price: '300/330',
    image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-10T00:01:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-2',
    name: 'Wings Fride spices(4 pices)',
    description: '4 pieces of crispy fried chicken wings seasoned with special Himalayan aromatic spices.',
    price: '450',
    image_url: 'https://images.unsplash.com/photo-1527477378378-5a6760b2cb9e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-10T00:02:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-3',
    name: 'Chiken Lollipop',
    description: 'Crispy frenched chicken wings fried to golden perfection, served with garlic hot chili sauce.',
    price: '320',
    image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-10T00:03:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-4',
    name: 'Chiken sadeko',
    description: 'With bone (320) / Boneless (350). Traditional Nepali spiced chicken tossed with mustard oil, fenugreek, and green chilies.',
    price: '320/350',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-10T00:04:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-5',
    name: 'Sausage(Boiled/Fride/4pc)',
    description: '4 pieces of chicken sausages: Boiled (220) or Fried (240) served with dipping sauce.',
    price: '220/240',
    image_url: 'https://images.unsplash.com/photo-1597393353415-b3730f3719fe?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:05:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-6',
    name: 'Sausage Chilliy(4pc)',
    description: '4 pieces of chicken sausages sliced and wok tossed with spicy chili sauce, onions, and capsicum.',
    price: '295',
    image_url: 'https://images.unsplash.com/photo-1597393353415-b3730f3719fe?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:06:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-7',
    name: 'Chiken Boiled (W/boneless)',
    description: 'With bone (300) / Boneless (350). Healthy boiled chicken seasoned with Himalayan herbs and mild spices.',
    price: '300/350',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:07:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'sn-8',
    name: 'Peanut sadeko',
    description: 'Crunchy roasted peanuts tossed with chopped red onion, fresh green chilies, cilantro, and lemon juice.',
    price: '230',
    image_url: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:08:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'sn-9',
    name: 'Chauchau sadeko',
    description: 'Crunchy noodles tossed with tangy spices, onions, tomatoes, and chili.',
    price: '145',
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:09:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'sn-10',
    name: 'French fry',
    description: 'Crisp golden french fries lightly salted and served with savory dipping sauce.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:10:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'sn-11',
    name: 'Vegetable boiled',
    description: 'Fresh seasonal vegetables lightly boiled and seasoned with black pepper and salt.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:11:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'sn-12',
    name: 'Veg pakoda',
    description: 'Golden spiced vegetable fritters fried to a crunchy texture, served with tomato chutney.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-snacks',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-10T00:12:00.000Z',
    dietary: 'veg'
  },

  // ================= 11. SALAD & JUICE =================
  {
    id: 'sj-1',
    name: 'Orange juice',
    description: 'Freshly squeezed natural sweet orange citrus juice.',
    price: '220',
    image_url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-salad-juice',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-11T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sj-2',
    name: 'Water melon',
    description: 'Pure sweet watermelon juice pressed fresh and served chilled.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-salad-juice',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-11T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sj-3',
    name: 'Seasonal fruit',
    description: 'Fresh blend of seasonal fruits pressed to a sweet, revitalizing juice.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-salad-juice',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-11T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'sj-4',
    name: 'Fruit salad',
    description: 'Colorful assortment of crisp sliced seasonal fruits served with honey and chaat masala.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-salad-juice',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-11T00:04:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'sj-5',
    name: 'Veg salad',
    description: 'Crispy garden cucumbers, tomatoes, carrots, and onions drizzled with lemon juice.',
    price: '220',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-salad-juice',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-11T00:05:00.000Z',
    dietary: 'veg'
  },

  // ================= 12. KATTI ROLE =================
  {
    id: 'kr-1',
    name: 'Chicken katti role',
    description: 'Warm flaky paratha wrap filled with marinated juicy chicken chunks, sauteed onions, and tangy sauce.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-katti-role',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-12T00:01:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'kr-2',
    name: 'Veg Katti role',
    description: 'Crisp paratha wrap loaded with seasoned vegetables, cottage cheese, herbs, and zesty chutney.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-katti-role',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-12T00:02:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'kr-3',
    name: 'Cheese katti role',
    description: 'Gooey melted cheese wrapped with savory fillings in a hot buttered paratha roll.',
    price: '295',
    image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-katti-role',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-12T00:03:00.000Z',
    dietary: 'veg'
  },

  // ================= 13. NEPALI KHAJA SET ITEMS =================
  {
    id: 'ks-1',
    name: 'Veg khaja set',
    description: 'Authentic Nepali khaja set with baji (beaten rice), spiced potato curry, fried soybeans, pickle, and salad.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-khaja-set',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-13T00:01:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'ks-2',
    name: 'Chicken Khaja set',
    description: 'Traditional Nepali feast with spicy chicken curry, beaten rice (chiura), roasted soybeans, and homemade achar.',
    price: '330',
    image_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-khaja-set',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-13T00:02:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'ks-3',
    name: 'Puri tarkri set',
    description: 'Golden puffed hot puris served with homestyle spiced potato aloo tarkari and pickle.',
    price: '245',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-khaja-set',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-13T00:03:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'ks-4',
    name: 'Roti tarkari',
    description: 'Freshly made soft whole wheat rotis served with seasonal vegetable tarkari and spicy achar.',
    price: '235',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-khaja-set',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-13T00:04:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'ks-5',
    name: 'Alupratha tarkari Chatni and dahi',
    description: 'Spiced stuffed potato aloo paratha served with rich tarkari, fresh mint chutney, and creamy curd (dahi).',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-khaja-set',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-13T00:05:00.000Z',
    dietary: 'veg'
  },

  // ================= 14. KTMA NOODLES =================
  {
    id: 'nd-1',
    name: 'Chicken',
    description: 'Full (220) / Half (145). Kathmandu special spicy wok tossed noodles loaded with seasoned chicken.',
    price: '220/145',
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-ktma-noodles',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-14T00:01:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'nd-2',
    name: 'Egg',
    description: 'Full (200) / Half (135). Kathmandu street noodles tossed in hot wok with scrambled egg and veggies.',
    price: '200/135',
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-ktma-noodles',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-14T00:02:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'nd-3',
    name: 'Veg',
    description: 'Full (175) / Half (120). Wok tossed noodles with fresh seasonal vegetables and Kathmandu savory seasonings.',
    price: '175/120',
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-ktma-noodles',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-14T00:03:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'nd-4',
    name: 'Egg Tomato',
    description: 'Wok tossed noodles combined with juicy sauteed tomatoes and seasoned scrambled egg.',
    price: '235',
    image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-ktma-noodles',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-14T00:04:00.000Z',
    dietary: 'non-veg'
  },

  // ================= 15. BUBBLE TEA =================
  {
    id: 'bt-1',
    name: 'Vanila',
    description: 'Chilled rich vanilla milk tea served with chewy brown sugar tapioca boba pearls.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bubble-tea',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-15T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'bt-2',
    name: 'Chocolate',
    description: 'Decadent chocolate milk tea infused with chewy sweet boba pearls over ice.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bubble-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-15T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'bt-3',
    name: 'Strawberry',
    description: 'Sweet strawberry flavored milk tea poured over ice with chewy boba pearls.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bubble-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-15T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'bt-4',
    name: 'Blueberry',
    description: 'Wild mountain blueberry milk tea with bouncy tapioca pearls and crystal ice.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-bubble-tea',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-15T00:04:00.000Z',
    dietary: 'beverage'
  },

  // ================= 16. LASSI ITEM =================
  {
    id: 'ls-1',
    name: 'Plain/sweet',
    description: 'Plain (175) or Sweet (185). Thick, creamy traditional Nepali yogurt lassi hand-churned to perfection.',
    price: '175/185',
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-lassi',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-16T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ls-2',
    name: 'Banana',
    description: 'Ripe banana blended with sweet creamy yogurt and scented with green cardamom.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-lassi',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-16T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ls-3',
    name: 'Flour lassi',
    description: 'Special traditional fragrant flower blossom scented creamy sweet yogurt lassi.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-lassi',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-16T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'ls-4',
    name: 'Mango Lassi',
    description: 'Luscious golden mango pulp whipped with rich mountain curd and garnished with pistachio.',
    price: '220',
    image_url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-lassi',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-16T00:04:00.000Z',
    dietary: 'beverage'
  },

  // ================= 17. BEST AFFOGATO =================
  {
    id: 'af-1',
    name: 'AFFOGATO ONLY',
    description: 'SIPCAFE Best Affogato: a bold, hot double shot of dark Himalayan espresso poured over premium rich vanilla gelato.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-affogato',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-17T00:01:00.000Z',
    dietary: 'beverage'
  },

  // ================= 18. RICE ITEM =================
  {
    id: 'rc-1',
    name: 'Plain rice',
    description: 'Steaming hot long-grain fluffy aromatic white rice.',
    price: '95',
    image_url: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-rice',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-18T00:01:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'rc-2',
    name: 'Veg fried rice',
    description: 'Wok-tossed aromatic fried rice with diced garden carrots, peas, cabbage, and soy glaze.',
    price: '185',
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-rice',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-18T00:02:00.000Z',
    dietary: 'veg'
  },
  {
    id: 'rc-3',
    name: 'Chicken fried rice',
    description: 'Wok-charred fragrant rice tossed with seasoned juicy chicken chunks, scallions, and egg.',
    price: '250',
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-rice',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-18T00:03:00.000Z',
    dietary: 'non-veg'
  },
  {
    id: 'rc-4',
    name: 'Mix fried rice',
    description: 'Deluxe fried rice tossed with chicken, scrambled egg, and garden fresh vegetables.',
    price: '285',
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-rice',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-18T00:04:00.000Z',
    dietary: 'non-veg'
  }
];

export const INITIAL_CAFE_SETTINGS: CafeSettings = {
  id: 'settings-1',
  cafe_name: 'SIPCAFE',
  address: 'people boat (Pipalbot), Kathmandu, Nepal',
  phone: '9767560484',
  secondary_phone: '9813779214',
  whatsapp: '9767560484',
  instagram: 'https://instagram.com/sipcafe.jp',
  facebook: 'https://facebook.com/sipcafe',
  maps_url: 'https://maps.google.com/?q=Pipalbot,+Kathmandu,+Nepal',
  opening_time: '7:00 AM',
  closing_time: '9:00 PM',
  opening_days: 'Every Day',
  about_text: 'Sip Cafe is your neighborhood sanctuary at Pipalbot, Kathmandu — "COFFEE • FOOD • GOOD VIBES. Brewed in the Himalayas, Made for You." Enjoy authentic handcrafted Himalayan coffee, cold brews, momos, burgers, noodles, khaja sets, and refreshing beverages.',
  hero_title: 'SIPCAFE',
  hero_subtitle: 'COFFEE • FOOD • GOOD VIBES',
  hero_description: 'Brewed in the Himalayas, Made for You. Welcome to SIPCAFE at Pipalbot, Kathmandu! Enjoy handcrafted coffee, burgers, momo, khaja sets, noodles, and refreshing drinks.',
  hero_image: './sip_cafe_real_original.jpg',
  is_force_closed: false,
  announcement_enabled: false,
  announcement_text: 'Welcome to SIPCAFE Pipalbot! Freshly brewed Himalayan coffee, cold brews, momos & outdoor terrace seating. Contact: 9767560484 / 9813779214'
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
      { itemId: 'cc-3', name: 'Lutte', quantity: 2, unitPrice: 195, totalPrice: 390 },
      { itemId: 'mo-1', name: 'Chicken momo', quantity: 1, unitPrice: 170, totalPrice: 170 }
    ],
    subtotal: 560,
    discount: 0,
    totalAmount: 560,
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
      { itemId: 'cc-5', name: 'Americano honey Lemon', quantity: 1, unitPrice: 245, totalPrice: 245 },
      { itemId: 'bg-2', name: 'Chicken burger', quantity: 1, unitPrice: 240, totalPrice: 240 }
    ],
    subtotal: 485,
    discount: 0,
    totalAmount: 485,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash on Counter',
    createdAt: '2026-09-18T06:10:00.000Z',
    notes: 'Extra tissue and ketchup.'
  },
  {
    id: 'ord-103',
    orderNumber: '#SIP-1050',
    customerName: 'Rohan Adhikari',
    customerPhone: '9801234567',
    orderType: 'Delivery',
    deliveryAddress: 'Near Pipalbot Chowk, Kathmandu',
    items: [
      { itemId: 'ks-2', name: 'Chicken Khaja set', quantity: 2, unitPrice: 330, totalPrice: 660 },
      { itemId: 'bt-1', name: 'Bubble Tea (Vanila)', quantity: 2, unitPrice: 250, totalPrice: 500 }
    ],
    subtotal: 1160,
    discount: 100,
    totalAmount: 1060,
    status: 'Ready',
    paymentStatus: 'Paid',
    paymentMethod: 'eSewa',
    createdAt: '2026-09-18T06:30:00.000Z',
    notes: 'Please call on arrival.'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c-1',
    name: 'Aarav Sharma',
    phone: '9841234567',
    email: 'aarav.sharma@gmail.com',
    totalOrders: 14,
    totalSpent: 4820,
    lastOrderDate: 'Today',
    joinedDate: 'Aug 12, 2026',
    favoriteItem: 'Lutte & Chicken momo'
  },
  {
    id: 'c-2',
    name: 'Pooja Shrestha',
    phone: '9818765432',
    email: 'pooja.shrestha@hotmail.com',
    totalOrders: 9,
    totalSpent: 3150,
    lastOrderDate: 'Yesterday',
    joinedDate: 'Aug 20, 2026',
    favoriteItem: 'Americano honey Lemon'
  },
  {
    id: 'c-3',
    name: 'Rohan Adhikari',
    phone: '9801234567',
    email: 'rohan.adhikari@yahoo.com',
    totalOrders: 22,
    totalSpent: 8940,
    lastOrderDate: '2 days ago',
    joinedDate: 'Jul 15, 2026',
    favoriteItem: 'Chicken Khaja set'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    code: 'SIPSPECIAL',
    title: 'Himalayan Welcome Perk',
    description: '10% discount on orders above रू 300',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 300,
    validUntil: 'Dec 31, 2026',
    isActive: true,
    timesUsed: 46
  },
  {
    id: 'off-2',
    code: 'MOMOFEST',
    title: 'Flat रू 50 Off Momo & Snacks',
    description: 'Save flat रू 50 on orders above रू 500',
    discountType: 'flat',
    discountValue: 50,
    minOrderAmount: 500,
    validUntil: 'Dec 31, 2026',
    isActive: true,
    timesUsed: 28
  }
];

export const INITIAL_SERVICES: CafeService[] = [
  {
    id: 'srv-1',
    title: 'Specialty Espresso & Cold Brews',
    description: 'Handcrafted single origin Himalayan coffee roasted locally and brewed fresh with mountain spring water.',
    icon: 'Coffee',
    isActive: true,
    category: 'Coffee',
    badge: 'Popular'
  },
  {
    id: 'srv-2',
    title: 'Fresh Momo & Himalayan Kitchen',
    description: 'Steamed, fried, and fiery C-Momo made daily with authentic herbs, spicy achar, and delicious khaja sets.',
    icon: 'Sparkles',
    isActive: true,
    category: 'Food',
    badge: 'Fresh Daily'
  },
  {
    id: 'srv-3',
    title: 'Outdoor Garden Terrace',
    description: 'Relaxing outdoor seating surrounded by greenery — perfect for quiet work, casual dates, and gatherings.',
    icon: 'Store',
    isActive: true,
    category: 'Atmosphere'
  },
  {
    id: 'srv-4',
    title: 'Takeaway & WhatsApp Ordering',
    description: 'Quick order pickup and doorstep delivery coordination with real-time WhatsApp updates.',
    icon: 'ShoppingBag',
    isActive: true,
    category: 'Ordering'
  }
];

export const INITIAL_ADMIN_PROFILE: AdminProfile = {
  name: 'SIPCAFE Admin',
  role: 'Store Owner & Manager',
  email: 'admin@sipcafe.np',
  phone: '9767560484',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  permissions: ['manage_menu', 'manage_orders', 'manage_pricing', 'manage_categories', 'view_reports']
};
