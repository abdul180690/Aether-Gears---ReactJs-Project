import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "../components/Title";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaTruckArrowRight } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { LuPackageCheck, LuPackageOpen } from "react-icons/lu";
import { FaSearch, FaShippingFast } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TbEyeShare } from "react-icons/tb";

// Order Status Steps
const statusSteps = [
  { label: "Order Placed", icon: <BiSolidBadgeCheck /> },
  { label: "Packing", icon: <LuPackageOpen /> },
  { label: "Shipped", icon: <FaShippingFast /> },
  { label: "Out for Delivery", icon: <MdDeliveryDining /> },
  { label: "Delivered", icon: <LuPackageCheck /> },
];

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortOption, setSortOption] = useState("new"); // State for sorting orders (newest/oldest)
  const [ratings, setRatings] = useState({});
  const [productRatings, setProductRatings] = useState({});

  const navigate = useNavigate();

  // Load order data
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order.orderId;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem);
        setFilteredData(allOrdersItem.reverse()); // Initialize filtered data with all orders
      }
    } catch (error) {}
  };

  // Filter data based on the search term
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    if (searchQuery === "") {
      setFilteredData(orderData); // If search is empty, show all orders
    } else {
      const filtered = orderData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.orderId.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered); // Set filtered data based on search query
    }
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    // Sort items based on the selected option (new or oldest)
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return option === "new" ? dateB - dateA : dateA - dateB;
    });

    setFilteredData(sortedData);
  };

  // Load order data on component mount
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <>
      <div>
        <div className="">
          <div className="max-padd-container py-10">
            <div className="flex items-baseline">
              <Title
                title1={"Order "}
                title2={"List"}
                titleStyles={"text-nowrap"}
              />
              <span className="pl-3 text-gray-500">
                ({filteredData.length} Orders)
              </span>
            </div>
            <div className="flex justify-center items-center py-3">
              {/* Search Input and Sort Option */}
              <div className="w-3/4  flex items-center space-x-2 border rounded-lg px-3 py-2 bg-white shadow-md">
                <input
                  type="text"
                  placeholder="Search your products here ..."
                  className="w-full outline-none border-none bg-transparent"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="text-gray-500" />
              </div>
              {/* Sort Option */}
              <div className="flexCenter ">
                <p className="me-1 ml-5  text-nowrap text-black">Sort by</p>
                <select
                  onChange={handleSortChange}
                  value={sortOption}
                  className="border p-2 shadow-md rounded text-sm"
                >
                  <option value="new">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Display No Orders Found Message */}
            {orderData.length === 0 ? (
              <div className="text-center text-gray-500">
                <h1 className="h1 py-20">
                  Looks like you haven’t ordered anything yet.
                </h1>
                <button
                  onClick={() => navigate("/collection")} // Navigate to collection page
                  className="btn-dark mt-4 px-6 py-2 rounded-full text-white bg-slate-500 hover:bg-slate-600"
                >
                  Shop Now
                </button>
              </div>
            ) : filteredData.length === 0 ? (
              <p className="text-center text-gray-500">
                No items found matching your search.
              </p>
            ) : (
              filteredData.map((item, i) => (
                <div
                  key={i}
                  className={`border border-slate-300 p-4 mt-5 rounded-lg shadow-lg bg-white
                  }`}
                >
                  <div className="text-gray-700 flex gap-4 sm:gap-6">
                    <div className="sm:w-0.5/4 flex justify-center items-center">
                      <Link to={`/product/${item?._id || "#"}`}>
                        <img
                          src={item.image[0]}
                          alt="orderImg"
                          className="w-24 sm:w-32 rounded-lg aspect-square shadow-lg object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                          title="View Item"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-x-2 ">
                        <span className="font-medium  text-nowrap">
                          Order ID:
                        </span>
                        <p>{item.orderId}</p>
                      </div>
                      <h5 className="text-lg font-semibold capitalize ">
                        {item.name}
                      </h5>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm mt-2">
                        <div className="flex items-center gap-x-2">
                          <span className="font-medium">Price:</span>
                          <p>
                            {currency}
                            {item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="font-medium">Quantity:</span>
                          <p>{item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="font-medium">Color:</span>
                          <p>{item.color}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
                        <div className="flex items-center gap-x-2">
                          <span className="font-medium">Date:</span>
                          <p>{new Date(item.date).toDateString()}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="font-medium">Payment Method:</span>
                          <p>{item.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="lg:flex xs:flex-wrap justify-between items-center mt-4">
                        <div className="flex items-center gap-2 my-3">
                          <span className="font-medium">Status:</span>
                          {/* Order Status */}
                          {statusSteps.map((step, index) => {
                            const isCompleted =
                              statusSteps.findIndex(
                                (s) => s.label === item.status
                              ) >= index;
                            return (
                              <div
                                key={index}
                                className="flex flex-col items-center text-sm"
                              >
                                {/* Show only "Delivered" when the status is Delivered */}
                                {item.status === "Delivered" &&
                                step.label !== "Delivered" ? null : (
                                  <>
                                    <span
                                      className={`text-lg mb-2 ${
                                        isCompleted
                                          ? "bg-green-500 text-white p-1 rounded-full ring-1 ring-green-600 shadow-lg"
                                          : "hidden"
                                      }`}
                                    >
                                      {step.icon}
                                    </span>
                                    <p
                                      className={`text-medium text-nowrap me-2 ${
                                        isCompleted
                                          ? "text-green-600"
                                          : "hidden"
                                      }`}
                                    >
                                      {step.label}
                                    </p>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-3">
                          
                          {/* View Order button */}
                          <button
                            onClick={() =>
                              navigate(`/view-order/${item.orderId}`)
                            }
                            className="btn-secondary !p-2 !text-xs flexCenter"
                            title="View Order Details"
                          >
                            <TbEyeShare className="me-2 text-[16px]" /> View
                            Order
                          </button>
                          {/* Track order button */}
                          <button
                            onClick={loadOrderData}
                            className={`text-nowrap ${
                              item.status === "Delivered"
                                ? "hidden"
                                : "btn-secondary !p-2 !text-xs flexCenter"
                            }`}
                            title="View order status"
                            disabled={item.status === "Delivered"}
                          >
                            <FaTruckArrowRight className="me-2 text-[16px]" />
                            Track Order
                          </button>
                        </div>
                        
                      </div>
                     
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
