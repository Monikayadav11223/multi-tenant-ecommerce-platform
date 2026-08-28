import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProductForm from '../components/ui/ProductForm';

const ProductEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading } = useSelector((state) => state.products);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, isEdit]);

  const links = [
    { name: 'Overview', to: '/dashboard', end: true },
    { name: 'Products', to: '/dashboard/products' },
    { name: 'Inventory', to: '/dashboard/inventory' },
    { name: 'Store', to: '/dashboard/store' },
  ];

  return (
    <DashboardLayout  title={isEdit ? 'Edit Product' : 'Create Product'}>
      {loading && isEdit ? (
        <div className="p-8 text-center text-gray-500">Loading product data...</div>
      ) : (
        <ProductForm initialData={isEdit ? currentProduct : null} isEdit={isEdit} />
      )}
    </DashboardLayout>
  );
};

export default ProductEditPage;
