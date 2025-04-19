import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from "./Title";

const ViewOrder = () => {
  const { orderId } = useParams();
  const { backendUrl, token, currency, delivery_charges } = useContext(ShopContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [amountBreakdown, setAmountBreakdown] = useState({
    subtotal: 0,
    discount: 0,
    discountedAmount: 0,
    cgst: 0,
    sgst: 0,
    afterTax: 0,
    shipping: 0,
    rounded: 0,
    total: 0,
  });

  // Format currency function
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

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
          const order = response.data.order;
          setOrderDetails(order);

          // Calculate amount breakdown
          const cartAmount = order.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 0);
          
          // Get discount info from order (could be from promo code or other discount)
          const discount = order.discount || 0;
          const discountAmount = (cartAmount * discount) / 100;
          const discountedAmount = cartAmount - discountAmount;
          
          const cgstRate = 0.05;
          const sgstRate = 0.05;
          const cgstAmount = discountedAmount * cgstRate;
          const sgstAmount = discountedAmount * sgstRate;
          const taxAmount = cgstAmount + sgstAmount;
          const afterTaxAmount = discountedAmount + taxAmount;
          
          const shippingFee = discountedAmount < 1000 ? delivery_charges : 0;
          const finalTotal = Math.round(afterTaxAmount + shippingFee);
          const rounded = finalTotal - (afterTaxAmount + shippingFee);
          
          setAmountBreakdown({
            subtotal: cartAmount,
            discount: discountAmount,
            discountedAmount,
            cgst: cgstAmount,
            sgst: sgstAmount,
            afterTax: afterTaxAmount,
            shipping: shippingFee,
            rounded,
            total: finalTotal
          });
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, backendUrl, token, delivery_charges]);

  if (!orderDetails) {
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  }

  return (
    <div className="max-padd-container p-6 rounded-lg my-10">
      {/* Title */}
      <Title
        title1="Order "
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
            Ordered Date:{" "}
            <span className="text-gray-500">
              {new Date(orderDetails.date).toDateString()}
            </span>
          </h5>
        </div>
        <div className="flex flex-col gap-2">
          <h5>
            Payment Method:{" "}
            <span className="text-gray-500">{orderDetails.paymentMethod}</span>
          </h5>
          <h5>
            Status: <span className="text-gray-500">{orderDetails.status}</span>
          </h5>
        </div>
      </div>

      {/* Shipping details */}
      <div className="mt-3">
        <h3 className="font-semibold text-lg mb-3">Shipping Details</h3>
        <div className="flex flex-col gap-2">
          <p>
            <strong>Name:</strong>{" "}
            {orderDetails.address.firstName + " " + orderDetails.address.lastName}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.address.street},{" "}
            {orderDetails.address.city}, {orderDetails.address.state},{" "}
            {orderDetails.address.zipCode}
          </p>
          <p>
            <strong>Phone:</strong> {orderDetails.address.phone}
          </p>
          <p>
            <strong>email:</strong> {orderDetails.address.email}
          </p>
        </div>
      </div>
      
      {/* Order items and amount */}
      <div className="flexBetween flex-wrap items-center mt-3">
        {/* Items */}
        <div>
          <h3 className="mt-4 text-lg font-semibold">
            Items: <small className="text-gray-400">({orderDetails.items.length})</small>
          </h3>
          <ul className="divide-y divide-gray-300">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="flex items-center gap-4 py-2">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-28 h-28 rounded-md object-cover shadow-lg"
                />
                <div>
                  <h5 className="h5">{item.name}</h5>
                  <h5 className="text-gray-500">{item.description}</h5>
                  <h5 className="text-gray-500">
                    Price: {currency} {item.price}/-
                  </h5>
                  <h5 className="text-gray-500">Quantity: {item.quantity}</h5>
                  <h5 className="text-gray-500">Color: {item.color}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Amount Breakdown */}
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-3">Order Amount Breakdown</h3>

          {/* Subtotal */}
          <div className="flex justify-between items-center py-1">
            <h5 className="text-gray-700">Subtotal:</h5>
            <p className="text-gray-800">
              {currency} {formatCurrency(amountBreakdown.subtotal)}
            </p>
          </div>

          {/* Promo Code Discount - Only show if promo code was used */}
          {orderDetails.promoCode && (
            <>
              <div className="flex justify-between items-center py-1">
                <h5 className="text-gray-700">
                  Promo Code: <span className="text-green-600">{orderDetails.promoCode}</span>
                </h5>
                <p className="text-gray-800"></p>
              </div>
              <div className="flex justify-between items-center py-1">
                <h5 className="text-gray-700">
                  Promo Discount ({orderDetails.discount}%):
                </h5>
                <p className="text-gray-800">
                  - {currency} {formatCurrency(amountBreakdown.discount)}
                </p>
              </div>
            </>
          )}

          {/* Regular Discount (if any, and no promo code) */}
          {!orderDetails.promoCode && orderDetails.discount > 0 && (
            <div className="flex justify-between items-center py-1">
              <h5 className="text-gray-700">
                Discount ({orderDetails.discount}%):
              </h5>
              <p className="text-gray-800">
                - {currency} {formatCurrency(amountBreakdown.discount)}
              </p>
            </div>
          )}

          <hr className="border-gray-300 my-2" />

          {/* Before Tax */}
          <div className="flex justify-between items-center py-1">
            <h5 className="text-gray-700">Before Tax:</h5>
            <p className="text-gray-800">
              {currency} {formatCurrency(amountBreakdown.discountedAmount)}
            </p>
          </div>
          <hr className="border-gray-300 my-2" />

          {/* CGST */}
          <div className="flex justify-between items-center">
            <h5 className="text-[12px] text-gray-700">CGST (5%):</h5>
            <p className="text-gray-800 text-[12px]">
              {currency} {formatCurrency(amountBreakdown.cgst)}
            </p>
          </div>

          {/* SGST */}
          <div className="flex justify-between items-center">
            <h5 className="text-[12px] text-gray-700">SGST (5%):</h5>
            <p className="text-gray-800 text-[12px]">
              {currency} {formatCurrency(amountBreakdown.sgst)}
            </p>
          </div>

          <hr className="border-gray-300 my-2" />

          {/* After Tax */}
          <div className="flex justify-between items-center py-1">
            <h5 className="text-gray-700">After Tax:</h5>
            <p className="text-gray-800">
              {currency} {formatCurrency(amountBreakdown.afterTax)}
            </p>
          </div>

          {/* Shipping Fee */}
          <div className="flex justify-between items-center py-1">
            <h5 className="text-gray-700">Shipping Fee: {" "}</h5>
            <p className="text-gray-800 text-xs">
              {amountBreakdown.shipping === 0.0
                ? " FREE Delivery "
                : currency + formatCurrency(amountBreakdown.shipping)}
              <span className="line-through text-[12px]">
                {amountBreakdown.shipping === 0.0 ? "₹ 100.00" : ""}
              </span>
            </p>
          </div>

          {/* Rounded (+) or (-) */}
          <div className="flex justify-between items-center py-1">
            <h5 className="text-gray-700 text-sm">Rounded (+) or (-):</h5>
            <p className="text-gray-800 text-[12px]">
              {formatCurrency(amountBreakdown.rounded)}
            </p>
          </div>

          <hr className="border-gray-300 my-2" />

          {/* Total */}
          <div className="flex justify-between items-center py-1">
            <h5 className="text-xl font-bold text-gray-900">Total:</h5>
            <p className="text-xl font-bold text-gray-900">
              <span className="text-base">{currency}</span>{" "}
              {formatCurrency(amountBreakdown.total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;