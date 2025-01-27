import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PromoCode = ({ setDiscount }) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  // List of valid promo codes with corresponding discounts
  const promoCodes = [
    { code: 'NEWYEAR20', discount: 20 },
    { code: 'NEW10', discount: 10 },
    { code: ' ', discount: 10 },
  ];

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();

    // Check if the entered promo code exists in the list
    const validPromo = promoCodes.find((item) => item.code === promoCode.toUpperCase());

    if (validPromo) {
      setDiscount(validPromo.discount); // Set discount based on the promo code
      toast.success('Discount Applied.');
    } else {
      setDiscount(0); // Reset discount if promo code is invalid
      toast.error('Invalid promo code. Please re-enter the correct code.');
    }
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        id="promoCode"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)} // Update promo code state
        placeholder="Enter Promo Code"
        className="mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
      />
      <label
        htmlFor="promoCode"
        className="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        Promo Code - <small>All Caps</small>
      </label>
      <button
        type="submit"
        onClick={handlePromoCodeSubmit} // Apply promo code on submit
        className="btn-secondary mt-3"
      >
        Apply Promo Code
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PromoCode;
