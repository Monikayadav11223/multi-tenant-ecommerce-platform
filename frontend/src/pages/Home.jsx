import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Smartphone, Shirt, Home as HomeIcon, Sparkles, Trophy, Headphones, 
  ShoppingBag, Store, ShieldCheck, Zap, Star, ArrowRight, CheckCircle2 
} from 'lucide-react';

const categories = [
  { name: 'Electronics', icon: Smartphone, color: 'bg-indigo-50 text-indigo-600', delay: 0.1 },
  { name: 'Fashion', icon: Shirt, color: 'bg-violet-50 text-violet-600', delay: 0.2 },
  { name: 'Home', icon: HomeIcon, color: 'bg-slate-50 text-slate-800', delay: 0.3 },
  { name: 'Beauty', icon: Sparkles, color: 'bg-indigo-50 text-indigo-500', delay: 0.4 },
  { name: 'Sports', icon: Trophy, color: 'bg-violet-50 text-violet-500', delay: 0.5 },
  { name: 'Accessories', icon: Headphones, color: 'bg-slate-50 text-slate-600', delay: 0.6 },
];

const features = [
  { title: "Curated Stores", desc: "Discover unique products from verified independent creators.", icon: Store },
  { title: "Secure Checkout", desc: "Your payments are protected with enterprise-grade security.", icon: ShieldCheck },
  { title: "Lightning Fast", desc: "Experience seamless shopping with optimized performance.", icon: Zap },
];

// Placeholder for Featured Stores Architecture
const featuredStores = [
  { id: 1, name: "Minimalist Haven", category: "Home & Living", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80", rating: 4.9 },
  { id: 2, name: "TechEssentials", category: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80", rating: 4.8 },
  { id: 3, name: "Urban Threads", category: "Fashion", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e08?auto=format&fit=crop&w=800&q=80", rating: 4.7 },
];

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeUpItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <motion.div 
      className="bg-slate-50 min-h-screen font-sans overflow-hidden"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-violet-300/30 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <motion.div 
              className="text-center lg:text-left"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The new standard in commerce</span>
              </motion.div>
              
              <motion.h1 variants={fadeUpItem} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Everything you love. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  One marketplace.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUpItem} className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover curated products from world-class independent creators. Experience seamless shopping, secure checkouts, and a beautifully designed platform.
              </motion.p>
              
              <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/products" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 group">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/stores" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Store className="w-5 h-5" />
                  Explore Stores
                </Link>
              </motion.div>
              
              <motion.div variants={fadeUpItem} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Free Shipping</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Secure Payments</div>
              </motion.div>
            </motion.div>

            {/* Hero Visual Composition */}
            <motion.div 
              className="relative hidden lg:block h-[600px] w-full"
              style={{ y: yHero }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Abstract animated background shapes */}
                <motion.div 
                  className="absolute w-[400px] h-[400px] border border-slate-100 rounded-full"
                  animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute w-[300px] h-[300px] border border-indigo-50/50 rounded-full"
                  animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Floating Cards */}
                <motion.div 
                  className="absolute top-10 left-10 w-48 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white p-4"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-32 bg-indigo-50 rounded-xl mb-3 flex items-center justify-center">
                    <Headphones className="w-10 h-10 text-indigo-400" />
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-20 left-0 w-56 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white p-4 z-20"
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center"><Store className="w-5 h-5 text-violet-600" /></div>
                    <div>
                      <div className="h-3 bg-slate-200 rounded-full w-20 mb-1"></div>
                      <div className="h-2 bg-slate-100 rounded-full w-12"></div>
                    </div>
                  </div>
                  <div className="flex gap-1 text-amber-400 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute top-20 right-0 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] border border-indigo-50 p-5 z-10"
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="h-40 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" alt="Product" className="object-cover w-full h-full mix-blend-multiply opacity-80" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-5 bg-slate-800 rounded w-2/3"></div>
                    <div className="h-5 bg-indigo-100 rounded w-1/4"></div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                  <button className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold">Add to Cart</button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Explore our wide range of categories tailored just for you.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: category.delay }}
                className="group relative bg-slate-50 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${category.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <span className="font-semibold text-slate-800 text-center">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products (Using real API data from Redux) */}
      <section id="featured" className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trending Now</h2>
              <p className="text-slate-500">Handpicked items catching everyone's attention.</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 group">
              View all products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <LoadingSkeleton key={i} type="product" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.1 }}
                >
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Stores Placeholder Architecture */}
      <section className="py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Stores</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Discover top-rated sellers pushing the boundaries of quality and design.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredStores.map((store, idx) => (
              <motion.div 
                key={store.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors z-10" />
                <img src={store.image} alt={store.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-slate-900/90 to-transparent">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium mb-3">
                    {store.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{store.name}</h3>
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{store.rating} Rating</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/stores" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">
              Browse All Stores
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MultiStore</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide the best ecosystem for buyers and sellers to connect seamlessly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-700">
                  <feature.icon className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden bg-indigo-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Ready to transform your shopping experience?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-indigo-100 mb-10"
          >
            Join millions of shoppers and creators on our platform today.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register" className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">
              Get Started for Free
            </Link>
            <Link to="/products" className="px-8 py-4 rounded-xl bg-indigo-700 text-white font-bold hover:bg-indigo-800 transition-colors border border-indigo-500">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <ShoppingBag className="w-8 h-8 text-indigo-500" />
                MultiStore
              </Link>
              <p className="text-sm leading-relaxed max-w-sm mb-6">
                The ultimate marketplace connecting independent creators with passionate shoppers. Experience commerce redefined.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/products" className="hover:text-indigo-400 transition-colors">All Products</Link></li>
                <li><Link to="/categories/electronics" className="hover:text-indigo-400 transition-colors">Electronics</Link></li>
                <li><Link to="/categories/fashion" className="hover:text-indigo-400 transition-colors">Fashion</Link></li>
                <li><Link to="/categories/home" className="hover:text-indigo-400 transition-colors">Home & Living</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Sellers</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/stores" className="hover:text-indigo-400 transition-colors">Browse Stores</Link></li>
                <li><Link to="/sell" className="hover:text-indigo-400 transition-colors">Open a Store</Link></li>
                <li><Link to="/seller-resources" className="hover:text-indigo-400 transition-colors">Seller Resources</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} MultiStore. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Made with ❤️ for great commerce</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
