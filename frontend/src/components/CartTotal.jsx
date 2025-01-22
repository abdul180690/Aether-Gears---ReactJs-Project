// import React, { useCallback, useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title'

// const CartTotal = () => {
// const {currency, getCartAmount, delivery_charges} = useContext(ShopContext)

//   return (
//     <section>
//         <Title 
//             title1={'Cart'}
//             title2={'Total'}
//             title1Styles={'h3'}
//         />
//         <div className='flexBetween pt-3'>
//             <h5 className='h5'>SubTotal: </h5>
//             <p className='h5'>{currency} {getCartAmount()}</p>
//         </div>
//         <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>

//         <div className='flexBetween pt-3'>
//             <h5 className='h5'>Shipping Fee: </h5>
//             <p className='h5'>{getCartAmount() === 0 ? "0.00" : `${currency} ${delivery_charges}`}</p>
//         </div>

//         <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>
//         <div className='flexBetween pt-3'>
//             <h5 className='h5'>Total: </h5>
//             <p className='h5'>{currency} {getCartAmount() === 0 ? "0.00" : getCartAmount() + delivery_charges}</p>
//         </div>
//     </section>
//   )
// }

// export default CartTotal

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);

  const cartAmount = getCartAmount(); // Subtotal before tax
  const cgstRate = 0.05; // CGST (5%)
  const sgstRate = 0.05; // SGST (5%)
  const cgstAmount = cartAmount * cgstRate;
  const sgstAmount = cartAmount * sgstRate;
  const taxAmount = cgstAmount + sgstAmount; // Total tax (CGST + SGST)
  const afterTaxAmount = cartAmount + taxAmount; // Subtotal after tax
  const shippingFee = cartAmount === 0 ? 0 : delivery_charges; // Conditional shipping fee
  const totalAmount = afterTaxAmount + shippingFee; // Final total (after tax + shipping)

  return (
    <section className="p-5 rounded-2xl">
      {/* Title */}
      <Title 
        title1="Order "
        title2="Summary"
      />

      {/* Before Tax */}
      <div className="flex justify-between items-center py-1">
        <h5 className="  text-gray-700">Before Tax:</h5>
        <p className=" text-gray-800">
          {currency} {cartAmount.toFixed(2)}
        </p>
      </div>
      <hr className="border-gray-300 my-2" />

      {/* CGST */}
      <div className="flex justify-between items-center ">
        <h5 className="text-sm text-gray-700">CGST (5%):</h5>
        <p className="  text-gray-800">
          {currency} {cgstAmount.toFixed(2)}
        </p>
      </div>

      {/* SGST */}
      <div className="flex justify-between items-center ">
        <h5 className="text-sm text-gray-700">SGST (5%):</h5>
        <p className="  text-gray-800">
          {currency} {sgstAmount.toFixed(2)}
        </p>
      </div>
      <hr className="border-gray-300 my-2" />

      {/* After Tax */}
      <div className="flex justify-between items-center py-1">
        <h5 className="  text-gray-700">After Tax:</h5>
        <p className="  text-gray-800">
          {currency} {afterTaxAmount.toFixed(2)}
        </p>
      </div>

      {/* /* Shipping Fee  */}
      <div className="flex justify-between items-center py-1">
        <h5 className="  text-gray-700">Shipping Fee:</h5>
        <p className=" text-gray-800">
          {currency} {totalAmount > 1000 ? shippingFee.toFixed(2) : 0.00 }
        </p>
      </div>
      <hr className="border-gray-300 my-2" />

      {/* Total */}
      <div className="flex justify-between items-center py-1">
        <h5 className="text-xl font-bold text-gray-900">Total:</h5>
        <p className="text-xl font-bold text-gray-900">
          {currency} {totalAmount.toFixed(2)}
        </p>
      </div>
    </section>
  );
};

export default CartTotal;

