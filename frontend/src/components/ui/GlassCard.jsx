import React from 'react';

const GlassCard = ({ children, className = '', dark = false }) => {
  const baseStyle = dark ? 'glass-dark text-white' : 'glass text-slate-900';
  return (
    <div className={`rounded-3xl p-8 ${baseStyle} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
