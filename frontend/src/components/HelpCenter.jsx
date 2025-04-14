import React, { useState } from "react";
import { Link } from "react-router-dom";
import LiveChat from "../components/LiveChat"; 
import Title from "../components/Title"; 


const HelpCenter = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="py-16 max-padd-container text-black">
      <Title title1={"Help "} title2={"Center"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-500 text-center mb-6">
        Find answers to common questions, get support, and explore helpful resources.
      </p>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          <li className="border-b pb-2">
            <strong>How can I track my order?</strong>
            <p className="text-gray-400">
              You can track your order in the <Link to="/orders" className="text-blue-400 hover:underline">Order Tracking</Link> section.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>What payment methods do you accept?</strong>
            <p className="text-gray-400">
              We accept credit/debit cards, net banking, UPI, and Cash on Delivery.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>What is your return policy?</strong>
            <p className="text-gray-400">
              We offer a 30-day return policy. Check out our <Link to="/returns-refunds" className="text-blue-400 hover:underline">Returns & Refunds</Link> page for details.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>How do I contact customer support?</strong>
            <p className="text-gray-400">
              You can reach us via <Link to="/contact" className="text-blue-400 hover:underline">Contact Us</Link> or email us at support@aethergears.com.
            </p>
          </li>
        </ul>
      </div>

      {/* Support Options */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Get Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Live Chat Button Opens Popup */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded text-center text-white"
          >
            💬 Live Chat
          </button>
          <Link to="/contact" className="bg-green-500 hover:bg-green-600 p-3 rounded text-center">
            📞 Contact Support
          </Link>
          <Link to="/returns-refunds" className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded text-center">
            🔄 Returns & Refunds
          </Link>
          <Link to="/faqs" className="bg-purple-500 hover:bg-purple-600 p-3 rounded text-center">
            ❓ More FAQs
          </Link>
        </div>
      </div>

      {/* Live Chat Popup */}
      {isChatOpen && <LiveChat onClose={() => setIsChatOpen(false)} />}

      {/* Popular Help Topics */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Popular Topics</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li><Link to="/shipping-delivery" className="text-blue-400 hover:underline">Shipping & Delivery</Link></li>
          <li><Link to="/account-help" className="text-blue-400 hover:underline">Managing Your Account</Link></li>
          <li><Link to="/security" className="text-blue-400 hover:underline">Privacy & Security</Link></li>
          <li><Link to="/payment-help" className="text-blue-400 hover:underline">Payment Issues</Link></li>
          <li><Link to="/promotions" className="text-blue-400 hover:underline">Promotions & Discounts</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default HelpCenter;
