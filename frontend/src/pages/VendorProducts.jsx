import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { LayoutDashboard, Store, Package, ShoppingBag, BarChart3, Plus, Search, Edit, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

const vendorLinks = [
  { name: 'Overview', to: '/vendor', icon: LayoutDashboard, end: true },
  { name: 'My Store', to: '/vendor/store', icon: Store },
  { name: 'Products', to: '/vendor/products', icon: Package },
  { name: 'Orders', to: '/vendor/orders', icon: ShoppingBag },
  { name: 'Analytics', to: '/vendor/analytics', icon: BarChart3 },
];

const VendorProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout links={vendorLinks}>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your catalog, inventory, and pricing.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <Button variant="primary" icon={Plus}>Add Product</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
            />
          </div>
          <div className="flex gap-2">
            <select className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 py-2">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          {product.images?.[0] ? (
                            <img className="h-full w-full object-cover" src={product.images[0]} alt="" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${product.inventoryCount > 5 ? 'bg-green-500' : product.inventoryCount > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-gray-700 font-medium">{product.inventoryCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-gray-400 hover:text-indigo-600 transition"><Edit className="w-5 h-5" /></button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">Get started by creating a new product.</p>
            <div className="mt-6">
              <Button variant="primary" icon={Plus}>Add Product</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorProducts;
