import { LayoutDashboard, Users, Store, Package, ShoppingBag } from 'lucide-react';

export const adminLinks = [
  { name: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Vendors', to: '/admin/vendors', icon: Users },
  { name: 'Stores', to: '/admin/stores', icon: Store },
  { name: 'Customers', to: '/admin/customers', icon: Users },
  { name: 'Products', to: '/admin/products', icon: Package },
  { name: 'Orders', to: '/admin/orders', icon: ShoppingBag },
];
