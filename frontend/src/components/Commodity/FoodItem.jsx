import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/StoreContext';

const FoodItem = ({id, name, type, numbering}) => {
    
    const {activeFood, switchActiveFood} = useContext(AppContext);

  return (
    <div onClick={() => switchActiveFood(name.toLowerCase())} className={`flex border-b ${name.toLowerCase() == activeFood ? 'border-b-[#009A49]' : 'border-b'} h-[3.5rem] hover:bg-gray-200 duration-500 items-center cursor-pointer`}>
      {numbering && <div className={`h-full w-[2rem] md:w-[3.5rem] hidden  md:flex items-center justify-center ${name.toLowerCase() == activeFood ? 'text-[#009A49]' : 'text-[#444444]'} text-sm md:text-[20px] font-medium border-r`}>{id}</div>}
      <div className='text-center px-[1rem] md:pl-[2rem] py-2'>
        <div className={`font-medium ${name.toLowerCase() == activeFood ? 'text-[#009A49]' : 'text-[#444444]'} flex items-center text-sm md:text-[20px]`}>{name}</div>
        <p className='text-[13px] font-normal text-[#8E8E8E]'>{type}</p>
      </div>
    </div>
  )
}

export default FoodItem
