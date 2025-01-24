import React, { useRef } from 'react';
import bg from '../assets/bg.png'
import headphone from '../assets/headphone.png'
import { FaArrowRightLong } from 'react-icons/fa6';


const Hero = () => {
  return (
    <section className=" relative max-padd-container h-[633px]  overflow-hidden top-">
     {/* Hero background Image */}
      <img src={bg} alt="" className='absolute object-cover w-full h-full top-0 left-0 '/>

      {/* Overlay (Optional for Better Text Visibility) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>

      {/* Hero Content */}
      <div className="relative grid grid-cols-1 xs:grid-cols-2 h-full items-center">
        {/* Left Side */}
        <div className="p-6 lg:block xs:hidden">
          <p className="text-white text-xl xs:text-2xl max-w-xs">
            Discover the best audio experience with cutting-edge technology and sleek designs.
          </p>
          <button className="btn bg-white mt-6 rounded-full text-black px-6 py-2 hover:bg-gray-300 duration-300">
            Explore More
          </button>
        </div>

        {/* Right Side */}
        <div className=" xs:flex items-center lg:justify-end xs:justify-center p-6">
          <div className="flex flex-col items-center rounded-2xl w-[300px] p-4">
            <div className='w-100 h-100 overflow-hidden rounded-3xl'>
              <img src= {headphone} alt="" className='rounded-3xl zoom'/>
            </div>
            <button className="btn flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-full text-black text-[12px] text-nowrap bg-white hover:bg-gray-300 hover:text-black duration-300">
              Explore This Product <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;