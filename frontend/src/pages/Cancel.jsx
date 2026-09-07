import React from 'react';
import { XCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const Cancel = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Cancelled</h2>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges were made. You can try again when you're ready.
        </p>
        <div className="space-y-4">
          <Button to="/checkout" variant="primary" className="w-full flex justify-center">
            Try Again
          </Button>
          <Button to="/cart" variant="secondary" className="w-full flex justify-center">
            Return to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
