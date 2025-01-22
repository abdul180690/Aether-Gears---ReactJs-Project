import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaBlog, FaEnvelope } from "react-icons/fa";

const Navbar = ({ containerStyles, onClick }) => {
  const navLinks = [
    { path: '/', title: 'Home', icon: <FaHome /> },
    { path: '/collection', title: 'Collection', icon: <FaList /> },
    { path: '/blog', title: 'Blog', icon: <FaBlog /> },
    { path: 'mailto:info@aethergears.com', title: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <nav className={`${containerStyles}  flex gap-4`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${isActive ? 'nav-underlined text-white' : 'text-white'} flex items-center px-3 py-2 rounded-full focus:bold-18 transition-all duration-300`
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
