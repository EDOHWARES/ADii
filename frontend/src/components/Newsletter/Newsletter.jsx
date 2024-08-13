import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';


const Newsletter = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const {serverUrl} = useContext(AppContext);

  const handleSubmit = async (e) => {
    await setLoading(true);

    e.preventDefault();

    const resp = await axios.post(`${serverUrl}/api/email/save`, {email});
    

    if (!resp.data.success) {
      toast.error(resp.data.message);
      setEmail('')
      setLoading(false);
    } else {
      toast.success(resp.data.message);
      setEmail('');
      await setLoading(false);
    };

  };

  return (
    <form 
      onSubmit={(e) => handleSubmit(e)}
      id='newsletter'
      className='flex flex-col gap-[1rem] px-4 md:px-10 mb-[3rem]'
    >
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required placeholder='Enter Your Email Address'
        className='border-2 border-yellow-500 w-full h-[3rem] text-sm md:text-xl md:h-[4rem] indent-4 rounded-[2px]'
      />
      <button className={`bg-[#276100] text-white h-[4rem] rounded-[2px] text-sm md:text-xl font-semibold flex items-center justify-center ${loading ? 'bg-[#276100ce]' : ''}`}>
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
      <span>Subscribe To Newsletter</span>
      }
      </button>
    </form>
  )
}

export default Newsletter
