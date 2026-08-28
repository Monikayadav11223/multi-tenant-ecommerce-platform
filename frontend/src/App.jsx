import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorDashboard from './pages/VendorDashboard';
import VendorProducts from './pages/VendorProducts';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import ProductEditPage from './pages/ProductEditPage';
import VendorStore from './pages/VendorStore';
import VendorInventory from './pages/VendorInventory';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<ProtectedRoute allowedRoles={['Customer']}><Checkout /></ProtectedRoute>} />
            
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
            
            <Route path="/customer" element={
              <ProtectedRoute allowedRoles={['Customer', 'SuperAdmin']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['SuperAdmin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
