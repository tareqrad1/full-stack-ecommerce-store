import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Loader, LogInIcon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

type FormDataType = {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { isLoading, login, error } = useAuthStore();
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    toast.success('User logged in successfully');
    setFormData({
      email: '',
      password: '',
    })
  };
  const Loading: boolean = isLoading;

  return (
    <motion.div className="flex items-center justify-center min-h-screen px-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}

    >
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-extrabold text-center text-emerald-400 mb-6">Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-white font-medium">Email</label>
            <input
              placeholder='you@example.com'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-white font-medium">Password</label>
            <input
              placeholder='**********'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <p className='text-red-500 text-sm mt-2'>{error}</p>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white font-semibold py-2 rounded-md mt-4"
          >
            {Loading ? <span className='flex justify-center text-gray-200'><Loader className='w-4 animate-spin mr-1' /></span> : <div className='flex justify-center items-center gap-1'> <LogInIcon size={22} className='text-gray-200' /> Login</div>}
          </button>
        </form>
        <p className='mt-3 text-center'>don't have an account? <Link to="/signup" className="text-emerald-400 hover:underline">Signup</Link></p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
