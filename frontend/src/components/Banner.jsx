
import React from "react";
import banner1 from "../assets/headphone-video.mp4";
import banner2 from "../assets/camera-video.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="max-padd-container py-5">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 xl:gap-14 gap-y-10">
        {/* Left Banner */}
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
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl font-bold mb-2 uppercase">Headphones</h2>
            <h2 className="text-2xl mb-2">Collection</h2>
            <p className="text-5xl text-orange-600  font-bold mb-4 uppercase">
              Flat 30% Off
            </p>
            <p className="text-white">Use Code : <span>"FLAT30"</span></p>
            <Link 
              to={'/collection'}
              className="flexCenter mt-3 relative border-2 font-medium border-white bg-transparent py-1.5 px-5 uppercase text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] hover:text-slate-900 before:hover:scale-x-100"
            >
              Explore Now
            </Link>
          </div>
        </div>

        {/* Right Banner */}
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
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl font-bold mb-2 uppercase">Cameras</h2>
            <h2 className="text-2xl mb-2">Collection</h2>
            <p className="text-5xl text-amber-300 font-bold mb-4 uppercase">
              Flat 50% off
            </p>
            <p className="text-white">Use Code : <span>"FLAT50"</span></p>
            <Link 
              to={'/collection'}
              className="flexCenter mt-3 relative border-2 font-medium border-white bg-transparent py-1.5 px-5 uppercase text-white transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-300 before:content-[''] hover:text-slate-900 before:hover:scale-x-100"
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