import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import { Users, Store, Package, ShoppingBag, CreditCard, Activity } from 'lucide-react';
import { adminLinks } from '../components/layout/adminLinks';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout links={adminLinks} title="SuperAdmin Dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'Admin'}</h1>
        <p className="mt-2 text-gray-600">Platform overview and statistics.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-8"><span className="loader"></span> Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard title="Total Vendors" value={stats?.vendors || 0} icon={Users} />
            <StatCard title="Active Stores" value={stats?.stores || 0} icon={Store} />
            <StatCard title="Total Customers" value={stats?.customers || 0} icon={Users} />
            <StatCard title="Total Products" value={stats?.products || 0} icon={Package} />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-500">More charts and activity can be added here.</p>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
