import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Home from './pages/Home';
import AdminAuth from './pages/Admin/AdminAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import {ThreeCircles} from 'react-loader-spinner';
import Add from './pages/Admin/Add';
import Update from './pages/Admin/Update';

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {
        loading ? 
        <div className='w-screen h-screen flex items-center justify-center'>
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>
        :
        <section className='max-w-[1440px] mx-auto'>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='auth' element={<Auth />} />
            <Route path='/admin/auth' element={<AdminAuth/>} />
            <Route path='admin' element={<Update />} />
            <Route path='/admin/add' element={<Add />} />
            <Route path='*' />
          </Routes>
        </BrowserRouter>
      </section>}
    </>
  )
}

export default App
