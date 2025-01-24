import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaBlog } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";


const Navbar = ({ containerStyles, onClick }) => {
  const navLinks = [
    { path: '/', title: 'Home', icon: <FaHome /> },
    { path: '/collection', title: 'Collection', icon: <FaList /> },
    { path: '/blog', title: 'Blog', icon: <FaBlog /> },
    { path: '/about', title: 'About Us', icon: <FcAbout className='text-white'/> },
  ];

  return (
    <nav className={`${containerStyles}  flex gap-4`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${isActive ? 'nav-underlined text-white' : 'text-white'} flex items-center hover:scale-105 px-2  focus:bold-18 transition-all duration-300`
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
