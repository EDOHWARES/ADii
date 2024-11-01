import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import FarmersList from './pages/FarmersList/FarmersList';
import AdminAuth from './pages/Admin/AdminAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import Update from './pages/Admin/Update';
import Error from './pages/Error';
import ResetPassword from './pages/resetPassword';
import About from './pages/About';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

function App() {
  const excludedRoutes = ['/auth', '/admin/auth', '/admin/dashboard', '/auth/reset-password', '*'];
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Use useLocation hook

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

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
          {/* BrowserRouter needs to wrap all components */}
          <div>
            {!excludedRoutes.includes(location.pathname) && (
              <>
                <Header />
                <Hero />
              </>
            )}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/farmers-list' element={<FarmersList/>} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/admin/auth' element={<AdminAuth />} />
              <Route path='/admin/dashboard' element={<Update />} />
              <Route path='/auth/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<Error />} />
            </Routes>
            {!excludedRoutes.includes(location.pathname) && (
              <>
                <Footer />
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default App;
