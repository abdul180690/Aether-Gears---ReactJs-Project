import React, { useEffect } from "react";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

const NewsLetter = () => {
  useEffect(() => {
          const handleScroll = () => {
            const sections = document.querySelectorAll(".scroll-section"); 
            const windowHeight = window.innerHeight;
      
            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              if (rect.top < windowHeight * 0.9 && rect.bottom >= 0) {
                section.classList.add("in-view"); 
              } else {
                section.classList.remove("in-view");
              }
            });
          };
      
          window.addEventListener("scroll", handleScroll);
          handleScroll(); 
      
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);
      
  return (
    <section className="max-padd-container  pt-5 my-16">
      <div className="lg:flexBetween xs:flex-wrap gap-3 scroll-section">
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
        <div className="flex-1 lg:px-20 md:px:15 xs:px-5 mb-5 scroll-section">
          <div className="z-10 flex">
            <input
              type="email"
              placeholder="Email Address"
              className="p-4 w-full outline-none text-[13px] text-black placeholder-gray-600 bg-white ring-1 ring-slate-400"
            />
            <button
              type="submit" 
              className="relative ring-1 uppercase font-medium ring-slate-400 bg-transparent py-1.5 px-5  text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flexCenter gap-x-3 mb-5 scroll-section">
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