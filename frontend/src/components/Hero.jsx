import React from 'react'
import headphones from '../assets/headphones.png'
import { FaArrowRightLong } from 'react-icons/fa6'

const Hero = () => {
  return (
    <section className='max-padd-container'>
      <div className='grid grid-cols-2 bg-hero bg-cover bg-center bg-no-repeat rounded-2xl h-[633px]'>
        {/* left side */}
        <div className='place-content-end max-xs:min-w-80'>
          <div className='p-4'>
            <p className='text-white max-w-xs'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, blanditiis? Dignissimos.</p>
            <button className='btn-white mt-6 hover:bg-yellow-200 duration-300'>Explore more</button>
          </div>
        </div>
        {/* right side */}
        <div className='hidden xs:block place-items-end place-content-end p-3 '>
          <div className='flex flex-col rounded-2xl w-[211px] relative p-2 bg-white overflow-hidden hover:shadow'>
            <img src= {headphones} alt="" className='rounded-2xl bg-slate-900/10 '/>
            <button className='btn-light !py-2 !text-xs flexCenter gap-2 mt-2 hover:bg-yellow-200 duration-300'>Explore this product <FaArrowRightLong /> </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero