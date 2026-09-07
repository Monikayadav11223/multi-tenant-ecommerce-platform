import React from 'react';
import { ArrowRight } from 'lucide-react';
import GradientText from '../ui/GradientText';

const categories = [
  { name: 'Electronics', desc: 'Latest tech for a smarter tomorrow.', bg: 'bg-blue-50', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&auto=format&fit=crop' },
  { name: 'Fashion', desc: 'Express your unique style.', bg: 'bg-pink-50', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400&auto=format&fit=crop' },
  { name: 'Home', desc: 'Make your space truly yours.', bg: 'bg-orange-50', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Beauty', desc: 'Glow with what you love.', bg: 'bg-purple-50', img: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Sports', desc: 'Gear up for a healthier you.', bg: 'bg-green-50', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&auto=format&fit=crop' },
  { name: 'Accessories', desc: 'The little things make a big difference.', bg: 'bg-yellow-50', img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=400&auto=format&fit=crop' },
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Explore</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Shop by <GradientText>Category</GradientText>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Explore our wide range of categories tailored just for you.
          </p>
          
          {/* Decorative handwritten text */}
          <div className="absolute right-0 top-0 hidden lg:block transform rotate-6 text-indigo-300 font-serif text-3xl italic opacity-50">
            Find What You Love
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className={`rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-100 ${cat.bg}`}>
              <div className="h-48 overflow-hidden relative">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-8 bg-white/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-slate-500 mb-6">{cat.desc}</p>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;
