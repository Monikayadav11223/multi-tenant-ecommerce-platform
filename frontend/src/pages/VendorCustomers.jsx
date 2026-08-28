import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Users, Search, IndianRupee, ShoppingBag } from 'lucide-react';

const VendorCustomers = () => {
  const { user } = useSelector(state => state.auth);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/vendor/customers', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCustomers(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Customers</h1>
            <p className="mt-2 text-sm text-gray-500">People who have purchased from your store.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers..."
                className="block w-full rounded-xl border-gray-200 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="rounded-xl bg-rose-50 p-4 text-rose-800 border border-rose-200">{error}</div>
        ) : customers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No customers yet</h3>
            <p className="mt-1 text-sm text-gray-500">When you get orders, customers will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer, index) => (
              <motion.div
                key={customer._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500 flex items-center mb-1">
                      <ShoppingBag className="mr-1 h-3 w-3" /> Orders
                    </p>
                    <p className="text-lg font-semibold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 flex items-center mb-1">
                      <IndianRupee className="mr-1 h-3 w-3" /> Total Spent
                    </p>
                    <p className="text-lg font-semibold text-gray-900">₹{customer.totalSpent.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorCustomers;
