import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ui/ProductCard';

import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import TrendingSection from '../components/home/TrendingSection';
import StoresSection from '../components/home/StoresSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      storeId: product.storeId,
      price: product.price,
      name: product.name,
      image: product.images?.[0] || '',
      inventoryCount: product.inventoryCount,
      quantity: 1
    }));
  };

  // Use up to 8 active products for trending
  const trendingProducts = products?.filter(p => p.status === 'active').slice(0, 8) || [];

  return (
    <div className="bg-slate-50 min-h-screen">
      <HeroSection />
      <CategorySection />
      
      {/* We inline the Trending Products Grid here since ProductCard exists */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
                🔥 Trending Now
              </h2>
              <p className="text-slate-500 text-lg">
                Handpicked items catching everyone's attention.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading trending products...</div>
          ) : trendingProducts.length === 0 ? (
             <div className="text-center py-20 text-slate-500">No products available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      <StoresSection />
      <WhyChooseUsSection />
    </div>
  );
};

export default Home;
