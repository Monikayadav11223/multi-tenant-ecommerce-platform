import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { Smartphone, Shirt, Home as HomeIcon, Sparkles, Trophy, Headphones } from 'lucide-react';

const categories = [
  { name: 'Electronics', icon: Smartphone, color: 'bg-blue-50 text-blue-600' },
  { name: 'Fashion', icon: Shirt, color: 'bg-pink-50 text-pink-600' },
  { name: 'Home & Living', icon: HomeIcon, color: 'bg-amber-50 text-amber-600' },
  { name: 'Beauty', icon: Sparkles, color: 'bg-purple-50 text-purple-600' },
  { name: 'Sports', icon: Trophy, color: 'bg-green-50 text-green-600' },
  { name: 'Accessories', icon: Headphones, color: 'bg-indigo-50 text-indigo-600' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Everything you need.</span>{' '}
                  <span className="block text-indigo-600">One marketplace.</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover products from independent stores, all in one place. Experience seamless shopping with multi-tenant isolation and robust security.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#featured" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition">
                      Explore Products
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/stores" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition">
                      Browse Stores
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Shopping" />
        </div>
      </div>

      {/* Popular Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow border border-gray-100 group">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-900 text-sm text-center">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
            <p className="mt-1 text-sm text-gray-500">Handpicked items from our best vendors.</p>
          </div>
          <Link to="/products" className="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            View all products &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} type="product" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
