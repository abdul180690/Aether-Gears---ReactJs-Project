
import React from "react";
import banner1 from "../assets/headphone-video.mp4";
import banner2 from "../assets/camera-video.mp4";

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
            <h2 className="text-3xl font-bold mb-2">FLAT 15% OFF on selected brands Headphones</h2>
            <p className="text-lg text-primary mb-4">
              Experience the ultimate sound quality with our latest collection.
            </p>
            <button className="px-6 py-2 bg-secondary text-white rounded-full font-semibold hover:bg-primary hover:text-secondary transition">
              Shop Now
            </button>
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
            <h2 className="text-3xl font-bold mb-2">FLAT 25% OFF on selected brands Cameras</h2>
            <p className="text-lg mb-4 text-primary">
              Capture the world with our latest collection.
            </p>
            <button className="px-6 py-2 bg-secondary text-white rounded-full font-semibold hover:bg-primary hover:text-secondary transition">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;