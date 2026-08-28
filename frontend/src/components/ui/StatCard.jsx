import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, trendUp = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && (
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-black text-gray-900">{value}</span>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          {trendLabel && <span className="ml-2 text-gray-500">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
