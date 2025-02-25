import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSolidOffer } from "react-icons/bi";

const PromoCode = ({ setDiscount, cartData, products }) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  // List of valid promo codes with corresponding discounts and applicable categories
  const promoCodes = [
    { code: 'NEWYEAR20', discount: 20, category: null }, // Works for all categories
    { code: 'FLAT30', discount: 30, category: 'Headphones' }, // Only for Headphones
    { code: 'FLAT50', discount: 50, category: 'Cameras' }, // Only for Cameras
  ];

  // Function to get the categories of products in the cart with quantity > 0
  const getCategoriesFromCart = () => {
    const categories = new Set();
    Object.keys(cartData).forEach((productId) => {
      const product = products.find((prod) => prod._id === productId);
      if (product) {
        // Check if any color variant has quantity > 0
        const hasValidQuantity = Object.values(cartData[productId]).some(
          (quantity) => quantity > 0
        );
        if (hasValidQuantity) {
          categories.add(product.category.trim()); // Trim to remove extra spaces
        }
      }
    });
    return Array.from(categories);
  };

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();

   
    // Get categories in the cart
    const categoriesInCart = getCategoriesFromCart();

    // Check if both categories are present in the cart
    if (categoriesInCart.includes('Headphones') && categoriesInCart.includes('Cameras')) {
      setDiscount(0); // Reset discount
      toast.error('Promo code will apply with only one category item in the cart.');
      return; // Exit the function early
    }

    // Check if the entered promo code exists in the list
    const validPromo = promoCodes.find((item) => item.code === promoCode.toUpperCase());

    if (validPromo) {

      // Check if the promo code is applicable for the product categories in the cart
      if (
        validPromo.category === null ||
        categoriesInCart.some((category) => category === validPromo.category.trim())
      ) {
        setDiscount(validPromo.discount); // Set discount based on the promo code
        toast.success(`Discount of ${validPromo.discount}% Applied.`);
      } else {
        setDiscount(0); // Reset discount if promo code is not applicable for the category
        toast.error(`Promo code "${validPromo.code}" is only valid for ${validPromo.category}.`);
      }
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
        className="flexCenter relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-gray-800 rounded-lg py-1.5 px-5 text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:rounded-lg before:border-2 before:border-gray-800 before:-z-100 before:transition-all"
      >
        <BiSolidOffer className='me-2 text-xl'/>
        Apply Promo Code
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PromoCode;