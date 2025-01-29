// import React, { useState } from "react";
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import { toast } from "react-toastify";
// import contact from "../assets/contact-bg.png";
// import Header from "../components/Header";
// import Title from "../components/Title";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Validate and process form data
//     if (formData.name && formData.email && formData.message) {
//       toast.success("Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" }); // Reset form
//     } else {
//       toast.error("Please fill in all fields.");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="max-padd-container  pt-10 pb-20">
//         <div className=" mx-auto px-4 ">
//           <Title title1={"Contact"} title2={"Us"} titleStyles={"h1 pb-3"} />

//           {/* Contact Information */}
//           <div className="flex lg:flexCenter gap-40 xs:flex-wrap flex-cols-1 sm:flex-cols-2 lg:flex-cols-3 my-6">
//             <div className="flex items-center  space-x-3">
//               <FaPhoneAlt className="text-3xl text-orange-700" />
//               <div>
//                 <h5 className="bold-20 ">Phone</h5>
//                 <p className="text-gray-800">+191 - 98765 43210</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3">
//               <FaEnvelope className="text-3xl text-orange-700" />
//               <div>
//                 <h5 className="bold-20">Email</h5>
//                 <p className="text-gray-800">contact@aethergears.com</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3">
//               <FaMapMarkerAlt className="text-3xl text-orange-700" />
//               <div>
//                 <h5 className="bold-20">Address</h5>
//                 <p className="text-gray-800">12 New Street, Madurai, India</p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="flex p-8 rounded-lg ">
//             <div className="lg:w-1/2 xs:w-full">
//               <h3 className="text-2xl font-medium mb-6">Send Us A Message</h3>

//               <form onSubmit={handleFormSubmit}>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="Full Name"
//                     className=" mb-7 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600 rounded-lg"
//                     required
//                   />
//                   <label
//                     for="name"
//                     class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Full Name
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Email Address"
//                     className=" mb-7 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600 rounded-lg"
//                   />
//                   <label
//                     for="phoneNumber"
//                     class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Email Address
//                   </label>
//                 </div>

//                 <div className="relative">
//                   <textarea
//                     type="text"
//                     id="message"
//                     name="message"
//                     placeholder="Message"
//                     className=" mb-3 pl-3 peer  w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600 rounded-lg"
//                     rows="10"
//                   />
//                   <label
//                     for="email"
//                     class="pl-3 absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Message in 200 words
//                   </label>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-secondary text-white py-3 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//             <div className="lg:block xs:hidden">
//               <img src={contact} alt="" className="w-9/12" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact;


import React from 'react';
import Header from '../components/Header';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-10">
        {/* Hero Section */}
        <div className="relative h-96 flex items-center justify-center mb-10 overflow-hidden">
          <img
            src="https://via.placeholder.com/1200x400"
            alt="Customer Support"
            className="absolute inset-0 w-full h-full object-cover rounded-lg transform scale-105 hover:scale-100 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
          <div className="relative text-center text-white">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">Contact Us</h1>
            <p className="text-xl animate-fade-in-up">We're here to help! Reach out to us for any questions or concerns.</p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="inline-block bg-blue-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (123) 456-7890</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="inline-block bg-purple-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">support@ecommerce.com</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="inline-block bg-pink-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Main Street, City, Country</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="container mx-auto px-4 mb-10">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Send Us a Message</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.95373531531615!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a6c8f4f4f4!2s123%20Main%20St%2C%20City%2C%20Country!5e0!3m2!1sen!2sus!4v1622549402999!5m2!1sen!2sus"
            width="100%"
            height="400"
            className="border-0 rounded-lg shadow-lg"
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;