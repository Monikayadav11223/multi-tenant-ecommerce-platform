import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ui/ProductCard';
import EmptyState from '../components/ui/EmptyState';
import { Heart, Loader2 } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      storeId: product.storeId?._id || product.storeId,
      price: product.price,
      name: product.name,
      image: product.images?.[0] || '',
      inventoryCount: product.inventoryCount,
      quantity: 1
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Wishlist</h1>
            <p className="text-slate-500">Products you've saved for later</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
            <p className="text-slate-500 font-medium">Loading your wishlist...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12">
            <EmptyState 
              icon={Heart}
              title="Your wishlist is empty"
              description="Save items you love so you don't lose track of them."
              actionText="Explore Products"
              actionLink="/products"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onToggleWishlist={() => handleRemove(product._id)}
                isWishlisted={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
