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
      } else if (currentScrollY < lastScrollY) {
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

  const cartCount = getCartCount();
  const wishlistCount = getWishListCount();

  return (
    <header
      className={`max-padd-container w-screen  mb-2 bg-gray-950 bg-opacity-80 backdrop-blur-sm transition-all duration-300 ${
        headerVisible ? "fixed top-0 left-0 w-full z-40" : "-translate-y-full"
      }`}
    >
      <div className="flexBetween py-3">
        {/* Logo */}
        <Link to={"/"} className=" flex flex-1 items-center hover:scale-105 duration-300 ">
          <span className="me-1">
            <img src={logo} alt="Logo" className="lg:w-5 lg:h-5 xs:w-10 xs:h-10" />
          </span>
          <span className="heading-gradient uppercase tracking-widest lg:block xs:hidden">Aether Gears</span>
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
          

          {/* Cart */}
          {cartCount > 0 && (
            <Link to={"/cart"} className="relative">
              <div className="flex ">
                <IoMdCart className="lg:text-2xl xs:text-3xl text-white hover:scale-125 duration-300" />
                <span className="bg-amber-300 ring-white ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-4 flexCenter w-4 h-4 rounded-full shadow-lg">
                  {cartCount}
                </span>
              </div>
            </Link>
          )}

          {/* Wishlist */}
          {wishlistCount > 0 && (
            <Link to={"/wishlist"} className="relative">
              <div className="flex">
                <BsClipboard2HeartFill className="lg:text-lg xs:text-2xl text-white hover:scale-125 duration-300" />
                <span className="bg-amber-300 ring-white ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-4 flexCenter w-4 h-4 rounded-full shadow-lg">
                  {wishlistCount}
                </span>
              </div>
            </Link>
          )}

          {/* Login Button */}
          <div className="relative">
            <button
              onClick={() => navigate("/login")}
              className="p-2 px-4 bg-white rounded-full text-sm flexCenter gap-x-1 hover:bg-slate-300/95 duration-300"
            >
              Login
              <RiUserLine className="" />
            </button>
          </div>

          {/* Menu Toggle Button */}
          {menuOpened ? (
            <FaBarsStaggered
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl duration-300 text-white hover:scale-90"
            />
          ) : (
            <FaBars
              onClick={toggleMenu}
              className="xl:hidden cursor-pointer text-xl text-white duration-300 hover:scale-90"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
