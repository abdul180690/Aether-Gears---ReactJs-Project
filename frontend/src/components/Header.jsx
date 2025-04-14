import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FiUser } from "react-icons/fi";
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

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
    window.location.reload();
  };

  // Get Cart and Wishlist Count
  const cartCount = getCartCount();
  const wishlistCount = getWishListCount();

  return (
    <header className="max-padd-container bg-slate-900 py-2">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex flex-1 px-3 items-center"
          >
            <span className="me-2 rounded-2xl  bg-white p-1 ">
              <img
                src={logo}
                alt="Logo"
                className="lg:w-10 lg:h-10 xs:w-10 xs:h-10 shadow-lg shadow-black/40 rounded-full ring-1 ring-slate-950/30 "
                loading="lazy"
              />
            </span>
            <span className="text-nowrap text-[19px] text-white font-extrabold uppercase tracking-[3px] lg:block md:block xs:hidden  ">
              Aether Gears
            </span>
          </Link>
        </div>

        <div className="flex-1 justify-center items-center ">
          {/* Navbar */}
          <Navbar
            containerStyles={`${
              menuOpened
                ? "flex  flex-col gap-y-7 fixed top-16 left-96 p-5 text-white bg-black bg-opacity-40 backdrop-blur-sm rounded-xl shadow-lg w-48 ring-1 ring-slate-900/5 z-50 transition-all duration-300"
                : "hidden xl:flex  xl:gap-x-3 tracking-widest  text-sm p-5"
            }`}
            onClick={() => setMenuOpened(false)}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-end items-center xs:ms-3 text-sm p-2  xs:gap-x-5">
          {/* Cart Icon */}
          {token && cartCount > 0 && (
            <Link to={"/cart"} className="relative">
              <div className="p-1">
                <IoMdCart className="p-1 text-3xl bg-amber-400 text-slate-800  rounded-lg hover:scale-110 duration-300 drop-shadow-md" />
                <span className="bg-white  text-black font-extrabold text-[10px] absolute -top-2 -right-2 flexCenter w-4 h-4 rounded-full p-1">
                  {cartCount}
                </span>
              </div>
            </Link>
          )}

          {/* User Profile */}
          <div className="group relative">
            <div>
              {token ? (
                <div className="flexCenter gap-x-2 bg-amber-400 rounded-lg p-1 shadow-lg ">
                  <FiUser className="p-1 
                   text-3xl cursor-pointer hover:scale-110 duration-300 bg-slate-900 text-white  rounded-full" />
                  <div className=" cursor-pointer text-xs text-nowrap">
                    Welcome <span className="font-bold text-sm">{user?.name}</span> 
                    {/* <p className="text-black text-center text-[12px]  text-wrap">
                      {user?.email}
                    </p> */}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="py-3 bold-14 px-3 bg-white text-slate-800 shadow-lg rounded-full text-sm flexCenter gap-x-1 hover:tracking-[5px] hover:px-4 duration-300"
                >
                  Login
                  <RiUserLine />
                </button>
              )}
            </div>
            {/* Dropdown */}
            {token && (
              <div className="absolute -right-[20px] lg:top-13 xs:top-12 hidden group-hover:flex flex-col medium-14 shadow-md z-50">
                <span className=" absolute -top-2 lg:left-[100px] xs:left-[98px] triangle"></span>
                <ul className="bg-transperant backdrop-blur-md bg-slate-900 bg-opacity-60 p-3 w-52 h-35 rounded-xl  ">                
                    <li
                    onClick={() => navigate("/orders")}
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold px-2 py-3 hover:py-4 hover:text-amber-300 duration-300"
                  >
                    My Orders
                    <IoBagCheck className="bg-amber-300 text-slate-800 p-0.5 text-xl rounded-md" />
                  </li>
                  <li
                    onClick={() => navigate("/cart")}
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold px-2 py-3 hover:py-4 hover:text-amber-300 duration-300"
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
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold px-2 py-3 hover:py-4 hover:text-amber-300 duration-300"
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
                    className="flexBetween text-white rounded-md hover:bg-black/30 cursor-pointer hover:font-extrabold hover:text-amber-300 px-2 py-3 hover:py-4 duration-300"
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
              className="xl:hidden cursor-pointer text-xl text-white drop-shadow-lg font-extrabold"
            />
          ) : (
            <FaBars
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl text-white drop-shadow-lg"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
