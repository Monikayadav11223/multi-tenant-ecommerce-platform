import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardLayout from '../components/layout/DashboardLayout';
import { adminLinks } from '../components/layout/adminLinks';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/orders');
      setOrders(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout links={adminLinks} title="Platform Orders">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center p-8">Loading...</div>
      ) : (
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((o) => (
                <tr key={o._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{o._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{o.customerId?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{o.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{o.status}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminOrders;
