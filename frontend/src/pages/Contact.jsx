import React, { useEffect } from 'react';
import contact_hero from '../assets/contact-hero.png'
import Title from '../components/Title';


const Contact = () => {
   useEffect(() => {
            const handleScroll = () => {
              const sections = document.querySelectorAll(".scroll-section"); // Select all sections with class 'scroll-section'
              const windowHeight = window.innerHeight;
        
              sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < windowHeight * 0.9 && rect.bottom >= 0) {
                  section.classList.add("in-view"); // Add 'in-view' when the section is in view
                } else {
                  section.classList.remove("in-view"); // Remove 'in-view' when the section is out of view
                }
              });
            };
        
            window.addEventListener("scroll", handleScroll);
            handleScroll(); // Trigger scroll check on mount
        
            return () => {
              window.removeEventListener("scroll", handleScroll);
            };
          }, []);
        
  return (
    <>
      <div className="min-h-screen  ">
        {/* Hero Section */}
        <div className="relative h-[450px] flex items-center justify-center mb-10 overflow-hidden ">
          <img
            src={contact_hero}
            alt="Customer Support"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0  rounded-lg "></div>
          <div className="relative text-center text-slate-800">
          <Title 
            title1={"Contact "}
            title2={"Us"}
            titleStyles={"scroll-section"}
          />
            <p className="scroll-section text-xl lg:px-60 xs:px-5 text-slate-800">At <strong>Aether Gears</strong>, we’re passionate about bringing you the latest in cutting-edge technology and premium gear. Whether you have a question about our products, need assistance with an order, or just want to share your feedback, we’re here to help!</p>
            <p className="scroll-section text-xl lg:px-60 xs:px-5 text-slate-800 mt-5">Our dedicated support team is ready to provide you with the best experience possible. Reach out to us—we’d love to hear from you!</p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="max-padd-container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="scroll-section bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
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
              <p className="text-gray-600 text-lg">+91 - 98765 43210</p>
              <p>Feel free to call 24/7</p>
            </div>
            <div className="scroll-section bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
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
              <p className="text-gray-600 text-lg">support@aethergears.com</p>
              <p>Write your queries and complaints</p>
            </div>
            <div className="scroll-section bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
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
              <p className="text-gray-600 text-lg">123 Main Street, Madurai, India.</p>
              <p>Heartly welcome to our shop location.</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-padd-container mx-16 px-4 mb-10">
          <div className="scroll-section bg-white p-8 rounded-lg shadow-lg">
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
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-300 to-amber-600 text-slate-800 hover:tracking-widest py-3 px-4 rounded-lg hover:from-orange-400 hover:to-amber-700 hover:text-white hover:font-extrabold uppercase transition-all ease-in-out duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="scroll-section max-padd-container mx-auto px-4 mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">Our Location</h2>
          <iframe
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=madurai&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
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

