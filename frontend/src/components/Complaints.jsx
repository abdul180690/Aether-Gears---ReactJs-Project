import React, { useState } from "react";
import { Link } from "react-router-dom";

const Complaints = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    complaintType: "Product Issue",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate API call (replace with actual backend request)
    setTimeout(() => {
      alert("Your complaint has been submitted. Our support team will get in touch soon.");
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        orderNumber: "",
        complaintType: "Product Issue",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="max-padd-container py-16 px-10  text-black ">
      <h1 className="text-3xl font-bold mb-4 text-center">Submit a Complaint</h1>
      <p className="text-gray-500 text-center mb-6">
        If you have any issues with your order, product, or service, please let us know by filling out the form below.
      </p>

      {/* Complaint Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <label className="block text-gray-500">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-500">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-500">Order Number (if applicable)</label>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-500">Complaint Type</label>
          <select
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-300 "
          >
            <option>Product Issue</option>
            <option>Late Delivery</option>
            <option>Payment Issue</option>
            <option>Customer Support</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-500">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 border rounded bg-gray-300 "
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded font-bold text-white transition-all"
        >
          {submitted ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      {/* Complaint FAQs */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          <li className="border-b pb-2">
            <strong>How long does it take to resolve a complaint?</strong>
            <p className="text-gray-400">
              We aim to resolve complaints within **3-5 business days**. Complex issues may take longer.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>Will I receive a refund if my complaint is valid?</strong>
            <p className="text-gray-400">
              If eligible, refunds are processed within **7-10 business days** after complaint verification.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>How will I be contacted?</strong>
            <p className="text-gray-400">
              Our support team will reach out via **email or phone** within **24-48 hours**.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>What should I do if my issue isn't resolved?</strong>
            <p className="text-gray-400">
              If your issue persists, you can escalate it by **contacting our support team directly**.
            </p>
          </li>
        </ul>
      </div>

      {/* Contact & Support */}
      <div className="mt-6 text-center">
        <p className="text-gray-300">
          Need further assistance? Reach out to our{" "}
          <Link to="/contact" className="text-blue-400 hover:underline">
            Customer Support
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Complaints;
