import React from "react";
import cards from "../assets/cards.png";
import logo from "../assets/icon.png";
import netbanking from "../assets/netbanking.png";
import cod from "../assets/cod.png";
import paypal from "../assets/paypal.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-[1px] bg-slate-800">
      <div className="max-padd-container flex items-start justify-between flex-wrap gap-12 mt-12">
        {/* logo - Left side */}
        <div className="flex flex-col max-w-sm gap-y-5">
          <div className="bold-28">
            <div className="flex items-center heading-gradient">
              <img src={logo} alt="Aether Gears Logo" className="w-8 h-8 me-3 ring-1 ring-white/80 rounded-full" />
              <span className="text-white uppercase tracking-widest">Aether Gears</span>
            </div>
          </div>
          <p className="text-white content-stretch text-justify line-clamp-6 leading-6">
             Aether Gears is a premium brand that blends cutting-edge technology with sophisticated design. Our products are crafted with attention to detail, ensuring that each item delivers exceptional performance, style, and comfort.
          </p>
          <div className="flex items-center gap-3">
            <img src={cards} alt="Payment Cards" width={144} className="" />
            <img src={paypal} alt="Payment Cards" width={100} className="" />
            <img src={netbanking} alt="Net Banking" width={65} className="" />
            <img src={cod} alt="Cash on Delivery" width={60} className="" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flexStart gap-7 xl:gap-x-36 flex-wrap text-white">
          <ul>
            <h4 className="h4 mb-3">Customer Service</h4>
            <li className="my-2">
              <Link to="/helpcenter" className="text-gray-400 hover:text-white transition-all">
                Help center
              </Link>
            </li>
            <li className="my-2">
              <Link to="/payment-methods" className="text-gray-400 hover:text-white transition-all">
                Payment methods
              </Link>
            </li>
            <li className="my-2">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-all">
                Contact
              </Link>
            </li>
            <li className="my-2">
              <Link to="/orders" className="text-gray-400 hover:text-white transition-all">
                Shipping status
              </Link>
            </li>
            <li className="my-2">
              <Link to="/complaints" className="text-gray-400 hover:text-white transition-all">
                Complaints
              </Link>
            </li>
          </ul>

          <ul>
            <h4 className="h4 mb-3">Legal</h4>
            <li className="my-2">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-all">
                Privacy Policy
              </Link>
            </li>
            <li className="my-2">
              <Link to="/cookie-settings" className="text-gray-400 hover:text-white transition-all">
                Cookie settings
              </Link>
            </li>
            <li className="my-2">
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-all">
                Terms & conditions
              </Link>
            </li>
            <li className="my-2">
              <Link to="/cancellation" className="text-gray-400 hover:text-white transition-all">
                Cancellation
              </Link>
            </li>
            <li className="my-2">
              <Link to="/imprint" className="text-gray-400 hover:text-white transition-all">
                Imprint
              </Link>
            </li>
          </ul>

          <ul>
            <h4 className="h4 mb-3">Others</h4>
            <li className="my-2">
              <Link to="/our-teams" className="text-gray-400 hover:text-white transition-all">
                Our teams
              </Link>
            </li>
            <li className="my-2">
              <Link to="/sustainability" className="text-gray-400 hover:text-white transition-all">
                Sustainability
              </Link>
            </li>
            <li className="my-2">
              <Link to="/press" className="text-gray-400 hover:text-white transition-all">
                Press
              </Link>
            </li>
            <li className="my-2">
              <Link to="/jobs" className="text-gray-400 hover:text-white transition-all">
                Jobs
              </Link>
            </li>
            <li className="my-2">
              <Link to="/news-letter2" className="text-gray-400 hover:text-white transition-all">
                Newsletter
              </Link>
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
