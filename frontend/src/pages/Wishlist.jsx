import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWishlist, toggleWishlistItem } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(toggleWishlistItem(productId));
  };

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState 
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love to your wishlist. Review them anytime and easily move them to your cart."
          actionText="Explore Products"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">My Wishlist</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item._id} className="flex py-6 px-6 sm:px-8">
                <div className="flex-shrink-0">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover border border-gray-100 sm:w-32 sm:h-32"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-gray-100 border border-gray-200 sm:w-32 sm:h-32 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">
                        <Link to={`/product/${item._id}`} className="font-bold text-gray-900 hover:text-indigo-600 text-base">
                          {item.name}
                        </Link>
                      </h4>
                      <p className="ml-4 text-lg font-bold text-gray-900">₹{item.price?.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.storeId?.name || 'Vendor Store'}</p>
                  </div>

                  <div className="mt-4 flex-1 flex items-end justify-between">
                    <button
                      type="button"
                      onClick={() => handleRemove(item._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center bg-red-50 px-3 py-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      <span>Remove</span>
                    </button>

                    <Button onClick={() => handleAddToCart(item)} size="sm" className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
