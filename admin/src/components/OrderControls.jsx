import React from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

const OrderControls = ({
  handleSelectAll,
  filteredOrders,
  exportOrdersAsPDF,
  exportOrdersAsXLSX,
}) => {
  return (
    <div className="flex gap-3 my-3">
      <button
        onClick={handleSelectAll}
        disabled={filteredOrders.length === 0}
        title="Deselect before change the view"
        className="flexCenter px-2 py-2 xs:mb-1 text-[12px] rounded text-white bg-blue-700  hover:bg-blue-500 duration-300"
      >
        <BiSolidSelectMultiple className="me-1 text-lg" />
        Select All
      </button>
      <button
        onClick={exportOrdersAsPDF}
        className="mb-1 flexCenter bg-red-700 text-white text-[12px] p-1 px-2 rounded hover:bg-red-500 duration-300"
        title="Select orders and then click"
      >
        Export as <MdPictureAsPdf className="ml-2 text-lg" />
      </button>
      <button
        onClick={exportOrdersAsXLSX}
        className="mb-1 flexCenter py-1 px-2 bg-green-600 text-white rounded text-[12px] hover:bg-green-500 duration-300 ml-2"
      >
        Export as <RiFileExcel2Fill className="ml-2 text-xl" />
      </button>
    </div>
  );
};

export default OrderControls;