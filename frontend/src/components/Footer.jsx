import React from "react";
import cards from "../assets/cards.png";
import logo from "../assets/icon.png";
import netbanking from "../assets/netbanking.png";
import cod from "../assets/cod.png";

const Footer = () => {
  return (
    <footer className="border-t-[1px] bg-slate-800">
      <div className="max-padd-container flex items-start justify-between flex-wrap gap-12 mt-12">
        {/* logo - Left side */}
        <div className="flex flex-col max-w-sm gap-y-5">
          <div className="bold-28">
            <div className="flex items-center">
              <img src={logo} alt="Aether Gears Logo" className="w-8 h-8 me-3" />
              <span className="text-white uppercase tracking-widest">Aether Gears</span>
            </div>
          </div>
          <p className="text-white content-stretch text-justify line-clamp-6 leading-6">
             Aether Gears is a premium brand that blends cutting-edge technology with sophisticated design. Our products are crafted with attention to detail, ensuring that each item delivers exceptional performance, style, and comfort.
            <br />
            At Aether Gears, we are committed to providing our customers with innovative solutions for their gear needs. Whether you're a sports enthusiast, a traveler, or someone who values both form and function, our wide range of products is designed to meet your highest standards.
            <br />
            Join us on our journey to redefine what quality gear can be — explore our collection, stay updated with the latest news, and enjoy the confidence that comes with owning the best in the business.
          </p>
          <div className="flex items-center gap-3">
            <img src={cards} alt="Payment Cards" width={144} className="" />
            <img src={netbanking} alt="Net Banking" width={60} className="" />
            <img src={cod} alt="Cash on Delivery" width={54} className="" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flexStart gap-7 xl:gap-x-36 flex-wrap text-white">
          <ul>
            <h4 className="h4 mb-3">Customer Service</h4>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Help center
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Payment methods
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Contact
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Shipping status
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Complaints
              </a>
            </li>
          </ul>

          <ul>
            <h4 className="h4 mb-3">Legal</h4>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Privacy Policy
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Cookie settings
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Terms & conditions
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Cancellation
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Imprint
              </a>
            </li>
          </ul>

          <ul>
            <h4 className="h4 mb-3">Others</h4>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Our teams
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Sustainability
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Press
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Jobs
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <p className="max-padd-container bg-primary medium-14 py-2 px-8 rounded flexBetween mt-6 text-white">
        <span className="text-secondary">2025 AetherGears</span>
        <span className="text-secondary">All rights reserved</span>
      </p>
    </footer>
  );
};

export default Footer;
