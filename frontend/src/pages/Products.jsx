import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { Search, Filter, Box } from 'lucide-react';
import { motion } from 'framer-motion';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Global Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Start Shopping</h1>
            <p className="text-slate-500 mt-2">Discover premium products from verified stores.</p>
          </div>
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-hide">
          <div className="flex items-center gap-2 px-4 py-2 text-slate-500 font-medium">
            <Filter className="w-4 h-4" /> Filters:
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} type="product" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 8) * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Box className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Products Found</h2>
            <p className="text-slate-500 max-w-md text-center">
              We couldn't find any products matching your current filters. Try adjusting your search or category selection.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-8 px-6 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
