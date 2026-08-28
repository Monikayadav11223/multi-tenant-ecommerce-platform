import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import { LayoutDashboard, Store, Package, ShoppingBag, BarChart3, IndianRupee } from 'lucide-react';
import Button from '../components/ui/Button';

const vendorLinks = [
  { name: 'Overview', to: '/vendor', icon: LayoutDashboard, end: true },
  { name: 'My Store', to: '/vendor/store', icon: Store },
  { name: 'Products', to: '/vendor/products', icon: Package },
  { name: 'Orders', to: '/vendor/orders', icon: ShoppingBag },
  { name: 'Analytics', to: '/vendor/analytics', icon: BarChart3 },
];

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.inventoryCount), 0);
  const lowStock = products.filter(p => p.inventoryCount <= 5).length;

  return (
    <DashboardLayout links={vendorLinks}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="mt-2 text-gray-600">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Total Products" 
          value={products.length} 
          icon={Package}
          trend="Active"
          trendLabel="in catalog"
        />
        <StatCard 
          title="Inventory Value" 
          value={`₹${totalValue.toLocaleString('en-IN')}`} 
          icon={IndianRupee}
        />
        <StatCard 
          title="Orders" 
          value="0" 
          icon={ShoppingBag}
          trend="No new orders"
          trendUp={false}
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={lowStock} 
          icon={BarChart3}
          trend={lowStock > 0 ? 'Needs attention' : 'All good'}
          trendUp={lowStock === 0}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Products</h3>
          <Button to="/vendor/products" variant="secondary" size="sm">View All</Button>
        </div>
        
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.slice(0, 5).map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          {product.images?.[0] && <img className="h-10 w-10 object-cover" src={product.images[0]} alt="" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">₹{product.price.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.inventoryCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.inventoryCount > 5 ? 'bg-green-100 text-green-800' : product.inventoryCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inventoryCount > 5 ? 'Active' : product.inventoryCount > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No products found. Add your first product to get started.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
