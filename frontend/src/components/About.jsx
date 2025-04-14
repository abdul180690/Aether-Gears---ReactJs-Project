import React from 'react'
import Title from './Title'
import testimonial from '../assets/testimonial.png'
import { TbLocation } from 'react-icons/tb'
import { RiAdminLine, RiSecurePaymentLine, RiSoundModuleLine } from 'react-icons/ri'
import { FaQuoteLeft, FaUsersLine } from 'react-icons/fa6'
import about from  '../assets/about.png'

const About = () => {
  return (
    <section className='max-padd-container py-16'>
      <div className='flex flex-col md:flex-row gap-5 gap-y-10'>
        {/* Textimonial */}
        <div className='flex-[1] flexCenter flex-col'>
          <Title title1={'People '} title2={'Says'} titleStyles={' h3 !pb-2 text-slate-900'}/>
          <img src={testimonial} alt="" height={55} width={55} className='rounded-full' loading='lazy'/>
          <h4 className='h4 mt-6'>Richard Clark</h4>
          <p className='relative bottom-2'>CEO At TechStack</p>
          <FaQuoteLeft className='text-3xl'/>
          <p className='max-w-(222px) mt-5 text-center'>I am incredibly impressed with Aether Gears' wide range of tech products. From mobile phones to headphones, watches, speakers, and computer mouses, they have it all! The quality and innovation speak for themselves, making them my go-to tech store.</p>
        </div>
        {/* Trending */}
        <div className='flex-[2] flex rounded-2xl relative shadow-lg'>
          <img src={about} alt="" className='' loading='lazy'/>
          <div className='absolute h-full w-full bg-black/10 top-0 left-0'/>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 p-6 rounded-xl'>
            <h4 className='bold-18 text-center text-slate-900'>Top view in this <br />week</h4>
            <h2 className='h2 uppercase text-blue-950'>Trending</h2>
          </div>
        </div>
        {/* Features */}
        <div className='flex-[1] flexCenter flex-col'>
          <Title title1={'About '} title2={'Us'} titleStyles={' h3 !pb-2 text-slate-900'} />
          <div className='flex flex-col items-start'>
            <div className='flexCenter gap-3 mb-3'>
               <RiSecurePaymentLine className='text-xl'/>
               <div>
                <h5 className='h5'>Fast & Secure</h5>
                <p>Optimized performace</p>
               </div>
            </div>
            <div className='flexCenter gap-3 mb-3'>
               <RiSoundModuleLine className='text-xl'/>
               <div>
                <h5 className='h5'>Advance Filtering</h5>
                <p>Find items quickly</p>
               </div>
            </div>
            <div className='flexCenter gap-3 mb-3'>
               <FaUsersLine className='text-xl'/>
               <div>
                <h5 className='h5'>User Reviews</h5>
                <p>Ratings & feedback</p>
               </div>
            </div>
            <div className='flexCenter gap-3 mb-3'>
               <TbLocation className='text-xl'/>
               <div>
                <h5 className='h5'>Order Tracking</h5>
                <p>Live order status</p>
               </div>
            </div>
            <div className='flexCenter gap-3 mb-3'>
               <RiAdminLine className='text-xl'/>
               <div>
                <h5 className='h5'>Admin Dashboard</h5>
                <p>Manage store easily</p>
               </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default About