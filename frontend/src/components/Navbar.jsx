import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBloggerB } from "react-icons/fa";
import { HiCollection } from "react-icons/hi";
import { MdGroups } from "react-icons/md";


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
    { path: '/', title: 'Home', icon: <FaHome className='text-amber-400'/> },
    { path: '/collection', title: 'Collection', icon: <HiCollection className='text-amber-400'/> },
    { path: '/blog', title: 'Blog', icon: <FaBloggerB className='text-amber-400'/> },
    { path: '/about-us', title: 'About Us', icon: <MdGroups className='text-xl text-amber-400'/> },
  ];

  return (
    <nav className={`${containerStyles} ${
      headerVisible ? "fixed top-0 left-50  z-40  mt-3 flex justify-center shadow-sm " : "-translate-y-full"
    } flex gap-4`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${isActive ? 'nav-underlined text-white duration-300' : 'text-white'} flex items-center  p-1 hover:bg-slate-100 hover:bg-opacity-30 hover:rounded-full hover:px-2   transition-all duration-300`
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
