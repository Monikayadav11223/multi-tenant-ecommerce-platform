import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShoppingBag, Store, ShieldCheck } from 'lucide-react';
import GradientText from '../components/ui/GradientText';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
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
    <div className="min-h-screen bg-white flex mt-10">
      
      {/* LEFT: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10">
        
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Welcome<br />
            <GradientText>Back.</GradientText>
          </h1>
          
          <p className="text-slate-500 mb-10">
            Log in to your MultiStore account to continue your journey.
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Link to="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••" />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-8 py-4 px-4 bg-slate-900 hover:bg-indigo-600 text-white text-base font-bold rounded-xl shadow-md transition-colors flex items-center justify-center group disabled:bg-slate-400">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Sign Up</Link>
          </p>

          {/* Bottom Trust Row */}
          <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
            <div className="flex flex-col items-center text-center"><ShoppingBag className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Shop</span></div>
            <div className="flex flex-col items-center text-center"><ShieldCheck className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Secure</span></div>
            <div className="flex flex-col items-center text-center"><Store className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Sell</span></div>
          </div>
        </div>
      </div>

      {/* RIGHT: VISUAL PANEL */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-navy-900">
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Seamless <br/>
            Commerce.
          </h2>
          <p className="text-lg text-slate-300">
            Sign in to access your wishlist, track orders, or manage your independent store.
          </p>
        </div>

        {/* Decorative Image */}
        <div className="absolute right-0 bottom-10 w-[110%] h-[60%] flex items-end justify-end pointer-events-none">
          <img src="https://images.unsplash.com/photo-1550009158-9effb66236b2?q=80&w=800&auto=format&fit=crop" alt="Premium lifestyle" className="w-4/5 h-full object-cover rounded-tl-[100px] shadow-2xl opacity-90 mix-blend-luminosity" />
        </div>

        {/* Decorative Text */}
        <div className="absolute left-12 bottom-32 font-serif text-4xl italic opacity-30 transform -rotate-12 text-indigo-400">
          Explore.<br/>Discover.<br/>Create.
        </div>

      </div>

    </div>
  );
};

export default Login;
