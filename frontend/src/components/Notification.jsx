import React, { useState } from "react";
import { toast } from "react-toastify";

const Notification = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleOpenPopup = (content) => {
    setPopupContent(content); 
    setIsPopupOpen(true); 
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCopyPromoCode = () => {
    navigator.clipboard.writeText('NEWYEAR20')
      .then(() => {
        toast.success('Promo code copied to clipboard!', { autoClose: 1000 });
      })
      .catch((err) => {
        toast.error('Failed to copy promo code.', { autoClose: 2000 });
        console.error('Clipboard copy error: ', err);
      });
  };

  return (
    <div className="max-padd-container flex lg:flexbetween gap-3 py-2 xs:flex-wrap items-center justify-center bg-amber-400 text-slate-950 mb-6">
      {/* Free Shipping Section */}
      <div className="my-1  text-center">
        <p className="text-secondary capitalize font-semibold">
          <span className="font-extrabold text-red-600">FREE</span> shipping on orders{" "}
          <span className="font-bold">₹1000</span> and up!{" "}
          <span
            className="underline text-xs lowercase font-bold hover:text-red-500 cursor-pointer"
            onClick={() => handleOpenPopup(
              "Shop now and enjoy free shipping on all orders above ₹1000! Add your favorite items to your cart and get them delivered in Indian Address right to your doorstep at no extra cost")}
          >
            *details
          </span>
        </p>
      </div>
      
      <div className="lg:block xs:hidden">|</div>
      
      {/* Offer Section */}
      <div className="my-1 text-center ">
        <p className="text-secondary capitalize font-semibold">
        Ring in the New Year with <span className="text-red-600 font-bold">20% off</span> everything! Use code <span onClick={handleCopyPromoCode} className="cursor-pointer underline uppercase text-red-600 font-extrabold animate-pulse flash">NEWYEAR20</span> now. 
          <span
            className="underline text-xs lowercase font-bold hover:text-red-500 cursor-pointer"
            onClick={() => handleOpenPopup("Kick off the New Year with HUGE savings! 🎉 Use code 'NEWYEAR20' at checkout to grab a massive discount on your favorite items - don't miss this killer deal!")}
          >
            *details
          </span>
        </p>
      </div>

      <div className="lg:block xs:hidden">|</div>
      
      {/* First Purchase Discount Section */}
      <div className="my-1 text-center">
        <p className="text-secondary capitalize font-semibold">
          <span className="font-extrabold uppercase text-red-600 ">10% off</span> on
          first purchase!
          <span
            className="capitalize underline text-xs font-bold hover:text-red-500 cursor-pointer"
            onClick={() => handleOpenPopup("Enjoy 10% off on your first order with us! New customers can save on their initial purchase by applying the special code at checkout!")}
          >
            *details
          </span>{" "}
        </p>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center mb-4">Offer Details</h3>
            <p className="text-sm text-gray-800">{popupContent}</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
