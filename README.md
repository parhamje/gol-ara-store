# 🌸 Gol Ara Store — Luxury Cosmetics E-Commerce

<p align="center">
  <img src="public/logo.png" alt="Gol Ara Logo" width="120" style="border-radius: 50%;" />
</p>

<p align="center">
  <strong>A modern, high-performance, bilingual e-commerce web application built for luxury cosmetics & beauty retail.</strong>
</p>

<p align="center">
  <a href="https://parhamjenani.ir/projects/golara/"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-ff2d78?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/parhamje/gol-ara-store"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/i18next-Bilingual_EN/FA-26A69A?style=flat-square&logo=i18next&logoColor=white" alt="i18next" />
  <img src="https://img.shields.io/badge/Zustand-State_Management-764ABC?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License MIT" />
</p>

---

## 🔗 Live Demo
Experience the live application here:  
👉 **[https://parhamjenani.ir/projects/golara/](https://parhamjenani.ir/projects/golara/)**

---

## ✨ Highlights & Features

### 🌐 Seamless Bilingual & Dynamic Direction (LTR / RTL)
- **Instant Language Toggle**: Switch between **English (LTR)** and **Persian (RTL)** with a single click in the top navbar.
- **CSS Logical Properties**: Full architectural migration to logical CSS (`start`, `end`, `ms`, `pe`) so the grid, layouts, flex flows, icons, and menus dynamically mirror without breaking.
- **Multi-language Mock Database**: Products, descriptions, specifications, tags, categories, and promotions seamlessly adapt to the selected language.

### 💄 Immersive E-Commerce Experience
- **Dynamic Hero Slider**: Engaging multi-slide banner featuring high-resolution visuals, promotional badges, and smooth cross-fade transitions.
- **Category Navigation**: Quick shortcuts to popular product lines: Lips, Eyes, Face, Skincare, Nails, and Tools.
- **Interactive Product Catalog**: Instant multi-attribute filtering (category, price range, minimum rating, and sorting by price or newest).
- **Comprehensive Product Details**:
  - Multi-image gallery with interactive preview switching
  - Dynamic shade & color swatches selector
  - Real-time stock status and discount tags
  - Specifications table and customer reviews breakdown
- **Slide-out Cart Drawer & Wishlist**:
  - Global reactive cart with quantity increments and real-time total calculation powered by Zustand
  - One-click wishlist favoriting
- **Checkout Flow**: Multi-step checkout simulation with form validations and final tracking order confirmation.
- **Admin & Dashboard Areas**: Dedicated Customer Profile/Orders view and Administrator inventory preview.

### ⚡ 100% Local & CDN-Free Performance
- **Zero External Font Requests**: Persian fonts (**Vazirmatn** & **Lalezar**) are installed via npm and bundled directly by Vite.
- **Local SVGs & Assets**: Zero dependency on third-party avatar generators or external image CDNs, ensuring maximum stability, privacy, and ultra-fast performance behind any network firewall.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with CSS Logical Properties |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) (Cart, Wishlist, Filter, Auth) |
| **Localization (i18n)** | [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/) |
| **Typography** | `@fontsource/lalezar` & `vazirmatn` (Bundled locally) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/) |

---

## 📁 Project Structure

```bash
golara/
├── public/
│   ├── images/              # Local product images, banners, and vector assets
│   ├── .htaccess            # Apache / cPanel SPA rewrite configuration
│   └── logo.png             # Brand logo
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, etc.
│   │   ├── CartDrawer.jsx   # Interactive cart drawer
│   │   ├── FilterPanel.jsx  # Multi-faceted filter system
│   │   ├── HeroSlider.jsx   # Responsive hero carousel
│   │   ├── ProductCard.jsx  # Reusable product card component
│   │   └── ...
│   ├── data/
│   │   └── products.js      # Bilingual product catalog database
│   ├── locales/
│   │   ├── en/              # English translation dictionaries
│   │   └── fa/              # Persian translation dictionaries
│   ├── pages/
│   │   ├── admin/           # Administrative portal
│   │   ├── dashboard/       # Customer orders and profile
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── ProductPage.jsx  # Individual product view
│   │   ├── ShopPage.jsx     # Full product catalog
│   │   └── CheckoutPage.jsx # Checkout flow
│   ├── store/               # Zustand global state slices
│   ├── i18n.js              # Localization and direction management
│   ├── index.css            # Base Tailwind and global styling
│   └── main.jsx             # React root entry point
├── package.json
└── vite.config.js           # Vite configuration
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### 1. Clone the repository
```bash
git clone https://github.com/parhamje/gol-ara-store.git
cd gol-ara-store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
The compiled, optimized production files will be output to the `dist/` directory.

---

## 👨‍💻 Author

Designed & Developed by **Parham Jenani**  
- **Website & Portfolio**: [https://parhamjenani.ir](https://parhamjenani.ir)  
- **GitHub**: [@parhamje](https://github.com/parhamje)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
