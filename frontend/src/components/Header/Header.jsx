import React from 'react';
import logo from '../../assets/images/logo.png';
import './Header.css';


const Header = () => {
  return (
    <div className='absolute top-0 right-0 left-0'>
      <div className="content flex items-center justify-between pr-10">
        <div className="logo w-[20%]">
            <img src={logo} alt="logo" 
                className='w-[144px]'
            />
        </div>
        <nav className='w-[70%]'>
            <ul className='flex items-center justify-between w-full'>
                <li className='active-nav cursor-pointer'>Home</li>
                <li className='cursor-pointer'>Markets</li>
                <li className='cursor-pointer'>Contact Us</li>
                <li>
                    <button className='border border-[#276100] text-[#276100] hover:bg-[#276100] hover:text-white duration-500 px-6 py-4 rounded-[9px]'>Join Newsletter</button>
                </li>
                <li>
                    <button className='bg-[#276100] border border-transparent hover:border-[#276100] hover:bg-transparent hover:text-[#276100] duration-500 rounded-[9px] text-white font-semibold px-6 py-4'>Download App</button>
                </li>
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
