import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { LayoutDashboard, ShoppingBag, Heart, User, MapPin, Settings } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import ProductCard from '../components/ui/ProductCard';
import { addToCart } from '../redux/slices/cartSlice';

const customerLinks = [
  { name: 'Overview', to: '/customer', icon: LayoutDashboard, end: true },
  { name: 'My Orders', to: '/customer/orders', icon: ShoppingBag },
  { name: 'Wishlist', to: '/customer/wishlist', icon: Heart },
  { name: 'Addresses', to: '/customer/addresses', icon: MapPin },
  { name: 'Profile', to: '/customer/profile', icon: User },
  { name: 'Settings', to: '/customer/settings', icon: Settings },
];

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <DashboardLayout links={customerLinks}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="mt-2 text-gray-600">Here is an overview of your account.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard title="Total Orders" value="0" icon={ShoppingBag} />
        <StatCard title="Pending Orders" value="0" icon={ShoppingBag} />
        <StatCard title="Completed Orders" value="0" icon={ShoppingBag} />
        <StatCard title="Wishlist Items" value="0" icon={Heart} />
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <a href="/" className="text-indigo-600 font-semibold hover:text-indigo-800">Explore Products &rarr;</a>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Products</h2>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
