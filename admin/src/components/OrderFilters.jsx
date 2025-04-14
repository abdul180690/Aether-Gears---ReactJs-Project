import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const OrderFilters = ({
  statusFilter,
  handleStatusChange,
  searchTerm,
  handleSearchChange,
  clearHandler,
  sortOption,
  handleSortChange,
}) => {
  return (
    <div className="flexBetween gap-3 mb-5 lg:flex-nowrap xs:flex-wrap">
      <div className="flexCenter mb-1">
        <p className="text-black pe-3">View </p>
        <select
          onChange={handleStatusChange}
          value={statusFilter}
          className="p-2  rounded-md  border  border-slate-400 text-sm"
        >
          <option value="All">All Orders</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div className="relative w-[300px]  mb-1">
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 sm:text-xl text-lg" />
        <input
          type="text"
          placeholder="Search here..."
          className="p-2 pl-10 shadow-md rounded-lg w-full "
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IoClose
          onClick={clearHandler}
          className="absolute right-2 top-1/4 text-xl cursor-pointer text-gray-400 hover:text-gray-700 duration-300"
        />
      </div>
      <div className="mb-1 flexCenter">
        <p className="text-black me-3">Sort by </p>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 rounded-md  border border-slate-400 text-sm"
        >
          <option value="New" className="py-5">
            New
          </option>
          <option value="Oldest" className="py-5">
            Oldest
          </option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilters;