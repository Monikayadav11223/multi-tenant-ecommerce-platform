import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowRight, ShieldCheck, MapPin, CreditCard, Lock } from 'lucide-react';
import Button from '../components/ui/Button';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('/api/payments/create-checkout-session', {
        items,
        shippingAddress: formData
      }, config);
      
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error.response?.data?.message || 'Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Secure Checkout</h1>
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Your connection is encrypted and secure
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Forms */}
          <div className="flex-1">
            <form onSubmit={handleCheckout} id="checkout-form" className="space-y-8">
              
              {/* Shipping Information */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><MapPin className="w-32 h-32" /></div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center relative z-10">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">1</span>
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Street Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">State / Province</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Postal Code</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
                  </div>
                </div>
              </div>

              {/* Payment Method Preview */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><CreditCard className="w-32 h-32" /></div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center relative z-10">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">2</span>
                  Payment Method
                </h2>

                <div className="p-6 border border-indigo-200 rounded-2xl bg-indigo-50/50 flex items-start relative z-10">
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-bold text-slate-900">Credit / Debit Card (Stripe)</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      You will be redirected to Stripe's secure checkout page to complete your payment safely.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-12 h-8 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px] text-blue-800">VISA</div>
                      <div className="w-12 h-8 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px] text-red-600">MASTER</div>
                      <div className="w-12 h-8 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px] text-blue-500">AMEX</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-navy-900 rounded-3xl shadow-xl overflow-hidden text-white relative sticky top-32">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="p-8 relative z-10">
                <h2 className="text-xl font-extrabold mb-6">Order Summary</h2>
                
                <div className="mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.productId} className="flex gap-4">
                        <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center"><ShoppingCart className="w-4 h-4 text-slate-400" /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold truncate text-slate-100">{item.name}</h4>
                          <p className="text-xs text-indigo-300 mt-0.5">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold text-white mt-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flow-root mb-6 border-t border-white/10 pt-6">
                  <dl className="space-y-4 text-sm font-medium text-slate-300">
                    <div className="flex items-center justify-between">
                      <dt>Subtotal</dt>
                      <dd className="font-bold text-white">₹{totalAmount.toLocaleString('en-IN')}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-indigo-300">Free</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="border-t border-white/10 pt-6 mb-8 flex items-center justify-between">
                  <div className="text-base font-bold text-slate-300">Total to Pay</div>
                  <div className="text-3xl font-black text-white">₹{totalAmount.toLocaleString('en-IN')}</div>
                </div>

                <div className="space-y-4">
                  <button 
                    type="submit" 
                    form="checkout-form"
                    disabled={loading}
                    className="w-full flex items-center justify-center py-4 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 disabled:bg-slate-700 disabled:shadow-none group"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <Lock className="w-4 h-4 mr-2" /> Pay Securely
                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Payments processed securely by Stripe</p>
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

export default Checkout;
