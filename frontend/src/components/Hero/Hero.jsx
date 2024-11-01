import { useContext } from 'react';
import heroImg from '../../assets/images/hero-img.jpg';
import { AppContext } from '../../context/StoreContext';

const Hero = () => {
  const {heroTextMapping, themarket} = useContext(AppContext);
  console.log(themarket)
  return (
    <div style={{backgroundImage: `url(${heroImg})`}} className='bg-no-repeat bg-[50%_80%] bg-cover h-[400px] text-center pt-[10rem] mb-[3rem]'>
      <div className='content bg-[#0000005e] px-2 md:px-10 py-4'>
        <h1 className='text-white text-[40px] md:text-[48px] font-bold leading-[1] mb-4'>{heroTextMapping[themarket] ? heroTextMapping[themarket][0] : heroTextMapping['home'][0]}</h1>
        <p className='text-sm md:text-[20px] text-[#fcfcfc] font-semibold text-center'>{heroTextMapping[themarket] ? heroTextMapping[themarket][1] : heroTextMapping['home'][1]}</p>
      </div>
    </div>
  )
}

export default Hero 
