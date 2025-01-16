import React from 'react'
import { TbCoinRupee } from "react-icons/tb"
import { TbTruckDelivery } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'

const Features = () => {
  return ( 
    <section className='max-padd-container mt-16'>
        <div className='px-1 flexBetween flex-wrap gap-8 rounded-2xl'>
            <div className='flexCenter gap-x-3 bg-yellow-100 p-3 rounded-e-full'>
                <TbCoinRupee className='text-3xl'/>
                <div>
                    <h4 className='medium-15'>MONEY-BACK GUARANTEE</h4>
                    <p>100% refund guaranteed if you're not satisfied.</p>
                </div>
            </div>
            <div className='flexCenter gap-x-3 bg-yellow-100 p-3 rounded-e-full'>
                <TbTruckDelivery className='text-3xl'/>
                <div>
                    <h4 className='medium-15'>FREE SHIPPING & RETURNS</h4>
                    <p>Free shipping available on all orders above ₹1000.</p>
                </div>
            </div>
            <div className='flexCenter gap-x-3 bg-yellow-100 p-3 rounded-e-full'>
                <BiSupport className='text-3xl'/>
                <div>
                    <h4 className='medium-15'>24/7 ONLINE SUPPORT</h4>
                    <p>Our team is here to assist you round the clock.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features