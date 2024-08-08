import React from 'react'

const FoodItemPrice = ({state, price}) => {
  return (
    <div className='flex flex-col gap-[.5rem]'>
      <h3 className='font-medium text-[13px] leading-[19.5px] text-[#8A8A8A]'>{state}</h3>
      <input type="text" value={price} readOnly
        className='w-[187px] h-[48px] rounded-[6px] border border-[#828282] text-[12px] leading-[18px] text-[#c6c6c6] font-medium indent-4'
      />
    </div>
  )
}

export default FoodItemPrice