import React, { useState, useEffect } from "react";
import { FaHandPointUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          className="fixed rounded-full bottom-5 right-5 bg-black border-none opacity-30 w-20 h-20 text-center cursor-pointer shadow-lg text-white text-4xl pl-5"
        >
          <FaHandPointUp className=""/>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
