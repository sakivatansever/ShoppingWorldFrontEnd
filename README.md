# EShopping - Online Food Ordering Application

Bu proje, online yemek sipariş uygulaması geliştirmek için hazırlanmış bir React + TypeScript + Vite template'idir. Örneğin: Köfteci Yusuf gibi restoran sipariş sistemi.

## Teknolojiler

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Redux Toolkit** - State Management
- **Redux Persist** - State Persistence
- **React Router** - Routing
- **React Hook Form** - Form Management
- **Axios** - HTTP Client
- **Kendo React UI** - UI Components
- **Bootstrap** - CSS Framework
- **Lottie** - Animations

## Mevcut Özellikler

### Authentication & Authorization
- ✅ Login (Giriş)
- ✅ Forgot Password (Şifre Unuttum)
- ✅ Reset Password (Şifre Sıfırlama)
- ✅ Change Password (Şifre Değiştirme)
- ✅ Protected Routes (Korumalı Rotalar)
- ✅ Permission Based Access Control (İzin Bazlı Erişim Kontrolü)

### User Management
- ✅ Create User (Kullanıcı Oluşturma)
- ✅ User List & Management
- ✅ LDAP Integration

### Core Infrastructure
- ✅ Redux Store Configuration
- ✅ Axios Interceptors & Error Handling
- ✅ Form Validation (Yup)
- ✅ Notification System
- ✅ Loading States & Skeletons
- ✅ Sidebar Navigation
- ✅ Responsive Layout

### Reusable Components
- ✅ Form Components (Input, Dropdown, DatePicker, Upload, etc.)
- ✅ Kendo Grid Templates
- ✅ Dialog & Confirmation Modals
- ✅ Notification System
- ✅ Loading & Skeleton Components

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm start

# Production build
npm run build

# Linting
npm run lint
```

## Proje Yapısı

```
src/
├── components/        # Reusable components
│   ├── Auth/         # Authentication components
│   ├── common/       # Common UI components
│   ├── Feedback/     # Loading, notifications, etc.
│   ├── Form/         # Form components
│   ├── General/      # General purpose components
│   └── kendo/        # Kendo UI components
├── pages/            # Page components
├── layouts/          # Layout components
├── routes/           # Router configuration
├── services/         # API services
├── store/            # Redux store & slices
├── hooks/            # Custom React hooks
├── interface/        # TypeScript interfaces
├── validations/      # Form validation schemas
├── utils/            # Utility functions
└── style/            # CSS files
```

## Geliştirme İçin Hazır Yapı

Bu template, aşağıdaki özellikleri içerir ve hemen kullanıma hazırdır:

1. **Authentication Infrastructure** - Tam donanımlı auth sistemi
2. **Form Management** - Validation ve error handling ile
3. **State Management** - Redux Toolkit & Persist
4. **API Integration** - Axios interceptors ile
5. **UI Components** - Kendo React + Bootstrap
6. **Routing** - Protected routes & permissions
7. **Error Handling** - Global error handling
8. **Turkish Localization** - Türkçe dil desteği

## Sonraki Adımlar

Bu template'i kullanarak online yemek sipariş sistemi geliştirmek için:

1. **Menu Management** (Menü Yönetimi) - Ürün, kategori ekleme/düzenleme
2. **Cart System** (Sepet Sistemi) - Ürün ekleme, miktar güncelleme
3. **Order Management** (Sipariş Yönetimi) - Sipariş oluşturma, takip
4. **Payment Integration** (Ödeme Entegrasyonu) - Kredi kartı, online ödeme
5. **Customer Management** (Müşteri Yönetimi) - Adres, favoriler
6. **Restaurant Management** (Restoran Yönetimi) - Şube, çalışma saatleri

## Lisans

MIT

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
