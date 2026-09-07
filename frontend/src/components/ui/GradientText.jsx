import React from 'react';

const GradientText = ({ children, className = '', as: Component = 'span' }) => {
  return (
    <Component className={`text-gradient-primary ${className}`}>
      {children}
    </Component>
  );
};

export default GradientText;
