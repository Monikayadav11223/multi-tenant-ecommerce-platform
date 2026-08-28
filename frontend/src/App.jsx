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
            
            <Route path="/vendor" element={
              <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                <VendorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/vendor/products" element={
              <ProtectedRoute allowedRoles={['Vendor', 'SuperAdmin']}>
                <VendorProducts />
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
