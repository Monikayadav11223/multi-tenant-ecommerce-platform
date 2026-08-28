import React from 'react';

const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'product') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
        <div className="h-48 bg-gray-200 w-full"></div>
        <div className="p-5 flex flex-col gap-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="mt-4 flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse overflow-hidden">
        <div className="h-12 bg-gray-100 border-b border-gray-200"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-b border-gray-100 p-4 flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default LoadingSkeleton;
