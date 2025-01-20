import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { TbUserCircle } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import logo from "../assets/icon.png";
import { ShopContext } from "../context/ShopContext";
// import cart from "../assets/cart.png";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const {getCartCount, navigate} = useContext(ShopContext);

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  return (
    <header className="max-padd-container w-full mb-2 bg-slate-800">
      <div className="flexBetween py-3">
        {/* Logo */}
        <Link to={"/"} className="flex flex-1  items-center text-white">
          <span className="me-3">
            <img src={logo} alt="Logo" className="w-5 h-5" />
          </span>
          <span className="text-white uppercase tracking-widest">Aether Gears</span>
          
        </Link>

        {/* Navbar */}
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex items-start flex-col gap-y-8 fixed top-20 right-6 p-5 bg-primary rounded-xl shadow-xl w-52 ring-1 ring-slate-900/5 z-50"
              : "hidden xl:flex gap-x-5 xl:gap-x-7 medium-15 bg-primary ring-1 ring-slate-900/5 rounded-full p-1"
          }`}
          onClick={() => setMenuOpened(false)}
        />

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-end gap-x-2 xs:gap-x-8">
          {/* Menu Toggle Button */}
          <>
            {menuOpened ? (
              <FaBarsStaggered
                onClick={toggleMenu}
                className="xl:hidden cursor-pointer text-2xl duration-300 text-white"
              />
            ) : (
              <FaBars
                onClick={toggleMenu}
                className="xl:hidden cursor-pointer text-2xl text-white"
              />
            )}
          </>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <div className="flex px-3 bold-18 text-white">
              {/* <img src={cart} alt="Cart" className="w-12 h-12" /> */}
              <IoMdCart className="text-3xl"/>
              <span className="bg-amber-200 ring-white ring-1 text-black text-[12px] font-semibold absolute -top-2 -right-0 flexCenter w-5 h-5 rounded-full shadow-lg">
                {getCartCount()}
              </span>
            </div>
          </Link>

          {/* Login Button */}
          <div className="relative">
            <button onClick={()=> navigate('/login')}className="btn-white flexCenter gap-x-2 hover:bg-gray-200 duration-300">
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
