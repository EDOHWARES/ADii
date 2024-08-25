/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { TiThMenuOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';


const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [activeNav, setActiveNav] = useState('/');

  const [openModal, setOpenModal] = useState(false);

  // handle nav click
  const handleNavClick = (nav) => {
    setShowMobileNav(false);
    setActiveNav(nav);
  }

  return (
    <div className='absolute top-0 right-0 left-0 '>
      <div className="content flex items-center justify-between pl-[-1rem] md:pl-0 pr-4 md:pr-10 relative md:h-[8rem]">
        <Link to={'/'} className="logo md:w-[20%] cursor-pointer">
            <img src={logo} alt="logo" 
                className='w-[130px] md:w-[144px]'
            />
        </Link>
        <nav className='md:w-[80%] w-full absolute md:static right-0'>
            <ul className={`flex flex-col ${!showMobileNav ? 'hidden' : ''} md:flex md:flex-row items-center space-y-4 md:space-y-0 mt-10 md:mt-0 bg-white shadow-md md:shadow-[0] md:bg-transparent md:space-x-4 justify-between w-[50%] h-[35vh] md:w-full absolute md:static top-0 right-0 py-6 md:py-0`}>
                <a onClick={() => handleNavClick('/')} href={'/'} className={`${activeNav == '/' ? 'active-nav' : ''} cursor-pointer md:text-sm text-[13px]`}>Home</a>
                <a onClick={() => handleNavClick('#market')} href={'#market'} className={`${activeNav == '#market' ? 'active-nav' : ''} cursor-pointer md:text-sm text-[13px]`}>Markets</a>
                <a onClick={() => handleNavClick('#footer')} href={'#footer'} className={`${activeNav == '#footer' ? 'active-nav' : ''} cursor-pointer md:text-sm text-[13px]`}>Contact Us</a>
                <a onClick={() => handleNavClick('#newletter')} href={'#newsletter'}>
                    <button className='border md:text-sm text-[13px] border-[#276100] text-[#276100] hover:bg-[#276100] hover:text-white duration-500 px-4 md:px-6 py-2 md:py-4 rounded-[9px]'>Join Newsletter</button>
                </a>
                <li>
                    <button onClick={() => setOpenModal(true)} className='bg-[#276100] md:text-sm text-[13px] border border-transparent hover:border-[#276100] hover:bg-transparent hover:text-[#276100] duration-500 rounded-[9px] text-white font-semibold px-4 md:px-6 py-2 md:py-4'>Download App</button>
                </li>
            </ul>
        </nav>
        <div onClick={() => setShowMobileNav(prev => !prev)} className='md:hidden cursor-pointer text-3xl border border-gray-400 p-1 hover:bg-gray-100 duration-300'>
          <TiThMenuOutline />
        </div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        Mobile App isn't available for now!
      </Modal>
    </div>
  )
}

export default Header
