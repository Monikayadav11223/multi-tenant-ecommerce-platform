import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts, deleteProduct } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Link } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Edit, Copy, Archive, Trash2, ArrowUpDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const VendorProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const handleDelete = () => {
    if (deleteId) {
      dispatch(deleteProduct(deleteId));
      setDeleteId(null);
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your catalog and inventory.</p>
        </div>
        <Link 
          to="/dashboard/products/new" 
          className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-b-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-800"><div className="flex items-center">Price <ArrowUpDown className="w-3 h-3 ml-1"/></div></th>
                <th className="px-6 py-4 cursor-pointer hover:text-slate-800"><div className="flex items-center">Stock <ArrowUpDown className="w-3 h-3 ml-1"/></div></th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 rounded-tr-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-500">Loading products...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-slate-900 font-semibold mb-1">No products found</h3>
                    <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.tr 
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-medium">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 truncate max-w-[200px]">{product.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{product.category || 'Uncategorized'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{product.sku || '-'}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "font-medium",
                        product.inventoryCount === 0 ? "text-rose-600" : 
                        product.inventoryCount <= (product.lowStockThreshold || 5) ? "text-amber-600" : "text-emerald-600"
                      )}>
                        {product.inventoryCount} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border",
                        product.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        product.status === 'Draft' ? "bg-slate-50 text-slate-700 border-slate-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      )}>
                        <span className={clsx("w-1.5 h-1.5 rounded-full mr-1.5", 
                          product.status === 'Active' ? "bg-emerald-500" :
                          product.status === 'Draft' ? "bg-slate-400" : "bg-amber-500"
                        )}></span>
                        {product.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/dashboard/products/${product._id}/edit`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors tooltip" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors tooltip" title="Duplicate">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteId(product._id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors tooltip" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50/50">
          <span className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">{filteredProducts.length}</span> products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-slate-200 rounded-md bg-white text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 text-sm border border-slate-200 rounded-md bg-white text-slate-700 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Product</h3>
              <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-4 py-2 font-medium text-white bg-rose-600 border border-transparent rounded-lg hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default VendorProducts;
