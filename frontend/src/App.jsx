import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Home from './pages/Home';
import AdminAuth from './pages/Admin/AdminAuth';
import AdminBoard from './pages/Admin/AdminBoard';

function App() {



  return (
    <section className='max-w-[1440px] mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='auth' element={<Auth />} />
          <Route path='admin-auth' element={<AdminAuth />} />
          <Route path='admin-panel' element={<AdminBoard />} />
          <Route path='*' />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
