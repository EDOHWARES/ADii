import React from 'react'

const Newsletter = () => {
  return (
    <form id='newsletter'
        className='flex flex-col gap-[1rem] px-4 md:px-10 mb-[3rem]'
    >
      <input type="email" name="" id="" placeholder='Enter Your Email Address'
        className='border-2 border-yellow-500 w-full h-[3rem] text-sm md:text-xl md:h-[4rem] indent-4 rounded-[2px]'
      />
      <button className='bg-[#276100] text-white px-4 py-4 md:px-6 md:py-4 rounded-[2px] text-sm md:text-xl font-semibold'>Subscribe To Newsletter</button>
    </form>
  )
}

export default Newsletter
