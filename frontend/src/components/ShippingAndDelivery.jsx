import React from "react";

const ShippingAndDelivery = () => {
  return (
    <div className="py-16 max-padd-container text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Shipping & Delivery</h1>
      <p className="text-gray-500 text-center mb-6">
        Learn about our shipping options, delivery timelines, and policies.
      </p>

      {/* Shipping Methods */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Shipping Methods <small className="text-gray-400">(TamilNadu)</small></h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Standard Shipping (5-7 business days) - ₹ 100</li>
          <li>Express Shipping (2-3 business days) - ₹ 150</li>
          <li>Overnight Shipping (1 business day) - ₹ 500</li>
          <li>Free Shipping on orders over ₹ 1000</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Shipping Methods <small className="text-gray-400">(India)</small></h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Standard Shipping (5-7 business days) - ₹ 100</li>
          <li>Express Shipping (2-3 business days) - ₹ 250</li>
          <li>Overnight Shipping (1 business day) - ₹ 600</li>
          <li>Free Shipping on orders over ₹ 1000</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Shipping Methods <small className="text-gray-400">(International)</small></h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Varies based on the parcel size and weight. The final shipping cost will be updated at checkout.</li>
          
        </ul>
      </div>

      {/* Estimated Delivery Times */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Estimated Delivery Times</h2>
        <p className="text-gray-700 mb-2">Delivery times depend on your location and chosen shipping method.</p>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Region</th>
              <th className="p-2 border">Standard</th>
              <th className="p-2 border">Express</th>
              <th className="p-2 border">Overnight</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">TamilNadu</td>
              <td className="p-2 border">5-7 Days</td>
              <td className="p-2 border">2-3 Days</td>
              <td className="p-2 border">1 Day</td>
            </tr>
            <tr  className="text-center">
              <td className="p-2 border">India</td>
              <td className="p-2 border">7-10 Days</td>
              <td className="p-2 border">3-5 Days</td>
              <td className="p-2 border">3 Days</td>
            </tr>
            <tr  className="text-center">
              <td className="p-2 border">International</td>
              <td className="p-2 border">10-15 Days</td>
              <td className="p-2 border">5-7 Days</td>
              <td className="p-2 border">3 Days</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Shipping Policies */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Shipping Policies</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>We process orders within 24 hours.</li>
          <li>Shipping delays may occur due to weather or holidays.</li>
          <li>Tracking details will be provided once your order is shipped.</li>
          <li>International orders may be subject to customs duties and fees.</li>
        </ul>
      </div>

      {/* Shipping FAQs */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <strong>Can I change my shipping address after placing an order?</strong>
            <p className="text-gray-600">You can update your shipping address within 2 hours of placing the order by contacting our support team.</p>
          </div>
          <div className="border-b pb-2">
            <strong>Do you ship internationally?</strong>
            <p className="text-gray-600">Yes, we ship to most countries worldwide. Additional customs fees may apply.</p>
          </div>
          <div className="border-b pb-2">
            <strong>What should I do if my package is delayed?</strong>
            <p className="text-gray-600">Check your tracking information and contact the shipping carrier. If the delay persists, reach out to our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
