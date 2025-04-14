import React from "react";
import { PiPackageDuotone } from "react-icons/pi";

const OrderItem = ({
  order,
  selectedOrders,
  handleCheckboxChange,
  statusHandler,
  statusColors,
  formatCurrency,
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1.5fr] gap-4 items-start p-3 text-gray-700 rounded-lg shadow-lg ${
        order.status === "Delivered" ? "bg-gray-300/50" : "bg-white"
      }`}
    >
      <div className="flex ">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(order._id)}
          checked={selectedOrders.includes(order._id)}
          disabled={order.status === "Delivered"}
          className="me-4"
        />
        <PiPackageDuotone className="lg:text-6xl text-secondary " />
      </div>
      <div className="">
        <div className="medium-14">
          Order Date: {new Date(order.date).toLocaleString()}
        </div>
        <div className="medium-14">
          Order ID:{" "}
          <p className="text-[13px] bg-gray-700 bg-opacity-50 text-white inline mx-1">
            {order.orderId}
          </p>
        </div>
        

        <div className="flex items-start gap-3">
          <div className="medium-14">Items: </div>
          <div className="flex flex-col relative top-0.5">
            {order.items.map((item, index) => {
              return (
                <p key={index}>
                  {item.name} x {item.quantity} <span>"{item.color}"</span>
                  <span className="font-bold inline-block">(ID: {item._id})</span>
                </p>
                
              );
            })}
          </div>
        </div>
        <p className="medium-14 mt-3">
          <span className="text-tertiary">Name: </span>
          {order.address.firstName + " " + order.address.lastName}
        </p>
        <p className="medium-14">
          <span className="text-tertiary">Address: </span>
          <span>{order.address.street + ", "}</span>
          <span>{order.address.city + ", "}</span>
          <span>{order.address.state + ", "}</span>
          <span>{order.address.zipcode}</span>
        </p>
        <p className="medium-14">
          <span className="text-tertiary">email: </span>
          {order.address.email}
        </p>
      </div>

      <div>
        <p className="text-sm">Total: {order.items.length}</p>
        <p className="medium-14">
          <span className="text-tertiary">Phone: </span>
          {order.address.phone}
        </p>
        <p className="medium-14 ">
          <span className="text-tertiary">Total Amount: </span>
          Rs. {formatCurrency(order.amount)}
        </p>
        <p className="medium-14">
          <span className="text-tertiary">Payment Status: </span>
          {order.payment ? "Paid" : "COD"}
        </p>
      </div>
      <div className="">
        <p className="text-tertiary medium-14 me-2 text-nowrap">
          Update Status:{" "}
        </p>
        <select
          onChange={(event) => statusHandler(event, order._id)}
          value={order.status}
          className="w-full text-xs font-semibold p-1 ring-1 ring-slate-900/25 rounded max-w-36"
          style={{
            backgroundColor: statusColors[order.status] || "#ffffff",
            color: order.status ? "white" : "black",
          }}
          disabled={order.status === "Delivered"}
        >
          <option value="Order Placed" className="bg-[#E52020] text-white">
            Order Placed
          </option>
          <option value="Packing" className="bg-[#DF6D14] text-white">
            Packing
          </option>
          <option value="Shipped" className="bg-[#854836] text-white">
            Shipped
          </option>
          <option
            value="Out for Delivery"
            className="bg-[#0079FF] text-white"
          >
            Out for Delivery
          </option>
          <option value="Delivered" className="bg-[#3A7D44] text-white">
            Delivered
          </option>
        </select>
      </div>
    </div>
  );
};

export default OrderItem;