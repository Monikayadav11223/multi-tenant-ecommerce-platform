import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, links, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar links={links} />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
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
