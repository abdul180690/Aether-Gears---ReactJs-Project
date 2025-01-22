import React from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <div className="flex flexbetween items-center bg-amber-100 text-sm text-gray-700 py-1 bg-opacity-50 relative">
      {/* Free Shipping Section */}
      <div className="my-1 mx-6 text-center">
        <p className="text-secondary capitalize font-semibold">
           <span className="font-extrabold text-red-500">FREE</span> shipping on orders{" "}
          <span className="font-bold">₹1000</span> and up!{" "}
          <span className="underline text-xs lowercase font-bold hover:text-red-500">
            <Link>*details</Link>
          </span>{" "}
          
        </p>
      </div>

      {/* Black Friday Offer Section */}
      <div className="my-1 mx-6 text-center ">
        <p className="text-secondary capitalize font-semibold  rounded-xl mt-1 p-1">
           <span className="uppercase font-extrabold text-red-500">black friday offer!</span> use
          code <span className="font-extrabold text-red-500 uppercase text-xl animate-pulseGlow">20% off</span> at
          checkout to get a killer deal.{" "}
          <span className="underline text-xs lowercase font-bold hover:text-red-500">
            <Link>*details</Link>
          </span>{" "}
          
        </p>
      </div>

      {/* First Purchase Discount Section */}
      <div className="my-1 mx-6 text-center">
        <p className="text-secondary capitalize font-semibold">
           <span className="font-extrabold uppercase text-red-500 ">10% off</span>  on
          first purchase! {" "}
          <span className="capitalize underline text-xs font-bold hover:text-red-500">
            <Link to={"/collection"}> Shop Now </Link>
          </span>{" "}
          
        </p>
      </div>
    </div>
  );
};

export default Notification;