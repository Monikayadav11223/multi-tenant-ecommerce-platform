import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Store, AlertCircle, Eye, EyeOff, Loader2, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
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
    const data = { name, email, password, role };
    if (role === 'Vendor') {
      data.storeName = storeName;
    }
    dispatch(register(data));
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return strength; // 0 to 4
  };
  
  const strength = getPasswordStrength();
  
  const strengthLabel = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = [
    'bg-slate-200',
    'bg-red-500',
    'bg-amber-500',
    'bg-indigo-400',
    'bg-emerald-500'
  ][strength];

  const InputField = ({ label, name, type, value, icon: Icon, showToggle, isToggled, onToggle, required, placeholder }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className={clsx("h-5 w-5 transition-colors duration-200", focusedInput === name ? "text-indigo-600" : "text-slate-400")} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedInput(name)}
          onBlur={() => setFocusedInput(null)}
          required={required}
          placeholder={placeholder}
          className={clsx(
            "block w-full pl-10 py-3 rounded-xl border sm:text-sm transition-all duration-200 outline-none shadow-sm",
            showToggle ? "pr-10" : "pr-3",
            focusedInput === name 
              ? "border-indigo-600 ring-4 ring-indigo-600/10 bg-white" 
              : "border-slate-200 bg-slate-50 hover:bg-white"
          )}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
          >
            {isToggled ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900 selection:bg-indigo-200">
      
      {/* LEFT SIDE - Registration Surface */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 relative overflow-y-auto">
        
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500">Join the MultiStore marketplace.</p>
          </div>

          {/* Segmented Control */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8 relative">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'Customer' })}
              className={clsx(
                "flex-1 flex justify-center items-center py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors",
                role === 'Customer' ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <User className="w-4 h-4 mr-2" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'Vendor' })}
              className={clsx(
                "flex-1 flex justify-center items-center py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors",
                role === 'Vendor' ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Store className="w-4 h-4 mr-2" />
              Vendor
            </button>
            
            {/* Animated Highlight */}
            <motion.div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
              initial={false}
              animate={{ left: role === 'Customer' ? 4 : '50%' }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
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
            
            <InputField label="Full Name" name="name" type="text" value={name} icon={User} required placeholder="John Doe" />
            
            <InputField label="Email address" name="email" type="email" value={email} icon={Mail} required placeholder="you@example.com" />
            
            <div>
              <InputField 
                label="Password" name="password" type={showPassword ? 'text' : 'password'} 
                value={password} icon={Lock} showToggle isToggled={showPassword} 
                onToggle={() => setShowPassword(!showPassword)} required placeholder="••••••••" 
              />
              {/* Password Strength */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-slate-500">Password strength</span>
                      <span className={clsx("text-xs font-bold", strength > 2 ? "text-indigo-600" : "text-slate-500")}>
                        {strengthLabel}
                      </span>
                    </div>
                    <div className="flex gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map(idx => (
                        <div key={idx} className="flex-1 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className={clsx("h-full rounded-full", strengthColor)}
                            initial={{ width: 0 }}
                            animate={{ width: strength >= idx ? '100%' : '0%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <InputField 
              label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} 
              value={confirmPassword} icon={Lock} showToggle isToggled={showConfirmPassword} 
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)} required placeholder="••••••••" 
            />

            <AnimatePresence>
              {role === 'Vendor' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, mt: 0 }}
                  animate={{ opacity: 1, height: 'auto', mt: 20 }}
                  exit={{ opacity: 0, height: 0, mt: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-4">
                    <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider flex items-center">
                      <Store className="w-4 h-4 mr-2" />
                      Store Identity
                    </h3>
                    <InputField label="Store Name" name="storeName" type="text" value={storeName} icon={Store} required placeholder="e.g. Acme Tech" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 transition-colors" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-slate-600">
                  I agree to the <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 overflow-hidden transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              <div className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 pb-10">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE - Cinematic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-slate-950">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 -left-1/4 w-3/4 h-3/4 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float-delayed"></div>
          <div className="absolute top-0 -right-1/4 w-3/4 h-3/4 bg-violet-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-end p-12 w-full">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-2xl font-bold text-white tracking-tight">MultiStore</span>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
            </div>
          </Link>
        </div>

        <div className="relative z-10 px-12 lg:px-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Start your journey.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Join the future.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Create your free account today and discover independent stores, or become a vendor and build your own empire.
            </p>
          </motion.div>

          <div className="mt-12 flex gap-4">
             <div className="glass-dark rounded-xl p-4 flex items-center gap-4 w-64 shadow-2xl animate-float">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                   <Check className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Customer Access</h4>
                   <p className="text-slate-400 text-xs mt-1">Shop thousands of products</p>
                </div>
             </div>
             
             <div className="glass-dark rounded-xl p-4 flex items-center gap-4 w-64 shadow-2xl animate-float-delayed -ml-10 mt-12">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                   <Store className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="text-white font-bold text-sm">Vendor Toolkit</h4>
                   <p className="text-slate-400 text-xs mt-1">Build and scale your brand</p>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Register;
