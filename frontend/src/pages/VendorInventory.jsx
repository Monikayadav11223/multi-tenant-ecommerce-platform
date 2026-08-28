import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts, updateProduct } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';

const VendorInventory = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const handleStockUpdate = (id, newStock) => {
    // Send a patch request
    const formData = new FormData();
    formData.append('data', JSON.stringify({ inventoryCount: newStock }));
    dispatch(updateProduct({ id, productData: formData }));
  };

  const links = [
    { name: 'Overview', to: '/dashboard', end: true },
    { name: 'Products', to: '/dashboard/products' },
    { name: 'Inventory', to: '/dashboard/inventory' },
    { name: 'Store', to: '/dashboard/store' },
  ];

  return (
    <DashboardLayout  title="Inventory">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 overflow-hidden">
         {loading ? (
          <div className="p-8 text-center text-gray-500">Loading inventory...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SKU</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Update</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4">
                      {product.inventoryCount <= (product.lowStockThreshold || 5) && product.inventoryCount > 0 ? (
                          <span className="px-2 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Low Stock</span>
                      ) : product.inventoryCount === 0 ? (
                          <span className="px-2 text-xs font-semibold rounded-full bg-red-100 text-red-800">Out of Stock</span>
                      ) : (
                          <span className="px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        <input 
                           type="number" 
                           defaultValue={product.inventoryCount}
                           onBlur={(e) => {
                               if (e.target.value !== String(product.inventoryCount)) {
                                   handleStockUpdate(product._id, Number(e.target.value));
                               }
                           }}
                           className="w-20 border rounded px-2 py-1 text-sm"
                        />
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                        <Button variant="secondary" size="sm">Save</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VendorInventory;
