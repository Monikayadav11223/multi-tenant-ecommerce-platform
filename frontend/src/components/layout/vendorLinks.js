import { LayoutDashboard, Package, ClipboardList, ShoppingBag, Users, BarChart3, Store, Settings } from 'lucide-react';

export const vendorLinks = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'Products', to: '/dashboard/products', icon: Package },
  { name: 'Inventory', to: '/dashboard/inventory', icon: ClipboardList },
  { name: 'Orders', to: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Customers', to: '/dashboard/customers', icon: Users },
  { name: 'Analytics', to: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Store', to: '/dashboard/store', icon: Store },
  { name: 'Settings', to: '/dashboard/settings', icon: Settings },
];
