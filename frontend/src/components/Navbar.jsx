import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { ShoppingCart, Search, Menu, X, User, LogOut, LayoutDashboard, Store, Package, ShoppingBag, BarChart3, Users } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const getDashboardLinks = () => {
    if (!user) return [];
    if (user.role === 'SuperAdmin') {
      return [
        { name: 'Admin Dashboard', to: '/admin', icon: LayoutDashboard },
        { name: 'Vendors', to: '/admin', icon: Users },
        { name: 'Stores', to: '/admin', icon: Store },
        { name: 'Products', to: '/admin', icon: Package },
      ];
    }
    if (user.role === 'Vendor') {
      return [
        { name: 'Dashboard', to: '/vendor', icon: LayoutDashboard },
        { name: 'My Store', to: '/vendor', icon: Store },
        { name: 'Products', to: '/vendor', icon: Package },
        { name: 'Analytics', to: '/vendor', icon: BarChart3 },
      ];
    }
    return [
      { name: 'Dashboard', to: '/customer', icon: LayoutDashboard },
      { name: 'My Orders', to: '/customer', icon: ShoppingBag },
    ];
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LEFT: Logo & Main Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-black text-2xl tracking-tight text-indigo-600">MultiStore</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Home</Link>
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Stores</Link>
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Products</Link>
            </div>
          </div>

          {/* RIGHT: Search, Cart, Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-indigo-600 transition p-1 rounded-full hover:bg-gray-50">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/cart" className="text-gray-500 hover:text-indigo-600 transition relative p-1 rounded-full hover:bg-gray-50">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>Hello, {user.name.split(' ')[0]}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100 py-2 focus:outline-none overflow-hidden origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {getDashboardLinks().map((link, idx) => (
                        <Link 
                          key={idx} 
                          to={link.to} 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                        >
                          <link.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-indigo-500" />
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition">Log in</Link>
                <Link to="/register" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition transform hover:-translate-y-0.5">Sign up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <Link to="/cart" className="text-gray-500 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Stores</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Products</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-500 mt-1">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {getDashboardLinks().map((link, idx) => (
                    <Link key={idx} to={link.to} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                      {link.name}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-5 space-y-3">
                <Link to="/login" className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Log in</Link>
                <Link to="/register" className="block w-full text-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
