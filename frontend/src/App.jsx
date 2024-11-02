// App.js
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import Auth from './pages/Auth';
import Home from './pages/Home';
import FarmersList from './pages/FarmersList/FarmersList';
import AdminAuth from './pages/Admin/AdminAuth';
import Update from './pages/Admin/Update';
import Error from './pages/Error';
import ResetPassword from './pages/resetPassword';
import About from './pages/About';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

function App() {
  const excludedRoutes = ['/auth', '/admin/auth', '/admin/dashboard', '/auth/reset-password'];
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  // Check if the current route is excluded or if it's an unknown route
  const isExcludedRoute = excludedRoutes.includes(location.pathname);
  const isUnknownRoute = location.pathname === '*' || !excludedRoutes.includes(location.pathname) && !['/', '/about', '/farmers-list'].includes(location.pathname);

  return (
    <>
      {loading ? (
        <div className='w-screen h-screen flex items-center justify-center'>
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
        <section className='max-w-[1600px] mx-auto border-x'>
          <ToastContainer />
          <div>
            {!isExcludedRoute && !isUnknownRoute && (
              <>
                <Header />
                <Hero />
              </>
            )}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/farmers-list' element={<FarmersList />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/admin/auth' element={<AdminAuth />} />
              <Route path='/admin/dashboard' element={<Update />} />
              <Route path='/auth/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<Error />} />
            </Routes>
            {!isExcludedRoute && !isUnknownRoute && <Footer />}
          </div>
        </section>
      )}
    </>
  );
}

export default App;
