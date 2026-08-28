import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Lock, AlertCircle, ShoppingBag } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
        if (user.role === 'Vendor') navigate('/vendor');
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
    <div className="min-h-[calc(100vh-64px)] flex bg-white">
      {/* Left side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
        <div className="relative z-10 px-12 text-center text-white max-w-lg">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/20">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 leading-tight">One marketplace.<br />Endless possibilities.</h1>
          <p className="text-indigo-100 text-lg leading-relaxed">Join thousands of vendors and customers on the most powerful multi-tenant e-commerce platform.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back 👋</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <Input 
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
                placeholder="you@example.com"
              />

              <Input 
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full h-11"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
