import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorStore, createVendorStore, updateVendorStore } from '../redux/slices/storeSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const VendorStore = () => {
  const dispatch = useDispatch();
  const { vendorStore, loading } = useSelector((state) => state.store);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    isActive: true,
  });

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    dispatch(fetchVendorStore());
  }, [dispatch]);

  useEffect(() => {
    if (vendorStore) {
      setFormData({
        name: vendorStore.name || '',
        slug: vendorStore.slug || '',
        description: vendorStore.description || '',
        isActive: vendorStore.isActive ?? true,
      });
    }
  }, [vendorStore]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    data.append('description', formData.description);
    data.append('isActive', formData.isActive);
    if (logo) data.append('logo', logo);
    if (banner) data.append('banner', banner);

    if (vendorStore) {
      dispatch(updateVendorStore(data));
    } else {
      dispatch(createVendorStore(data));
    }
  };

  const links = [
    { name: 'Overview', to: '/dashboard', end: true },
    { name: 'Products', to: '/dashboard/products' },
    { name: 'Inventory', to: '/dashboard/inventory' },
    { name: 'Store', to: '/dashboard/store' },
  ];

  return (
    <DashboardLayout  title="Store Settings">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {loading && !vendorStore ? (
            <p>Loading...</p>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Store Name" name="name" value={formData.name} onChange={handleInputChange} required />
          <Input label="Store Slug (URL)" name="slug" value={formData.slug} onChange={handleInputChange} required />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              {vendorStore?.logo && (
                  <img src={vendorStore.logo.url} alt="Logo" className="h-16 mb-2 border rounded" />
              )}
              <input type="file" onChange={(e) => setLogo(e.target.files[0])} accept="image/*" className="text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner</label>
              {vendorStore?.banner && (
                  <img src={vendorStore.banner.url} alt="Banner" className="h-24 w-full object-cover mb-2 border rounded" />
              )}
              <input type="file" onChange={(e) => setBanner(e.target.files[0])} accept="image/*" className="text-sm" />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Store is Active (Publicly visible)
            </label>
          </div>

          <div className="flex justify-end border-t pt-4">
            <Button type="submit" isLoading={loading}>{vendorStore ? 'Update Store' : 'Create Store'}</Button>
          </div>
        </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorStore;
