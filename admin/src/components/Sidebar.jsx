import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiLogOut, BiX } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import add_icon from "../assets/add_icon.png";
import list_icon from "../assets/list_icon.png";
import orders_icon from "../assets/orders_icon.png";
import logo_icon from "../assets/icon.png";

const Sidebar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      {isOpen && (
        <div className="max-sm:flexCenter max-sm:pb-3 bg-slate-800 pb-3 sm:w-1/5 sm:min-h-screen">
          <div className="fle flex-col gap-y-6 sm:items-center pt-5">
            {/* Logo */}
            <Link to={"/"} className="flexCenter p-2 mx-3">
              <img src={logo_icon} alt="logo" className="w-6 h-6 me-2" />
              <span className="bold-18 xl:bold-26 text-white text-nowrap">
                Aether Gears
              </span>
            </Link>
            <p className="text-center lg:mb-16 text-lg text-gray-300">
              Admin Panel
            </p>

            {/* Links */}
            <div className="flex sm:flex-col gap-x-5 gap-y-5 mt-3">
              <NavLink
                to={"/orders"}
                className={({ isActive }) =>
                  isActive
                    ? "active-link shadow-lg shadow-gray-500 duration-300 ease-in-out rounded-lg"
                    : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-white"
                }
              >
                <img src={orders_icon} alt="orders-icon" className="w-6 h-6" />
                <div className="hidden lg:flex text-md">
                  Manage Orders
                </div>
              </NavLink>

              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "active-link shadow-lg shadow-gray-500 duration-300 ease-in-out rounded-lg"
                    : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-white"
                }
              >
                <img src={add_icon} alt="add-icon" className="w-6 h-6" />
                <div className="hidden lg:flex text-md">Add Items</div>
              </NavLink>

              <NavLink
                to={"/list"}
                className={({ isActive }) =>
                  isActive
                    ? "active-link shadow-lg shadow-gray-500 duration-300 ease-in-out rounded-lg"
                    : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-white"
                }
              >
                <img src={list_icon} alt="list-icon" className="w-6 h-6" />
                <div className="hidden lg:flex text-md">List Items</div>
              </NavLink>
            </div>

            {/* Logout */}
            <div className="lg:mt-40 xs:mt-0 lg:ml-12 xs:-ml-24">
              <button
                onClick={() => setToken("")}
                className="flexCenter gap-x-2 cursor-pointer text-red-500"
              >
                <BiLogOut className="text-3xl" />
                <div className="hidden lg:flex">Logout</div>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" flexCenter w-10 h-10 p-2 mt-1 ml-1 text-red-500 rounded-full text-2xl hover:bg-red-500/90 hover:text-white hover:shadow-lg duration-300 ease-in-out"
      >
        {isOpen ? <BiX /> : <IoMenu />}
      </button>
      
    </>
  );
};

export default Sidebar;
