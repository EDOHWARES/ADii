import { useContext, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { LuMail } from "react-icons/lu";
import { AppContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {RotatingLines} from 'react-loader-spinner';

const Footer = () => {

  const [loading, setLoading] = useState(false);
  const {serverUrl} = useContext(AppContext);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const resp = await axios.post(`${serverUrl}/api/email/save`, {email});
    

    if (!resp.data.success) {
      toast.error(resp.data.message);
      setEmail('');
      setLoading(false);
    } else {
      toast.success(resp.data.message);
      setEmail('');
      setLoading(false);
    };

  };

  return (
    <div id='footer' className='bg-[#D6D6D6] px-4 md:px-10 py-4 w-full mt-[8rem]'>
      <div className="logo"><img src={logo} alt="logo" className='w-[144px]'/></div>

      <div className='flex flex-col md:flex-row justify-between w-full gap-[3rem]'>
        <div className=' w-full md:w-[35%] bg-[#CECECE] px6 md:px-8 py-4 md:py-6 shadow-md rounded-[5px] font-medium text-[18px] text-center md:text-start md:text-[24px] leading-[36px]'>
            ADii is a non-profit organization that collects national data for improved economic activities.
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className='w-full md:w-[65%] flex items-center justify-between'>
            <div className='h-[60px] w-[70%] bg-white rounded-[4px] flex items-center justify-center pl-[1rem] gap-[.4rem]'>
                <LuMail />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder='Email' required className='bg-transparent focus:bg-transparent border-none outline-none w-full indent-2 h-full placeholder:text-[14px] placeholder:text-[#292D32] placeholder:font-medium' />
            </div>
            <button type='submit' className={`w-[30%] bg-[#006630] h-[60px] px-6 py-4 text-white rounded-r-[4px] text-sm md:text-[15px] font-medium hover:bg-[#01401f] focus:outline focus:outline-green-500 duration-500 flex items-center justify-center ${loading ? 'bg-[#276100ce]' : ''}`}>
              {
                loading ?
                <RotatingLines
                  visible={true}
                  height="36"
                  width="36"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                : 
                "Join Newsletter"
              }
            </button>
        </form>
      </div>
      
      <ul className='flex items-center justify-between text-sm md:text-[15px] font-semibold leading-[22.5px] text-[#313131] mt-[10rem] flex-wrap gap-[1rem]'>
        <li className='text-[13px]'>Copyright ADii 2024</li>
        <li className='text-[13px]'>Terms & Conditions</li>
        <li className='text-[13px]'>Privacy Policy</li>
        <li className='text-[13px]'>Help</li>
      </ul>
    </div>
  )
}

export default Footer
