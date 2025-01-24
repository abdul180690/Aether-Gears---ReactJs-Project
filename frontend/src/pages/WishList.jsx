import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaRegWindowClose } from "react-icons/fa";
import { motion } from 'framer-motion'; // Importing framer-motion for animations

const WishList = () => {
  const { currency, products, wishListItems, removeFromWishList, addToCart, getWishListCount } =
    useContext(ShopContext);
  const [wishListData, setWishListData] = useState([]);
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  // Effect to update the wishlist state if it changes
  useEffect(() => {
    // Only update if wishListItems is not empty
    if (wishListItems && Object.keys(wishListItems).length > 0) {
      const updatedWishList = Object.keys(wishListItems).map((itemId) => {
        // Get product details from wishListItems
        const product = wishListItems[itemId];
        return { ...product, _id: itemId }; // Include itemId if needed
      });
      setWishListData(updatedWishList);
    }
  }, [wishListItems, products]);

  const handleRemoveFromWishList = (id) => {
    // Call the remove function from the context to update the wishlist
    removeFromWishList(id);
  };

  const handleNavigateToProduct = (id) => {
    // Navigate to the product details page when clicking on a product
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-padd-container my-20 w-full">
      <div className="flex items-center">
        <Title
          title1="Your "
          title2="Wish List"
          titleStyles="text-lg py-5 text-secondary"
        />
        <h5 className=" relative  pl-3 text-gray-500">
          ({getWishListCount()} Items)
        </h5>
      </div>

      {/* Render Wishlist Items */}
      <div className="mt-5">
        <div className="flex-1 flex-wrap gap-5 ">
          {wishListData.length > 0 ? (
            wishListData.map((item) => {
              // Find the product data using the item._id
              const productData = products.find(
                (product) => product._id === item._id
              );
              if (!productData) return null; // Handle missing product data

              return (
                <motion.div 
                  className="flex-1 "
                  key={item._id}
                  initial={{ opacity: 0, scale: 0 }} // Initial state: hidden and small
                  animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and normal scale
                  transition={{
                    delay: item * 0.1, // Delay based on index for cascading effect
                    duration: 0.5,
                  }}
                >
                  <div className="flex mt-5 border-s-8 border-e-8 border-gray-30 bg-primary overflow-hidden  p-5 rounded-xl hover:shadow-lg duration-300 zoom-in-animation">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="cursor-pointer flexCenter">
                        <img
                          src={productData.image[0]} // Assuming first image is the main one
                          alt="productImg"
                          className="w-40 rounded relative scale-125 hover:scale-110 duration-300"
                          onClick={() =>
                            handleNavigateToProduct(productData._id)
                          } // Navigate on image click
                        />
                      </div>
                    </div>

                    <div className="pl-5 flex flex-col w-full">
                      {/* Product name */}
                      <div className="flex flex-col w-full ">
                        <div className="flex justify-between">
                          <h5 className="h5 line-clamp-1">
                            {productData.name}
                          </h5>
                          <FaRegWindowClose
                            onClick={() => handleRemoveFromWishList(item._id)} // Remove from wishlist
                            className="cursor-pointer text-secondary text-xl"
                          />
                        </div>
                        <div>
                          {/* Product description */}
                          <div className="">
                            <p className="bold-14 my-2">
                              {productData.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="flex gap-x-2 justify-between xs:flex-wrap">
                              {/* Colors */}
                              <div className="flex gap-x-2 items-center">
                                <h4 className="medium-14">Select Color:</h4>
                                {productData.colors.map((item, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setColor(item)}
                                    className={`h-9 w-9 rounded-full flexCenter cursor-pointer border border-gray-400 hover:ring-2 ring-slate-400 duration-300 ${
                                      color === item
                                        ? "ring-2 ring-offset-2 ring-primary"
                                        : ""
                                    }`}
                                    style={{ backgroundColor: item }}
                                  >
                                    {color === item && (
                                      <FaCheck
                                        className={
                                          item === "White"
                                            ? "text-black"
                                            : "text-white"
                                        }
                                      />
                                    )}
                                  </button>
                                ))}
                              </div>
                              {/* Price */}
                              <div className="justify-end">
                                <h4 className="h4 xs:mt-3">
                                  {currency} {productData.price.toFixed(2)}{" "}
                                  {/* Display price */}
                                </h4>
                              </div>
                            </div>
                          </div>
                          {/* add to cart button */}
                          <div className=" gap-x-2 mt-5">
                            <button
                              onClick={() => addToCart(productData._id, color)} 
                              className="btn-secondary">
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="h-full w-full flex items-center justify-center py-60">
              <h1 className="text-gray-500">Your wishlist is empty.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
