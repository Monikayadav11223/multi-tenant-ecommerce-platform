import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data fetch since we might not have the public endpoint ready yet,
// but architecture is ready to be swapped with Redux/Axios.
const PublicStore = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);

  useEffect(() => {
    // Simulate fetching store by slug
    setTimeout(() => {
      setStore({
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        description: 'Welcome to our premium boutique. We craft the finest quality goods for our discerning customers.',
        logo: null,
        banner: null,
        products: [
          { _id: '1', name: 'Premium Leather Bag', price: 12900, category: 'Accessories', image: null },
          { _id: '2', name: 'Minimalist Watch', price: 18500, category: 'Jewelry', image: null },
          { _id: '3', name: 'Silk Scarf', price: 4200, category: 'Accessories', image: null },
          { _id: '4', name: 'Canvas Tote', price: 2100, category: 'Bags', image: null },
        ]
      });
      setLoading(false);
    }, 1000);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Store not found</h1>
          <p className="text-slate-500 mb-8">The store you are looking for does not exist or has been removed.</p>
          <Link to="/" className="text-indigo-600 font-bold hover:underline">Return to MultiStore</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Store Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                {store.name.charAt(0)}
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 hidden sm:block">{store.name}</span>
            </div>
            
            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
              <a href="#home" className="hover:text-slate-900 transition-colors">Home</a>
              <a href="#shop" className="hover:text-slate-900 transition-colors">Shop All</a>
              <a href="#categories" className="hover:text-slate-900 transition-colors">Categories</a>
              <a href="#about" className="hover:text-slate-900 transition-colors">Our Story</a>
            </nav>
            
            {/* Actions */}
            <div className="flex items-center gap-5">
              <button className="text-slate-500 hover:text-slate-900 transition-colors"><Search className="w-5 h-5" /></button>
              <button className="text-slate-500 hover:text-slate-900 transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
              </button>
              <button className="md:hidden text-slate-500"><Menu className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[500px] bg-slate-100 flex items-center justify-center overflow-hidden">
        {store.banner ? (
          <img src={store.banner.url} alt="Store Banner" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
          >
            {store.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-200 mb-10"
          >
            {store.description}
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-xl"
          >
            Shop Collection
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Products</h2>
            <p className="text-slate-500 mt-2">Handpicked favorites from our collection.</p>
          </div>
          <a href="#" className="hidden sm:block text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-slate-600 hover:border-slate-600 transition-colors">View All</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {store.products.map((product, idx) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden mb-4">
                {product.image ? (
                   <img src={product.image.url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold group-hover:scale-105 transition-transform duration-700 bg-slate-200">No Image</div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
                  <button className="w-full py-3 bg-white text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                <span className="font-medium text-slate-900">₹{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-10 border-t-8 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-white text-slate-900 flex items-center justify-center font-bold">{store.name.charAt(0)}</div>
                <span className="font-bold text-xl">{store.name}</span>
             </div>
             <p className="text-slate-400 max-w-xs">{store.description}</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Customer Service</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-slate-900 border border-slate-800 px-4 py-2 w-full focus:outline-none focus:border-slate-600 text-white" />
              <button className="bg-white text-slate-900 px-4 py-2 font-bold hover:bg-slate-200">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 flex items-center gap-1">Powered by <Link to="/" className="font-bold text-white hover:text-indigo-400">MultiStore</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default PublicStore;
