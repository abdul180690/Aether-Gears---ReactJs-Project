import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import PromoCode from '../components/PromoCode'
import Header from '../components/Header'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate } = useContext(ShopContext)
  const [discount, setDiscount] = useState(0)

  return (
    <>
      <Header />
      <div className='bg-white'>
        <div className=' bg-opacity-10 backdrop-blur-lg pb-16'>
          <form className='max-padd-container py-10'>
            <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
              <div className='flex-1 flex flex-col gap-3 text-[95%]'>
                <Title title1={'Delivery '} title2={'Information'} />
                {/* (Existing form fields for delivery information) */}
                <div className='flex gap-3 mt-3'>
                  <div className='flex-1 relative'>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName" 
                      placeholder="First Name" 
                      className='mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      for="firstName" 
                      class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >First Name</label>
                  </div>
                  <div className='flex-1 relative'>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName" 
                      placeholder="Last Name" 
                      className=' mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      for="lastName" 
                      class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Last Name</label>
                  </div>
                </div>
                <div className='relative'>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="Email Address" 
                    className=' mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                  />
                  <label 
                    for="email" 
                    class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Email Address</label>
                </div>
                <div className='relative'>
                  <input 
                    type="number" 
                    id="phoneNumber"
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    className=' mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                  />
                  <label 
                    for="phoneNumber" 
                    class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Phone Number</label>
                </div>
                <div className='relative'>
                  <input 
                    type="text" 
                    id="street"
                    name="street" 
                    placeholder="Street" 
                    className=' mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                  />
                  <label 
                    for="street" 
                    class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Street</label>
                </div>

                <div className='flex gap-3 mt-3'>
                  <div className='flex-1 relative'>
                    <input 
                      type="text" 
                      id="city"
                      name="city" 
                      placeholder="City" 
                      className='mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      for="city" 
                      class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >City</label>
                  </div>
                  <div className='flex-1 relative'>
                    <input 
                      type="text" 
                      id="state"
                      name="state" 
                      placeholder="State" 
                      className=' mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      for="state" 
                      class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >State</label>
                  </div>
                </div>

                <div className='flex gap-3 mt-3'>
                  <div className='flex-1 relative'>
                    <input 
                      type="number" 
                      id="zipCode"
                      name="zipCode" 
                      placeholder="zipCode" 
                      className='mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      for="zipCode" 
                      class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Zip Code</label>
                  </div>
                  <div className='flex-1 relative'>
                    <input 
                      type="text" 
                      id="country"
                      name="country" 
                      placeholder="Country" 
                      className=' mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600'
                    />
                    <label 
                      for="country" 
                      class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >Country</label>
                  </div>
                </div>
              </div>

            

              <div className='flex flex-1 flex-col'>
                {/* Promo Code Input */}
                <PromoCode setDiscount={setDiscount} />

                {/* Cart Total with applied discount */}
                <CartTotal discount={discount} />

                <div className='flex items-center justify-start py-6'>
                  <h3 className='bold-20 me-5 text-nowrap'>Payment Method: </h3>
                  <div className='flex gap-3'>
                    <div onClick={() => setMethod('cod')} className={`${method === "cod" ? "btn-dark text-nowrap" : "btn-white border border-slate-800"} !py-1 text-xs cursor-pointer`}>Cash On Delivery</div>
                    <div onClick={() => setMethod('stripe')} className={`${method === "stripe" ? "btn-dark" : "btn-white border border-slate-800"} !py-1 text-xs ring-1 ring-slate-800 cursor-pointer`}>Stripe</div>
                  </div>
                </div>
                <div className="flex justify-evenly mt-4">
                  <button onClick={() => navigate('/cart')} className='btn-secondary'>Back to Cart</button>
                  <button type='submit' className='btn-secondary'>Place Order</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PlaceOrder
