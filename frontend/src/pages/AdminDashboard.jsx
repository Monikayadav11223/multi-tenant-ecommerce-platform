import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchStores, deleteStore, deleteProductAdmin } from '../redux/slices/adminSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import { Users, Store, Package, LayoutDashboard, ShoppingBag, CreditCard, Activity, Settings } from 'lucide-react';
import Button from '../components/ui/Button';

const adminLinks = [
  { name: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Vendors', to: '/admin/vendors', icon: Users },
  { name: 'Stores', to: '/admin/stores', icon: Store },
  { name: 'Customers', to: '/admin/customers', icon: Users },
  { name: 'Products', to: '/admin/products', icon: Package },
  { name: 'Orders', to: '/admin/orders', icon: ShoppingBag },
  { name: 'Payments', to: '/admin/payments', icon: CreditCard },
  { name: 'Analytics', to: '/admin/analytics', icon: Activity },
  { name: 'Settings', to: '/admin/settings', icon: Settings },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, stores, loading } = useSelector((state) => state.admin);
  
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchStores());
  }, [dispatch]);

  const vendorsCount = users.filter(u => u.role === 'Vendor').length;
  const customersCount = users.filter(u => u.role === 'Customer').length;

  return (
    <DashboardLayout links={adminLinks}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
        <p className="mt-2 text-gray-600">Platform overview for {user.name}.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Vendors" value={vendorsCount} icon={Users} />
        <StatCard title="Active Stores" value={stores.length} icon={Store} />
        <StatCard title="Total Customers" value={customersCount} icon={Users} />
        <StatCard title="Platform Revenue" value="₹0" icon={CreditCard} />
      </div>

      <div className="bg-white shadow-sm border border-gray-100 sm:rounded-xl overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button onClick={() => setActiveTab('users')} className={`${activeTab === 'users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}>
              Recent Users
            </button>
            <button onClick={() => setActiveTab('stores')} className={`${activeTab === 'stores' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}>
              Active Stores
            </button>
          </nav>
        </div>

        <div className="p-0">
          {activeTab === 'users' && (
            <ul className="divide-y divide-gray-100">
              {users.slice(0, 10).map((u) => (
                <li key={u._id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-4">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 truncate">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${u.role === 'SuperAdmin' ? 'bg-red-100 text-red-800' : u.role === 'Vendor' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                      {u.role}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'stores' && (
            <ul className="divide-y divide-gray-100">
              {stores.map((store) => (
                <li key={store._id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div>
                    <p className="text-sm font-bold text-gray-900 truncate">{store.name}</p>
                    <p className="text-sm text-gray-500">Vendor: {store.vendorId?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => {
                        if (window.confirm('Delete store?')) dispatch(deleteStore(store._id));
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
