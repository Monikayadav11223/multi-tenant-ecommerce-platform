import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/slices/cartSlice';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState 
          icon={ShoppingCart}
          title="Your cart is waiting"
          description="Looks like you haven't added anything to your cart yet. Explore our marketplace to discover amazing products."
          actionText="Continue Shopping"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="hidden sm:grid sm:grid-cols-6 border-b border-slate-100 px-8 py-5 bg-slate-50/50">
                <div className="col-span-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Product</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Price</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Quantity</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Total</div>
              </div>
              
              <ul className="divide-y divide-slate-100">
                {items.map((item) => (
                  <li key={item.productId} className="px-6 py-8 sm:px-8 hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col sm:grid sm:grid-cols-6 sm:items-center gap-6">
                      
                      {/* Product Info */}
                      <div className="col-span-3 flex items-center">
                        <div className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ShoppingCart className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="ml-6 flex-1">
                          <Link to={`/product/${item.productId}`} className="font-bold text-lg text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          {item.storeId && (
                            <p className="mt-1 text-sm text-slate-500 font-medium">Store: {typeof item.storeId === 'object' ? item.storeId.name : item.storeId}</p>
                          )}
                          <button 
                            onClick={() => handleRemove(item.productId)}
                            className="mt-3 text-sm font-semibold text-red-500 hover:text-red-600 flex items-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="hidden sm:block text-center font-bold text-slate-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center sm:justify-center">
                        <div className="flex items-center border border-slate-200 rounded-full bg-white shadow-sm overflow-hidden">
                          <button 
                            onClick={() => dispatch(decreaseQuantity(item.productId))}
                            className="px-3 py-2 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-bold text-slate-900 min-w-[3rem] text-center bg-slate-50/50">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => dispatch(increaseQuantity(item.productId))}
                            disabled={item.inventoryCount !== undefined && item.quantity >= item.inventoryCount}
                            className="px-3 py-2 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:text-slate-300 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        {item.inventoryCount !== undefined && item.quantity >= item.inventoryCount && (
                          <span className="ml-3 text-xs font-semibold text-red-500">Max</span>
                        )}
                      </div>

                      {/* Item Total */}
                      <div className="text-right font-black text-lg text-slate-900 mt-4 sm:mt-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <Button variant="ghost" onClick={() => dispatch(clearCart())} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" /> Clear Cart
                </Button>
                <Link to="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-navy-900 rounded-3xl shadow-xl overflow-hidden text-white relative sticky top-32">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="p-8 relative z-10">
                <h2 className="text-xl font-extrabold mb-6">Order Summary</h2>
                
                <div className="flow-root mb-6">
                  <dl className="space-y-4 text-sm font-medium text-slate-300">
                    <div className="flex items-center justify-between">
                      <dt>Subtotal</dt>
                      <dd className="font-bold text-white">₹{totalAmount.toLocaleString('en-IN')}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-indigo-300">Calculated at checkout</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-indigo-300">Calculated at checkout</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="border-t border-white/10 pt-6 mb-8 flex items-center justify-between">
                  <div className="text-base font-bold text-slate-300">Estimated Total</div>
                  <div className="text-3xl font-black text-white">₹{totalAmount.toLocaleString('en-IN')}</div>
                </div>

                <div className="space-y-4">
                  <Button variant="primary" size="lg" to="/checkout" className="w-full justify-center group shadow-indigo-500/20">
                    Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Secure checkout powered by Stripe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
