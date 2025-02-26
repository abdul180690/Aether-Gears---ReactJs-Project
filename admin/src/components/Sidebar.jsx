import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import add_icon from "../assets/add_icon.png";
import list_icon from "../assets/list_icon.png";
import orders_icon from "../assets/orders_icon.png";
import logo_icon from "../assets/icon.png";

const Sidebar = ({ setToken }) => {
  return (
    <div className="max-sm:flexCenter max-sm:pb-3 rounded bg-white pb-3 sm:w-1/5 sm:min-h-screen">
      <div className="fle flex-col gap-y-6 max-sm:items-center sm:flex-col pt-5 ">
        <div className="px-5 mx-ato">
          <Link
            to={"/"}
            className="flexCenter   p-2 mx-3 "
          >
            <img src={logo_icon} alt="logo" className="w-6 h-6 me-2" />
            <span className="bold-18 xl:bold-26 text-slate-800 text-nowrap">
              Aether Gears
            </span>
          </Link>
          <p className="text-center mb-16 text-lg">Admin Panel</p>
        </div>
        <div className="flex sm:flex-col gap-x-5 gap-y-8 ">
        <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              isActive
                ? "active-link shadow-lg duration-300 ease-in-out"
                : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <img src={orders_icon} alt="add-icon" className="w-6 h-6" />
            <div className="hidden lg:flex text-md text-md">Dashboard - Manage Orders</div>
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "active-link shadow-lg duration-300 ease-in-out"
                : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl "
            }
          >
            <img src={add_icon} alt="add-icon" className="w-6 h-6" />
            <div className="hidden lg:flex text-md">Add Items</div>
          </NavLink>
          <NavLink
            to={"/list"}
            className={({ isActive }) =>
              isActive
                ? "active-link shadow-lg duration-300 ease-in-out"
                : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <img src={list_icon} alt="add-icon" className="w-6 h-6" />
            <div className="hidden lg:flex text-md">List</div>
          </NavLink>
          
        </div>
      <div className="lg:mt-40 xs:mt-0 lg:ml-12 xs:-ml-24">
        <button
          onClick={() => setToken("")}
          className="flexCenter gap-x-2  cursor-pointer text-red-500"
        >
          <BiLogOut className="text-3xl " />
          <div className="hidden lg:flex ">Logout</div>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
