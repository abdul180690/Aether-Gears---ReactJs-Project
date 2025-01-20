import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')

  return (
    <div className=''>
      <div className='bg-primary mb-16'>
        <form className='max-padd-container py-10'>
          <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
            <div className='flex-1 flex flex-col gap-3 text-[95%]'>
              <Title title1={'Delivery'} title2={'Information'}/>
              <div className='flex gap-3 '>
                <input type="text" placeholder="First Name" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
                <input type="text" placeholder="Last Name" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
              </div>
              <input type="email" placeholder="Email Address" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
              <input type="number" placeholder="Phone Number" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
              <input type="text" placeholder="Street" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
              <div className='flex gap-3 '>
                <input type="text" placeholder="City" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
                <input type="text" placeholder="State" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
              </div>
              <div className='flex gap-3'>
                <input type="number" placeholder="Zip Code" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
                <input type="text" placeholder="Country" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
              </div>
            </div>

            <div className='flex flex-1 flex-col'>
              <CartTotal />
              <div className='flex items-center justify-start py-6'>
                <h3 className='bold-20 me-5'>Payment <span>Method </span></h3>
                <div className='flex gap-3'>
                  <div onClick={()=> setMethod('stripe')} className={`${method === "stripe" ? "btn-dark" : "btn-white"} !py-1 text-xs cursor-pointer`}>Stripe</div>
                  <div onClick={()=> setMethod('cod')} className={`${method === "cod" ? "btn-dark" : "btn-white"} !py-1 text-xs cursor-pointer`}>Cash On Delivery</div>
                </div>
              </div>
              <div>
                <button type='submit' className='btn-secondary'>Place Order</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder