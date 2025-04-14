import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import headphones from "../assets/headphones.png";
import cameras from "../assets/cameras.png";
import mobiles from "../assets/mobiles.png";
import speakers from "../assets/speakers.png";
import mouses from "../assets/mouses.png";
import watches from "../assets/watches.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Product Images and Texts
const images = [headphones, cameras, mobiles, speakers, mouses, watches];
const texts = ["Headsets", "Digital Cam", "Smartphones", "Boomboxes", "Optical Mice", "Wristwear"];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Change product Image array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  // Typing effect
  useEffect(() => {
    const currentText = texts[index];
    let timeout;

    if (!isDeleting) {
      // Typing effect
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 150);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1000); // Pause duration
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, 15); 
      } else {
        // Move to the next text
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout); 
  }, [displayText, isDeleting, index, texts]);
  

  return (
    <section className="relative top-0 left-0 max-padd-container h-svh overflow-hidden">
      {/* Hero background Image */}
      <img
        src={bg}
        alt=""
        className="absolute object-cover w-full h-full top-0 left-0 blur-[3px]"
       />
      <motion.img
        src={bg1}
        alt=""
        className="absolute object-cover w-full h-full top-0 left-0 "
        loading="lazy"
        initial={{ opacity: 0, y: 500, scale: 0.1 }}
        animate={{ opacity: 1, y: 0, scale:1 }}
        transition={{ duration: 2, ease: "easeOut", rotate: {
          duration: 0.5, // Duration of the wiggle effect
          repeat: Infinity, // Repeat the wiggle effect infinitely
          repeatType: "mirror", // Smoothly reverse the animation
          ease: "easeInOut",
        }, }}
      />

      {/* Overlay (for Better Text Visibility) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black lg:bg-opacity-0 xs:bg-opacity-20"></div>

      <div className=" relative flex flex-col lg:flex-row justify-between items-center w-full h-full  text-center lg:text-left">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <div className="lg:block xs:hidden text-center lg:text-left lg:text-4xl/[3] font-extrabold max-w-lg">
            <div className="stroke_text drop-shadow-lg uppercase title-font tracking-[8px]"> Unleash epic</div>
            <motion.div
              className="shadow_text text-center text-white text-5xl lowercase tracking-[5px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayText}
              <motion.span
                className="inline-block w-[4px] h-[35px] rounded-full bg-[#2A004E]"
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "linear",
                }}
              ></motion.span>
            </motion.div>
            <div className="stroke_text drop-shadow-lg uppercase title-font tracking-[8px]">
              {" "}
              with next-gen tech and killer style!{" "}
            </div>
          </div>
        </motion.div>

        {/* Right Side (Image & Button) */}
        <motion.div
          className="lg:w-1/3 flex justify-center "
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
        >
          <div className="z-10 flex flex-col items-center ">
            <div className="w-full lg:h-[40vh] xs:h-[40vh] items-center justify-center flex">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex} 
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  className="shadowed w-full h-full "
                  initial={{ opacity: 0 , x: 250, scale: 0.1}}
                  animate={{ opacity: 1 , x: 0, scale: 1}}
                  exit={{ opacity: 0 , y: 150, scale: 0.1}}
                  transition={{
                    duration: 0.5, 
                    ease: "easeInOut",
                  }}
                />
              </AnimatePresence>
            </div>
            <Link
              to={`/collection`}
              className="xs:mb-10 mt-5 font-bold flexCenter relative text-md border-2 border-white rounded-md bg-transparent py-1.5 px-5 uppercase text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-slate-900 before:transition-transform before:duration-500 before:content-[''] hover:text-white hover:border-slate-900 tracking-widest hover:drop-shadow-lg before:hover:scale-x-100"
            >
              Explore Now <FaArrowRightLong className="ms-2 hover:-rotate-45 duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
