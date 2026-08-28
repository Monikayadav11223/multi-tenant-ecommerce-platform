import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { IndianRupee, ShoppingBag, Package, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden"
  >
    <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 bg-${color}-500`}></div>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className={`rounded-xl p-2.5 bg-${color}-50 text-${color}-600`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">{value}</h3>
    </div>
  </motion.div>
);

const VendorAnalytics = () => {
  const { user } = useSelector(state => state.auth);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/vendor/analytics', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAnalytics(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="rounded-xl bg-rose-50 p-4 text-rose-800 border border-rose-200">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Analytics</h1>
            <p className="mt-2 text-sm text-gray-500">Track your store's performance and growth.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard 
            title="Total Revenue" 
            value={`₹${analytics?.totalRevenue?.toLocaleString('en-IN') || 0}`} 
            icon={IndianRupee} 
            color="indigo" 
            delay={0.1}
          />
          <StatCard 
            title="Total Orders" 
            value={analytics?.totalOrders || 0} 
            icon={ShoppingBag} 
            color="emerald" 
            delay={0.2}
          />
          <StatCard 
            title="Products Sold" 
            value={analytics?.productsSold || 0} 
            icon={Package} 
            color="blue" 
            delay={0.3}
          />
          <StatCard 
            title="Low Stock Alerts" 
            value={analytics?.lowStockProducts || 0} 
            icon={AlertTriangle} 
            color="amber" 
            delay={0.4}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview (This Year)</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.monthlyRevenue || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue by Month</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.monthlyRevenue || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorAnalytics;
