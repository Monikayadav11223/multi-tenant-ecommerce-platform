import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, clearCurrentProduct } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ProductForm = ({ initialData, isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    compareAtPrice: '',
    inventoryCount: '',
    lowStockThreshold: '5',
    sku: '',
    status: 'active',
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);

  const [variantsEnabled, setVariantsEnabled] = useState(false);
  const [variants, setVariants] = useState([]);
  
  // Simple variant option builder for demo: e.g. Color: Red, Blue; Size: S, M
  const [optionsText, setOptionsText] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || '',
        price: initialData.price || '',
        compareAtPrice: initialData.compareAtPrice || '',
        inventoryCount: initialData.inventoryCount || '',
        lowStockThreshold: initialData.lowStockThreshold || '5',
        sku: initialData.sku || '',
        status: initialData.status || 'active',
      });
      setExistingImages(initialData.images || []);
      if (initialData.variants && initialData.variants.length > 0) {
        setVariantsEnabled(true);
        setVariants(initialData.variants);
      }
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const removeExistingImage = (publicId) => {
    setExistingImages(existingImages.filter((img) => img.publicId !== publicId));
    setImagesToRemove([...imagesToRemove, publicId]);
  };

  const generateVariants = () => {
    // Basic parser: "Color: Red, Blue | Size: S, M"
    if (!optionsText) return;
    try {
        const optionGroups = optionsText.split('|').map(g => g.trim());
        const parsedOptions = {};
        optionGroups.forEach(g => {
            const [key, valuesStr] = g.split(':');
            if (key && valuesStr) {
                parsedOptions[key.trim()] = valuesStr.split(',').map(v => v.trim());
            }
        });
        
        // simple cartesian product for 2 options max (for demo)
        const keys = Object.keys(parsedOptions);
        if (keys.length === 1) {
            const newVariants = parsedOptions[keys[0]].map(v => ({
                sku: `${formData.sku || 'SKU'}-${v}`,
                price: formData.price,
                inventoryCount: 0,
                options: { [keys[0]]: v },
                isActive: true
            }));
            setVariants(newVariants);
        } else if (keys.length === 2) {
             const newVariants = [];
             parsedOptions[keys[0]].forEach(v1 => {
                 parsedOptions[keys[1]].forEach(v2 => {
                     newVariants.push({
                        sku: `${formData.sku || 'SKU'}-${v1}-${v2}`,
                        price: formData.price,
                        inventoryCount: 0,
                        options: { [keys[0]]: v1, [keys[1]]: v2 },
                        isActive: true
                     });
                 })
             });
             setVariants(newVariants);
        }
    } catch(err) {
        alert("Invalid options format. Use 'Color: Red, Blue | Size: S, M'");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    const productPayload = {
      ...formData,
      variants: variantsEnabled ? variants : [],
      imagesToRemove
    };

    data.append('data', JSON.stringify(productPayload));
    
    images.forEach((img) => {
      data.append('images', img);
    });

    if (isEdit) {
      await dispatch(updateProduct({ id: initialData._id, productData: data }));
    } else {
      await dispatch(createProduct(data));
    }
    dispatch(clearCurrentProduct());
    navigate('/dashboard/products');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic Info */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          <Input label="Product Name" name="name" value={formData.name} onChange={handleInputChange} required />
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
             <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="description" 
                rows="4" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
             />
          </div>
          <Input label="Category" name="category" value={formData.category} onChange={handleInputChange} required />
        </div>

        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
          <Input label="Price (₹)" type="number" name="price" value={formData.price} onChange={handleInputChange} required />
          <Input label="Compare-at Price (₹)" type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleInputChange} />
        </div>

        {/* Inventory */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Inventory</h3>
          <Input label="SKU (Stock Keeping Unit)" name="sku" value={formData.sku} onChange={handleInputChange} required />
          <Input label="Stock Quantity" type="number" name="inventoryCount" value={formData.inventoryCount} onChange={handleInputChange} required />
          <Input label="Low Stock Threshold" type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleInputChange} />
        </div>

        {/* Status */}
        <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">Publishing Status</h3>
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
            </select>
        </div>

        {/* Images */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900">Images</h3>
          
          {existingImages.length > 0 && (
             <div className="flex gap-4 mb-4 flex-wrap">
                 {existingImages.map(img => (
                     <div key={img.publicId} className="relative w-24 h-24 border rounded">
                         <img src={img.url} className="w-full h-full object-cover rounded" alt="Product" />
                         <button type="button" onClick={() => removeExistingImage(img.publicId)} className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-1 text-xs">X</button>
                     </div>
                 ))}
             </div>
          )}

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (Max 10 images)</p>
                </div>
                <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
          {images.length > 0 && <p className="text-sm text-gray-500">{images.length} new files selected.</p>}
        </div>

        {/* Variants */}
        <div className="space-y-4 md:col-span-2 border-t pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Variants</h3>
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                <input type="checkbox" className="sr-only" checked={variantsEnabled} onChange={() => setVariantsEnabled(!variantsEnabled)} />
                <div className={`block w-10 h-6 rounded-full ${variantsEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${variantsEnabled ? 'transform translate-x-4' : ''}`}></div>
                </div>
            </label>
          </div>

          {variantsEnabled && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <Input 
                     label="Options (e.g. Color: Red, Blue | Size: S, M)" 
                     value={optionsText} 
                     onChange={(e) => setOptionsText(e.target.value)} 
                  />
                  <Button type="button" onClick={generateVariants} variant="secondary" size="sm">Generate Variants</Button>

                  {variants.length > 0 && (
                      <div className="overflow-x-auto mt-4">
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                  <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Variant</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                  {variants.map((variant, index) => (
                                      <tr key={index}>
                                          <td className="px-4 py-2 text-sm">{Object.values(variant.options).join(' / ')}</td>
                                          <td className="px-4 py-2"><input type="text" value={variant.sku} onChange={(e) => { const newV = [...variants]; newV[index].sku = e.target.value; setVariants(newV); }} className="w-full border rounded px-2 py-1 text-sm"/></td>
                                          <td className="px-4 py-2"><input type="number" value={variant.price} onChange={(e) => { const newV = [...variants]; newV[index].price = e.target.value; setVariants(newV); }} className="w-full border rounded px-2 py-1 text-sm"/></td>
                                          <td className="px-4 py-2"><input type="number" value={variant.inventoryCount} onChange={(e) => { const newV = [...variants]; newV[index].inventoryCount = e.target.value; setVariants(newV); }} className="w-full border rounded px-2 py-1 text-sm"/></td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  )}
              </div>
          )}
        </div>

      </div>

      <div className="flex justify-end space-x-4 border-t pt-4">
        <Button type="button" variant="outline" onClick={() => navigate('/dashboard/products')}>Cancel</Button>
        <Button type="submit" isLoading={loading}>{isEdit ? 'Save Changes' : 'Create Product'}</Button>
      </div>
    </form>
  );
};

export default ProductForm;
