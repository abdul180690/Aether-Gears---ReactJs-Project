import React from 'react';
import bg from '../assets/bg.png';
import headphone from '../assets/headphone.png';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative top-0 left-0 max-padd-container h-[633px] overflow-hidden">
      {/* Hero background Image */}
      <img src={bg} alt="" className="absolute object-cover w-full h-full top-0 left-0" />

      {/* Overlay (Optional for Better Text Visibility) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black lg:bg-opacity-0 xs:bg-opacity-40"></div>

      {/* Hero Content */}
      <div className="relative flex flex-col lg:flex-row justify-between items-center w-full h-full px-4 py-6 text-center lg:text-left">
        {/* Left Side (Text & Button) */}
        <div className="xl:text-slate-900/80 lg:text-slate-800 md:text-white xs:text-white">
          <h1 className="lg:w-9/12 lg:text-3xl/[1.5] tracking-widest title-font lg:text-stroke font-semibold xs:text-2xl max-w-lg mx-auto lg:mx-0 mb-6 ">
          Unleash epic sound with next-gen tech and killer style!
          </h1>
          <Link
            to={`/collection`}
            className="btn bg-white text-black text-sm rounded-full px-6 py-2 hover:bg-gray-300 duration-300">
            Explore More
          </Link>
        </div>

        {/* Right Side (Image & Button) */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="flex flex-col items-center lg:items-center w-[300px] p-4">
            <div className="w-[250px] h-[250px]">
              <img src={headphone} alt="Headphone" className="lg:animate-bounce" />
            </div>
            <Link 
              to={`/product/1`}
              className="btn flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-full text-black text-[12px] text-nowrap bg-white hover:bg-gray-300 hover:text-black duration-300"
            >
              Explore This Product <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
