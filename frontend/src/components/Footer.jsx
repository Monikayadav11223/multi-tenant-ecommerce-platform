import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-black text-2xl tracking-tighter text-white">
                Multi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Store</span>
              </span>
            </Link>
            <p className="text-xl font-medium text-slate-200 mb-4">
              One marketplace. Endless possibilities.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              Connecting independent creators with passionate shoppers. Discover, support, and be part of a more inclusive commerce ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <Phone className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-slate-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="text-slate-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/stores" className="text-slate-400 hover:text-white transition-colors">Featured Stores</Link></li>
              <li><Link to="/deals" className="text-slate-400 hover:text-white transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-6">Sell</h3>
            <ul className="space-y-4">
              <li><Link to="/register" className="text-slate-400 hover:text-white transition-colors">Open a Store</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">Seller Dashboard</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Seller Resources</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MultiStore. All rights reserved.
          </p>
          <div className="flex items-center text-slate-400 text-sm">
            <span>English (IN)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
