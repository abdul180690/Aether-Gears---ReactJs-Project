import React from "react";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

const NewsLetter = () => {
  return (
    <section className="max-padd-container border-t-[1px] border-slate-400 border-b-[1px] pt-5 my-16">
      <div className="lg:flexBetween xs:flex-wrap gap-3">
        {/* Left Section: Header & Description */}
        <div className="mb-5">
          <h4 className="bold-14 uppercase tracking-wider text-center">
            Subscribe to our Newsletter
          </h4>
          <p className="text-sm text-gray-600 text-center">
            Get the latest updates on Events, Sales, & Offers.
          </p>
        </div>

        {/* Middle Section: Email Subscription */}
        <div className="flex-1 lg:px-20 md:px:15 xs:px-5 mb-5">
          <div className="flex bg-primary">
            <input
              type="email"
              placeholder="Email Address"
              className="p-4 w-full outline-none text-[13px] text-black placeholder-gray-500 bg-white"
            />
            <button className="btn bg-slate-800 text-white p-4 !rounded-none !text-[13px] !font-bold uppercase  hover:bg-slate-700 duration-300">
              Submit
            </button>
          </div>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flexCenter gap-x-3 mb-5">
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