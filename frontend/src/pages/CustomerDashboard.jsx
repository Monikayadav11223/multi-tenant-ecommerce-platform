import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Clock, Star, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: products, loading } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Good morning, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="mt-2 text-slate-500 text-lg">Ready to discover something new today?</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/customer/orders" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors text-sm font-semibold text-slate-700">
              <ShoppingBag className="w-4 h-4" />
              Orders
            </Link>
            <Link to="/customer/wishlist" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors text-sm font-semibold text-slate-700">
              <Heart className="w-4 h-4" />
              Wishlist
            </Link>
          </div>
        </motion.div>

        {/* Global Search Bar */}
        <motion.div 
          className="relative max-w-2xl w-full mb-12 shadow-xl shadow-indigo-100/50 rounded-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-indigo-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-4 py-5 bg-white border-none rounded-2xl text-lg text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all"
            placeholder="Search products, stores and categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute inset-y-2 right-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
            Search
          </button>
        </motion.div>

        {/* Categories / Quick Links */}
        <motion.div 
          className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'].map((cat, i) => (
            <motion.button key={i} variants={itemVariants} className="flex-shrink-0 px-6 py-3 bg-white border border-slate-200 rounded-full font-semibold text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm">
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Sections */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
          
          {/* Recommended Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-amber-500" />
                Recommended for you
              </h2>
              <Link to="/products" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-slate-200 animate-pulse h-80 rounded-2xl"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                  <CustomerProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Check back later for new arrivals.</p>
              </div>
            )}
          </motion.section>

          {/* Trending Now */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-rose-500" />
                Trending now
              </h2>
            </div>
            {/* Horizontal scrollable area for trending */}
            <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="flex-shrink-0 w-80 h-48 bg-slate-200 animate-pulse rounded-2xl"></div>)
              ) : (
                products.slice(0, 5).reverse().map(product => (
                  <div key={product._id} className="flex-shrink-0 w-80 h-48 bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer flex">
                     <div className="w-2/5 h-full bg-slate-100 relative overflow-hidden">
                       <img src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div className="w-3/5 p-4 flex flex-col justify-between">
                       <div>
                         <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{product.category || 'Trending'}</span>
                         <h3 className="font-bold text-slate-900 mt-1 line-clamp-2">{product.name}</h3>
                       </div>
                       <div className="font-bold text-lg text-slate-900">₹{product.price}</div>
                     </div>
                  </div>
                ))
              )}
            </div>
          </motion.section>

          {/* Order History Teaser */}
          <motion.section variants={itemVariants} className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full filter blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Track your recent orders</h2>
                <p className="text-indigo-200 text-lg max-w-xl">You have no pending orders at the moment. Explore our marketplace to find your next favorite item.</p>
              </div>
              <Link to="/customer/orders" className="shrink-0 px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                View Order History
              </Link>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
};

// Premium Product Card Component
const CustomerProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col h-full">
      
      {/* Discount Badge */}
      {product.compareAtPrice > product.price && (
        <div className="absolute top-4 left-4 z-20 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          -{Math.round((1 - (product.price / product.compareAtPrice)) * 100)}%
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm">
        <Heart className="w-5 h-5" />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 cursor-pointer">
        <img 
          src={product.images?.[0]?.url || 'https://via.placeholder.com/600'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full py-3 bg-white/90 backdrop-blur-md text-slate-900 font-bold rounded-xl shadow-lg hover:bg-white hover:text-indigo-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1 cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{product.category || 'Store'}</span>
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold ml-1 text-slate-700">4.8</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            {product.compareAtPrice > product.price && (
              <div className="text-sm text-slate-400 line-through mb-0.5">₹{product.compareAtPrice}</div>
            )}
            <div className="text-xl font-extrabold text-slate-900">₹{product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
