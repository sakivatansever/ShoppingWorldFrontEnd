# Yemek Siparişi Admin Panel - Entegrasyon Rehberi

## Genel Bakış

Bu proje, tek restoranlı mobil yemek siparişi uygulaması için geliştirilmiş modern bir admin panelidir. Şu an mock verilerle çalışmaktadır ve gerçek backend entegrasyonu için hazırdır.

## Teknoloji Stack

- **Frontend Framework**: React 19 + TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Kendo React (Material Theme)
- **Form Yönetimi**: React Hook Form
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Styling**: Kendo Theme + Bootstrap

## Proje Yapısı

```
src/
├── interface/           # TypeScript tip tanımlamaları
│   ├── order.ts        # Sipariş modelleri
│   ├── product.ts      # Ürün ve kategori modelleri
│   ├── coupon.ts       # Kupon modelleri
│   ├── customer.ts     # Müşteri modelleri
│   ├── courier.ts      # Kurye modelleri
│   ├── dashboard.ts    # Dashboard veri modelleri
│   └── restaurant.ts   # Restoran ayarları modelleri
│
├── services/           # API servis katmanı
│   ├── mock/          # Mock veri ve seed datalar
│   ├── order/         # Sipariş servisleri
│   ├── product/       # Ürün servisleri
│   ├── category/      # Kategori servisleri
│   ├── coupon/        # Kupon servisleri
│   ├── customer/      # Müşteri servisleri
│   ├── courier/       # Kurye servisleri
│   └── dashboard/     # Dashboard servisleri
│
├── store/             # Redux store slices
│   ├── order/
│   ├── product/
│   ├── category/
│   ├── coupon/
│   ├── customer/
│   ├── courier/
│   └── dashboard/
│
└── pages/             # Sayfa bileşenleri
    ├── Dashboard.tsx
    ├── Orders.tsx
    ├── Products.tsx
    ├── Categories.tsx
    ├── Coupons.tsx
    ├── Customers.tsx
    └── Couriers.tsx
```

## Backend Entegrasyonu

### 1. Environment Variables

`.env` dosyasında API URL'ini ayarlayın:

```env
VITE_API_URL=https://your-api-domain.com/api
```

### 2. API Endpoint Yapısı

Backend'inizin aşağıdaki endpoint yapısına uyması beklenir:

#### Siparişler
- `GET /orders` - Sipariş listesi (pagination, filter desteği)
- `GET /orders/:id` - Sipariş detayı
- `PUT /orders/:id/status` - Sipariş durumu güncelleme
- `POST /orders/:id/assign-courier` - Kurye atama

#### Ürünler
- `GET /products` - Ürün listesi
- `GET /products/:id` - Ürün detayı
- `POST /products` - Yeni ürün ekleme
- `PUT /products/:id` - Ürün güncelleme
- `DELETE /products/:id` - Ürün silme

#### Kategoriler
- `GET /categories` - Kategori listesi
- `POST /categories` - Yeni kategori
- `PUT /categories/:id` - Kategori güncelleme
- `DELETE /categories/:id` - Kategori silme

#### Kuponlar
- `GET /coupons` - Kupon listesi
- `POST /coupons` - Yeni kupon
- `PUT /coupons/:id` - Kupon güncelleme
- `DELETE /coupons/:id` - Kupon silme

#### Müşteriler
- `GET /customers` - Müşteri listesi
- `GET /customers/:id` - Müşteri detayı

#### Kuryeler
- `GET /couriers` - Kurye listesi
- `POST /couriers` - Yeni kurye
- `PUT /couriers/:id` - Kurye güncelleme

#### Dashboard
- `GET /dashboard/stats` - Genel istatistikler
- `GET /dashboard/sales` - Satış verileri
- `GET /dashboard/top-products` - En çok satan ürünler
- `GET /dashboard/order-status-summary` - Sipariş durum özeti

### 3. Veri Modelleri (DTO)

Backend'inizin dönmesi gereken veri formatları `src/interface/` klasöründe tanımlanmıştır.

#### Örnek: Order Response

```typescript
{
  "id": "string",
  "code": "string",
  "status": 0-7, // OrderStatus enum
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string",
  "items": [...],
  "customer": {...},
  "address": {...},
  "payment": {...},
  "delivery": {...},
  "timeline": [...]
}
```

#### Pagination Response Format

```typescript
{
  "data": [...],    // Array of items
  "total": number,  // Total count
  "page": number,   // Current page
  "pageSize": number // Page size
}
```

### 4. Mock Servislerden Gerçek API'ye Geçiş

Her servis dosyası (`src/services/*/`) şu yapıdadır:

```typescript
// Mock implementation (şu anki)
export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (params, thunkAPI) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Mock delay
    return mockOrders; // Mock data
  }
);

// Gerçek API implementasyonu (yapılacak)
export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('/orders', { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error message');
    }
  }
);
```

**Önemli**: `axios.defaults.baseURL` zaten `src/services/axiosConfig.ts` dosyasında ayarlanmıştır.

### 5. Authentication Token

JWT token'ları Redux store'da (`auth` slice) saklanmaktadır. Axios interceptor'ı token'ı otomatik olarak header'a ekler:

```typescript
// src/services/axiosConfig.ts
axios.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Özellikler

### ✅ Tamamlanmış Özellikler

1. **Dashboard**
   - Günlük sipariş ve gelir istatistikleri
   - Son 7 günlük satış grafikleri
   - Sipariş durum dağılımı (pie chart)
   - En çok satan ürünler tablosu

2. **Sipariş Yönetimi**
   - Sipariş listeleme, filtreleme, arama
   - Sipariş detay modal
   - Durum güncelleme (Yeni → Onaylandı → Hazırlanıyor → Hazır → Kurye'de → Teslim Edildi)
   - Sipariş zaman çizelgesi

3. **Menü Yönetimi**
   - Kategori CRUD işlemleri
   - Ürün CRUD işlemleri
   - Kategori bazlı filtreleme
   - Stok ve fiyat yönetimi

4. **Kupon Yönetimi**
   - Kupon listesi görüntüleme
   - Kupon tipləri (Yüzde, Sabit Tutar, Ücretsiz Teslimat)
   - Kullanım durumu takibi

5. **Müşteri Yönetimi**
   - Müşteri listesi
   - Müşteri istatistikleri (toplam sipariş, harcama)
   - Segment etiketleri

6. **Kurye Yönetimi**
   - Kurye listesi
   - Durum takibi (Müsait, Meşgul, Çevrimdışı)
   - Performans metrikleri

### 🚧 Geliştirilmeye Açık Özellikler

1. **Ürün Yönetimi**
   - Varyant yönetimi (boyut, gramaj)
   - Opsiyon grupları (ekstra malzemeler)
   - Görsel yükleme
   - Alerjen bilgileri

2. **Raporlama**
   - Detaylı satış raporları
   - Kategori/ürün bazlı analizler
   - Excel/CSV export
   - Teslimat performans raporları

3. **Ayarlar**
   - Restoran bilgileri düzenleme
   - Çalışma saatleri yönetimi
   - Servis bölgeleri
   - Ödeme yöntemi ayarları

4. **Bildirimler**
   - Yeni sipariş bildirimleri
   - Push notification entegrasyonu

## Çalıştırma

### Development
```bash
npm run start
# veya
npm run dev
```

### Production Build
```bash
npm run build
```

### Build Çıktısı
Build sonrası `dist/` klasöründe static dosyalar oluşur. Bunları herhangi bir web sunucusunda host edebilirsiniz.

## Önemli Notlar

- **TypeScript**: Tüm veri modelleri tip güvenlidir
- **Mock Veriler**: `src/services/mock/mockData.ts` dosyasında seed datalar mevcuttur
- **Responsive**: Tüm sayfalar mobil uyumludur
- **i18n**: Türkçe dil desteği mevcuttur (`src/messages/tr-TR.json`)
- **State Persistence**: Auth bilgileri localStorage'da saklanır
- **Error Handling**: Tüm API çağrıları error handling içerir

## Next Steps

1. Backend API endpoint'lerini implement edin
2. Mock servis katmanını gerçek API çağrılarıyla değiştirin
3. Test environment'ı kurun
4. Production deployment'ı yapın

## Destek

Sorularınız için proje ekibiyle iletişime geçin.
