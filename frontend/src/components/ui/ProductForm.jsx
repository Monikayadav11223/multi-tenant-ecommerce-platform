import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchMyProducts } from '../../redux/slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import { Upload, X, Plus, Trash2, ArrowLeft, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items: products, loading } = useSelector((state) => state.products);
  const existingProduct = products.find(p => p._id === id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    sku: '',
    inventoryCount: '',
    category: '',
    status: 'Active',
    lowStockThreshold: 5,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isEditMode && !existingProduct) {
      dispatch(fetchMyProducts());
    }
  }, [dispatch, isEditMode, existingProduct]);

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        description: existingProduct.description || '',
        price: existingProduct.price || '',
        compareAtPrice: existingProduct.compareAtPrice || '',
        sku: existingProduct.sku || '',
        inventoryCount: existingProduct.inventoryCount || '',
        category: existingProduct.category || '',
        status: existingProduct.status || 'Active',
        lowStockThreshold: existingProduct.lowStockThreshold || 5,
      });
      setExistingImages(existingProduct.images || []);
      setVariants(existingProduct.variants || []);
    }
  }, [existingProduct, isEditMode]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const removeNewImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index) => {
    const newExisting = [...existingImages];
    newExisting.splice(index, 1);
    setExistingImages(newExisting);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { sku: '', price: '', inventoryCount: '', options: { Size: '', Color: '' } }]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleVariantOptionChange = (index, optionKey, value) => {
    const newVariants = [...variants];
    newVariants[index].options = { ...newVariants[index].options, [optionKey]: value };
    setVariants(newVariants);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('data', JSON.stringify({ ...formData, variants, existingImages }));
    images.forEach(image => {
      data.append('images', image);
    });

    if (isEditMode) {
      await dispatch(updateProduct({ id, productData: data }));
    } else {
      await dispatch(createProduct(data));
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate('/dashboard/products');
    }, 1500);
  };

  const InputGroup = ({ label, name, type = "text", placeholder, value, icon, colSpan = 1, min }) => (
    <div className={`col-span-${colSpan}`}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={handleChange} 
          placeholder={placeholder}
          min={min}
          className={`w-full ${icon ? 'pl-9' : 'px-3'} py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm outline-none`}
        />
      </div>
    </div>
  );

  return (
    <DashboardLayout title="">
      <form onSubmit={onSubmit} className="max-w-5xl mx-auto pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sticky top-16 bg-slate-50/90 backdrop-blur-md z-20 py-4 border-b border-slate-200/50">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate('/dashboard/products')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
              <p className="text-sm text-slate-500 hidden sm:block">Fill in the details to list your product.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button type="button" onClick={() => navigate('/dashboard/products')} className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              Discard
            </button>
            <button type="submit" disabled={loading} className="flex-1 sm:flex-none flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white border border-transparent rounded-xl font-bold shadow-sm hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-70">
              {loading ? 'Saving...' : isSaved ? <><CheckCircle className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Product</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Title</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Premium Cotton T-Shirt" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-base outline-none font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe your product..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm outline-none resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Media / Images */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">Product Media</h2>
                <span className="text-xs text-slate-500 font-medium">JPEG, PNG up to 5MB</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                <AnimatePresence>
                  {/* Existing Images */}
                  {existingImages.map((img, index) => (
                    <motion.div key={img.publicId} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                      <img src={img.url} alt={`Existing ${index}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button type="button" onClick={() => removeExistingImage(index)} className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* New Previews */}
                  {imagePreviews.map((preview, index) => (
                    <motion.div key={preview} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                      <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button type="button" onClick={() => removeNewImage(index)} className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-md shadow-sm uppercase tracking-wider">New</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Upload Button */}
                <label className="aspect-square rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-indigo-600">Upload Image</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Product Variants</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage sizes, colors, and options.</p>
                </div>
                <button type="button" onClick={handleAddVariant} className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
                  <Plus className="w-4 h-4 mr-2" /> Add Variant
                </button>
              </div>
              
              <div className="divide-y divide-slate-100">
                {variants.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    No variants added. Product is a single standard item.
                  </div>
                ) : (
                  variants.map((variant, index) => (
                    <motion.div key={index} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-700">Variant {index + 1}</h4>
                        <button type="button" onClick={() => removeVariant(index)} className="text-rose-500 hover:text-rose-600 p-1 bg-rose-50 hover:bg-rose-100 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Size</label>
                          <input type="text" value={variant.options?.Size || ''} onChange={(e) => handleVariantOptionChange(index, 'Size', e.target.value)} placeholder="e.g. Large" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Color</label>
                          <input type="text" value={variant.options?.Color || ''} onChange={(e) => handleVariantOptionChange(index, 'Color', e.target.value)} placeholder="e.g. Blue" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Price (₹)</label>
                          <input type="number" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} placeholder="0.00" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Inventory</label>
                          <input type="number" value={variant.inventoryCount} onChange={(e) => handleVariantChange(index, 'inventoryCount', e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Status & Org */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Organization</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-medium">
                    <option value="Active">🟢 Active</option>
                    <option value="Draft">⚪ Draft</option>
                    <option value="Archived">🗄️ Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Clothing" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Pricing</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">₹</div>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" placeholder="0.00" className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-base font-bold text-slate-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Compare at Price (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">₹</div>
                    <input type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleChange} min="0" placeholder="0.00" className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm text-slate-500 line-through" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">To show a markdown, enter a higher value here.</p>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Inventory</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">SKU (Stock Keeping Unit)</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="e.g. TSHIRT-LG-BLK" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-mono uppercase" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity</label>
                    <input type="number" name="inventoryCount" value={formData.inventoryCount} onChange={handleChange} min="0" placeholder="0" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Low Stock</label>
                    <input type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} min="0" placeholder="5" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ProductForm;
