import { useContext, useEffect } from 'react';

import mission from '../assets/images/mission.png';
import vison from '../assets/images/vision.png';
import expertise from '../assets/images/expertise.png'
import Newletter from '../components/Newsletter/Newsletter';
import { AppContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const {token} = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  }, [token, navigate]);

  return (
    <div className='px-4 md:px-10'>
      <div className="flex flex-col items-center space-y-[1rem] mb-[4rem]">
        <h1 className="text-[40px] leading-[60px] font-semibold text-[#353535]">About Adii</h1>
        <p className="font-medium text-[20px] leading-[30px] text-center text-[#686868] text-sm">
            Welcome to Adii, we are a leading provider of real-tim price update for food commodities, empowering businesses and individuals to make informed decision in the ever-changing agricultural market.
        </p>
      </div>
      <div className='flex flex-col gap-[3rem]'>

        <div className='w-full flex flex-col md:items-center sm:flex-row items-center sm:items-start justify-between mx-auto gap-[2rem] md:gap-[4rem] shadow-2xl p-2 sm:p-8'>
            <div className='flex flex-col w-full max-w-[485px]'>
                <h2 className='font-semibold text-[30px] md:text-[40px] leading-[60px] text-[#222227]'>Our Mission</h2>
                <p className='text-sm text-[#222227] font-medium'>
                    Adii&apos;s mission is to bridge the information gap in the food commodity market, providing transparent and timely price updates to facilitate efficient trade and sustainable growth
                </p>
            </div>
            <div className='w-full max-w-[487px]'>
                <img src={mission} alt="mission" />
            </div>
        </div>

        <div className='w-full flex flex-col md:items-center sm:flex-row-reverse items-center sm:items-start justify-between mx-auto gap-[2rem] md:gap-[4rem] shadow-2xl p-2 sm:p-8'>
            <div className='flex flex-col w-full max-w-[485px]'>
                <h2 className='font-semibold text-[30px] md:text-[40px] leading-[60px] text-[#222227]'>Our Vison</h2>
                <p className='text-sm text-[#222227] font-medium'>
                  We envision a world where food commodity market are transparent, efficient and accessible to all. We strive to create a digital ecosystem that connects the global food market                
                </p>
            </div>
            <div className='w-full max-w-[487px]'>
                <img src={vison} alt="mission" />
            </div>
        </div>

        <div className='w-full flex flex-col md:items-center sm:flex-row items-center sm:items-start justify-between mx-auto gap-[2rem] md:gap-[4rem] shadow-2xl p-2 sm:p-8'>
            <div className='flex flex-col w-full max-w-[485px]'>
                <h2 className='font-semibold text-[30px] md:text-[40px] leading-[60px] text-[#222227]'>Our Expertise</h2>
                <p className='text-sm text-[#222227] font-medium'>
                  With a team of experienced market analyst and technologist, we leverage cutting-edge technology to aggregate and disseminate price data from trusted sources                
                </p>
            </div>
            <div className='w-full max-w-[487px]'>
                <img src={expertise} alt="mission" />
            </div>
        </div>

        <div>
          <Newletter />
        </div>

      </div>
    </div>
  )
}

export default About
