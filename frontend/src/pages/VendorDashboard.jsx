import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Package, ShoppingBag, IndianRupee, AlertTriangle, TrendingUp, TrendingDown, ArrowUpRight, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

// Dummy data for charts
const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const salesOverviewData = [
  { name: 'Week 1', sales: 120 },
  { name: 'Week 2', sales: 200 },
  { name: 'Week 3', sales: 150 },
  { name: 'Week 4', sales: 280 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Alice Smith', amount: 1250, status: 'Completed', date: 'Just now' },
  { id: '#ORD-002', customer: 'Bob Johnson', amount: 850, status: 'Processing', date: '2 hrs ago' },
  { id: '#ORD-003', customer: 'Charlie Brown', amount: 3200, status: 'Pending', date: '5 hrs ago' },
  { id: '#ORD-004', customer: 'Diana Prince', amount: 450, status: 'Completed', date: '1 day ago' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

// A simple animated counter component
const AnimatedCounter = ({ value, prefix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second
    const frames = duration / 16;
    const increment = value / frames;
    
    if (value === 0) {
      setCount(0);
      return;
    }

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{Math.round(count).toLocaleString('en-IN')}</span>;
};


const StatCardItem = ({ title, value, prefix, icon: Icon, trend, trendValue, gradient }) => (
  <motion.div 
    variants={itemVariants}
    className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50`}
  >
    <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 bg-gradient-to-br ${gradient}`}></div>
    
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className={`rounded-xl p-2.5 bg-gradient-to-br ${gradient} bg-opacity-10`}>
        <Icon className="h-5 w-5 text-gray-700" />
      </div>
    </div>
    
    <div className="mt-4 flex items-end justify-between">
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
          <AnimatedCounter value={value} prefix={prefix} />
        </h3>
      </div>
      
      <div className={`flex items-center space-x-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span>{trendValue}</span>
      </div>
    </div>
  </motion.div>
);

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.inventoryCount), 0);
  const lowStock = products.filter(p => p.inventoryCount <= 5);

  return (
    <DashboardLayout>
      <motion.div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Good morning, {user?.name?.split(' ')[0] || 'Vendor'}! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Here's what's happening with your store today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCardItem 
            title="Total Revenue" 
            value={totalValue > 0 ? totalValue : 84250} 
            prefix="₹"
            icon={IndianRupee}
            trend="up"
            trendValue="+12.5%"
            gradient="from-blue-500 to-indigo-600"
          />
          <StatCardItem 
            title="Total Orders" 
            value={142} 
            icon={ShoppingBag}
            trend="up"
            trendValue="+8.2%"
            gradient="from-emerald-400 to-emerald-600"
          />
          <StatCardItem 
            title="Total Products" 
            value={products.length || 24} 
            icon={Package}
            trend="up"
            trendValue="+3.1%"
            gradient="from-violet-400 to-purple-600"
          />
          <StatCardItem 
            title="Low Stock Alerts" 
            value={lowStock.length || 3} 
            icon={AlertTriangle}
            trend="down"
            trendValue="-2.4%"
            gradient="from-amber-400 to-orange-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
              <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Sales Target</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesOverviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <Link to="/vendor/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                View all <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50/50 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold rounded-l-lg">Order ID</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Customer</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Amount</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-4 py-3 font-semibold rounded-r-lg">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-4 py-4 font-medium text-gray-900">{order.id}</td>
                      <td className="px-4 py-4">{order.customer}</td>
                      <td className="px-4 py-4 font-medium text-gray-900">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 flex items-center text-gray-400">
                        <Clock className="mr-1.5 h-4 w-4" />
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Low Stock / Top Products */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              <div className="space-y-4">
                {products.slice(0, 3).map((product, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <Package className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                      <p className="text-xs text-emerald-600 font-medium">{Math.floor(Math.random() * 50) + 10} sold</p>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No products yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-rose-50 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-rose-100">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
                <h2 className="text-lg font-bold text-rose-900">Low Stock Alerts</h2>
              </div>
              <div className="space-y-3">
                {lowStock.slice(0, 3).map((product, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/60 rounded-lg p-3">
                    <span className="text-sm font-medium text-rose-900 truncate max-w-[150px]">{product.name}</span>
                    <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
                      {product.inventoryCount} left
                    </span>
                  </div>
                ))}
                {lowStock.length === 0 && (
                  <p className="text-sm text-rose-600/80">All products are well stocked.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
