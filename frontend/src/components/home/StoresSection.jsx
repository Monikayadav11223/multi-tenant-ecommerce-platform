import React from 'react';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientText from '../ui/GradientText';
import Button from '../ui/Button';

// Mock example fallback stores in case props are empty
const exampleStores = [
  {
    _id: '1',
    name: 'Minimalist Haven',
    slug: 'minimalist-haven',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=100&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 342,
    description: 'Curated minimalist goods for a tranquil home.',
    productCount: 45,
    category: 'Home'
  },
  {
    _id: '2',
    name: 'TechEssentials',
    slug: 'techessentials',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1531297122539-5692b6982f08?q=80&w=100&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 890,
    description: 'The latest gadgets and accessories for your digital life.',
    productCount: 120,
    category: 'Electronics'
  },
  {
    _id: '3',
    name: 'Urban Threads',
    slug: 'urban-threads',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=100&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 512,
    description: 'Streetwear and contemporary fashion for the modern era.',
    productCount: 85,
    category: 'Fashion'
  }
];

const StoresSection = ({ stores = [] }) => {
  const displayStores = stores.length > 0 ? stores.slice(0, 3) : exampleStores;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Our Stores</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Featured <GradientText>Stores</GradientText>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Discover top-rated sellers pushing the boundaries of quality and design.
          </p>
          
          {/* Decorative handwritten text */}
          <div className="absolute right-10 top-0 hidden lg:block transform -rotate-6 text-indigo-300 font-serif text-3xl italic opacity-50">
            Support Independent Creators
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {displayStores.map((store) => (
            <Link key={store._id} to={`/store/${store.slug}`} className="group block relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-slate-900 h-[450px]">
              
              {/* Background Image */}
              <div className="absolute inset-0">
                <img src={store.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600'} alt={store.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
              </div>

              {/* Top Elements */}
              <div className="absolute top-4 inset-x-4 flex justify-between items-start z-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/30">
                  {store.category || 'Featured'}
                </span>
                <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 hover:text-red-400 transition border border-white/30" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img src={store.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(store.name)}&background=random`} alt={store.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{store.name}</h3>
                    <div className="flex items-center text-yellow-400 text-sm mt-1">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span className="text-white font-medium">{store.rating || '4.8'}</span>
                      <span className="text-slate-300 ml-1">({store.reviewCount || '100+'} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-200 text-sm mb-6 line-clamp-2">
                  {store.description || 'Welcome to our store. We offer the best products.'}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{store.productCount || 0} Products</span>
                  <span className="inline-flex items-center text-sm font-medium text-indigo-300 group-hover:text-indigo-200 transition">
                    Explore Store <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center text-center">
          <Button variant="primary" size="lg" to="/stores" className="mb-8">
            Browse All Stores <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center"><Star className="w-4 h-4 text-indigo-500 mr-2" /> Thousands of independent stores</span>
            <span className="hidden md:flex items-center"><Star className="w-4 h-4 text-indigo-500 mr-2" /> Verified sellers</span>
            <span className="hidden sm:flex items-center"><Star className="w-4 h-4 text-indigo-500 mr-2" /> Shop different. Support independent.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StoresSection;
