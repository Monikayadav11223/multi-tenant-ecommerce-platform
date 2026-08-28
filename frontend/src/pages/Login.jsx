import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ShoppingBag, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from);
      } else {
        if (user.role === 'Vendor') navigate('/dashboard');
        else if (user.role === 'Customer') navigate('/customer');
        else if (user.role === 'SuperAdmin') navigate('/admin');
        else navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate, dispatch, location]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900 selection:bg-indigo-200">
      
      {/* LEFT SIDE - Cinematic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-slate-950">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-1/4 w-3/4 h-3/4 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float"></div>
          <div className="absolute bottom-0 -right-1/4 w-3/4 h-3/4 bg-violet-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float-delayed"></div>
        </div>

        {/* Floating Particles / Abstract Shapes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="absolute left-[10%] top-[20%] animate-float" width="120" height="120" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          <svg className="absolute right-[15%] top-[60%] animate-float-delayed" width="80" height="80" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" stroke="white" strokeWidth="1" transform="rotate(45 50 50)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center p-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">MultiStore</span>
          </Link>
        </div>

        <div className="relative z-10 px-12 lg:px-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Shop smarter.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Build bigger.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Join thousands of vendors and customers on the most powerful multi-tenant e-commerce platform. Your marketplace awaits.
            </p>
          </motion.div>

          {/* Floating Product Cards (Visual only) */}
          <motion.div 
            className="mt-12 relative h-48 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 glass-dark rounded-2xl p-4 w-48 shadow-2xl animate-float z-20 rotate-[-4deg]">
              <div className="w-full h-24 bg-slate-800 rounded-lg mb-3"></div>
              <div className="w-3/4 h-3 bg-slate-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-indigo-500 rounded"></div>
            </div>
            <div className="absolute top-8 left-32 glass-dark rounded-2xl p-4 w-56 shadow-2xl animate-float-delayed z-10 rotate-[6deg]">
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
                <div>
                  <div className="w-24 h-3 bg-slate-700 rounded mb-2 mt-1"></div>
                  <div className="w-16 h-2 bg-slate-600 rounded"></div>
                </div>
              </div>
              <div className="w-full h-8 bg-violet-500/20 rounded border border-violet-500/30 mt-4"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE - Authentication Surface */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 relative overflow-hidden">
        
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">MultiStore</span>
          </Link>
        </div>

        <motion.div 
          className="mx-auto w-full max-w-md z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500">Sign in to continue to your marketplace.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, mb: 0 }}
                animate={{ opacity: 1, height: 'auto', mb: 24 }}
                exit={{ opacity: 0, height: 0, mb: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start shadow-sm">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Custom Input: Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={clsx("h-5 w-5 transition-colors duration-200", focusedInput === 'email' ? "text-indigo-600" : "text-slate-400")} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  placeholder="you@example.com"
                  className={clsx(
                    "block w-full pl-10 pr-3 py-3 rounded-xl border sm:text-sm transition-all duration-200 outline-none shadow-sm",
                    focusedInput === 'email' 
                      ? "border-indigo-600 ring-4 ring-indigo-600/10 bg-white" 
                      : "border-slate-200 bg-slate-50 hover:bg-white"
                  )}
                />
              </div>
            </div>

            {/* Custom Input: Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={clsx("h-5 w-5 transition-colors duration-200", focusedInput === 'password' ? "text-indigo-600" : "text-slate-400")} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  placeholder="••••••••"
                  className={clsx(
                    "block w-full pl-10 pr-10 py-3 rounded-xl border sm:text-sm transition-all duration-200 outline-none shadow-sm",
                    focusedInput === 'password' 
                      ? "border-indigo-600 ring-4 ring-indigo-600/10 bg-white" 
                      : "border-slate-200 bg-slate-50 hover:bg-white"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 transition-colors" 
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">Remember me</label>
              </div>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 overflow-hidden transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {/* Button gradient shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              
              <div className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
      
      {/* Global Shimmer Animation definition */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Login;
