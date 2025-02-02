import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import add_icon from '../assets/add_icon.png'
import list_icon from '../assets/list_icon.png'
import orders_icon from '../assets/orders_icon.png'
import logo_icon from '../assets/icon.png'

const Sidebar = ({ setToken }) => {
  return (
    <div className="max-sm:flexCenter max-sm:pb-3 rounded bg-white pb-3 sm:w-1/5 sm:min-h-screen">
      <div className="fle flex-col gap-y-6 max-sm:items-center sm:flex-col pt-4 sm:pt-14">
        <Link to={"/"} className="flexCenter xs:mb-3 bg-black/80 p-2 mx-3 rounded-full shadow-lg">
          <img src={logo_icon} alt="logo" className="w-6 h-6 me-2"/>
          <span className="bold-18 xl:bold-26 text-amber-400">Aether Gears</span>
        </Link>
        <p className="text-center mb-3 text-lg">Admin Panel</p>
        <div className="flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <img src={add_icon} alt="add-icon" className="w-6 h-6"/>
            <div className="hidden lg:flex text-md">Add Items</div>
          </NavLink>
          <NavLink
            to={"/list"}
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <img src={list_icon} alt="add-icon" className="w-6 h-6"/>
            <div className="hidden lg:flex text-md">List</div>
          </NavLink>
          <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <img src={orders_icon} alt="add-icon" className="w-6 h-6"/>
            <div className="hidden lg:flex text-md">Orders</div>
          </NavLink>
          <div className="max-sm:ml-5 sm:mt-5">
            <button
              onClick={() => setToken("")}
              className="flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-red-500"
            >
              <BiLogOut className="text-3xl" />
              <div className="hidden lg:flex">Logout</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
