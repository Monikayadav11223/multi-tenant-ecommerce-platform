import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { ShoppingCart, Heart, Search, Menu, X, LogOut, User as UserIcon, LayoutDashboard, Settings, ShoppingBag, Store } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const getDashboardLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case 'SuperAdmin':
        return [
          { name: 'Admin Panel', to: '/dashboard/admin', icon: LayoutDashboard },
        ];
      case 'Vendor':
        return [
          { name: 'Vendor Dashboard', to: '/dashboard/vendor', icon: Store },
          { name: 'Products', to: '/dashboard/vendor/products', icon: ShoppingBag },
          { name: 'Settings', to: '/dashboard/vendor/settings', icon: Settings },
        ];
      case 'Customer':
        return [
          { name: 'My Profile', to: '/dashboard/customer', icon: UserIcon },
          { name: 'My Orders', to: '/customer/orders', icon: ShoppingBag },
        ];
      default:
        return [];
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stores', path: '/stores' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed w-full z-50 top-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav className="mx-auto max-w-7xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full pointer-events-auto">
        <div className="px-6 h-20 flex items-center justify-between gap-8">
          
          {/* LEFT: Logo & Main Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-black text-2xl tracking-tighter text-indigo-950">
                Multi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Store</span>
              </span>
            </Link>
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive(link.path) ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* MIDDLE: Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, or stores..."
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block pl-11 pr-24 py-3 shadow-inner transition-all hover:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-1 flex items-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Cart, Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/wishlist" className="text-slate-500 hover:text-indigo-600 transition p-2 rounded-full hover:bg-indigo-50">
              <Heart className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="text-slate-500 hover:text-indigo-600 transition relative p-2 rounded-full hover:bg-indigo-50">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="w-px h-8 bg-slate-200 mx-2"></div>

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-white"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{user.name.split(' ')[0]}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-slate-100 py-2 focus:outline-none overflow-hidden origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-2">
                      {getDashboardLinks().map((link, idx) => (
                        <Link 
                          key={idx} 
                          to={link.to} 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                          <link.icon className="w-4 h-4 mr-3 text-indigo-400 group-hover:text-indigo-600" />
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 py-2">
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" to="/login" className="hidden xl:inline-flex">Log in</Button>
                <Button variant="primary" to="/register">Sign up</Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-4">
            <Link to="/cart" className="text-slate-500 relative p-1">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
          <div className="p-2 space-y-1">
             {/* Mobile search */}
             <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" />
                </div>
             </div>
            {navLinks.map((link) => (
               <Link key={link.name} to={link.path} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50">{link.name}</Link>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-bold text-slate-900">{user.name}</div>
                    <div className="text-xs font-medium text-slate-500">{user.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {getDashboardLinks().map((link, idx) => (
                    <Button key={idx} variant="secondary" size="sm" to={link.to} className="w-full justify-start text-xs">
                      {link.name}
                    </Button>
                  ))}
                  <Button variant="danger" size="sm" onClick={handleLogout} className="w-full justify-start text-xs">
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" to="/login" className="w-full">Log in</Button>
                <Button variant="primary" to="/register" className="w-full">Sign up</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
