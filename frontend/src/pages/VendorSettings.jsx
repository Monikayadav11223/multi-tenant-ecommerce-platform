import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Save, User, Lock, Store as StoreIcon, Camera } from 'lucide-react';

const VendorSettings = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Profile State
  const [profileData, setProfileData] = useState({ name: user.name, email: user.email });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

  // Password State
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Store State
  const [storeData, setStoreData] = useState({ name: '', description: '', slug: '' });
  const [storeLoading, setStoreLoading] = useState(false);
  const [storeMessage, setStoreMessage] = useState({ type: '', text: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const res = await axios.get('/api/vendor/store', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.data) {
        setStoreData({
          name: res.data.name,
          description: res.data.description,
          slug: res.data.slug
        });
        if (res.data.logo) {
          setLogoPreview(res.data.logo.url);
        }
      }
    } catch (err) {
      console.error('Failed to fetch store details');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });
    try {
      const res = await axios.put('/api/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      dispatch(setCredentials({ ...res.data, token: user.token }));
      setProfileMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (err) {
      setProfileMessage({ type: 'error', text: err?.response?.data?.message || 'Failed to update profile' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordMessage({ type: 'error', text: 'Passwords do not match' });
    }
    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });
    try {
      await axios.put('/api/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPasswordMessage({ type: 'success', text: 'Password updated successfully' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMessage({ type: 'error', text: err?.response?.data?.message || 'Failed to update password' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    setStoreLoading(true);
    setStoreMessage({ type: '', text: '' });
    
    const formData = new FormData();
    formData.append('name', storeData.name);
    formData.append('description', storeData.description);
    formData.append('slug', storeData.slug);
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      await axios.patch('/api/vendor/store', formData, {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setStoreMessage({ type: 'success', text: 'Store settings updated successfully' });
    } catch (err) {
      setStoreMessage({ type: 'error', text: err?.response?.data?.message || 'Failed to update store settings' });
    } finally {
      setStoreLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-500">Manage your account and store preferences.</p>
        </div>

        <div className="space-y-8">
          {/* Store Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <StoreIcon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Store Settings</h2>
            </div>

            {storeMessage.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm ${storeMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {storeMessage.text}
              </div>
            )}

            <form onSubmit={handleStoreSubmit}>
              <div className="mb-6 flex items-center space-x-6">
                <div className="relative h-24 w-24 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden group">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <StoreIcon className="h-8 w-8" />
                    </div>
                  )}
                  <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-6 w-6 text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setLogoFile(e.target.files[0]);
                          setLogoPreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Store Logo</h3>
                  <p className="text-xs text-gray-500 mt-1">Recommended size: 512x512px (JPG, PNG)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Name</label>
                  <input
                    type="text"
                    value={storeData.name}
                    onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Slug URL</label>
                  <input
                    type="text"
                    value={storeData.slug}
                    onChange={(e) => setStoreData({...storeData, slug: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50"
                    disabled
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={4}
                    value={storeData.description}
                    onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={storeLoading}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {storeLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Store</>}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Profile Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <User className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>

            {profileMessage.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm ${profileMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {profileMessage.text}
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {profileLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Profile</>}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Security Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="rounded-lg bg-rose-50 p-2 text-rose-600">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Security</h2>
            </div>

            {passwordMessage.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm ${passwordMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {passwordMessage.text}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-rose-500 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-rose-500 focus:ring-rose-500"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="mt-1 block w-full rounded-xl border-gray-200 py-2.5 px-3 text-sm focus:border-rose-500 focus:ring-rose-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {passwordLoading ? 'Updating...' : <><Save className="mr-2 h-4 w-4" /> Update Password</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorSettings;
