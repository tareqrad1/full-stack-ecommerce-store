import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import Navbar from './components/layout/Navbar'
import CartPage from './pages/home/CartPage'
import { Toaster } from 'react-hot-toast'
import { useEffect, useRef } from 'react'
import { useAuthStore } from './store/useAuthStore'
import NotFoundPage from './pages/notFound/NotFound'

const App = () => {
  const { CheckAuth, user } = useAuthStore();
  const isMounted = useRef<boolean>(true);
  useEffect(() => {
    if(isMounted.current) {
      isMounted.current = false;
      CheckAuth();
    };
  },[CheckAuth])
  return (
    <div className='bg-blue-50  dark:bg-gray-900 min-h-screen text-white relative overflow-hidden'> 
    <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
		</div>
    <div className='relative z-50'>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/cart' element={!user ? <Navigate to={'/login'} /> : <CartPage />} />
      </Routes>
      <Toaster />
    </div>
    </div>
  )
}

export default App