import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorDashboard from './pages/VendorDashboard';
import VendorProducts from './pages/VendorProducts';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerOrders from './pages/CustomerOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminVendors from './pages/AdminVendors';
import AdminStores from './pages/AdminStores';
import AdminCustomers from './pages/AdminCustomers';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';
import ProductEditPage from './pages/ProductEditPage';
import VendorStore from './pages/VendorStore';
import VendorInventory from './pages/VendorInventory';
import PublicStore from './pages/PublicStore';
import Products from './pages/Products';
import ErrorBoundary from './components/ErrorBoundary';
import VendorOrders from './pages/VendorOrders';
import VendorCustomers from './pages/VendorCustomers';
import VendorAnalytics from './pages/VendorAnalytics';
import VendorSettings from './pages/VendorSettings';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <main className="flex-grow pt-28">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['Customer']}><Wishlist /></ProtectedRoute>} />
              <Route path="/store/:slug" element={<PublicStore />} />
              <Route path="/checkout" element={<ProtectedRoute allowedRoles={['Customer']}><Checkout /></ProtectedRoute>} />
              <Route path="/checkout/success" element={<ProtectedRoute allowedRoles={['Customer']}><Success /></ProtectedRoute>} />
              <Route path="/checkout/cancel" element={<ProtectedRoute allowedRoles={['Customer']}><Cancel /></ProtectedRoute>} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/products" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorProducts />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/products/new" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <ProductEditPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/products/:id/edit" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <ProductEditPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/inventory" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorInventory />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/store" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorStore />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/orders" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorOrders />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/customers" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorCustomers />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/analytics" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                  <VendorSettings />
                </ProtectedRoute>
              } />
              
              <Route path="/customer" element={
                <ProtectedRoute allowedRoles={['Customer', 'SuperAdmin']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/customer/orders" element={
                <ProtectedRoute allowedRoles={['Customer', 'SuperAdmin']}>
                  <CustomerOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/vendors" element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <AdminVendors />
                </ProtectedRoute>
              } />
              <Route path="/admin/stores" element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <AdminStores />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <AdminCustomers />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <AdminOrders />
                </ProtectedRoute>
              } />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
