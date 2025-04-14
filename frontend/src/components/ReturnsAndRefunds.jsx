import React from "react";

const ReturnsAndRefunds = () => {
  return (
    <div className="py-16 max-padd-container text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Returns & Refunds</h1>
      <p className="text-gray-500 text-center mb-6">
        We want you to be completely satisfied with your purchase. If you're not happy with your order, follow the steps below to process a return or request a refund.
      </p>

      {/* Return Policy */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">📦 Return Policy</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>You can return items within <strong>30 days</strong> of receiving them.</li>
          <li>Products must be in their original condition with tags and packaging.</li>
          <li>Used, damaged, or washed items cannot be returned.</li>
          <li>Some items, like personalized or hygiene products, are non-returnable.</li>
        </ul>
      </div>

      {/* How to Return an Item */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🔄 How to Return an Item</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li><strong>Go to your account:</strong> Visit the <a href="/orders" className="text-blue-400 hover:underline">Order History</a> section.</li>
          <li><strong>Select the item:</strong> Choose the item you want to return and click "Request Return."</li>
          <li><strong>Print the return label:</strong> You'll receive a prepaid return label via email.</li>
          <li><strong>Pack & Ship:</strong> Securely pack your item and drop it off at the nearest courier location.</li>
          <li><strong>Wait for Confirmation:</strong> We will inspect your item upon arrival and process your refund.</li>
        </ol>
      </div>

      {/* Refund Process */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">💰 Refund Process</h2>
        <p className="text-gray-600">
          Once your return is received and inspected, refunds are processed within <strong>5-7 business days</strong>.  
          Refunds will be credited to the original payment method.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-3 text-gray-600">
          <li><strong>Credit/Debit Card:</strong> 5-7 business days</li>
          <li><strong>PayPal/UPI:</strong> 3-5 business days</li>
          <li><strong>Store Credit:</strong> Immediate upon approval</li>
        </ul>
      </div>

      {/* Exceptions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">⚠️ Exceptions & Special Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Defective or incorrect items? Contact us immediately at <a href="/contact" className="text-blue-400 hover:underline">Customer Support</a>.</li>
          <li>Gift returns are only eligible for store credit.</li>
          <li>Clearance or final sale items cannot be returned.</li>
        </ul>
      </div>

      {/* Contact Support */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-3">📞 Need Help?</h2>
        <p className="text-gray-600">Still have questions? Contact our support team for assistance.</p>
        <a href="/contact" className="inline-block mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default ReturnsAndRefunds;
