import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Filter, X, ChevronDown, Check, Clock, Truck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorOrders = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/vendor/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setStatusToUpdate(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || statusToUpdate === selectedOrder.status) return;
    
    try {
      setUpdating(true);
      const res = await axios.patch(`/api/vendor/orders/${selectedOrder._id}`, 
        { status: statusToUpdate },
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
      
      setOrders(orders.map(o => o._id === selectedOrder._id ? res.data : o));
      closeModal();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update order');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Paid': return 'bg-indigo-100 text-indigo-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Cancelled': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Orders</h1>
            <p className="mt-2 text-sm text-gray-500">Manage and track your customer orders.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="block w-full rounded-xl border-gray-200 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="rounded-xl bg-rose-50 p-4 text-rose-800 border border-rose-200">{error}</div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr 
                      key={order._id} 
                      onClick={() => openModal(order)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-indigo-600">#{order._id.substring(18).toUpperCase()}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{order.customerId?.name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{order.customerId?.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{order.products.reduce((acc, p) => acc + p.quantity, 0)} items</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"
                onClick={closeModal}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative inline-block w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:align-middle"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold leading-6 text-gray-900 flex items-center">
                        Order #{selectedOrder._id.substring(18).toUpperCase()}
                        <span className={`ml-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="rounded-full bg-gray-100 p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Customer details */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-gray-400" /> Customer Details
                        </h4>
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-sm font-medium text-gray-900">{selectedOrder.customerId?.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{selectedOrder.customerId?.email}</p>
                        </div>
                      </div>
                      
                      {/* Shipping details */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                          <Truck className="mr-2 h-4 w-4 text-gray-400" /> Shipping Address
                        </h4>
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="text-sm text-gray-700">{selectedOrder.shippingAddress?.address}</p>
                          <p className="text-sm text-gray-700">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
                          <p className="text-sm text-gray-700">{selectedOrder.shippingAddress?.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {selectedOrder.products.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              {item.productId?.images?.[0] ? (
                                <img src={item.productId.images[0].url || item.productId.images[0]} alt="" className="h-full w-full object-cover object-center" />
                              ) : (
                                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                  <Package className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.productId?.name || 'Deleted Product'}</div>
                              <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                    <div className="text-sm font-medium text-gray-900">Total Amount</div>
                    <div className="text-xl font-bold text-gray-900">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</div>
                  </div>

                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Update Order Status</h4>
                    <div className="flex items-center space-x-3">
                      <select
                        value={statusToUpdate}
                        onChange={(e) => setStatusToUpdate(e.target.value)}
                        className="block w-full rounded-xl border-gray-200 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={handleStatusUpdate}
                        disabled={updating || statusToUpdate === selectedOrder.status}
                        className="inline-flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating ? 'Saving...' : 'Update Status'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default VendorOrders;
