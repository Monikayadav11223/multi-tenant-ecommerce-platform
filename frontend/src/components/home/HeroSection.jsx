import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Truck, ShieldCheck, Store, Globe, ArrowRight, Star } from 'lucide-react';
import GradientText from '../ui/GradientText';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 inset-x-0 h-full bg-slate-50"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100 via-purple-100 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Pill */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
              <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-indigo-800">The new standard in commerce</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Everything you love.<br />
              <GradientText>One marketplace.</GradientText>
            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Discover curated products from independent creators and trusted stores worldwide. Experience seamless shopping, secure checkouts, and a better way to support what you love.
            </p>

            {/* Search */}
            <div className="relative mb-8 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, or stores..."
                className="w-full bg-white border border-slate-200 text-slate-900 text-base rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block pl-14 pr-32 py-5 shadow-lg shadow-indigo-100/50"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button className="bg-gradient-primary hover:opacity-90 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Gaming', 'More'].map(cat => (
                <Link key={cat} to="/categories" className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-colors">
                  {cat}
                </Link>
              ))}
            </div>

            {/* Trust Row */}
            <div className="flex flex-wrap gap-6 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center"><Truck className="w-4 h-4 text-indigo-600"/></div>
                <span className="text-sm font-medium text-slate-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-indigo-600"/></div>
                <span className="text-sm font-medium text-slate-700">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center"><Store className="w-4 h-4 text-indigo-600"/></div>
                <span className="text-sm font-medium text-slate-700">Independent Stores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center"><Globe className="w-4 h-4 text-indigo-600"/></div>
                <span className="text-sm font-medium text-slate-700">A Global Community</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button size="lg" variant="primary" to="/products">Explore Products <ArrowRight className="w-5 h-5 ml-2" /></Button>
              <Button size="lg" variant="secondary" to="/stores">Explore Stores</Button>
            </div>

            {/* Trusted Shoppers */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-800">10K+</div>
              </div>
              <div>
                <div className="flex text-yellow-400 mb-0.5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="text-sm font-medium text-slate-600">4.8/5 (10,000+ reviews)</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Composition */}
          <div className="relative h-[700px] hidden lg:block">
            {/* Soft floating background shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl animate-glow"></div>
            
            {/* The Pedestal */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-24 bg-white/40 backdrop-blur-md rounded-[100%] shadow-[0_20px_50px_rgba(79,70,229,0.15)] border border-white/50 transform rotate-x-60"></div>

            {/* Floating Product Cards */}
            <div className="absolute inset-0">
              
              {/* Product 1: Headphones */}
              <div className="absolute top-10 right-20 animate-float">
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/60 w-56 transform rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop" alt="Headphones" className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <h3 className="font-bold text-slate-900">Wireless Headphones</h3>
                  <div className="flex items-center text-xs text-yellow-500 mb-2">
                    ★★★★★ <span className="text-slate-500 ml-1">4.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600">From $99</span>
                    <button className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600"><ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>

              {/* Product 2: Smartphone */}
              <div className="absolute top-40 left-0 animate-float-delayed">
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/60 w-52 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="w-full h-36 bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop" alt="Smartphone" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-slate-900">Latest iPhone</h3>
                  <div className="flex items-center text-xs text-yellow-500 mb-2">
                    ★★★★★ <span className="text-slate-500 ml-1">4.9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600">From $699</span>
                    <button className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600"><ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>

              {/* Product 3: Sneaker */}
              <div className="absolute bottom-32 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/60 w-64 transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer z-10">
                  <div className="w-full h-40 bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop" alt="Sneaker" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-slate-900">Nike Air Max</h3>
                  <div className="flex items-center text-xs text-yellow-500 mb-2">
                    ★★★★★ <span className="text-slate-500 ml-1">4.7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600">From $129</span>
                    <button className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600"><ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
