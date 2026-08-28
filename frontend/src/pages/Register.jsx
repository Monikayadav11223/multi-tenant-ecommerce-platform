import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Lock, User, Store, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    storeName: '',
    storeDescription: '',
  });

  const { name, email, password, confirmPassword, role, storeName, storeDescription } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated && user) {
      if (user.role === 'Vendor') navigate('/vendor');
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
      data.storeDescription = storeDescription;
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
    return strength;
  };
  
  const strength = getPasswordStrength();
  const strengthColors = ['bg-gray-200', 'bg-red-500', 'bg-amber-500', 'bg-green-400', 'bg-green-600'];

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md flex">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={onSubmit}>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'Customer' })}
                className={`py-3 px-4 border rounded-xl text-sm font-semibold flex items-center justify-center transition ${role === 'Customer' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                <User className={`w-4 h-4 mr-2 ${role === 'Customer' ? 'text-indigo-600' : 'text-gray-400'}`} />
                Shopper
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'Vendor' })}
                className={`py-3 px-4 border rounded-xl text-sm font-semibold flex items-center justify-center transition ${role === 'Vendor' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                <Store className={`w-4 h-4 mr-2 ${role === 'Vendor' ? 'text-indigo-600' : 'text-gray-400'}`} />
                Vendor
              </button>
            </div>

            <Input label="Full Name" name="name" value={name} onChange={onChange} icon={User} required placeholder="John Doe" />
            <Input label="Email address" type="email" name="email" value={email} onChange={onChange} icon={Mail} required placeholder="you@example.com" />
            
            <div>
              <Input label="Password" type="password" name="password" value={password} onChange={onChange} icon={Lock} required placeholder="••••••••" />
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map(idx => (
                      <div key={idx} className={`flex-1 rounded-full ${strength >= idx ? strengthColors[strength] : 'bg-gray-200'} transition-colors duration-300`}></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Include at least 8 characters, a number, and a symbol.</p>
                </div>
              )}
            </div>

            <Input label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} icon={Lock} required placeholder="••••••••" />

            {role === 'Vendor' && (
              <div className="pt-4 border-t border-gray-100 space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-lg font-bold text-gray-900">Store Details</h3>
                <Input label="Store Name" name="storeName" value={storeName} onChange={onChange} icon={Store} required placeholder="My Amazing Store" />
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                  <textarea
                    name="storeDescription"
                    value={storeDescription}
                    onChange={onChange}
                    rows="3"
                    className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 shadow-sm"
                    placeholder="Tell us about what you sell..."
                  ></textarea>
                </div>
              </div>
            )}

            <div className="flex items-center pt-2">
              <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 text-base mt-4" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
