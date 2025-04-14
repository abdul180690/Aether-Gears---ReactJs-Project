import React, { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed rounded-full bottom-6 right-6 bg-black opacity-40 w-12 h-12 cursor-pointer shadow-lg text-white px-6 z-auto transition-opacity duration-300 ${
            isVisible ? "opacity-40" : "opacity-0 pointer-events-none"
          }`}
          style={{ transition: "opacity 300ms ease-in-out" }}
        >
          <FaAngleDoubleUp className="text-[20px] -ml-2.5"/>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
