import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/ui/Input';
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
      
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Payment session creation failed.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error initiating checkout: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleCheckout}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="Jane Doe" />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} required placeholder="123 Main St" />
                  </div>
                  <div>
                    <Input label="City" name="city" value={formData.city} onChange={handleInputChange} required placeholder="New York" />
                  </div>
                  <div>
                    <Input label="State / Province" name="state" value={formData.state} onChange={handleInputChange} required placeholder="NY" />
                  </div>
                  <div>
                    <Input label="Postal code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required placeholder="10001" />
                  </div>
                  <div>
                    <Input label="Country" name="country" value={formData.country} onChange={handleInputChange} required placeholder="United States" />
                  </div>
                  <div className="sm:col-span-2">
                    <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} type="tel" required placeholder="(555) 555-5555" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-6">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-700">
                    You will be redirected to Stripe's secure checkout page to complete your payment.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? 'Processing...' : `Pay securely with Stripe - ₹${(totalAmount * 1.18).toLocaleString('en-IN')}`}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order summary</h2>
              <ul className="divide-y divide-gray-200 mb-6">
                {items.map((item) => (
                  <li key={item.productId} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                      {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm font-medium text-gray-900 ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <dl className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">Free</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">₹{(totalAmount * 0.18).toLocaleString('en-IN')}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-xl font-black text-gray-900">₹{(totalAmount * 1.18).toLocaleString('en-IN')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
