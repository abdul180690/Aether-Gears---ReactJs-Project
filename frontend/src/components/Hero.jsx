import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 
import bg from "../assets/bg.png";
import headphone from "../assets/headphone.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Hero = () => {
  const texts = ["Rhythm", "Tune", "Song", "Bass"]; 
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    let timeout;

    if (!isDeleting) {
      // Typing effect
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 150); // Typing speed (adjust as needed)
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1000); // Pause duration
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, 100); // Deleting speed (adjust as needed)
      } else {
        // Move to the next text
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [displayText, isDeleting, index, texts]);

  return (
    <section className="relative top-0 left-0 max-padd-container h-[550px] overflow-hidden">
      {/* Hero background Image */}
      <motion.img
        src={bg}
        alt=""
        className="absolute object-cover w-full h-full top-0 left-0"
        loading="lazy"
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Overlay (for Better Text Visibility) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black lg:bg-opacity-0 xs:bg-opacity-20"></div>

      {/* Hero Content */}
      <div className="relative flex flex-col lg:flex-row justify-between items-center w-full h-full px-4 py-6 text-center lg:text-left">
        {/* Left Side (Text & Button) */}
        <motion.div
          className="xl:text-slate-900/80 lg:text-slate-800 md:text-white xs:text-white"
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
        >
          <div className="absolute text-center lg:top-5 lg:block xs:hidden -left-8 xs:mx-auto uppercase lg:w-full lg:text-4xl/[3] tracking-[10px] font-extrabold max-w-lg  ">
            <div className="stroke_text drop-shadow-lg"> Unleash epic</div>            
              <motion.div
                className="shadow_text text-center text-white text-7xl lowercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {displayText}
                <motion.span
                  className="inline-block w-[4px] h-[50px] rounded-full bg-[#2A004E]"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                >
                </motion.span>
              </motion.div>
            <div className="stroke_text drop-shadow-lg"> with next-gen tech and killer style! </div> 
          </div>
        </motion.div>

        {/* Right Side (Image & Button) */}
        <motion.div
          className="lg:w-1/3 flex justify-center  mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
        >
          <div className="z-10 flex flex-col items-center lg:items-center ">
            <div className="w-[250px] h-[250px]">
              <motion.img
                src={headphone}
                alt="Headphone"
                className="drop-shadow-lg "
                initial={{ scale: 0.9, rotate: -5 }}
                animate={{ scale: 1.1, rotate: 20 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>
            <Link
              to={`/product/679e754605cbb1001d282773`}
              className="xs:mb-10 font-bold flexCenter mt-5 relative text-md border-2 border-white rounded-md bg-transparent py-1.5 px-5 uppercase text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-500 before:content-[''] hover:text-gray-800 hover:shadow-lg before:hover:scale-x-100"
            >
              Explore This Product <FaArrowRightLong className="ms-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;