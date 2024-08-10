import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { TiThMenuOutline } from "react-icons/ti";


const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className='absolute top-0 right-0 left-0 '>
      <div className="content flex items-center justify-between pl-[-1rem] md:pl-0 pr-4 md:pr-10 relative md:h-[8rem]">
        <div className="logo md:w-[20%]">
            <img src={logo} alt="logo" 
                className='w-[130px] md:w-[144px]'
            />
        </div>
        <nav className='md:w-[80%] w-full absolute md:static right-0'>
            <ul className={`flex flex-col ${!showMobileNav ? 'hidden' : ''} md:flex md:flex-row items-center space-y-4 md:space-y-0 mt-10 md:mt-0 bg-white shadow-md md:shadow-[0] md:bg-transparent md:space-x-4 justify-between w-[50%] h-[70vh] md:w-full absolute md:static top-0 right-0 py-6 md:py-0`}>
                <li className='active-nav cursor-pointer text-sm'>Home</li>
                <li className='cursor-pointer text-sm'>Markets</li>
                <li className='cursor-pointer text-sm'>Contact Us</li>
                <li>
                    <button className='border text-sm border-[#276100] text-[#276100] hover:bg-[#276100] hover:text-white duration-500 px-4 md:px-6 py-2 md:py-4 rounded-[9px]'>Join Newsletter</button>
                </li>
                <li>
                    <button className='bg-[#276100] text-sm border border-transparent hover:border-[#276100] hover:bg-transparent hover:text-[#276100] duration-500 rounded-[9px] text-white font-semibold px-4 md:px-6 py-2 md:py-4'>Download App</button>
                </li>
            </ul>
        </nav>
        <div onClick={() => setShowMobileNav(prev => !prev)} className='md:hidden text-3xl border border-gray-400 p-1 hover:bg-gray-100 duration-300'>
          <TiThMenuOutline />
        </div>
      </div>
    </div>
  )
}

export default Header
