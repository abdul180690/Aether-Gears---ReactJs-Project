import React from "react";
import { TbPackages } from "react-icons/tb";
import { LuPackagePlus, LuPackageOpen, LuPackageCheck } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const StatusCountCard = ({ statusCounts, totalOrders }) => {
  return (
    <div className="">
      <h2 className="h4 mb-5 text-center flexCenter">
        <TbPackages className="mr-2" />
        Total Orders: {totalOrders}
      </h2>
      <div className="flex gap-5 justify-center px-3">
        <div className="border-e-2  border-e-black  pe-5  text-center">
          <p className="text-[#E52020] mb-5 font-semibold text-[13px]">
            <LuPackagePlus className="mb-1 mx-auto text-2xl" />
            New Orders
          </p>
          <span className="font-bold text-white px-5 py-2 bg-[#E52020] rounded-full shadow-lg">
            {statusCounts["Order Placed"]}
          </span>
        </div>
        <div className="border-e-2 border-e-black pe-5 text-center">
          <p className="text-[#DF6D14] mb-5 font-semibold text-[13px]">
            <LuPackageOpen className="mb-1 mx-auto text-2xl" />
            Under Packing
          </p>
          <span className="font-bold text-white px-5 py-2 bg-[#DF6D14] rounded-full shadow-lg">
            {statusCounts.Packing}
          </span>
        </div>
        <div className="border-e-2 border-e-black pe-5 text-center">
          <p className="text-[#854836] mb-5 font-semibold text-[13px]">
            <FaShippingFast className="mb-1 mx-auto text-2xl" />
            Shipped Orders
          </p>
          <span className="font-bold text-white px-5 py-2 bg-[#854836] rounded-full shadow-lg">
            {statusCounts.Shipped}
          </span>
        </div>
        <div className="border-e-2 border-e-black pe-5 text-center">
          <p className="text-[#0079FF] mb-5 font-semibold text-[13px]">
            <MdDeliveryDining className="mb-1 mx-auto text-2xl" />
            Out for Delivery
          </p>
          <span className="font-bold text-white px-5 py-2 bg-[#0079FF] rounded-full shadow-lg">
            {statusCounts["Out for Delivery"]}
          </span>
        </div>
        <div className=" text-center">
          <p className="text-[#3A7D44] mb-5 font-semibold text-[13px]">
            <LuPackageCheck className="mb-1 mx-auto text-2xl" />
            Delivered Orders
          </p>
          <span className="font-bold text-white px-5 py-2 bg-[#3A7D44] rounded-full shadow-lg">
            {statusCounts.Delivered}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCountCard;