import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { TbUserCircle } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoBagCheck } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";
import logo from "../assets/icon.png";
import { BsClipboard2HeartFill } from "react-icons/bs";

const Header = () => {
  const { getCartCount, getWishListCount, navigate, token, setToken, user } =
    useContext(ShopContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
    window.location.reload();
  };

  const cartCount = getCartCount();
  const wishlistCount = getWishListCount();

  return (
    <header className="max-padd-container  bg-amber-400 ">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex flex-1 bg-slate-900 bg-opacity-70 justify-start p-3 xs:bg-transparent xs:ring-0 xs:backdrop-blur-0 xs:shadow-none rounded-full items-center hover:scale-105 duration-300"
          >
            <span className="me-2">
              <img
                src={logo}
                alt="Logo"
                className="lg:w-7 lg:h-7 md:w-7 md:h-7 sm:w-10 sm:h-10 xs:w-12 xs:h-12  rounded-full border-2 border-slate-800"
                loading="lazy"
              />
            </span>
            <span className="text-nowrap text-md font-extrabold uppercase tracking-[5px] lg:block md:block xs:hidden ">
              Aether Gears
            </span>
          </Link>
        </div>

        <div className="flex-1 justify-center items-center mt-3">
          {/* Navbar */}
          <Navbar
            containerStyles={`${
              menuOpened
                ? "flex items-start flex-col gap-y-5 fixed top-16 right-5 p-5 bg-black bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg w-48 ring-1 ring-slate-900/5 z-50 transition-all duration-300"
                : "hidden xl:flex gap-x-5 xl:gap-x-7 tracking-widest bg-black bg-opacity-70 justify-center backdrop-blur-lg shadow-lg text-sm py-3 px-4 ring-1 ring-slate-100/20 rounded-b-lg"
            }`}
            onClick={() => setMenuOpened(false)}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-end items-center xs:ms-3 text-sm p-2 px-4 gap-x-2 xs:gap-x-8">
          {/* Cart Icon */}
          {token && cartCount > 0 && (
            <Link to={"/cart"} className="relative">
              <div className="flex">
                <IoMdCart className="lg:text-2xl xs:text-2xl xs:text-slate-900 text-white hover:scale-125 duration-300" />
                <span className="bg-white ring-black ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-4 flexCenter w-4 h-4 rounded-full shadow-lg">
                  {cartCount}
                </span>
              </div>
            </Link>
          )}

          {/* User Profile */}
          <div className="group relative">
            <div>
              {token ? (
                <div className="flexCenter gap-x-2">
                  <TbUserCircle className="text-[25px] cursor-pointer hover:scale-125 duration-300" />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="py-1 bold-14 px-3 bg-slate-900 text-white rounded-full text-sm flexCenter gap-x-1 hover:bg-slate-900/70 duration-300"
                >
                  Login
                  <RiUserLine />
                </button>
              )}
            </div>
            {/* Dropdown */}
            {token && (
              <div className="absolute xs:-right-[85px] lg:-right-[60px] top-10 hidden group-hover:flex flex-col medium-14 shadow-md z-50">
                <span className=" absolute -top-3 lg:left-[125px] xs:left-[100px] triangle"></span>
                <ul className="bg-transperant backdrop-blur-md bg-black bg-opacity-50 p-2 w-52 h-35 rounded-xl  ">                
                  <div className="text-center p-1 text-white">
                    Welcome <span>{user?.name}</span> 
                  </div>
                  <p className="text-white text-center text-[12px] p-1">
                    {user?.email}
                  </p>
                  <hr className="my-2" />
                  <li
                    onClick={() => navigate("/orders")}
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold p-2 hover:py-3 hover:text-amber-300 duration-300"
                  >
                    My Orders
                    <IoBagCheck className="bg-amber-300 text-slate-800 p-0.5 text-xl rounded-md" />
                  </li>
                  <li
                    onClick={() => navigate("/cart")}
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold p-2 hover:py-3 hover:text-amber-300 duration-300"
                  >
                    My Cart
                    <div className="flex relative">
                      <IoMdCart className="bg-amber-300 text-slate-800 p-0.5 text-xl rounded-md" />
                      <span className="bg-white ring-black ring-1 text-black text-[10px] font-semibold absolute -top-1.5 -right-2.5 flexCenter w-3 h-3 rounded-full shadow-lg">
                        {cartCount}
                      </span>
                    </div>
                  </li>
                  <li
                    onClick={() => navigate("/wishlist")}
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold p-2 hover:py-3 hover:text-amber-300 duration-300"
                  >
                    My Wishlist
                    <div className="flex relative">
                      <BsClipboard2HeartFill className="bg-amber-300 text-slate-800 p-0.5 text-xl rounded-md" />
                      <span className="bg-white ring-black ring-1 text-black text-[10px] font-semibold absolute -top-2 -right-3 flexCenter w-3 h-3 rounded-full shadow-lg">
                        {wishlistCount}
                      </span>
                    </div>
                  </li>
                  <li
                    onClick={logout}
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold hover:text-amber-300 p-2 hover:py-3 duration-300"
                  >
                    Logout
                    <RiLogoutCircleRLine className="bg-amber-300 text-slate-800 p-0.5 text-xl rounded-md " />
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Menu Toggle Button */}
          {menuOpened ? (
            <FaBarsStaggered
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl lg:text-slate-900 xs:text-slate-900"
            />
          ) : (
            <FaBars
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl lg:text-slate-900 xs:text-slate-900"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
