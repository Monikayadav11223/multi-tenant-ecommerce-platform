import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorStore, createVendorStore, updateVendorStore } from '../redux/slices/storeSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Store, Link as LinkIcon, Image as ImageIcon, CheckCircle, ExternalLink, Loader2, Save } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [logoPreview, setLogoPreview] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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
      if (vendorStore.logo?.url) setLogoPreview(vendorStore.logo.url);
      if (vendorStore.banner?.url) setBannerPreview(vendorStore.banner.url);
    }
  }, [vendorStore]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setIsSaved(false);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') { setLogo(file); setLogoPreview(reader.result); }
        else { setBanner(file); setBannerPreview(reader.result); }
      };
      reader.readAsDataURL(file);
      setIsSaved(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    data.append('description', formData.description);
    data.append('isActive', formData.isActive);
    if (logo) data.append('logo', logo);
    if (banner) data.append('banner', banner);

    if (vendorStore) {
      await dispatch(updateVendorStore(data));
    } else {
      await dispatch(createVendorStore(data));
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout title="">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Store Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your brand identity and public storefront.</p>
        </div>
        <div className="flex gap-3">
          <a href={`/store/${formData.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-sm transition-all">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Live Store
          </a>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Settings Form */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <Store className="w-5 h-5 mr-2 text-indigo-500" />
              Store Identity
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Store Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                  <LinkIcon className="w-3.5 h-3.5 mr-1" /> Store URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-sm">multistore.com/store/</span>
                  <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm outline-none font-mono" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm outline-none resize-none" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-violet-500" />
              Branding
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center bg-slate-50">
                    {logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <Store className="w-6 h-6 text-slate-400" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" id="logoUpload" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} />
                    <label htmlFor="logoUpload" className="inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg cursor-pointer transition-colors">
                      Upload Logo
                    </label>
                    <p className="text-xs text-slate-500 mt-2">Recommended: 256x256px transparent PNG.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Banner</label>
                <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center bg-slate-50 relative group">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  )}
                  <input type="file" id="bannerUpload" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} />
                  <label htmlFor="bannerUpload" className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow-sm">Upload Banner</span>
                  </label>
                </div>
                <p className="text-xs text-slate-500 mt-2">Recommended: 1200x400px JPG or PNG.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-2">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Live Storefront Preview</h2>
          <div className="border-[8px] border-slate-800 rounded-3xl overflow-hidden bg-white shadow-2xl relative aspect-[4/3] xl:aspect-auto xl:h-[calc(100%-2rem)] flex flex-col">
            
            {/* Browser chrome */}
            <div className="h-6 bg-slate-800 flex items-center px-4 gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <div className="mx-auto px-4 py-0.5 bg-slate-700 rounded-md text-[10px] text-slate-300 font-mono truncate max-w-[200px]">
                multistore.com/store/{formData.slug || 'slug'}
              </div>
            </div>

            {/* Simulated Storefront */}
            <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar pointer-events-none">
              
              {/* Header */}
              <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50 flex items-center justify-center">
                       {logoPreview ? <img src={logoPreview} className="w-full h-full object-cover" /> : <Store className="w-5 h-5 text-slate-300" />}
                    </div>
                    <span className="font-bold text-slate-900 text-lg">{formData.name || 'Store Name'}</span>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-20 h-2 bg-slate-200 rounded"></div>
                    <div className="w-16 h-2 bg-slate-200 rounded"></div>
                 </div>
              </div>

              {/* Banner */}
              <div className="h-48 md:h-64 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                 {bannerPreview ? (
                    <img src={bannerPreview} className="absolute inset-0 w-full h-full object-cover" />
                 ) : (
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2 shadow-sm">{formData.name || 'Store Name'}</h1>
                    <p className="text-slate-200 text-sm max-w-lg line-clamp-2">{formData.description || 'Welcome to our store. We sell the best products.'}</p>
                 </div>
              </div>

              {/* Grid Placeholder */}
              <div className="p-6">
                 <div className="w-32 h-4 bg-slate-200 rounded mb-6"></div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                       <div key={i} className="bg-white border border-slate-100 rounded-xl p-3">
                          <div className="aspect-square bg-slate-100 rounded-lg mb-3"></div>
                          <div className="w-3/4 h-2 bg-slate-200 rounded mb-2"></div>
                          <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                       </div>
                    ))}
                 </div>
              </div>
            </div>
            
            {/* Overlay if not active */}
            {!formData.isActive && (
              <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-xl p-4 shadow-2xl flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="font-bold text-slate-900">Store is currently inactive</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorStore;
