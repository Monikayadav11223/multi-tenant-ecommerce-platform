import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ImageOff } from 'lucide-react';
import Badge from './Badge';

const ProductCard = ({ product, onAddToCart, showVendor = true }) => {
  const hasImage = product.images && product.images.length > 0;
  
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-300 flex flex-col items-center">
            <ImageOff className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.category && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur shadow-sm">
              {product.category}
            </Badge>
          )}
          {product.inventoryCount <= 5 && product.inventoryCount > 0 && (
            <Badge variant="warning" className="bg-amber-100/90 backdrop-blur shadow-sm text-amber-800">
              Only {product.inventoryCount} left
            </Badge>
          )}
          {product.inventoryCount === 0 && (
            <Badge variant="danger" className="bg-red-100/90 backdrop-blur shadow-sm text-red-800">
              Out of stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all z-10">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {showVendor && product.storeId && (
          <p className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wider">
            {product.storeId.name || 'Vendor Store'}
          </p>
        )}
        <Link to={`/product/${product._id}`} className="block mt-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <div className="flex text-amber-400">
            {'★'.repeat(5)}
          </div>
          <span className="text-xs text-gray-500 ml-1">(12)</span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={product.inventoryCount === 0}
            className="flex items-center justify-center p-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed group/btn"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
