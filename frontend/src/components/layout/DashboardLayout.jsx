import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { vendorLinks } from './vendorLinks';
import { Menu, X } from 'lucide-react';

const DashboardLayout = ({ children, links = vendorLinks, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar wrapper */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar links={links} mobile={true} />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
            </button>
            <span className="text-lg font-bold">Vendor Dashboard</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {title && <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
