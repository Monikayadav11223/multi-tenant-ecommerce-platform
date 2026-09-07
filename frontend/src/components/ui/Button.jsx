import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', size = 'md', to, onClick, className = '', disabled, type = 'button', icon: Icon }) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:opacity-95 hover:-translate-y-0.5 focus:ring-indigo-500 shadow-md',
    secondary: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 focus:ring-indigo-500 shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5 focus:ring-red-500 shadow-sm',
    ghost: 'bg-transparent text-slate-600 hover:text-indigo-600 hover:bg-indigo-50',
    nav: 'bg-transparent text-slate-600 hover:text-indigo-600 font-medium',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
      {children}
    </button>
  );
};

export default Button;
