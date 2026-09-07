import React from 'react';
import { ShoppingBag, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';
import GradientText from '../ui/GradientText';
import GlassCard from '../ui/GlassCard';

const WhyChooseUsSection = () => {
  return (
    <section className="py-32 bg-navy-900 relative overflow-hidden">
      {/* Background glowing atmospheres */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-glow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-indigo-300 uppercase mb-6 shadow-sm backdrop-blur-sm">
            Why Choose MultiStore?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            More than just shopping.<br/>
            <GradientText>A better way to support creators.</GradientText>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We provide the best ecosystem for buyers and sellers to connect seamlessly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <GlassCard dark className="flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Curated Stores</h3>
            <p className="text-slate-400 flex-grow mb-6">Discover unique, high-quality products handpicked from the best independent creators.</p>
            <button className="flex items-center text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors mt-auto">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </GlassCard>

          {/* Card 2 */}
          <GlassCard dark className="flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group" style={{animationDelay: '100ms'}}>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Secure Checkout</h3>
            <p className="text-slate-400 flex-grow mb-6">Experience bank-grade security with Stripe integrations ensuring your data is always safe.</p>
            <button className="flex items-center text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors mt-auto">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </GlassCard>

          {/* Card 3 */}
          <GlassCard dark className="flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group" style={{animationDelay: '200ms'}}>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-400 flex-grow mb-6">Enjoy a blazing fast shopping experience optimized for both mobile and desktop.</p>
            <button className="flex items-center text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors mt-auto">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </GlassCard>

          {/* Card 4 */}
          <GlassCard dark className="flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group" style={{animationDelay: '300ms'}}>
            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">A Global Marketplace</h3>
            <p className="text-slate-400 flex-grow mb-6">Shop from sellers around the world, directly supporting small businesses globally.</p>
            <button className="flex items-center text-pink-400 hover:text-pink-300 font-semibold text-sm transition-colors mt-auto">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </GlassCard>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
