import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardLayout from '../components/layout/DashboardLayout';
import { adminLinks } from '../components/layout/adminLinks';
import Button from '../components/ui/Button';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/customers');
      setCustomers(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this customer?')) {
      try {
        await api.put(`/admin/users/${id}/deactivate`);
        fetchCustomers();
      } catch (err) {
        alert(err?.response?.data?.message || 'Failed to deactivate customer');
      }
    }
  };

  return (
    <DashboardLayout links={adminLinks} title="Manage Customers">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((c) => (
                <tr key={c._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {c.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant={c.isActive !== false ? 'danger' : 'outline'} 
                      size="sm" 
                      onClick={() => handleDeactivate(c._id)}
                    >
                      {c.isActive !== false ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminCustomers;
