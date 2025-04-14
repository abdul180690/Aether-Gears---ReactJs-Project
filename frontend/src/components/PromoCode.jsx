import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BiSolidOffer } from "react-icons/bi";

const PromoCode = ({ setDiscount, cartData, products, user }) => {
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user is new
  useEffect(() => {
    if (user && user.createdAt) {
      const userCreatedDate = new Date(user.createdAt);
      const currentDate = new Date();
      const timeDiff = currentDate - userCreatedDate;
      const daysSinceSignUp = timeDiff / (1000 * 60 * 60 * 24); // Convert to days

      setIsNewUser(daysSinceSignUp <= 7); // Consider "new" if signed up within 7 days
    }
  }, [user]);

  // Promo Codes
  const promoCodes = [
    { code: "NEWYEAR20", discount: 20, category: null }, // Works for all categories
    { code: "FLAT30", discount: 30, category: "Headphones" },
    { code: "FLAT50", discount: 50, category: "Cameras" },
    { code: "FLAT10", discount: 10, category: null, newUserOnly: true }, // NEW USERS ONLY
  ];

  // Get categories from cart
  const getCategoriesFromCart = () => {
    const categories = new Set();
    Object.keys(cartData).forEach((productId) => {
      const product = products.find((prod) => prod._id === productId);
      if (product) {
        const hasValidQuantity = Object.values(cartData[productId]).some(
          (quantity) => quantity > 0
        );
        if (hasValidQuantity) {
          categories.add(product.category.trim());
        }
      }
    });
    return Array.from(categories);
  };

  // Handle Promo Code Submit
  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();

    const categoriesInCart = getCategoriesFromCart();

    // Check if cart has both Headphones and Cameras
    if (categoriesInCart.includes("Headphones") && categoriesInCart.includes("Cameras")) {
      setDiscount(0);
      toast.error("Promo code will apply with only one category item in the cart.");
      return;
    }

    const validPromo = promoCodes.find((item) => item.code === promoCode.toUpperCase());

    // Check if promo code is valid
    if (validPromo) {
      if (validPromo.newUserOnly && !isNewUser) {
        toast.error(`Promo code "${validPromo.code}" is only available for new users.`);
        return;
      }

      // Check if promo code is valid for the categories in cart
      if (
        validPromo.category === null ||
        categoriesInCart.some((category) => category === validPromo.category.trim())
      ) {
        setDiscount(validPromo.discount);
        toast.success(`Discount of ${validPromo.discount}% Applied.`);
      } else {
        setDiscount(0);
        toast.error(`Promo code "${validPromo.code}" is only valid for ${validPromo.category}.`);
      }
    } else {
      setDiscount(0);
      toast.error("Invalid promo code. Please re-enter the correct code.");
    }
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        id="promoCode"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Enter Promo Code"
        className="mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
      />
      <label
        htmlFor="promoCode"
        className="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        Promo Code  <small>(All Caps)</small>
      </label>
      <button
        type="submit"
        onClick={handlePromoCodeSubmit}
        className="flexCenter relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-gray-800 rounded-lg py-1.5 px-5 text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:rounded-lg before:border-2 before:border-gray-800 before:-z-100 before:transition-all"
      >
        <BiSolidOffer className="me-2 text-xl" />
        Apply Promo Code
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PromoCode;
