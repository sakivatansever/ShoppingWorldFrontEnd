import { IOrder, OrderStatus } from '../../interface/order';
import { IProduct, ICategory } from '../../interface/product';
import { ICoupon, CouponType } from '../../interface/coupon';
import { ICustomer } from '../../interface/customer';
import { ICourier, CourierStatus, VehicleType } from '../../interface/courier';
import { IDashboardStats } from '../../interface/dashboard';

export const mockCategories: ICategory[] = [
  {
    id: '1',
    name: 'Burgerler',
    description: 'Lezzetli burgerler',
    displayOrder: 1,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Pizzalar',
    description: 'Taze pizzalar',
    displayOrder: 2,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'İçecekler',
    description: 'Soğuk ve sıcak içecekler',
    displayOrder: 3,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Tatlılar',
    description: 'Leziz tatlılar',
    displayOrder: 4,
    active: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockProducts: IProduct[] = [
  {
    id: '1',
    name: 'Klasik Burger',
    description: 'Dana eti, marul, domates, turşu ve özel sosumuzla',
    categoryId: '1',
    categoryName: 'Burgerler',
    price: 89.90,
    stock: 100,
    images: [],
    active: true,
    featured: true,
    variants: [
      { id: 'v1', name: 'Normal', price: 89.90, stock: 100, active: true },
      { id: 'v2', name: 'Büyük', price: 109.90, stock: 50, active: true }
    ],
    optionGroups: [
      {
        id: 'og1',
        name: 'Ekstra Malzeme',
        required: false,
        minSelection: 0,
        maxSelection: 3,
        displayOrder: 1,
        options: [
          { id: 'o1', name: 'Peynir', price: 10, active: true },
          { id: 'o2', name: 'Bacon', price: 15, active: true },
          { id: 'o3', name: 'Mantar', price: 8, active: true }
        ]
      }
    ],
    allergens: ['Gluten', 'Süt'],
    preparationTime: 15,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Margarita Pizza',
    description: 'Domates sosu, mozzarella, fesleğen',
    categoryId: '2',
    categoryName: 'Pizzalar',
    price: 119.90,
    stock: 80,
    images: [],
    active: true,
    featured: true,
    variants: [
      { id: 'v3', name: 'Orta', price: 119.90, stock: 80, active: true },
      { id: 'v4', name: 'Büyük', price: 159.90, stock: 60, active: true }
    ],
    optionGroups: [],
    allergens: ['Gluten', 'Süt'],
    preparationTime: 20,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Kola',
    description: 'Soğuk kola',
    categoryId: '3',
    categoryName: 'İçecekler',
    price: 15.90,
    stock: 200,
    images: [],
    active: true,
    featured: false,
    variants: [],
    optionGroups: [],
    allergens: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockCustomers: ICustomer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '5551234567',
    addresses: [
      {
        id: 'a1',
        title: 'Ev',
        fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No:15/3',
        cityId: '34',
        cityName: 'İstanbul',
        districtId: '34001',
        districtName: 'Kadıköy',
        isDefault: true
      }
    ],
    tags: ['VIP', 'Sadık Müşteri'],
    segment: 'Premium',
    totalOrders: 45,
    totalSpent: 3850.50,
    averageOrderValue: 85.56,
    lastOrderDate: new Date('2025-10-15'),
    registeredAt: new Date('2024-06-01'),
    preferences: {
      allowSmsNotifications: true,
      allowEmailNotifications: true,
      allowPushNotifications: true
    },
    active: true
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    phone: '5559876543',
    addresses: [],
    tags: ['Yeni Müşteri'],
    totalOrders: 3,
    totalSpent: 215.70,
    averageOrderValue: 71.90,
    lastOrderDate: new Date('2025-10-10'),
    registeredAt: new Date('2025-09-15'),
    preferences: {
      allowSmsNotifications: false,
      allowEmailNotifications: true,
      allowPushNotifications: true
    },
    active: true
  }
];

export const mockCouriers: ICourier[] = [
  {
    id: '1',
    name: 'Mehmet Kaya',
    phone: '5551112233',
    vehicleType: VehicleType.Motorcycle,
    vehiclePlate: '34 ABC 123',
    status: CourierStatus.Idle,
    assignedOrdersCount: 0,
    totalDeliveries: 456,
    averageDeliveryTime: 22,
    rating: 4.8,
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-10-18')
  },
  {
    id: '2',
    name: 'Ali Öz',
    phone: '5552223344',
    vehicleType: VehicleType.Bicycle,
    status: CourierStatus.Busy,
    assignedOrdersCount: 2,
    totalDeliveries: 234,
    averageDeliveryTime: 28,
    rating: 4.5,
    active: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2025-10-18')
  }
];

export const mockOrders: IOrder[] = [
  {
    id: '1',
    code: 'SIP-20251018-001',
    status: OrderStatus.New,
    createdAt: new Date('2025-10-18T14:30:00'),
    updatedAt: new Date('2025-10-18T14:30:00'),
    items: [
      {
        id: 'oi1',
        productId: '1',
        productName: 'Klasik Burger',
        categoryName: 'Burgerler',
        variantId: 'v1',
        variantName: 'Normal',
        options: [
          { id: 'o1', groupName: 'Ekstra Malzeme', optionName: 'Peynir', price: 10 }
        ],
        quantity: 2,
        unitPrice: 99.90,
        total: 199.80,
        notes: 'Az pişmiş olsun'
      },
      {
        id: 'oi2',
        productId: '3',
        productName: 'Kola',
        categoryName: 'İçecekler',
        options: [],
        quantity: 2,
        unitPrice: 15.90,
        total: 31.80
      }
    ],
    customer: {
      id: '1',
      name: 'Ahmet Yılmaz',
      phone: '5551234567',
      email: 'ahmet@example.com'
    },
    address: {
      title: 'Ev',
      fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No:15/3',
      cityId: '34',
      cityName: 'İstanbul',
      districtId: '34001',
      districtName: 'Kadıköy'
    },
    payment: {
      method: 'creditCard',
      subtotal: 231.60,
      deliveryFee: 15.00,
      discount: 0,
      taxAmount: 24.66,
      finalTotal: 271.26,
      isPaid: false
    },
    timeline: [
      {
        id: 'tl1',
        status: OrderStatus.New,
        note: 'Sipariş alındı',
        createdAt: new Date('2025-10-18T14:30:00'),
        createdBy: 'Sistem'
      }
    ]
  },
  {
    id: '2',
    code: 'SIP-20251018-002',
    status: OrderStatus.Preparing,
    createdAt: new Date('2025-10-18T13:15:00'),
    updatedAt: new Date('2025-10-18T13:20:00'),
    items: [
      {
        id: 'oi3',
        productId: '2',
        productName: 'Margarita Pizza',
        categoryName: 'Pizzalar',
        variantId: 'v4',
        variantName: 'Büyük',
        options: [],
        quantity: 1,
        unitPrice: 159.90,
        total: 159.90
      }
    ],
    customer: {
      id: '2',
      name: 'Ayşe Demir',
      phone: '5559876543'
    },
    address: {
      title: 'İş',
      fullAddress: 'Merkez Mah. İş Cad. No:45 D:12',
      cityId: '34',
      cityName: 'İstanbul',
      districtId: '34002',
      districtName: 'Beşiktaş'
    },
    payment: {
      method: 'cash',
      subtotal: 159.90,
      deliveryFee: 20.00,
      discount: 15.99,
      taxAmount: 16.39,
      finalTotal: 180.30,
      couponCode: 'ILKSIPARIS10',
      isPaid: false
    },
    delivery: {
      courierId: '1',
      courierName: 'Mehmet Kaya',
      courierPhone: '5551112233',
      estimatedDeliveryTime: new Date('2025-10-18T14:00:00')
    },
    timeline: [
      {
        id: 'tl2',
        status: OrderStatus.New,
        note: 'Sipariş alındı',
        createdAt: new Date('2025-10-18T13:15:00'),
        createdBy: 'Sistem'
      },
      {
        id: 'tl3',
        status: OrderStatus.Confirmed,
        note: 'Sipariş onaylandı',
        createdAt: new Date('2025-10-18T13:17:00'),
        createdBy: 'Admin'
      },
      {
        id: 'tl4',
        status: OrderStatus.Preparing,
        note: 'Hazırlanıyor',
        createdAt: new Date('2025-10-18T13:20:00'),
        createdBy: 'Mutfak'
      }
    ]
  }
];

export const mockCoupons: ICoupon[] = [
  {
    id: '1',
    code: 'ILKSIPARIS10',
    name: 'İlk Sipariş İndirimi',
    description: '%10 indirim',
    type: CouponType.Percentage,
    value: 10,
    minBasketAmount: 100,
    usageLimit: 1000,
    usageCount: 245,
    usagePerCustomer: 1,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    active: true,
    target: {
      applyToAll: true
    },
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    code: 'UCRETSIZGONDERIM',
    name: 'Ücretsiz Gönderim',
    description: 'Minimum 150 TL alışverişte ücretsiz gönderim',
    type: CouponType.FreeDelivery,
    value: 0,
    minBasketAmount: 150,
    usageLimit: 500,
    usageCount: 89,
    startDate: new Date('2025-10-01'),
    endDate: new Date('2025-10-31'),
    active: true,
    target: {
      applyToAll: true
    },
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-01')
  }
];

export const mockDashboardStats: IDashboardStats = {
  todayOrders: 34,
  todayRevenue: 5847.65,
  activeOrders: 8,
  pendingOrders: 3,
  completedOrdersToday: 28,
  cancelledOrdersToday: 3,
  averageOrderValue: 172.05,
  averageDeliveryTime: 25.5
};
