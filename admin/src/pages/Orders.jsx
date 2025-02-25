// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { PiPackageDuotone } from "react-icons/pi";
// import { AiOutlineSearch } from "react-icons/ai";
// import { IoClose } from "react-icons/io5";
// import { FaFilePdf } from "react-icons/fa";
// import { BiSolidSelectMultiple } from "react-icons/bi";
// import { backend_url } from "../App";
// import { jsPDF } from "jspdf";
// import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js"; // Import Chart.js components

// Chart.register(ArcElement, Tooltip, Legend, PieController);

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [sortOption, setSortOption] = useState("New");
//   const [prevOrders, setPrevOrders] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All"); // Default to "All"
//   const [statusCounts, setStatusCounts] = useState({
//     OrderPlaced: 0,
//     Packing: 0,
//     Shipped: 0,
//     OutForDelivery: 0,
//     Delivered: 0,
//   });
//   const chartRef = useRef(null); // Ref for the chart instance
//   const chartInstanceRef = useRef(null); // Ref for the chart instance

//   // Fetch orders from API
//   const fetchAllOrders = async () => {
//     if (!token) return;
//     try {
//       const response = await axios.post(
//         backend_url + "/api/order/list",
//         {},
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         const ordersData = response.data.orders.reverse();
//         setOrders(ordersData);
//         setFilteredOrders(ordersData); // Set all orders initially
//         updateStatusCounts(ordersData); // Update status counts
//         setPrevOrders(ordersData)
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Function to check for new orders
//   const checkForNewOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(
//         backend_url + "/api/order/list",
//         {},
//         { headers: { token } }
//       );
//       if (response.data.success) {
        
//         const ordersData = response.data.orders.reverse();
        
//         // Compare with previous orders to check if there are new orders
//         const newOrders = ordersData.filter(
//           (newOrder) =>
//             !prevOrders.some((prevOrder) => prevOrder._id === newOrder._id)
//         );

//         if (newOrders.length > 0) {
//           toast.success(`${newOrders.length} new orders found!`, { autoClose: 1500 });
//           setOrders(ordersData);
//           setFilteredOrders(ordersData);
//           updateStatusCounts(ordersData);
//           setPrevOrders(ordersData); // Update previous orders
//         } else {
//           toast.info("No new orders.");
//         }
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Update the status counts based on current orders
//   const updateStatusCounts = (ordersData) => {
//     const counts = {
//       OrderPlaced: 0,
//       Packing: 0,
//       Shipped: 0,
//       OutForDelivery: 0,
//       Delivered: 0,
//     };
//     ordersData.forEach(order => {
//       counts[order.status] = (counts[order.status] || 0) + 1;
//     });
//     setStatusCounts(counts);
//     console.log("Updated counts:", counts); 
//     updatePieChart(counts);
//   };

//   // Update the pie chart with new data
//   const updatePieChart = (counts) => {
//     const ctx = chartRef.current.getContext("2d");
    
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy(); // Destroy the old chart
//     }

//     chartInstanceRef.current = new Chart(ctx, {
//       type: "pie",
//       data: {
//         datasets: [
//           {
//             label: "Count",
//             data: Object.values(counts),
//             backgroundColor: [
//               "#E52020", // OrderPlaced
//               "#DF6D14", // Packing
//               "#854836", // Shipped
//               "#0079FF", // OutForDelivery
//               "#3A7D44", // Delivered
//             ],
//             hoverOffset: 5,
//             borderWidth: 1,
//             borderColor: "#FBFFE4",
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: true,
//         aspectRatio: 1,
//         plugins: {
//           legend: {
//             position: "top",
//           },
//           tooltip: {
//             enabled: true,
//           },
//         },
//       },
//     });
//   };
//   console.log("Status Counts:", statusCounts);
//   console.log("Chart Instance:", chartInstanceRef.current);

//   // Handle search input change and filter orders 
//   const handleSearchChange = (event) => {
//     const searchQuery = event.target.value.toLowerCase();
//     setSearchTerm(searchQuery);

//     if (searchQuery === "") {
//       setFilteredOrders(orders);
//       setNoResults(false);
//     } else {
//       const filtered = orders.filter((order) => {
//         const orderIdMatch = order.orderId.toLowerCase().includes(searchQuery);
//         const nameMatch = (
//           order.address.firstName +
//           " " +
//           order.address.lastName
//         )
//           .toLowerCase()
//           .includes(searchQuery);
//         const phoneMatch = order.address.phone
//           .toLowerCase()
//           .includes(searchQuery);
//         const addressMatch = (
//           order.address.street +
//           " " +
//           order.address.city +
//           " " +
//           order.address.state +
//           " " +
//           order.address.zipcode
//         )
//           .toLowerCase()
//           .includes(searchQuery);
//         const itemMatch = order.items.some((item) =>
//           item.name.toLowerCase().includes(searchQuery)
//         );

//         return (
//           orderIdMatch || nameMatch || phoneMatch || addressMatch || itemMatch
//         );
//       });

//       setFilteredOrders(filtered);
//       setNoResults(filtered.length === 0);
//     }
//   };

//   // Handle status filter change
//   const handleStatusChange = (event) => {
//     setStatusFilter(event.target.value);
//     if (event.target.value === "All") {
//       setFilteredOrders(orders);
//     } else {
//       const filteredByStatus = orders.filter(
//         (order) => order.status === event.target.value
//       );
//       setFilteredOrders(filteredByStatus);
//     }
//   };

//   // Handle "Select All" button
//   const handleSelectAll = () => {
//     if (selectedOrders.length === filteredOrders.length) {
//       setSelectedOrders([]); // Deselect all if all are selected
//     } else {
//       setSelectedOrders(filteredOrders.map((order) => order._id)); // Select all currently filtered orders
//     }
//   };

//   // Handle checkbox selection
//   const handleCheckboxChange = (orderId) => {
//     setSelectedOrders((prevSelectedOrders) =>
//       prevSelectedOrders.includes(orderId)
//         ? prevSelectedOrders.filter((id) => id !== orderId)
//         : [...prevSelectedOrders, orderId]
//     );
//   };

//   // Handle order sorting
//   const handleSortChange = (event) => {
//     const sortedOrders = [...filteredOrders];
//     const option = event.target.value;

//     if (option === "New") {
//       sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
//     } else if (option === "Oldest") {
//       sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }

//     setSortOption(option);
//     setFilteredOrders(sortedOrders);
//   };

//   // Handle order status change
//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         backend_url + "/api/order/status",
//         { orderId, status: event.target.value },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         await fetchAllOrders();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Export selected orders as PDF
//   const exportOrdersAsPDF = () => {
//     if (selectedOrders.length === 0) {
//       toast.error("At least select 1 order");
//       return;
//     }

//     const doc = new jsPDF("p", "mm", "a4");
//     doc.setFontSize(12);
//     const pageWidth = 210;
//     const pageHeight = 297;
//     const marginTop = 10;
//     const lineHeight = 6;
//     const additionalSpacing = 4;
//     const columnWidth = pageWidth - 20;
//     let currentY = marginTop;

//     // Add "View" status at the top
//     const viewStatusText = ` ${statusFilter}`;
//     doc.setFont("helvetica", "bold");
//     const statusTextWidth = doc.getTextWidth(viewStatusText);
//     const statusTextX = (pageWidth - statusTextWidth) / 2; // Center the text
//     doc.text(viewStatusText, statusTextX, currentY);

//     // Underline the "View" status text
//     doc.setLineWidth(0.5);
//     doc.line(
//       statusTextX,
//       currentY + 1,
//       statusTextX + statusTextWidth,
//       currentY + 1
//     );

//     currentY += 10; // Add some space after the header

//     selectedOrders.forEach((orderId) => {
//       const order = orders.find((order) => order._id === orderId);
//       if (order) {
//         const orderData = [
//           `Order Date: ${new Date(order.date).toLocaleString()}`,
//           `Order ID: ${order.orderId}`,
//           `Name: ${order.address.firstName} ${order.address.lastName}`,
//           `Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}`,
//           `Total Items: ${order.items.length}`,
//           "Items: ",
//           ...order.items.map(
//             (item) => `${item.name} x ${item.quantity} - "${item.color}"`
//           ),
//           `Phone: ${order.address.phone}`,
//           `Order Amount: Rs. ${order.amount}`,
//           `Payment Status: ${order.payment ? "Done" : "COD"}`,
//         ];

//         let totalOrderHeight = 0;
//         let maxLineWidth = 0;

//         orderData.forEach((text) => {
//           const wrappedText = doc.splitTextToSize(text, columnWidth);
//           wrappedText.forEach((line) => {
//             const lineWidth = doc.getTextWidth(line);
//             maxLineWidth = Math.max(maxLineWidth, lineWidth);
//           });
//           totalOrderHeight +=
//             wrappedText.length * lineHeight +
//             (wrappedText.length - 1) * additionalSpacing;
//         });

//         if (currentY + totalOrderHeight > pageHeight - 10) {
//           doc.addPage();
//           currentY = marginTop;
//         }

//         orderData.forEach((text) => {
//           const wrappedText = doc.splitTextToSize(text, columnWidth);
//           wrappedText.forEach((line, lineIndex) => {
//             if (
//               line.includes("Order Amount") ||
//               line.includes("Payment Status")
//             ) {
//               doc.setFont("helvetica", "bold");
//             } else {
//               doc.setFont("helvetica", "normal");
//             }
//             doc.text(line, 10, currentY, { maxWidth: columnWidth });
//             currentY += lineHeight;

//             if (lineIndex < wrappedText.length - 1) {
//               currentY += additionalSpacing;
//             }
//           });
//         });

//         const lineLength = maxLineWidth + 10;
//         doc.line(10, currentY, 10 + lineLength, currentY);
//         currentY += 8;

//         if (currentY + lineHeight > pageHeight - 10) {
//           doc.addPage();
//           currentY = marginTop;
//         }
//       }
//     });

//     doc.save("selected_orders.pdf");
//   };

//   // Handle clear search input
//   const clearHandler = () => {
//     setSearchTerm("");
//     setFilteredOrders(orders);
//   };

//   useEffect(() => {
//     if (token) {
//       fetchAllOrders();
//     }
//   }, [token]);

//   useEffect(() => {
//     // Create the chart only if we have valid statusCounts and chartRef is available
//     if (statusCounts && chartRef.current) {
//         updatePieChart(statusCounts);
//       }
//   }, [statusCounts]);

//   return (
//     <div className="px-4 sm:px-8 my-10">
//       {/* Button to check for new orders */}
//       <div className="mb-10">
//         <button
//           onClick={checkForNewOrders}
//           className="py-2 px-4 bg-blue-500 text-white rounded-lg"
//         >
//           Check for New Orders
//         </button>
//       </div>
//       {/* Count Section */}
//       <div className="mb-10 bg-white flexCenter xs:flex-wrap gap-x-3 px-5  ">
//         <div className="mb-2 ">
//           <h5 className="h5 text-center text-black">Order Status</h5>
//           <canvas ref={chartRef} id="pieChart" width={150} height={150} ></canvas>
//         </div>
//         <div className="">
//           {/* Total Order Counts  */}
//           <h2 className="h4 mb-5 text-center">Total Orders: {orders.length}</h2>
//           {/* Status Counts  */}
//           <div className="flex gap-5 justify-center px-5">
//             <div className="border-e border-e-black  pe-5  text-center">
//               <p className="text-[#E52020] mb-3">New Orders</p>
//               <span className="font-bold text-[#E52020] p-2 bg-white rounded-full">
//                 {statusCounts.OrderPlaced}
//               </span>
//             </div>
//             <div className="border-e border-e-black pe-5 text-center">
//               <p className="text-[#DF6D14] mb-3 ">Under Packing </p>
//               <span className="font-bold text-[#DF6D14] p-2 bg-white rounded-full">
//                 {statusCounts.Packing}
//               </span>
//             </div>
//             <div className="border-e border-e-black pe-5 text-center">
//               <p className="text-[#854836] mb-3">Shipped Orders</p>
//               <span className="font-bold text-[#854836] p-2 bg-white rounded-full">
//                 {statusCounts.Shipped}
//               </span>
//             </div>
//             <div className="border-e border-e-black pe-5 text-center">
//               <p className="text-[#0079FF] mb-3">Out for Delivery</p>
//               <span className="font-bold text-[#0079FF] p-2 bg-white rounded-full">
//                 {statusCounts.OutForDelivery}
//               </span>
//             </div>
//             <div className=" text-center">
//               <p className="text-[#3A7D44] mb-3">Delivered Orders</p>
//               <span className="font-bold text-[#3A7D44] p-2 bg-white rounded-full">
//                 {statusCounts.Delivered}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Select Status Dropdown */}
//       <div className="flexBetween gap-3 mb-5  xs:flex-wrap">
//         <div className="flexCenter mb-1">
//           <p className="text-black pe-3">View </p>
//           <select
//             onChange={handleStatusChange}
//             value={statusFilter}
//             className="p-2  rounded-md  border  border-slate-400 text-sm"
//           >
//             <option value="All">All Orders</option>
//             <option value="OrderPlaced">OrderPlaced</option>
//             <option value="Packing">Packing</option>
//             <option value="Shipped">Shipped</option>
//             <option value="OutForDelivery">OutForDelivery</option>
//             <option value="Delivered">Delivered</option>
//           </select>
//         </div>
//         <div className="relative w-1/2 mx-10 mb-1">
//           <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 sm:text-xl text-lg" />
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="p-2 pl-10 border rounded-lg w-full shadow-md"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <IoClose
//             onClick={clearHandler}
//             className="absolute right-2 top-1/4 text-xl cursor-pointer text-gray-400 hover:text-gray-700 duration-300"
//           />
//         </div>
//         {noResults && (
//           <div className="text-center text-red-500">No orders found.</div>
//         )}
//         <div className="mb-1 flexCenter">
//           <p className="text-black me-3">Sort by </p>
//           <select
//             value={sortOption}
//             onChange={handleSortChange}
//             className="p-2 rounded-md  border border-slate-400 text-sm"
//           >
//             <option value="New" className="py-5">
//               New
//             </option>
//             <option value="Oldest" className="py-5">
//               Oldest
//             </option>
//           </select>
//         </div>
//       </div>

//       <div className="flex gap-3 my-3">
//         <button
//           onClick={handleSelectAll}
//           className="flexCenter px-2 py-1 mb-2 text-[12px] rounded hover:bg-slate-300 duration-300"
//         >
//           <BiSolidSelectMultiple className="me-1 text-lg" />
//           Select All
//         </button>
//         <button
//           onClick={exportOrdersAsPDF}
//           className=" mb-1 flexCenter bg-red-600 text-white text-[12px] p-1 rounded hover:bg-red-500 duration-300"
//           title="Select orders and then click"
//         >
//           Export Order Details <FaFilePdf className="ml-2 text-lg" />
//         </button>
//       </div>

//       {/* Order List */}
//       <div className="flex flex-col gap-4">
//         {filteredOrders.map((order) => (
//           <div
//             key={order._id}
//             className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2.5fr_1fr_1fr] gap-4 items-start p-3 text-gray-700 rounded-lg shadow-lg ${
//               order.status === "Delivered" ? "bg-gray-300" : "bg-white"
//             }`}
//           >
//             <div className="flex ">
//               <input
//                 type="checkbox"
//                 onChange={() => handleCheckboxChange(order._id)}
//                 checked={selectedOrders.includes(order._id)}
//                 disabled={order.status === "Delivered"}
//                 className="me-4"
//               />
//               <PiPackageDuotone className="lg:text-6xl text-secondary" />
//             </div>
//             <div className="">
//               <div className="medium-14">
//                 Order Date: {new Date(order.date).toLocaleString()}
//               </div>
//               <div className="medium-14">
//                 Order ID:{" "}
//                 <p className="text-[13px] bg-gray-700 bg-opacity-50 text-white inline mx-1">
//                   {order.orderId}
//                 </p>
//               </div>

//               <div className="flex items-start gap-3">
//                 <div className="medium-14">Items: </div>
//                 <div className="flex flex-col relative top-0.5">
//                   {order.items.map((item, index) => {
//                     return (
//                       <p key={index}>
//                         {item.name} x {item.quantity}{" "}
//                         <span>"{item.color}"</span>
//                       </p>
//                     );
//                   })}
//                 </div>
//               </div>
//               <p className="medium-14">
//                 <span className="text-tertiary">Name: </span>
//                 {order.address.firstName + " " + order.address.lastName}
//               </p>
//               <p className="medium-14">
//                 <span className="text-tertiary">Address: </span>
//                 <span>{order.address.street + ", "}</span>
//                 <span>{order.address.city + ", "}</span>
//                 <span>{order.address.state + ", "}</span>
//                 <span>{order.address.zipcode}</span>
//               </p>
//             </div>

//             <div>
//               <p className="text-sm">Total: {order.items.length}</p>
//               <p className="medium-14">
//                 <span className="text-tertiary">Phone: </span>
//                 {order.address.phone}
//               </p>
//               <p className="medium-14">
//                 <span className="text-tertiary">Total Amount: </span>
//                 Rs. {order.amount}
//               </p>
//               <p className="medium-14">
//                 <span className="text-tertiary">Payment Status: </span>
//                 {order.payment ? "Paid" : "COD"}
//               </p>
//             </div>
//             <div className="flexEnd">
//               <select
//                 onChange={(event) => statusHandler(event, order._id)}
//                 value={order.status}
//                 className="w-full text-xs font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
//                 disabled={order.status === "Delivered"}
//               >
//                 <option value="OrderPlaced">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="OutForDelivery">Out For Delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PiPackageDuotone } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { backend_url } from "../App";
import { jsPDF } from "jspdf";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js"; // Import Chart.js components

Chart.register(ArcElement, Tooltip, Legend, PieController);

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortOption, setSortOption] = useState("New");
  const [prevOrders, setPrevOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All"); // Default to "All"
  const [statusCounts, setStatusCounts] = useState({
    "Order Placed": 0,
    Packing: 0,
    Shipped: 0,
    "Out for Delivery": 0,
    Delivered: 0,
  });
  const chartRef = useRef(null); // Ref for the chart canvas
  const chartInstanceRef = useRef(null); // Ref for the chart instance

  // Fetch orders from API
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
        setFilteredOrders(ordersData); // Set all orders initially
        updateStatusCounts(ordersData); // Update status counts
        setPrevOrders(ordersData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Function to check for new orders
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

        // Compare with previous orders to check if there are new orders
        const newOrders = ordersData.filter(
          (newOrder) =>
            !prevOrders.some((prevOrder) => prevOrder._id === newOrder._id)
        );

        if (newOrders.length > 0) {
          toast.success(`${newOrders.length} New Orders Found! :)`, { autoClose: 1500 });
          setOrders(ordersData);
          setFilteredOrders(ordersData);
          updateStatusCounts(ordersData);
          setPrevOrders(ordersData); // Update previous orders
        } else {
          toast.info("No New Orders :( ");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Update the status counts based on current orders
  const updateStatusCounts = (ordersData) => {
    const counts = {
      "Order Placed": 0,
      Packing: 0,
      Shipped: 0,
      "Out for Delivery": 0,
      Delivered: 0,
    };
    ordersData.forEach(order => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      
    });
    setStatusCounts(counts);
    updatePieChart(counts);
    
  };

  // Update the pie chart with new data
  const updatePieChart = (counts) => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the old chart
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            label: "Count",
            data: Object.values(counts),
            backgroundColor: [
              "#E52020", // OrderPlaced
              "#DF6D14", // Packing
              "#854836", // Shipped
              "#0079FF", // OutForDelivery
              "#3A7D44", // Delivered
            ],
            hoverOffset: 10,
            borderWidth: 1,
            borderColor: "#FBFFE4",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  };

  // Handle search input change and filter orders 
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

  // Handle status filter change
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

  // Handle "Select All" button
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]); // Deselect all if all are selected
    } else {
      setSelectedOrders(filteredOrders.map((order) => order._id)); // Select all currently filtered orders
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelectedOrders) =>
      prevSelectedOrders.includes(orderId)
        ? prevSelectedOrders.filter((id) => id !== orderId)
        : [...prevSelectedOrders, orderId]
    );
  };

  // Handle order sorting
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

  // Handle order status change
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

  // Export selected orders as PDF
  const exportOrdersAsPDF = () => {
    if (selectedOrders.length === 0) {
      toast.error("At least select 1 order");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(11);
    const pageWidth = 210;
    const pageHeight = 297;
    const marginTop = 10;
    const lineHeight = 6;
    const additionalSpacing = 4;
    const columnWidth = pageWidth - 20;
    let currentY = marginTop;

    // Add "View" status at the top
    const viewStatusText = ` ${statusFilter}`;
    doc.setFont("helvetica", "bold");
    const statusTextWidth = doc.getTextWidth(viewStatusText);
    const statusTextX = (pageWidth - statusTextWidth) / 2; // Center the text
    doc.text(viewStatusText, statusTextX, currentY);

    // Underline the "View" status text
    doc.setLineWidth(0.5);
    doc.line(
      statusTextX,
      currentY + 1,
      statusTextX + statusTextWidth,
      currentY + 1
    );

    currentY += 10; // Add some space after the header

    selectedOrders.forEach((orderId) => {
      const order = orders.find((order) => order._id === orderId);
      if (order) {
        const orderData = [
          `Order Date: ${new Date(order.date).toLocaleString()}`,
          `Order ID: ${order.orderId}`,
          `Name: ${order.address.firstName} ${order.address.lastName}`,
          `Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}`,
          `Total Items: ${order.items.length}`,
          "Items: ",
          ...order.items.map(
            (item) => `${item.name} x ${item.quantity} - "${item.color}"`
          ),
          `Phone: ${order.address.phone}`,
          `Order Amount: Rs. ${order.amount}`,
          `Payment Status: ${order.payment ? "Done" : "COD"}`,
        ];

        let totalOrderHeight = 0;
        let maxLineWidth = 0;

        orderData.forEach((text) => {
          const wrappedText = doc.splitTextToSize(text, columnWidth);
          wrappedText.forEach((line) => {
            const lineWidth = doc.getTextWidth(line);
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
          });
          totalOrderHeight +=
            wrappedText.length * lineHeight +
            (wrappedText.length - 1) * additionalSpacing;
        });

        if (currentY + totalOrderHeight > pageHeight - 10) {
          doc.addPage();
          currentY = marginTop;
        }

        orderData.forEach((text) => {
          const wrappedText = doc.splitTextToSize(text, columnWidth);
          wrappedText.forEach((line, lineIndex) => {
            if (
              line.includes("Order Amount") ||
              line.includes("Payment Status")
            ) {
              doc.setFont("helvetica", "bold");
            } else {
              doc.setFont("helvetica", "normal");
            }
            doc.text(line, 10, currentY, { maxWidth: columnWidth });
            currentY += lineHeight;

            if (lineIndex < wrappedText.length - 1) {
              currentY += additionalSpacing;
            }
          });
        });

        const lineLength = maxLineWidth + 10;
        doc.line(10, currentY, 10 + lineLength, currentY);
        currentY += 8;

        if (currentY + lineHeight > pageHeight - 10) {
          doc.addPage();
          currentY = marginTop;
        }
      }
    });

    doc.save("selected_orders.pdf");
  };

  // Handle clear search input
  const clearHandler = () => {
    setSearchTerm("");
    setFilteredOrders(orders);
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  useEffect(() => {
    // Create the chart only if we have valid statusCounts and chartRef is available
    if (statusCounts && chartRef.current) {
      updatePieChart(statusCounts);
    }
  }, [statusCounts]);

 


  return (
    <div className="px-4 sm:px-8 my-5">
      {/* Button to check for new orders */}
      <div className="mb-5">
        <button
          onClick={checkForNewOrders}
          className="py-1 px-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-500 duration-300"
        >
          Check New orders
        </button>
      </div>
      {/* Count Section */}
      <div className="mb-10 p-5 rounded-xl shadow-lg  border-b-4 border-black/50 bg-[#FFF6DA] flexCenter xs:flex-wrap gap-x-3 px-5  ">
        <div className="mb-2 ">
          <h5 className="h5 text-center text-black">Orders Status</h5>
          <canvas ref={chartRef} id="pieChart" width={150} height={150} ></canvas>
        </div>
        <div className="">
          {/* Total Order Counts  */}
          <h2 className="h4 mb-5 text-center">Total Orders: {orders.length}</h2>
          {/* Status Counts  */}
          <div className="flex gap-5 justify-center px-3">
            <div className="border-e  border-e-black  pe-5  text-center">
              <p className="text-[#E52020] mb-5 font-semibold text-[13px]">New Orders</p>
              <span className="font-bold text-white px-5 py-2 bg-[#E52020] rounded-full shadow-lg">
                {statusCounts["Order Placed"]}
              </span>
            </div>
            <div className="border-e border-e-black pe-5 text-center">
              <p className="text-[#DF6D14] mb-5 font-semibold text-[13px]">Under Packing </p>
              <span className="font-bold text-white px-5 py-2 bg-[#DF6D14] rounded-full shadow-lg">
                {statusCounts.Packing}
              </span>
            </div>
            <div className="border-e border-e-black pe-5 text-center">
              <p className="text-[#854836] mb-5 font-semibold text-[13px]">Shipped Orders</p>
              <span className="font-bold text-white px-5 py-2 bg-[#854836] rounded-full shadow-lg">
                {statusCounts.Shipped}
              </span>
            </div>
            <div className="border-e border-e-black pe-5 text-center">
              <p className="text-[#0079FF] mb-5 font-semibold text-[13px]">Out for Delivery</p>
              <span className="font-bold text-white px-5 py-2 bg-[#0079FF] rounded-full shadow-lg">
                {statusCounts["Out for Delivery"]}
              </span>
            </div>
            <div className=" text-center">
              <p className="text-[#3A7D44] mb-5 font-semibold text-[13px]">Delivered Orders</p>
              <span className="font-bold text-white px-5 py-2 bg-[#3A7D44] rounded-full shadow-lg">
                {statusCounts.Delivered}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Select Status Dropdown */}
      <div className="flexBetween gap-3 mb-5  xs:flex-wrap">
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
        {/* Search Input */}
        <div className="relative w-[300px] mx-10 mb-1">
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
          className=" mb-1 flexCenter bg-red-700 text-white text-[12px] p-1 rounded hover:bg-red-500 duration-300"
          title="Select orders and then click"
        >
          Export Order Details <FaFilePdf className="ml-2 text-lg" />
        </button>
      </div>
      {noResults && (
          <div className="text-center text-red-500 pb-5">No orders found.</div>
        )}

      {/* Order List */}
      <div className="flex flex-col gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2.5fr_1fr_1fr] gap-4 items-start p-3 text-gray-700 rounded-lg shadow-lg ${
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
                        {item.name} x {item.quantity}{" "}
                        <span>"{item.color}"</span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <p className="medium-14">
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
            </div>

            <div>
              <p className="text-sm">Total: {order.items.length}</p>
              <p className="medium-14">
                <span className="text-tertiary">Phone: </span>
                {order.address.phone}
              </p>
              <p className="medium-14">
                <span className="text-tertiary">Total Amount: </span>
                Rs. {order.amount}
              </p>
              <p className="medium-14">
                <span className="text-tertiary">Payment Status: </span>
                {order.payment ? "Paid" : "COD"}
              </p>
            </div>
            <div className="flexEnd">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="w-full text-xs font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
                disabled={order.status === "Delivered"}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;