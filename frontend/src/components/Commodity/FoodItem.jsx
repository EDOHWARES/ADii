import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/StoreContext';

const FoodItem = ({id, name}) => {
    
    const {activeFood, switchActiveFood} = useContext(AppContext);

  return (
    <div onClick={() => switchActiveFood(name.toLowerCase())} className={`flex border-b ${name.toLowerCase() == activeFood ? 'border-b-[#009A49]' : 'border-b'} h-[3.5rem] hover:bg-gray-200 duration-500 cursor-pointer py-[1rem]`}>
      <div className={`h-full w-[3.5rem] flex items-center justify-center ${name.toLowerCase() == activeFood ? 'text-[#009A49]' : 'text-[#444444]'} text-[20px] font-medium border-r`}>{id}</div>
      <div className={`font-medium ${name.toLowerCase() == activeFood ? 'text-[#009A49]' : 'text-[#444444]'} flex items-center pl-[2rem]`}>{name}</div>
    </div>
  )
}

export default FoodItem
