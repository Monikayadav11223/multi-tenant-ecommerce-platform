import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, ShoppingBag, Store, Globe, TrendingUp } from 'lucide-react';
import GradientText from '../components/ui/GradientText';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    storeName: '',
  });

  const { name, email, password, confirmPassword, role, storeName } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated && user) {
      if (user.role === 'Vendor') navigate('/dashboard');
      else if (user.role === 'Customer') navigate('/customer');
      else navigate('/');
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!agreed) {
      alert("You must agree to the Terms of Service.");
      return;
    }
    const data = { name, email, password, role };
    if (role === 'Vendor') {
      data.storeName = storeName;
    }
    dispatch(register(data));
  };

  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-slate-200' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-400 w-1/3' };
    if (password.length < 10) return { label: 'Good', color: 'bg-yellow-400 w-2/3' };
    return { label: 'Strong', color: 'bg-green-500 w-full' };
  };

  const passStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-white flex mt-10">
      
      {/* LEFT: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10">
        
        {/* Top Role Switcher (Replaces generic tabs for a premium feel) */}
        <div className="absolute top-8 right-8 flex bg-slate-100 p-1 rounded-full">
          <button 
            onClick={() => setFormData({...formData, role: 'Customer'})}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${role === 'Customer' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Customer
          </button>
          <button 
            onClick={() => setFormData({...formData, role: 'Vendor'})}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${role === 'Vendor' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Vendor
          </button>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Badge */}
          <span className={`inline-block px-3 py-1 text-xs font-bold tracking-widest rounded-full mb-6 ${role === 'Vendor' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
            {role.toUpperCase()}
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Create Your<br />
            {role === 'Vendor' ? 'Vendor Account' : 'Account'}
          </h1>
          
          <p className="text-slate-500 mb-10">
            {role === 'Vendor' 
              ? 'Start your journey as a seller. Reach millions of customers and grow your brand with MultiStore.'
              : 'Join millions of shoppers and discover amazing products from independent stores around the world.'}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <input type="text" name="name" value={name} onChange={onChange} required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input type="email" name="email" value={email} onChange={onChange} required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="you@example.com" />
              </div>
            </div>

            {role === 'Vendor' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Store Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Store className="h-5 w-5" />
                  </div>
                  <input type="text" name="storeName" value={storeName} onChange={onChange} required
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                    placeholder="My Awesome Store" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={onChange} required
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••" />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
              </div>
              {password && (
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-1.5 flex-grow bg-slate-100 rounded-full overflow-hidden mr-3">
                    <div className={`h-full rounded-full transition-all ${passStrength.color}`}></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{passStrength.label}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={confirmPassword} onChange={onChange} required
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-start mt-6">
              <input type="checkbox" id="terms" checked={agreed} onChange={() => setAgreed(!agreed)} className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-6 py-4 px-4 bg-slate-900 hover:bg-indigo-600 text-white text-base font-bold rounded-xl shadow-md transition-colors flex items-center justify-center group disabled:bg-slate-400">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {role === 'Vendor' ? 'Create Vendor Account' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Sign In</Link>
          </p>

          {/* Bottom Benefits */}
          <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
            {role === 'Customer' ? (
              <>
                <div className="flex flex-col items-center text-center"><ShoppingBag className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Unique Products</span></div>
                <div className="flex flex-col items-center text-center"><ShieldCheck className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Secure Shopping</span></div>
                <div className="flex flex-col items-center text-center"><Store className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Support Creators</span></div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center text-center"><Store className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Your Own Store</span></div>
                <div className="flex flex-col items-center text-center"><Globe className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Reach More Customers</span></div>
                <div className="flex flex-col items-center text-center"><TrendingUp className="w-5 h-5 text-slate-400 mb-1" /><span className="text-xs font-medium text-slate-500">Powerful Tools</span></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: VISUAL PANEL */}
      <div className={`hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden transition-colors duration-1000 ${role === 'Customer' ? 'bg-lavender-100' : 'bg-mint-100'}`}>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {role === 'Customer' ? (
              <>Discover<br /><GradientText>More.</GradientText></>
            ) : (
              <>Turn Your<br />Passion Into<br /><span className="text-emerald-600">a Business.</span></>
            )}
          </h2>
          <p className="text-lg text-slate-600">
            {role === 'Customer' 
              ? 'Immerse yourself in a marketplace designed for those who appreciate quality and independence.' 
              : 'Join thousands of successful sellers making a living doing what they love.'}
          </p>
        </div>

        {/* Decorative Image Scene */}
        <div className="absolute right-0 bottom-10 w-[120%] h-[60%] flex items-end justify-end pointer-events-none">
          {role === 'Customer' ? (
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" alt="Shopping lifestyle" className="w-4/5 h-full object-cover rounded-tl-[100px] shadow-2xl" />
          ) : (
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800&auto=format&fit=crop" alt="Vendor workspace" className="w-4/5 h-full object-cover rounded-tl-[100px] shadow-2xl" />
          )}
        </div>

        {/* Decorative Text */}
        <div className={`absolute left-12 bottom-48 font-serif text-4xl italic opacity-40 transform -rotate-12 ${role === 'Customer' ? 'text-indigo-600' : 'text-emerald-600'}`}>
          {role === 'Customer' ? (
            <>Good Products<br/>Brighter People</>
          ) : (
            <>Independent<br/>Brands<br/>Bigger<br/>Tomorrow</>
          )}
        </div>

        {/* Floating Stats Card */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl max-w-sm mb-8 border border-white/60 flex items-center justify-between">
          {role === 'Customer' ? (
            <>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">1M+</div>
                <div className="text-xs text-slate-500 font-medium">Happy Shoppers</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">50K+</div>
                <div className="text-xs text-slate-500 font-medium">Unique Products</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">10K+</div>
                <div className="text-xs text-slate-500 font-medium">Active Stores</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">1M+</div>
                <div className="text-xs text-slate-500 font-medium">Customers</div>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};

export default Register;
