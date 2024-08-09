import React, { useContext, useState } from 'react';
import logo from '../../src/assets/images/logo.png';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { AppContext } from '../context/StoreContext';

const Auth = () => {

    const [showPassword, setSnowPassword] = useState(false);
    const {signedUp, setSignedUp} = useContext(AppContext);

  return (
    <div className='mb-[3rem]'>
      <div className="content px-16 w-full flex flex-col gap-[3rem]">
        <div className="head w-full flex items-center justify-center">
            <img src={logo} alt="logo" 
                className='w-[164px] h-[164px]'
            />
        </div>
        <div className="body">
            <form action=""
                className='flex flex-col gap-[2.2rem]'
            >
                <div className='flex flex-col items-start gap-[.4rem]'>
                    <label className='text-xl text-[#8A8A8A]' htmlFor="userEmail">Enter Your Email</label>
                    <input className='w-full h-[48px] border border-[#D7D7D7] outline-none focus:outline-1 focus:border-transparent focus:outline-[#6CBC37] rounded-[6px] text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4' placeholder='e.g omitoyinayomide20@gmail.com' type="email" name="userEmail" id="userEmail" />
                </div>
                {!signedUp && <div className='flex flex-col gap-[.4rem]'>
                    <label className='text-xl text-[#8A8A8A]' htmlFor="userPassword">Enter a new password</label>
                    <div className='flex flex-row items-center w-full h-[48px] border border-[#d7d7d7] rounded-[6px]'>
                        <input className='w-full h-full outline-none text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4 flex items-center justify-center' type={showPassword ? 'text' : 'password'} name="userPassword" id="userPassword" placeholder='**********' />
                        <span onClick={() => setSnowPassword((prev) => !prev)}
                            className='cursor-pointer w-fit'
                        >
                            {!showPassword ? <IoEyeOffOutline className='mr-[2rem] text-xl' /> : <IoEyeOutline className='mr-[2rem] text-xl'  />}
                        </span>
                    </div>
                </div>}
                <div className='flex flex-col gap-[.4rem]'>
                    <label className='text-xl text-[#8A8A8A]' htmlFor="userPassword">{signedUp ? 'Enter Your Password' : 'Confirm New Password'}</label>
                    <div className='flex flex-row items-center w-full h-[48px] border border-[#d7d7d7] rounded-[6px]'>
                        <input className='w-full h-full outline-none text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4 flex items-center justify-center' type={showPassword ? 'text' : 'password'} name="userPassword" id="userPassword" placeholder='**********' />
                        <span onClick={() => setSnowPassword((prev) => !prev)}
                            className='cursor-pointer w-fit'
                        >
                            {!showPassword ? <IoEyeOffOutline className='mr-[2rem] text-xl' /> : <IoEyeOutline className='mr-[2rem] text-xl'  />}
                        </span>
                    </div>
                    {signedUp && <span className='self-end text-[15px] text-[#6CBC37] font-semibold cursor-pointer'>Forgot Your Password?</span>}
                </div>
                <div className='flex flex-col text-center gap-[2.2rem]'>
                    <button className='bg-[#6CBC37] px-4 py-4 border-2 border-transparent hover:border-[#6CBC37] hover:bg-transparent hover:text-[#6CBC37] duration-500 text-white text-xl'>{signedUp ? 'Login' : 'Sign Up'}</button>
                    <span className='text-[15px] text-[#2C2C2C] font-semibold'>{signedUp ? "Dont' have an account? " : "Already have an account? "}<span onClick={() => setSignedUp(prev => !prev)} className='text-[#6CBC37] cursor-pointer'>{signedUp ? 'Sign Up' : 'Login'}</span></span>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
