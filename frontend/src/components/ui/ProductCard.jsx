import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ImageOff } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, showVendor = true }) => {
  const hasImage = product.images && product.images.length > 0;
  
  return (
    <div className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="text-slate-300 flex flex-col items-center">
            <ImageOff className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.category && (
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md shadow-sm text-xs font-bold text-slate-700 rounded-full">
              {product.category}
            </span>
          )}
          {product.inventoryCount <= 5 && product.inventoryCount > 0 && (
            <span className="px-3 py-1 bg-amber-100/90 backdrop-blur-md shadow-sm text-xs font-bold text-amber-800 rounded-full">
              Only {product.inventoryCount} left
            </span>
          )}
          {product.inventoryCount === 0 && (
            <span className="px-3 py-1 bg-red-100/90 backdrop-blur-md shadow-sm text-xs font-bold text-red-800 rounded-full">
              Out of stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all z-10 border border-white/50">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {showVendor && product.storeId && (
          <p className="text-xs font-bold text-indigo-500 mb-2 uppercase tracking-widest">
            {product.storeId.name || 'Vendor Store'}
          </p>
        )}
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 mb-3">
          <div className="flex text-yellow-400 text-sm">
            ★★★★★
          </div>
          <span className="text-xs font-medium text-slate-400 ml-1.5">(4.8)</span>
        </div>
        
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={product.inventoryCount === 0}
            className="flex items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
