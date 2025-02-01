import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { RiUserLine } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";
import logo from "../assets/icon.png";
import { BsClipboard2HeartFill } from "react-icons/bs";

const Header = () => {
  const { getCartCount, getWishListCount, navigate } = useContext(ShopContext);
  const [menuOpened, setMenuOpened] = useState(false);
  
  const toggleMenu = () => setMenuOpened((prev) => !prev);


  const cartCount = getCartCount();
  const wishlistCount = getWishListCount();

  return (
    <header
      className={`max-padd-container w-screen  bg-amber-400 py-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex flex-1 bg-slate-900 bg-opacity-70 justify-start p-3 xs:bg-transparent xs:ring-0 xs:backdrop-blur-0 xs:shadow-none rounded-full items-center hover:scale-105 duration-300"
          >
            <span className="me-1">
              <img
                src={logo}
                alt="Logo"
                className="lg:w-7 lg:h-7 md:w-7 md:h-7 sm:w-10 sm:h-10 xs:w-12 xs:h-12 rounded-full shadow-lg ring-2 ring-slate-900/70 "
              />
            </span>
            <span className="title-font text-[#10375C] text-nowrap uppercase bold-18 tracking-[5px] lg:block md:block xs:hidden">
              Aether Gears
            </span>
          </Link>
        </div>

        <div className=" flex-1 justify-center items-center mt-3">
          {/* Navbar */}
          <Navbar
            containerStyles={`${
              menuOpened
                ? "flex items-start flex-col gap-y-7 fixed top-20 right-5 p-6 bg-slate-900 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl w-60 ring-1 ring-slate-900/5 z-50 transition-all duration-300"
                : "hidden  xl:flex gap-x-5 xl:gap-x-7 tracking-widest bg-black bg-opacity-70 justify-center backdrop-blur-sm shadow-lg text-sm  py-3 px-3 ring-1 ring-slate-100/20 rounded-b-3xl"
            }`}
            onClick={() => setMenuOpened(false)}
            className=""
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-end items-center  xs:ms-3  text-sm  p-2 px-4   gap-x-2 xs:gap-x-8">
          {/* Cart */}
          {cartCount > 0 && (
            <Link to={"/cart"} className="relative">
              <div className="flex ">
                <IoMdCart className="lg:text-3xl xs:text-2xl  xs:text-slate-900 text-white hover:scale-125 duration-300" />
                <span className="bg-white  ring-black ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-4 flexCenter w-4 h-4 rounded-full shadow-lg">
                  {cartCount}
                </span>
              </div>
            </Link>
          )}

          {/* Wishlist */}
          {wishlistCount > 0 && (
            <Link to={"/wishlist"} className="relative">
              <div className="flex">
                <BsClipboard2HeartFill className="lg:text-xl xs:text-xl xs:text-slate-900 text-white hover:scale-125 duration-300" />
                <span className="bg-white  ring-black ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-4 flexCenter w-4 h-4 rounded-full shadow-lg">
                  {wishlistCount}
                </span>
              </div>
            </Link>
          )}
          {/* Login Button */}
          <div className="relative">
            <button
              onClick={() => navigate("/login")}
              className="py-1 bold-14 px-3 bg-amber-100 ring-1 ring-slate-950/30 rounded-full text-sm flexCenter gap-x-1 hover:bg-amber-200 duration-300"
            >
              Login
              <RiUserLine className="" />
            </button>
          </div>

          {/* Menu Toggle Button */}
          {menuOpened ? (
            <FaBarsStaggered
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl lg:text-slate-900 xs:text-slate-900 duration-400 "
            />
          ) : (
            <FaBars
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl lg:text-slate-900 xs:text-slate-900  duration-400 "
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;