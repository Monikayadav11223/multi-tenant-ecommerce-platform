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

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

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
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-8">
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
                          <p className="ml-4 text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.storeId?.name || 'Vendor Store'}</p>
                        <p className="mt-1 text-sm text-gray-500">₹{item.price.toLocaleString('en-IN')} each</p>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-indigo-600 transition"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-900 font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-indigo-600 transition"
                            disabled={item.quantity >= item.inventoryCount}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(item._id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center bg-red-50 px-3 py-1.5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8 sm:p-8 lg:mt-0 lg:col-span-4 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900">Order summary</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate (18%)</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">₹{(totalAmount * 0.18).toLocaleString('en-IN')}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-bold text-gray-900">Order total</dt>
                <dd className="text-xl font-black text-gray-900">₹{(totalAmount * 1.18).toLocaleString('en-IN')}</dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <Button to="/checkout" variant="primary" className="w-full text-base h-12 flex justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button to="/" variant="secondary" className="w-full text-base h-12 flex justify-center">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
