import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/StoreContext';
import './MarketCard.css';

const MarketCard = ({img, title, market}) => {

    const {themarket, switchMarket} = useContext(AppContext);

  return (
    <div onClick={() => switchMarket(market)} className='flex flex-col gap-[.5rem] mb-[3rem]'>
      <img src={img} alt={title} className={`${market == themarket ? 'border-black' : ''} border-[4px] border-transparent duration-200 rounded-[10px] cursor-pointer`} />
      <h4 className='text-[24px] font-medium text-[#3F3F3F] underline'>{title}</h4>
    </div>
  )
}

export default MarketCard
