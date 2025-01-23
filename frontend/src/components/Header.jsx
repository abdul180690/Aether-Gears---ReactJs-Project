import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { RiUserLine } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";
import logo from "../assets/icon.png";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { getCartCount, getWishListCount, navigate } = useContext(ShopContext);

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  const handleScroll = () => {

    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHeaderVisible(false);
      }
      else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY); 
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`max-padd-container w-full mb-2 bg-gray-950 bg-opacity-80 backdrop-blur-sm transition-all duration-300 ${
        headerVisible ? "fixed top-0 left-0 w-full z-40 " : "-translate-y-full"
      }`}
    >
      <div className="flexBetween py-3">
        {/* Logo */}
        <Link to={"/"} className="flex flex-1 items-center hover:scale-105 duration-300">
          <span className="me-3">
            <img src={logo} alt="Logo" className="w-8 h-8" />
          </span>
          <span className="heading-gradient  text-lg uppercase tracking-widest">Aether Gears</span>
        </Link>

        {/* Navbar */}
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex items-start flex-col gap-y-6 fixed top-10 right-10 p-5 bg-slate-950 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-xl w-52 ring-1 ring-slate-900/5 z-50"
              : "hidden xl:flex gap-x-5 xl:gap-x-7 tracking-widest medium-15"
          }`}
          onClick={() => setMenuOpened(false)}
        />

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-end gap-x-2 xs:gap-x-8">
          {/* Menu Toggle Button */}
          {menuOpened ? (
            <FaBarsStaggered onClick={toggleMenu} className="xl:hidden cursor-pointer text-2xl duration-300 text-white" />
          ) : (
            <FaBars onClick={toggleMenu} className="xl:hidden cursor-pointer text-2xl text-white duration-300" />
          )}

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <div className="flex px-3 bold-18 text-white">
              <IoMdCart className="text-3xl text-white" />
              <span className="bg-amber-300 ring-white ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-0 flexCenter w-4 h-4 rounded-full shadow-lg">
                {getCartCount()}
              </span>
            </div>
          </Link>
          
          {/* Wishlist */}
          <Link to={"/wishlist"} className="relative">
            <div className="flex px-3 bold-18 text-white">
              <FaHeart className="ml-3 text-2xl text-white"/>
              <span className="bg-amber-300 ring-white ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-0 flexCenter w-4 h-4 rounded-full shadow-lg">
                  {getWishListCount()}
              </span>

            </div>
          </Link>
              
          {/* Login Button */}
          <div className="relative">
            <button onClick={() => navigate('/login')} className="btn-white flexCenter gap-x-2 hover:bg-slate-300/95 duration-300">
              Login
              <RiUserLine className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
