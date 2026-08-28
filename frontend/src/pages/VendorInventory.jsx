import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts, updateProduct } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Search, Package, AlertTriangle, XCircle, CheckCircle2, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const VendorInventory = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const handleStockUpdate = (id, newStock) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ inventoryCount: newStock }));
    dispatch(updateProduct({ id, productData: formData }));
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.inventoryCount > (p.lowStockThreshold || 5)).length,
    lowStock: products.filter(p => p.inventoryCount > 0 && p.inventoryCount <= (p.lowStockThreshold || 5)).length,
    outOfStock: products.filter(p => p.inventoryCount === 0).length,
  };

  return (
    <DashboardLayout title="">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor stock levels and make quick adjustments.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Products', value: stats.total, icon: Package, color: 'indigo' },
          { label: 'In Stock', value: stats.inStock, icon: CheckCircle2, color: 'emerald' },
          { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'amber' },
          { label: 'Out of Stock', value: stats.outOfStock, icon: XCircle, color: 'rose' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={clsx(
              "bg-white border rounded-2xl p-6 shadow-sm relative overflow-hidden",
              stat.color === 'amber' ? "border-amber-200 bg-amber-50/30" : 
              stat.color === 'rose' ? "border-rose-200 bg-rose-50/30" : "border-slate-200"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
                <h3 className={clsx(
                  "text-3xl font-extrabold",
                  stat.color === 'amber' ? "text-amber-600" :
                  stat.color === 'rose' ? "text-rose-600" : "text-slate-900"
                )}>
                  {stat.value}
                </h3>
              </div>
              <div className={clsx(
                "p-3 rounded-xl",
                stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                stat.color === 'amber' ? "bg-amber-100 text-amber-600" :
                "bg-rose-100 text-rose-600"
              )}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            {stat.color === 'amber' && stat.value > 0 && (
              <div className="mt-4 flex items-center text-xs font-semibold text-amber-600 bg-amber-100/50 p-2 rounded-lg">
                <TrendingDown className="w-3 h-3 mr-1" /> Action needed soon
              </div>
            )}
            {stat.color === 'rose' && stat.value > 0 && (
              <div className="mt-4 flex items-center text-xs font-semibold text-rose-600 bg-rose-100/50 p-2 rounded-lg animate-pulse">
                Restock immediately
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by SKU or name..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Threshold</th>
                <th className="px-6 py-4 text-right">Quick Edit Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">Loading inventory...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No products found.</td>
                  </tr>
                ) : (
                  products.map((product) => {
                    const isLowStock = product.inventoryCount > 0 && product.inventoryCount <= (product.lowStockThreshold || 5);
                    const isOutOfStock = product.inventoryCount === 0;

                    return (
                      <motion.tr 
                        key={product._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={clsx(
                          "transition-colors group",
                          isOutOfStock ? "bg-rose-50/30 hover:bg-rose-50/60" :
                          isLowStock ? "bg-amber-50/30 hover:bg-amber-50/60" : "hover:bg-slate-50"
                        )}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                              {product.images?.[0] && <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <div className="font-semibold text-slate-900 truncate max-w-[250px]">{product.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{product.sku || '-'}</td>
                        <td className="px-6 py-4">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5 animate-pulse"></span> Out of Stock
                            </span>
                          ) : isLowStock ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs font-medium">
                          &lt;= {product.lowStockThreshold || 5} units
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <div className="relative flex items-center max-w-[120px]">
                              <button 
                                onClick={() => handleStockUpdate(product._id, Math.max(0, product.inventoryCount - 1))}
                                className="w-8 h-8 flex justify-center items-center bg-slate-100 border border-slate-200 rounded-l-lg hover:bg-slate-200 text-slate-600 transition-colors"
                              >
                                &minus;
                              </button>
                              <input 
                                type="number" 
                                value={product.inventoryCount}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val) && val >= 0) {
                                    handleStockUpdate(product._id, val);
                                  }
                                }}
                                className="w-14 h-8 text-center border-y border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 z-10 hide-arrows"
                              />
                              <button 
                                onClick={() => handleStockUpdate(product._id, product.inventoryCount + 1)}
                                className="w-8 h-8 flex justify-center items-center bg-slate-100 border border-slate-200 rounded-r-lg hover:bg-slate-200 text-slate-600 transition-colors"
                              >
                                &#43;
                              </button>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows {
          -moz-appearance: textfield;
        }
      `}} />
    </DashboardLayout>
  );
};

export default VendorInventory;
