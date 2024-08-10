import React from 'react';
import heroImg from '../../assets/images/hero-img.jpg';

const Hero = () => {
  return (
    <div style={{backgroundImage: `url(${heroImg})`}} className='bg-no-repeat bg-[50%_80%] bg-cover h-[400px] text-center pt-[10rem] mb-[3rem]'>
      <div className='content bg-[#00000045] px-4 md:px-10 py-4'>
        <h1 className='text-white text-[40px] md:text-[48px] font-bold'>Agroconomy</h1>
        <p className='text-sm md:text-[20px] text-[#fcfcfc] font-semibold text-center'>ADii is a non-profit organization that collects National Data for improved <br />economic activites.</p>
      </div>
    </div>
  )
}

export default Hero
