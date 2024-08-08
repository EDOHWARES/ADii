import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {

  return (
    <section className='max-w-[1440px] mx-auto'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
