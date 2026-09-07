import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>
        <div className="space-y-4">
          <Button to="/customer" variant="primary" className="w-full flex justify-center">
            View Order History
          </Button>
          <Button to="/" variant="secondary" className="w-full flex justify-center">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
