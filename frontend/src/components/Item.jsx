// import React, { useContext, useState, useEffect } from "react";
// import { TiHeartFullOutline } from "react-icons/ti";
// import { FaCheck } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { TbShoppingBagPlus } from "react-icons/tb";
// import { toast } from "react-toastify";

// const Item = ({ product }) => {
//   const { addToWishList, removeFromWishList, addToCart, isInWishlist, token } = useContext(ShopContext);
//   const [hovered, setHovered] = useState(false);
//   const [color, setColor] = useState("");
//   const [isHighlighted, setIsHighlighted] = useState(false);
//   const defaultImage = "https://via.placeholder.com/150";

//   useEffect(() => {
//     // Check if the item is already in the wishlist
//     setIsHighlighted(isInWishlist(product._id));
//   }, [product._id, isInWishlist]);

//   const handleWishlistClick = async () => {
//     if (!token) {
//       // If there is no token, prompt the user to log in
//       toast.error("Please login to manage your wishlist.", { autoClose: 3000 });
//       return;
//     }

//     try {
//       if (isHighlighted) {
//         // Remove from wishlist
//         await removeFromWishList(product._id);
//         setIsHighlighted(false);
//       } else {
//         // Add to wishlist
//         await addToWishList(product._id);
//         setIsHighlighted(true);
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.", { autoClose: 3000 });
//     }
//   };

//   return (
//     <div
//       className="relative bg-primary overflow-hidden border border-slate-300 p-2 rounded-xl hover:shadow-lg duration-300 group"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Product Image */}
//       <div className="flexCenter relative">
//         <Link
//           to={`/product/${product?._id || "#"}`}
//           aria-label={`View details of ${product?.name}`}
//           className="flexCenter p-2 bg-[#f5f5f5] overflow-hidden relative rounded-xl hover:scale-110 duration-300"
//         >
//           <img
//             src={
//               product?.image?.length > 1 && hovered
//                 ? product.image[1]
//                 : product?.image?.[0] || defaultImage
//             }
//             alt={product?.name || "Product Image"}
//             className="transition-all duration-300"
//             title={product?.name}
//           />
//         </Link>
//         <div className="absolute top-2 right-2 rounded-full">
//           <TiHeartFullOutline
//             onClick={handleWishlistClick}
//             className={`cursor-pointer text-amber-400 scale-75  bold-28 duration-300 hover:scale-90 transition-transform ${
//               isHighlighted ? "text-red-500 drop-shadow-lg" : ""
//             }`}
//           />
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="p-3">
//         <h4 className="bold-15 line-clamp-1 !py-0">
//           {product?.name || "Unnamed Product"}
//         </h4>
//         <div className="flexBetween pt-1">
//           <p className="h5 me-2">{product?.category || "Uncategorized"}</p>
//           <h5 className="text-sm font-bold bg-amber-400 px-1 rounded-md text-nowrap">₹ {product?.price || "N/A"}</h5>
//         </div>
//         <p className="line-clamp-2 py-1">
//           {product?.description || "No description available."}
//         </p>
//       </div>

//       {/* Hover Effect: Select Color & Add to cart */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 bg-slate-600 bg-opacity-50 backdrop-blur-sm p-2 rounded-t-xl transform ${
//           hovered ? "translate-y-3 opacity-100 duration-300" : "translate-y-52 opacity-0 duration-1000"
//         } transition-all ease-in-out`}
//       >
//         <div className="flex flex-col items-center gap-3">
//           {/* Select Color Buttons */}
//           <div className="mt-4 xs:mt-1">
//             <h4 className="medium-14 mb-2 text-white text-center">Select Color</h4>
//             <div className="mx-3 flex gap-x-2">
//               {product.colors.map((item, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setColor(item)}
//                   className={`h-9 w-9  rounded-full flexCenter cursor-pointer border border-gray-400 hover:ring-2 ring-slate-400 duration-300 ${
//                     color === item ? "ring-2 ring-offset-2 ring-primary" : ""
//                   }`}
//                   style={{ backgroundColor: item }}
//                 >
//                   {color === item && (
//                     <FaCheck
//                       className={item === "White" ? "text-black" : "text-white"}
//                     />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Add to cart Button */}
//           <div className="flex pb-3 mt-6 xs:mt-2 mb-3">
//             <button
//               onClick={() => {
//                 if (color) {
//                   addToCart(product._id, color);
//                 } else {
//                   toast.error("Please select a color.", { autoClose: 1000 });
//                 }
//               }}
//               className="flexCenter relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-[#FCC737] rounded-[3px] py-1.5 px-3 text-black before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:hover:border-0 before:w-full before:h-full before:rounded-[3px] before:border-e-2 before:border-b-2 before:border-slate-200 before:-z-100 before:transition-all shadow-lg"
//             >
//               <TbShoppingBagPlus className="me-3  text-2xl bg-black text-white p-1 rounded-md" />
//               <span className="font-semibold text-nowrap">Add To Cart</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Item;

import React, { useContext, useState, useEffect } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { FaCheck, FaRegEye } from "react-icons/fa";
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

  useEffect(() => {
    setIsHighlighted(isInWishlist(product._id));
  }, [product._id, isInWishlist]);

  const handleWishlistClick = async () => {
    setIsPulsing(true); 
    setTimeout(() => setIsPulsing(false), 500);

    if (!token) {
      setIsPulsing(true); // Start pulse effect
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

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div
      className="group w-[205px] h-[300px] perspective-1000 "
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side (Product Image & Wishlist Icon) */}

        <div className="absolute w-full h-full bg-primary border border-slate-300 rounded-xl overflow-hidden shadow-xl flex flex-col items-center justify-center backface-hidden">
          <div className="absolute top-2 right-2  z-10 ">
            <TiHeartFullOutline
              className={` text-xl  ${
                isHighlighted ? "text-red-500 drop-shadow-lg" : "text-primary"
              }`}
            />
          </div>
          <div className="relative w-full h-full">
            <img
              src={product?.image?.[0] || defaultImage}
              alt={product?.name || "Product Image"}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute -top-2 left-2 w-[100px] h-[100px]">
              <img
                src={price_tag}
                alt="Price Tag"
                className="w-full h-full rotate-[280deg]"
              />
              <h5 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-black -rotate-[32deg] ml-2 mt-0.5 text-nowrap text-[14px] font-extrabold ">
                ₹ {formatCurrency(product?.price) || "N/A"}/-
              </h5>
            </div>
          </div>
        </div>

        {/* Back Side (Product Info, No Image) */}
        <div className="absolute w-full h-full  bg-blue-950 text-white p-2 rounded-xl flex flex-col justify-center transform rotate-y-180 backface-hidden">
          <div className="absolute top-2 right-2">
          <TiHeartFullOutline
            onClick={handleWishlistClick}
            className={`cursor-pointer text-amber-400 text-xl hover:scale-110 transition-transform ${
            isHighlighted ? "text-red-500 drop-shadow-lg" : ""
            } ${isPulsing ? "animate-ping" : ""}`}
          />
          </div>
          <Link
            to={`/product/${product?._id || "#"}`}
            className="absolute top-9 right-2"
          >
            <FaRegEye className="cursor-pointer text-amber-400 text-xl hover:scale-110 transition-transform " />
          </Link>
          <h4 className="text-center font-semibold px-4">
            {product?.name || "Unnamed Product"}
          </h4>
          <h5 className="text-center mt-1 text-nowrap text-[16px] font-semibold text-amber-300">
                ₹ {formatCurrency(product?.price) || "N/A"}/-
              </h5>

          <p className="text-sm line-clamp-3 text-gray-300 text-center mt-1 px-2">
            {product?.description || "No description available."}
          </p>

          {/* Color Selection */}
          <div className="mt-4 text-center">
            <h4 className="text-sm mb-2  font-semibold">Select Color</h4>
            <div className="flex justify-center gap-2">
              {product.colors.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setColor(item)}
                  className={`h-7 w-7 rounded-full border border-gray-400 hover:ring-2 ring-white transition-all ${
                    color === item ? "ring-2 ring-offset ring-primary" : ""
                  }`}
                  style={{ backgroundColor: item }}
                >
                  {color === item && (
                    <FaCheck
                      className={
                        item === "White"
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
              className="flexCenter relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-[#FCC737]  rounded-[3px] py-1.5 px-5 text-black before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:hover:border-0 before:w-full before:h-full before:rounded-[3px] before:border-e-2 before:border-b-2 before:border-white before:-z-100 before:transition-all duration-300"
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
