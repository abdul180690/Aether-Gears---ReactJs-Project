import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FaRegWindowClose } from 'react-icons/fa';
import Item from '../components/Item';

const WishList = () => {
  const { currency, products, wishListItems, removeFromWishList } = useContext(ShopContext);
  const [wishListData, setWishListData] = useState([]);
  const [color, setColor] = useState("");
  
  const navigate = useNavigate();

  // Effect to update the wishlist state if it changes
  useEffect(() => {
    // Only update if wishListItems is not empty
    if (wishListItems && Object.keys(wishListItems).length > 0) {
      const updatedWishList = Object.keys(wishListItems).map(itemId => {
        // Get product details from wishListItems
        const product = wishListItems[itemId];
        return { ...product, _id: itemId };  // Include itemId if needed
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
    <div className='max-padd-container my-20 w-full'>
      <Title 
        title1="Your " 
        title2="Wish List" 
        titleStyles="p-5 text-3xl" 
      />

      {/* Render Wishlist Items */}
      <div className="mt-5">
        <div className='flex-1 flex-wrap gap-5'>
          {
            wishListData.length > 0 ? (
              wishListData.map((item) => {
                // Find the product data using the item._id
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;  // Handle missing product data

                return (
                  <div className='flex-1' >
                    <div className="flex mt-5 bg-primary overflow-hidden border border-slate-300 p-5 rounded-xl hover:shadow-lg duration-300">
                      <div className="flex items-center ">
                        {/* Product Image */}
                        <div className="cursor-pointer">
                          <img
                            src={productData.image[0]} // Assuming first image is the main one
                            alt="productImg"
                            className="w-40 rounded relative hover:scale-125"
                            onClick={() => handleNavigateToProduct(productData._id)} // Navigate on image click
                          />
                        </div>
                      </div>

                      <div className="pl-5 flex flex-col w-full">
                        {/* Product name */}
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between">
                            <h5 className="h5 line-clamp-1">{productData.name}</h5>
                          </div>
                        <div>
                        {/* Product description */}
                        <div className="">
                          <p className="bold-14 my-2">{productData.description}</p>
                        </div>
                        {/* Colors */}
                        <div className="mt-4">
                          <h4 className="medium-14 mb-2">Select Color:</h4>
                          <div className="flex gap-x-2">
                            {productData.colors.map((item, i) => (
                              <button
                                key={i}
                                onClick={() => setColor(item)}
                                className={`h-9 w-9 rounded-full flexCenter cursor-pointer border border-gray-400 ${
                                  color === item ? "ring-2 ring-offset-2 ring-primary" : ""
                                }`}
                                style={{ backgroundColor: item }}
                              >
                                {color === item && (
                                  <FaCheck
                                    className={item === "White" ? "text-black" : "text-white"}
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Price */}
                        <div className="mt-4 ">
                          <h4 className="h4">
                            {currency} {productData.price.toFixed(2)}  {/* Display price */}
                          </h4>
                        </div>
                        {/* add to cart button */}
                        <div className=' gap-x-2 mt-6'>
                          <button className='btn-secondary'>Add To Cart</button>
                        </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end'>
                      <FaRegWindowClose
                        onClick={() => handleRemoveFromWishList(item._id)}  // Remove from wishlist
                        className="cursor-pointer text-secondary text-xl"
                      />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='h-full w-full flex items-center justify-center py-60'>
                <h1 className="text-gray-500">Your wishlist is empty.</h1>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default WishList;
