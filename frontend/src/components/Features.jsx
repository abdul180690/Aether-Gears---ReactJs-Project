import React from 'react'
import { PiCurrencyInrBold } from "react-icons/pi";
import { TbTruckDelivery } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'

const Features = () => {
  return ( 
    <section className='max-padd-container mt-16 '>
        <div className='px-1 flexBetween flex-wrap gap-1 rounded-2xl '>
            <div className='flexCenter gap-x-3 bg-amber-300 p-3 rounded-full shadow-md mb-4'>
                <PiCurrencyInrBold className='text-4xl p-1 bg-amber-100 rounded-full'/>
                <div>
                    <h4 className='medium-15'>MONEY-BACK GUARANTEE</h4>
                    <p className='text-gray-50'>100% refund guaranteed if you're not satisfied.</p>
                </div>
            </div>
            <div className='flexCenter gap-x-3 bg-amber-300 p-3 rounded-full shadow-md mb-4'>
                <TbTruckDelivery className='text-4xl p-1 bg-amber-100 rounded-full'/>
                <div>
                    <h4 className='medium-15'>FREE SHIPPING & RETURNS</h4>
                    <p className='text-gray-50'>Free shipping available on all orders above ₹1000.</p>
                </div>
            </div>
            <div className='flexCenter gap-x-3 bg-amber-300 p-3 rounded-full shadow-md mb-4'>
                <BiSupport className='text-4xl p-1 bg-amber-100 rounded-full'/>
                <div>
                    <h4 className='medium-15'>24/7 ONLINE SUPPORT</h4>
                    <p className='text-gray-50'>Our team is here to assist you round the clock.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features