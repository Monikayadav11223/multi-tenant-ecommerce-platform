import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { vendorLinks } from './vendorLinks';
import { Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const DashboardLayout = ({ children, links = vendorLinks, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar mobile container */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={clsx(
              "fixed inset-y-0 left-0 z-50 w-72 md:w-64 md:static md:translate-x-0 h-screen",
              !sidebarOpen && "hidden md:block"
            )}
          >
            <Sidebar links={links} mobile={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 min-w-0 md:pl-64">
        {/* Top Navbar */}
        <div className="sticky top-0 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 h-16 shadow-sm">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4 text-slate-500 hover:text-slate-900 focus:outline-none transition-colors">
                  <span className="sr-only">Open sidebar</span>
                  <Menu className="h-6 w-6" />
              </button>
              {title && <h1 className="text-xl font-bold text-slate-900 hidden sm:block">{title}</h1>}
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 pb-12">
          <div className="pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
