import React, { useRef } from 'react';
import productVideo from '../assets/product-video.mp4'; 
import headphones from '../assets/bg.png'
import { FaArrowRightLong } from 'react-icons/fa6';


const Hero = () => {
  return (
    <section className="relative max-padd-container h-[633px]  overflow-hidden top-">
      {/* Video Background */}
      <video
        src={productVideo}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      ></video>

      {/* Overlay (Optional for Better Text Visibility) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

      {/* Hero Content */}
      <div className="relative grid grid-cols-1 xs:grid-cols-2 h-full items-center">
        {/* Left Side */}
        <div className="p-6">
          <p className="text-white text-xl xs:text-2xl max-w-xs">
            Discover the best audio experience with cutting-edge technology and sleek designs.
          </p>
          <button className="btn bg-secondary mt-6 rounded-full text-white px-6 py-2 hover:bg-primary hover:text-black duration-300">
            Explore More
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden xs:flex items-center justify-end p-6">
          <div className="flex flex-col items-center rounded-2xl w-[300px] p-4">
            <div className='w-100 h-100'>
              <img src= {headphones} alt="" className='rounded-3xl'/>
            </div>
            <button className="btn flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-full text-white text-sm bg-secondary hover:bg-primary hover:text-black duration-300">
              Explore This Product <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;