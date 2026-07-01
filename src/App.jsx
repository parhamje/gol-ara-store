import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Layouts & Shared
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirm from './pages/OrderConfirm';
import LoginPage from './pages/LoginPage';

// Dashboard Pages
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ProfilePage from './pages/dashboard/ProfilePage';
import WishlistPage from './pages/dashboard/WishlistPage';
import OrdersPage from './pages/dashboard/OrdersPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-left" rtl={true} autoClose={3000} theme="light" />
      <CartDrawer />
      
      <Routes>
        {/* --- Standalone Routes --- */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- User Dashboard Routes (Standalone) --- */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProfilePage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        {/* --- Public Storefront Routes --- */}
        <Route element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        }>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
        </Route>

        {/* --- Admin Routes --- */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          {/* Catch-all for unimplemented admin routes */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

