import React from 'react';
import { PackageX } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ icon: Icon = PackageX, title, description, actionText, actionLink, actionOnClick }) => {
  return (
    <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400 border border-gray-100 shadow-sm">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        actionLink ? (
          <Button to={actionLink} variant="primary">{actionText}</Button>
        ) : (
          <Button onClick={actionOnClick} variant="primary">{actionText}</Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
