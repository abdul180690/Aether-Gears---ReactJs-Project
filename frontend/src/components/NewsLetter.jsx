import React from "react";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

const NewsLetter = () => {
  return (
    <section className="max-padd-container border-t-[1px] border-b-[1px] py-4 mb-16">
      <div className="flexBetween flex-wrap gap-2">
        {/* Left Section: Header & Description */}
        <div>
          <h4 className="bold-14 uppercase tracking-wider">
            Subscribe to our Newsletter
          </h4>
          <p className="text-sm text-gray-600">
            Get the latest updates on Events, Sales, & Offers.
          </p>
        </div>

        {/* Middle Section: Email Subscription */}
        <div>
          <div className="flex bg-primary">
            <input
              type="email"
              placeholder="Email Address"
              className="p-4 bg-primary w-[266px] outline-none text-[13px] text-black placeholder-gray-500"
            />
            <button className="btn bg-slate-800 text-white p-4 !rounded-none !text-[13px] !font-bold uppercase  hover:bg-slate-700 duration-300">
              Submit
            </button>
          </div>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex gap-x-3 pr-14">
          {[
            { Icon: FaFacebook, label: "Facebook" },
            { Icon: FaInstagram, label: "Instagram" },
            { Icon: FaXTwitter, label: "Twitter" },
          ].map(({ Icon, label }, index) => (
            <div
              key={index}
              className="h-9 w-9 rounded-full hover:bg-tertiary hover:text-white flexCenter transition-all duration-500 text-xl cursor-pointer"
              title={label}
            >
              <Icon />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;