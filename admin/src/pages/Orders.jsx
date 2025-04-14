import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url } from "../App";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import JsBarcode from "jsbarcode";
import OrderStatusChart from "../components/OrderStatusChart";
import StatusCountCard from "../components/StatusCountCard";
import OrderItem from "../components/OrderItem";
import OrderControls from "../components/OrderControls";
import OrderFilters from "../components/OrderFilters";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortOption, setSortOption] = useState("New");
  const [prevOrders, setPrevOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusCounts, setStatusCounts] = useState({
    "Order Placed": 0,
    Packing: 0,
    Shipped: 0,
    "Out for Delivery": 0,
    Delivered: 0,
  });

  const statusColors = {
    "Order Placed": "#E52020",
    Packing: "#DF6D14",
    Shipped: "#854836",
    "Out for Delivery": "#0079FF",
    Delivered: "#3A7D44",
  };

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const ordersData = response.data.orders.reverse();
        setOrders(ordersData);
        setFilteredOrders(ordersData);
        updateStatusCounts(ordersData);
        setPrevOrders(ordersData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const checkForNewOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const ordersData = response.data.orders.reverse();
        const newOrders = ordersData.filter(
          (newOrder) =>
            !prevOrders.some((prevOrder) => prevOrder._id === newOrder._id)
        );

        if (newOrders.length > 0) {
          toast.success(`${newOrders.length} New Orders Found! 😀`, {
            autoClose: 1500,
          });
          setOrders(ordersData);
          setFilteredOrders(ordersData);
          updateStatusCounts(ordersData);
          setPrevOrders(ordersData);
        } else {
          toast.info("No New Orders 😞 ");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const updateStatusCounts = (ordersData) => {
    const counts = {
      "Order Placed": 0,
      Packing: 0,
      Shipped: 0,
      "Out for Delivery": 0,
      Delivered: 0,
    };
    ordersData.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    if (searchQuery === "") {
      setFilteredOrders(orders);
      setNoResults(false);
    } else {
      const filtered = orders.filter((order) => {
        const orderIdMatch = order.orderId.toLowerCase().includes(searchQuery);
        const nameMatch = (
          order.address.firstName +
          " " +
          order.address.lastName
        )
          .toLowerCase()
          .includes(searchQuery);
        const phoneMatch = order.address.phone
          .toLowerCase()
          .includes(searchQuery);
        const addressMatch = (
          order.address.street +
          " " +
          order.address.city +
          " " +
          order.address.state +
          " " +
          order.address.zipcode
        )
          .toLowerCase()
          .includes(searchQuery);
        const itemMatch = order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery)
        );

        return (
          orderIdMatch || nameMatch || phoneMatch || addressMatch || itemMatch
        );
      });

      setFilteredOrders(filtered);
      setNoResults(filtered.length === 0);
    }
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    if (event.target.value === "All") {
      setFilteredOrders(orders);
    } else {
      const filteredByStatus = orders.filter(
        (order) => order.status === event.target.value
      );
      setFilteredOrders(filteredByStatus);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order._id));
    }
  };

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelectedOrders) =>
      prevSelectedOrders.includes(orderId)
        ? prevSelectedOrders.filter((id) => id !== orderId)
        : [...prevSelectedOrders, orderId]
    );
  };

  const handleSortChange = (event) => {
    const sortedOrders = [...filteredOrders];
    const option = event.target.value;

    if (option === "New") {
      sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "Oldest") {
      sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setSortOption(option);
    setFilteredOrders(sortedOrders);
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const generateBarcodeDataUrl = (text) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE128", width: 1, height: 40 });
    return canvas.toDataURL("image/png");
  };

  const exportOrdersAsPDF = () => {
    if (selectedOrders.length === 0) {
      toast.error("At least select 1 order");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const marginTop = 10;
    const lineHeight = 6;
    const additionalSpacing = 4;
    const leftX = 10;
    const rightX = 110;
    const columnWidth = 90;
    let currentY = marginTop;
    let currentPage = 1;

    const addWatermark = (yOffset) => {
      doc.saveGraphicsState();
      doc.setFontSize(45);
      doc.setTextColor(240);
      doc.setFont("times", "bolditalic");
      doc.text("Aether Gears", pageWidth / 2, yOffset + 70, {
        angle: 45,
        align: "center",
      });
      doc.restoreGraphicsState();
    };

    const addFooter = () => {
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(`Page ${currentPage}`, pageWidth / 2, pageHeight - 5, {
        align: "center",
      });
    };

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    const viewStatusText = ` ${statusFilter}`;
    const statusTextWidth = doc.getTextWidth(viewStatusText);
    doc.text(viewStatusText, (pageWidth - statusTextWidth) / 2, currentY);
    doc.line(
      (pageWidth - statusTextWidth) / 2,
      currentY + 1,
      (pageWidth + statusTextWidth) / 2,
      currentY + 1
    );
    currentY += 10;

    selectedOrders.forEach((orderId, idx) => {
      const order = orders.find((o) => o._id === orderId);
      if (!order) return;

      addWatermark(currentY);

      const barcodeDataUrl = generateBarcodeDataUrl(order.orderId);
      const barcodeWidth = 60;
      const barcodeHeight = 20;
      const barcodeY = currentY;
      const orderDate = new Date(order.date);
      const formattedDate = `Order Date: ${String(orderDate.getDate()).padStart(
        2,
        "0"
      )}/${String(orderDate.getMonth() + 1).padStart(
        2,
        "0"
      )}/${orderDate.getFullYear()}`;

      doc.setFont("helvetica", "normal");
      doc.text(formattedDate, leftX, currentY + 10);

      doc.addImage(
        barcodeDataUrl,
        "PNG",
        rightX + 20,
        barcodeY,
        barcodeWidth,
        barcodeHeight
      );
      currentY += barcodeHeight + additionalSpacing;

      const leftYStart = currentY;

      let y = leftYStart;
      doc.setFont("helvetica", "bold");
      doc.text("Customer Info:", leftX, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.text(
        `Name: ${order.address.firstName} ${order.address.lastName}`,
        leftX,
        y
      );
      y += lineHeight;
      const addr = `Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}`;
      const wrappedAddr = doc.splitTextToSize(addr, columnWidth);
      wrappedAddr.forEach((line) => {
        doc.text(line, leftX, y);
        y += lineHeight;
      });
      doc.text(`Phone: ${order.address.phone}`, leftX, y);
      y += lineHeight;

      let yRight = leftYStart;
      doc.setFont("helvetica", "bold");
      doc.text(`Items: ${order.items.length}`, rightX, yRight);
      yRight += lineHeight;
      doc.setFont("helvetica", "normal");

      order.items.forEach((item) => {
        const text = `${item.name} x ${item.quantity} - "${item.color}"`;
        const lines = doc.splitTextToSize(text, columnWidth);
        lines.forEach((line) => {
          doc.text(line, rightX, yRight);
          yRight += lineHeight;
        });
      });

      currentY = Math.max(y, yRight) + additionalSpacing;

      doc.setFont("helvetica", "bold");
      doc.text("Payment Details:", leftX, currentY);
      currentY += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.text(`Order Amount: Rs. ${order.amount}`, leftX, currentY);
      currentY += lineHeight;
      doc.text(
        `Payment Status: ${order.payment ? "Done" : "COD"}`,
        leftX,
        currentY
      );
      currentY += lineHeight;

      doc.setLineWidth(0.2);
      doc.line(10, currentY, pageWidth - 10, currentY);
      currentY += 2;

      if (
        currentY + 60 > pageHeight - 10 ||
        idx === selectedOrders.length - 1
      ) {
        addFooter();
        if (idx !== selectedOrders.length - 1) {
          doc.addPage();
          currentY = marginTop;
          currentPage++;
        }
      }
    });

    doc.save("selected_orders.pdf");
  };

  const clearHandler = () => {
    setSearchTerm("");
    setFilteredOrders(orders);
  };

  const exportOrdersAsXLSX = () => {
    if (selectedOrders.length === 0) {
      toast.error("At least select 1 order");
      return;
    }

    const selectedData = selectedOrders
      .map((orderId) => {
        const order = orders.find((o) => o._id === orderId);
        if (!order) return null;

        return {
          "Order ID": order.orderId,
          Date: new Date(order.date).toLocaleString(),
          "Customer Name": `${order.address.firstName} ${order.address.lastName}`,
          Phone: order.address.phone,
          Address: `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}`,
          "Total Items": order.items.length,
          "Order Amount": `Rs. ${order.amount}`,
          "Payment Status": order.payment ? "Done" : "COD",
          "Order Status": order.status,
          "Order Items": order.items
            .map((item) => `${item.name} x ${item.quantity} - ${item.color}`)
            .join(", "),
        };
      })
      .filter(Boolean);

    const ws = XLSX.utils.json_to_sheet(selectedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    XLSX.writeFile(wb, "selected_orders.xlsx");
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  return (
    <div className="px-4 sm:px-8 my-5">
      <div className="mb-5 flex justify-end">
        <button
          onClick={checkForNewOrders}
          className="py-1 px-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-500 duration-300"
        >
          Check New orders
        </button>
      </div>
      <div className="mb-10 p-5 rounded-xl shadow-lg border-b-8 border-black/70 bg-[#FFDFEF] flexCenter xs:flex-wrap gap-x-3 px-5">
        <div className="mb-2">
          <h5 className="h5 text-center text-black">Orders Status</h5>
          <OrderStatusChart statusCounts={statusCounts} />
        </div>
        <StatusCountCard
          statusCounts={statusCounts}
          totalOrders={orders.length}
        />
      </div>

      <OrderFilters
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        clearHandler={clearHandler}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
      />

      <OrderControls
        handleSelectAll={handleSelectAll}
        filteredOrders={filteredOrders}
        exportOrdersAsPDF={exportOrdersAsPDF}
        exportOrdersAsXLSX={exportOrdersAsXLSX}
      />

      {noResults && (
        <div className="text-center text-red-500 pb-5">No orders found.</div>
      )}

      <div className="flex flex-col gap-4 h-[75vh] pb-10 overflow-y-auto border-t-2 rounded-t-lg border-t-gray-400 pt-1">
        {filteredOrders.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
            selectedOrders={selectedOrders}
            handleCheckboxChange={handleCheckboxChange}
            statusHandler={statusHandler}
            statusColors={statusColors}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;