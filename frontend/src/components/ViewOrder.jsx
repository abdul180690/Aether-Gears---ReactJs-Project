import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "./Title";
import RelatedProducts from "./RelatedProducts";

const ViewOrder = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/getorder`,
          { orderId },
          { headers: { token } }
        );
        if (response.data.success) {
          setOrderDetails(response.data.order);
          setTotalAmount(response.data.totalAmount); // Store total amount in state
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, backendUrl, token]);

  // Show loading message if order details are not fetched yet
  if (!orderDetails) {
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  }

  return (
    <div className="max-padd-container p-6 rounded-lg my-10">
      {/* Title */}
      <Title
        title1="Order"
        title2="Details"
        titleStyles="text-lg pb-5 text-secondary"
      />
      {/* order details */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
            <h5>
                Order ID: <span className="text-gray-500">{orderDetails.orderId}</span>
            </h5>
            <h5>
                Ordered Date: <span className="text-gray-500">{new Date(orderDetails.date).toDateString()}</span>
            </h5>
        </div>
        <div className="flex flex-col gap-2">
            <h5>
                Payment Method: <span className="text-gray-500">{orderDetails.paymentMethod}</span>
            </h5>
            <h5>
                Status: <span className="text-gray-500">{orderDetails.status}</span>
            </h5>
        </div>
      </div>

      {/* Shipping details */}
      <div className="flexBetween items-center mt-3 p-4 border border-gray-300 rounded-lg shadow-md">
        <div>
            <h3 className="font-semibold text-lg mb-3">Shipping Details</h3>
            <div className="flex flex-col gap-2">
                <p><strong>Name:</strong> {orderDetails.address.firstName + " " + orderDetails.address.lastName}</p>
                <p><strong>Address:</strong> {orderDetails.address.street}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.zipCode}</p>
                <p><strong>Phone:</strong> {orderDetails.address.phone}</p>
                <p><strong>email:</strong> {orderDetails.address.email}</p>
            </div>
        </div>
        <p className="font-bold text-nowrap text-black text-right text-xl ">
          Order Amount: ₹ {totalAmount}/-
        </p>

      </div>
      {/* Items */}
      <h3 className="mt-4 text-lg font-semibold">Items: <small className="text-gray-400">({orderDetails.items.length})</small></h3>
      <ul className="divide-y divide-gray-300">
        {orderDetails.items.map((item, index) => (
          <li key={index} className="flex items-center gap-4 py-2">
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-52 h-52 rounded-md object-cover shadow-lg"
            />
            <div>
              <h5 className="h5">{item.name}</h5>
              <h5 className="text-gray-500">{item.description}</h5>
              <h5 className="text-gray-500">
                Price: {currency} {item.price}/-
              </h5>
              <h5 className="text-gray-500">
                Quantity: {item.quantity}
              </h5>
              <h5 className="text-gray-500">
                Color: {item.color}
              </h5>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ViewOrder;
