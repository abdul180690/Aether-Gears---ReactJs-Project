
import React from "react";
import banner1 from "../assets/headphone-video.mp4";
import banner2 from "../assets/camera-video.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="max-padd-container py-5">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 xl:gap-14 gap-y-10">
        {/* First Banner */}
        <div className="flex-1 relative overflow-hidden rounded-xl shadow-lg group">
          <video
            src={banner1}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          ></video>
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl font-bold mb-2">Headphone</h2>
            <h2 className="text-2xl mb-2">Collection</h2>
            <p className="text-5xl text-amber-300 font-bold mb-4">
              Flat 30% Off
            </p>
            <Link 
              to={'/offers'}
              className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-300 hover:text-secondary transition"
            >
              Explore Now
            </Link>
          </div>
        </div>

        {/* Second Banner */}
        <div className="flex-1 relative overflow-hidden rounded-xl shadow-lg group">
          <video
            src={banner2}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          ></video>
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl font-bold mb-2">Camera</h2>
            <h2 className="text-2xl mb-2">Collection</h2>
            <p className="text-5xl text-amber-300 font-bold mb-4">
              Flat 50% off
            </p>
            <Link 
              to={'/offers'} 
              className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-slate-300 hover:text-secondary transition"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;