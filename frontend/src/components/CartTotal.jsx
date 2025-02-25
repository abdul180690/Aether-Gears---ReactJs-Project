import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = ({ discount, setTotalAmount }) => {
  const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);

  const cartAmount = getCartAmount(); // Subtotal before tax

  // Apply discount if any
  const discountAmount = (cartAmount * discount) / 100; // Calculate discount
  const discountedAmount = cartAmount - discountAmount; // Subtotal after discount

  // CGST and SGST calculations
  const cgstRate = 0.05; // CGST (5%)
  const sgstRate = 0.05; // SGST (5%)
  const cgstAmount = discountedAmount * cgstRate;
  const sgstAmount = discountedAmount * sgstRate;
  const taxAmount = cgstAmount + sgstAmount; // Total tax (CGST + SGST)
  const afterTaxAmount = discountedAmount + taxAmount; // Subtotal after tax

  // Shipping fee: Only applies if total (after discount) exceeds a certain threshold, else it's zero
  const shippingFee = discountedAmount < 1000 ? delivery_charges : 0;

  const totalAmount = Math.round(afterTaxAmount + shippingFee); // Final total (after tax + shipping)

  useEffect(() => {
    setTotalAmount(totalAmount);
  }, [totalAmount, setTotalAmount]);

  // Function to format numbers with currency separator
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  return (
    <section className="p-5 rounded-2xl">
      <Title title1="Order " title2="Summary" />

      {/* Subtotal */}
      <div className="bold-15 flex justify-between items-center py-1">
        <h5 className="text-gray-700">Subtotal:</h5>
        <p className="text-gray-800">
          {currency} {formatCurrency(cartAmount)}
        </p>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between items-center py-1">
          <h5 className="text-gray-700">Discount ({discount}%):</h5>
          <p className="text-gray-800">
            - {currency} {formatCurrency(discountAmount)}
          </p>
        </div>
      )}

      <hr className="border-gray-300 my-2" />

      {/* Before Tax */}
      <div className="flex justify-between items-center py-1">
        <h5 className="text-gray-700">Before Tax:</h5>
        <p className="text-gray-800">
          {currency} {formatCurrency(discountedAmount)}
        </p>
      </div>
      <hr className="border-gray-300 my-2" />

      {/* CGST */}
      <div className="flex justify-between items-center ">
        <h5 className="text-[12px] text-gray-700">CGST (5%):</h5>
        <p className="text-gray-800 text-[12px]">
          {currency} {formatCurrency(cgstAmount)}
        </p>
      </div>

      {/* SGST */}
      <div className="flex justify-between items-center ">
        <h5 className="text-[12px] text-gray-700">SGST (5%):</h5>
        <p className="text-gray-800 text-[12px]">
          {currency} {formatCurrency(sgstAmount)}
        </p>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* After Tax */}
      <div className="flex justify-between items-center py-1">
        <h5 className="text-gray-700">After Tax:</h5>
        <p className="text-gray-800">
          {currency} {formatCurrency(afterTaxAmount)}
        </p>
      </div>

      {/* Shipping Fee */}
      <div className="flex justify-between items-center py-1">
        <h5 className="text-gray-700">
          Shipping Fee: <span className="font-bold">{}</span>
        </h5>
        <p className="text-gray-800">
          {shippingFee === 0.0 ? ' FREE Delivery ' : currency + formatCurrency(shippingFee)}
          <span className="line-through text-[12px]">
            {shippingFee === 0.0 ? '₹ 100.00' : ''}
          </span>
        </p>
      </div>

      {/* Rounded (+) or (-) */}
      <div className="flex justify-between items-center py-1">
        <h5 className="text-gray-700 text-sm">
          Rounded (+) or (-): <span className="font-bold">{}</span>
        </h5>
        <p className="text-gray-800 text-[12px]">
          {formatCurrency(totalAmount - (afterTaxAmount + shippingFee))}
        </p>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Total */}
      <div className="flex justify-between items-center py-1">
        <h5 className="text-xl font-bold text-gray-900">Total:</h5>
        <p className="text-xl font-bold text-gray-900">
          {currency} {formatCurrency(totalAmount)}
        </p>
      </div>
    </section>
  );
};

export default CartTotal;