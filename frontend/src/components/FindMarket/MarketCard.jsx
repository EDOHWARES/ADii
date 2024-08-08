import React from 'react'

const MarketCard = ({img, title}) => {
  return (
    <div className='flex flex-col gap-[.5rem]'>
      <img src={img} alt={title} />
      <h4 className='text-[24px] font-medium text-[#3F3F3F] underline'>{title}</h4>
    </div>
  )
}

export default MarketCard
