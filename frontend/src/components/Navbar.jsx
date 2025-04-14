import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBloggerB } from "react-icons/fa";
import { HiCollection } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

const Navbar = ({ containerStyles, onClick }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [hoveredLink, setHoveredLink] = useState(null); // Track hovered link

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHeaderVisible(!(currentScrollY > lastScrollY && currentScrollY > 200));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { path: "/", title: "Home", icon: <FaHome /> },
    { path: "/collection", title: "Collection", icon: <HiCollection /> },
    { path: "/blog", title: "Blog", icon: <FaBloggerB /> },
    { path: "/about-us", title: "About Us", icon: <MdGroups /> },
    { path: "/contact", title: "Contact", icon: <IoMdMail /> },
  ];

  return (
    <nav
      className={`${containerStyles} ${
        headerVisible
          ? "fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex justify-center bg-slate-900 bg-opacity-80 backdrop-blur-sm rounded-b-2xl"
          : "-translate-y-full"
      } transition-all duration-300`}
      onMouseLeave={() => setHoveredLink(null)} // Reset when mouse leaves
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${
              isActive ? "tracking-[5px] nav-underlined" : ""
            } flex items-center text-white p-1 transition-all duration-300 ease-in-out 
            hover:tracking-[5px] hover:bg-white hover:text-black hover:rounded-lg hover:drop-shadow-lg
            ${hoveredLink && hoveredLink !== link.title ? "filter blur-sm" : ""}`
          }
          onClick={onClick}
          onMouseEnter={() => setHoveredLink(link.title)} // Set hovered link
        >
          <span className="mr-1.5 text-amber-400">{link.icon}</span>
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
