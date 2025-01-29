import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBloggerB, FaCaretDown } from "react-icons/fa";
import { HiCollection } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

const Navbar = ({ containerStyles, onClick }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

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

  const navLinks = [
    { 
      path: "/", 
      title: "Home", 
      icon: <FaHome className="text-amber-400" /> 
    },
    {
      path: "/blog",
      title: "Blog",
      icon: <FaBloggerB className="text-amber-400" />,
    },
    {
      path: "/about-us",
      title: "About Us",
      icon: <MdGroups className="text-xl text-amber-400" />,
    },
    {
      path: "/contact",
      title: "Contact",
      icon: <IoMdMail className=" text-amber-400" />,
    },
  ];

  return (
    <nav
      className={`${containerStyles} ${
        headerVisible
          ? "fixed top-0 left-[30%] z-40 flex justify-center shadow-sm ring-1 ring-slate-100"
          : "-translate-y-full"
      } flex gap-4`}
    >
      {/* Home Link */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? "nav-underlined text-white duration-300" : "text-white"
          } flex items-center p-1 hover:bg-slate-100 hover:bg-opacity-30 hover:rounded-full hover:px-2 transition-all duration-300`
        }
        onClick={onClick}
      >
        <FaHome className="text-amber-400 mr-2" />
        Home
      </NavLink>

      {/* Collection Link with Dropdown */}
      <div className="relative group">
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `${
            isActive ? "nav-underlined text-white duration-300" : "text-white"
        } flex items-center p-1 text-white hover:bg-slate-100 hover:bg-opacity-30 hover:rounded-full hover:px-2 transition-all duration-300`
      }
        onClick={onClick}
        >
          <HiCollection className="text-amber-400 mr-2" />
          <span className="mr-2">Collection</span>
          <FaCaretDown className="ml-2" />
        </NavLink>

        {/* Dropdown Menu for Collection */}
        <div className="absolute left-0 mt-2 w-48 bg-slate-900 bg-opacity-90 text-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <NavLink
            to="/offers"
            className="block p-2 hover:bg-slate-100 hover:bg-opacity-30 text-center transition-all duration-300"
          >
            Offers
          </NavLink>
        </div>
      </div>

      {/* Other Links */}
      {navLinks
        .filter((link) => link.title !== "Home")
        .map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            className={({ isActive }) =>
              `${
                isActive
                  ? "nav-underlined text-white duration-300"
                  : "text-white"
              } flex items-center p-1 hover:bg-slate-100 hover:bg-opacity-30 hover:rounded-full hover:px-2 transition-all duration-300`
            }
            onClick={onClick}
          >
            <span className="mr-2">{link.icon}</span>
            {link.title}
          </NavLink>
        ))}
    </nav>
  );
};

export default Navbar;
