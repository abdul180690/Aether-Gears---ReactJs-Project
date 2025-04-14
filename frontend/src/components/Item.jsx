import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiHeartFullOutline } from "react-icons/ti";
import { FaCheck, FaEye } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import price_tag from "../assets/price_tag.png";

const Item = ({ product }) => {
  const { addToWishList, removeFromWishList, addToCart, isInWishlist, token } =
    useContext(ShopContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const [color, setColor] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const defaultImage = "https://via.placeholder.com/150";
  const images = product?.image || [defaultImage];
  const [index, setIndex] = useState(0);

  // Auto Image Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Check if product is in wishlist
  useEffect(() => {
    setIsHighlighted(isInWishlist(product._id));
  }, [product._id, isInWishlist]);

  // Add/Remove from Wishlist
  const handleWishlistClick = async () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 500);

    if (!token) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500);
      toast.error("Please login to manage your wishlist.", { autoClose: 3000 });
      return;
    }
    try {
      if (isHighlighted) {
        await removeFromWishList(product._id);
        setIsHighlighted(false);
      } else {
        await addToWishList(product._id);
        setIsHighlighted(true);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  // Format Currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div
      className="group w-[200px] h-[300px] perspective-1000 "
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side  */}
        <motion.div
          initial={{ rotateX: 20, rotateY: -15, scale: 1 }}
          whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "8px 16px 24px rgba(0, 0, 0, 0.3)", 
          }}
          className="absolute w-full h-full bg-primary border border-slate-400/50 rounded-tl-3xl rounded-tr rounded-br-3xl rounded-bl overflow-hidden flex flex-col items-center justify-center backface-hidden"
        >
          <div className="absolute top-2 right-2  z-10 ">
            <TiHeartFullOutline
              className={` text-2xl  ${
                isHighlighted ? "text-primary bg-red-600 p-1 rounded-full shadow-md shadow-black/50" : "hidden"
              }`}
            />
          </div>
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`Product Image ${index + 1}`}
                className="w-full h-full object-cover rounded-xl absolute"
                initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            <div className="absolute -bottom-2 right-2 w-[100px] h-[100px]">
              <img
                src={price_tag}
                alt="Price Tag"
                className="w-full h-full rotate-[280deg] drop-shadow-lg"
              />
              <h5 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-black -rotate-[32deg] ml-2 mt-0.5 ">
                 <span className="text-nowrap text-[15px] font-extrabold "> <span className="text-[12px] font-bold">₹ </span>{formatCurrency(product?.price) || "N/A"}</span>
              </h5>
            </div>
          </div>
          <h4 className="text-sm text-center font-semibold mx-4 mb-2 line-clamp-1">
            {product?.name || "Unnamed Product"}
          </h4>
        </motion.div>

        {/* Back Side (Product Info) */}
        <div
          className="absolute w-full h-full  text-white p-2 rounded-tr-3xl rounded-tl rounded-bl-3xl rounded-br flex flex-col justify-center transform rotate-y-180 backface-hidden"
          style={{
            backgroundImage: `url(${images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background Blur Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-tr-3xl rounded-tl rounded-bl-3xl rounded-br border border-slate-600"></div>

          <div className="absolute top-2 right-2 z-20">
            <TiHeartFullOutline
              onClick={handleWishlistClick}
              className={`cursor-pointer text-amber-400 text-xl hover:scale-125 duration-300 transition-transform ${
                isHighlighted ? "text-red-500 drop-shadow-lg" : ""
              } ${isPulsing ? "animate-ping" : ""}`}
            />
          </div>
          <Link
            to={`/product/${product?._id || "#"}`}
            className="absolute top-9 right-2 z-20"
          >
            <FaEye className="cursor-pointer text-amber-400 text-xl hover:scale-125 duration-300 transition-transform " />
          </Link>
          <div className="relative z-10 text-center">
            <h4 className="text-center font-semibold px-4">
              {product?.name || "Unnamed Product"}
            </h4>
            <p className="text-sm line-clamp-3 text-gray-200 text-center mt-1 px-2">
              {product?.description || "No description available."}
            </p>
            <h5 className="text-center text-nowrap text-[16px] font-extrabold text-black bg-amber-300 inline-block rounded-md p-1 my-2">
              ₹ {formatCurrency(product?.price) || "N/A"}/-
            </h5>
          </div>
          
          {/* Color Selection */}
          <div className="relative z-10 text-center">
            <h4 className="text-sm mb-2  font-semibold">Select Color</h4>
            <div className="flex justify-center gap-2">
              {product.colors.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setColor(item)}
                  className={`h-7 w-7 rounded-tr-2xl  rounded-b-2xl border border-gray-400 shadow-md shadow-white/30 hover:ring-2 ring-white transition-all ${
                    color === item ? "ring-2 ring-offset ring-primary" : ""
                  }`}
                  style={{ backgroundColor: item }}
                >
                  {color === item && (
                    <FaCheck
                      className={
                        item === "White" && "white"
                          ? "text-black mx-auto text-[12px]"
                          : "text-white mx-auto text-[12px]"
                      }
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                if (color) {
                  addToCart(product._id, color);
                } else {
                  toast.error("Please select a color.", { autoClose: 1000 });
                }
              }}
              className="flexCenter relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-[#FCC737]   py-1.5 px-5 text-black before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:hover:border-0 before:w-full before:h-full  before:border-e-4 before:border-b-4 before:border-gray-900 before:-z-100 before:transition-all hover:shadow-lg duration-300"
            >
              <TbShoppingBagPlus className="mr-2 text-xl" />
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;