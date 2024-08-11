import React from 'react';
import logo from '../../assets/images/logo.png';
import { LuMail } from "react-icons/lu";

const Footer = () => {
  return (
    <div id='footer' className='bg-[#D6D6D6] px-4 md:px-10 py-4 w-full mt-[25rem]'>
      <div className="logo"><img src={logo} alt="logo" className='w-[144px]'/></div>

      <div className='flex flex-col md:flex-row justify-between w-full gap-[3rem]'>
        <div className=' w-full md:w-[35%] bg-[#CECECE] px6 md:px-8 py-4 md:py-6 shadow-md rounded-[5px] font-medium text-xl text-center md:text-start md:text-[24px] leading-[36px]'>
            ADii is a major profit organization that collects National Data for improved economic activities
        </div>

        <div className='w-full md:w-[65%] flex items-center justify-between'>
            <div className='h-[60px] w-[70%] bg-white rounded-[4px] flex items-center justify-center pl-[1rem] gap-[.4rem]'>
                <LuMail />
                <input type="email" name="" id="" placeholder='Email' className='bg-transparent border-none outline-none w-full h-full placeholder:text-[14px] placeholder:text-[#292D32] placeholder:font-medium' />
            </div>
            <button className='w-[30%] bg-[#006630] h-[60px] px-6 py-4 text-white rounded-r-[4px] text-sm md:text-[15px] font-medium hover:bg-[#01401f] focus:outline focus:outline-green-500 duration-500 flex items-center justify-center'>Join Newsletter</button>
        </div>
      </div>
      
      <ul className='flex items-center justify-between text-sm md:text-[15px] font-semibold leading-[22.5px] text-[#313131] mt-[10rem] flex-wrap gap-[1rem]'>
        <li>Copyright ADii 2024</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
        <li>Help</li>
      </ul>
    </div>
  )
}

export default Footer
