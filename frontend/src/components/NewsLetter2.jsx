import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import Title from "../components/Title";


const Newsletter2 = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("⚠️ Please enter a valid email.");
      return;
    }
    setMessage("✅ Subscription successful! Check your inbox.");
    setEmail(""); // Clear input after submission
  };

  return (
    <div className="max-padd-container py-16 text-center">
      <Title title1={"📬 Subscribe to "} title2={"Our Newsletter"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 my-6">
        Be the first to know about exclusive drops, discounts, and the latest trends in tech & fashion.
      </p>

      {/* Subscription Form */}
      <form onSubmit={handleSubscribe} className="flex flex-col items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full max-w-md px-4 py-2 rounded-md text-black border border-gray-300 focus:outline-none "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 hover:tracking-widest text-white font-bold py-2 px-6 rounded-md duration-300"
        >
          Subscribe
        </button>
      </form>

      {/* Subscription Message */}
      {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}

      {/* Social Media Links */}
      <div className="mt-6">
        <p className="text-gray-400">Follow us for updates:</p>
        <div className="flex justify-center gap-5 mt-6">
          <a href="#" className="text-blue-500 hover:scale-125 hover:bg-blue-600 p-2 hover:text-white rounded-full text-xl duration-300 "><FaFacebookF /> </a>
          <a href="#" className="text-blue-500 hover:scale-125 hover:bg-blue-600 p-2 hover:text-white rounded-full text-xl duration-300"><FaInstagram /> </a>
          <a href="#" className="text-blue-500 hover:scale-125 hover:bg-blue-600 p-2 hover:text-white rounded-full text-xl duration-300"><FaXTwitter /> </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter2;
