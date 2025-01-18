import React from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <div className="flex flexbetween items-center justify-evenly bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-300 py-3 shadow-md">
      {/* Free Shipping Section */}
      <div className="my-1 mx-6 text-center">
        <p className="text-secondary capitalize font-semibold">
           <span className="font-extrabold text-red-700">FREE</span> shipping on orders{" "}
          <span className="font-bold">₹500</span> and up!{" "}
          <span className="underline text-xs lowercase font-bold hover:text-red-700">
            <Link>*details</Link>
          </span>{" "}
          
        </p>
      </div>

      {/* Black Friday Offer Section */}
      <div className="my-1 mx-6 text-center ">
        <p className="text-secondary capitalize font-semibold animate-pulseGlow">
           <span className="uppercase font-extrabold text-red-700">black friday offer!</span> use
          code <span className="font-extrabold text-red-700 uppercase text-xl">20% off</span> at
          checkout to get a killer deal.{" "}
          <span className="underline text-xs lowercase font-bold hover:text-red-700">
            <Link>*details</Link>
          </span>{" "}
          
        </p>
      </div>

      {/* First Purchase Discount Section */}
      <div className="my-1 mx-6 text-center">
        <p className="text-secondary capitalize font-semibold">
           Get <span className="font-extrabold uppercase text-red-700 ">10% off</span>  on
          first purchase! {" "}
          <span className="capitalize underline text-xs font-bold hover:text-red-700">
            <Link to={"/collection"}> <br /> Shop Now </Link>
          </span>{" "}
          
        </p>
      </div>
    </div>
  );
};

export default Notification;