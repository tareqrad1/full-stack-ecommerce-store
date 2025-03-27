import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

type FormDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const { signup, error, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({ ...formData });
    toast.success('User created successfully');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  const Loading: boolean = isLoading;

  return (
    <motion.div className="flex items-center justify-center min-h-screen px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center text-emerald-400 mb-6 font-extrabold">Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-white font-medium">Full Name</label>
            <input
              placeholder='Jon Doa'
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>

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
              placeholder='*******'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm text-white font-medium">Confirm Password</label>
            <input
              placeholder='*******'
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <p className='text-red-500 text-sm mt-2'>{error}</p>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white font-semibold py-2 rounded-md mt-4"
          >
            {Loading ? <span className='flex justify-center text-gray-200'><Loader className='w-4 animate-spin mr-1' /></span> : 'Signup'}
          </button>
        </form>
        <p className='mt-3 text-center'>don't have an account? <Link to="/login" className="text-emerald-400 hover:underline">Login</Link></p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
