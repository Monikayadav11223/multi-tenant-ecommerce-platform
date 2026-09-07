import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientText from '../ui/GradientText';

const TrendingSection = ({ products = [] }) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
              🔥 Trending Now
            </h2>
            <p className="text-slate-500 text-lg">
              Handpicked items catching everyone's attention.
            </p>
          </div>
          <Link to="/products" className="group inline-flex items-center text-indigo-600 font-semibold mt-4 md:mt-0 hover:text-indigo-700 transition-colors">
            View all products <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid - to be integrated with real products later */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-500">Loading trending products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* The actual mapping will be handled in Home.jsx or using a ProductCard component */}
          </div>
        )}

      </div>
    </section>
  );
};

export default TrendingSection;
