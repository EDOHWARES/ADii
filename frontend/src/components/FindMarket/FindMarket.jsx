import React from 'react';
import petroleumImg from '../../assets/images/petroleum.png';
import foodsImg from '../../assets/images/foods.png'
import rainfallImg from '../../assets/images/rainfall.png';
import MarketCard from './MarketCard';

const FindMarket = () => {
  return (
    <div className='mb-[25rem] px-10 flex flex-col gap-[1.5rem]'>
      <h1 className='border-b-[5px] w-fit text-[24px] font-medium border-b-[#276100] text-[#3F3F3F]'>Find your market</h1>

      <div className='grid grid-cols-3 gap-[2rem]'>
        <MarketCard 
            img={petroleumImg}
            title={'Petroleum'}
        />

        <MarketCard 
            img={foodsImg}
            title={'Foods'}
        />

        <MarketCard 
            img={rainfallImg}
            title={'Rainfall'}
        />
      </div>
    </div>
  )
}

export default FindMarket
