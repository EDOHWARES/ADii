import React, { useState } from 'react';
import petroleumImg from '../../assets/images/petroleum.png';
import foodsImg from '../../assets/images/foods.png'
import rainfallImg from '../../assets/images/rainfall.png';
import MarketCard from './MarketCard';
import { AppContext } from '../../context/StoreContext';
import { useContext } from 'react';

const FindMarket = () => {
    

  return (
    <div className='px-10 flex flex-col gap-[1.5rem]'>
      <h1 className='border-b-[5px] w-fit text-[24px] font-medium border-b-[#276100] text-[#3F3F3F]'>Find your market</h1>

      <div className='grid grid-cols-3 gap-[2rem]'>

      <MarketCard 
            img={foodsImg}
            title={'Foods'}
            market='foods'
        />

        <MarketCard 
            img={petroleumImg}
            title={'Petroleum'}
            market='petroleum'
        />

        <MarketCard 
            img={rainfallImg}
            title={'Rainfall'}
            market='rainfall'
        />
      </div>
    </div>
  )
}

export default FindMarket