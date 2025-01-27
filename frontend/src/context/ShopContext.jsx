import React, { createContext, useEffect, useState } from 'react';
import { products } from '../assets/data';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const currency = "₹";
  const delivery_charges = 50;
  const [cartItems, setCartItems] = useState({});
  const [wishListItems, setWishListItems] = useState({});

  // Add item to the cart with color option
  const addToCart = async (itemId, color) => {
    if (!color) {
      toast.error("Please select the color first", { autoClose: 3000 });
      return;
    }

    try {
      toast.success("Added to your Cart", { autoClose: 1000 });
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.", { autoClose: 3000 });
    }

    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      if (cartData[itemId][color]) {
        cartData[itemId][color] += 1;
      } else {
        cartData[itemId][color] = 1;
      }
    } else {
      cartData[itemId] = { [color]: 1 };
    }
    setCartItems(cartData);
  };

  // Add item to the wishlist without color option
  const addToWishList = (itemId) => {
    if(wishListItems[itemId]){
      toast.info("Item already in the wishlist", { autoClose: 3000 });
    return;
    }

    try {
      toast.success("Added to your Wishlist", { autoClose: 1000 });
    } catch (error) {
      toast.error("Failed to add to your Wishlist. Please try again.", { autoClose: 3000 });
    }

    let wishListData = { ...wishListItems };  // Using the correct state name
    if (wishListData[itemId]) {
      wishListData[itemId] += 1;
    } else {
      wishListData[itemId] = 1;
    }
    setWishListItems(wishListData);  // Update wishlist state
  };

  // Get the count of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const color in cartItems[item]) {
        totalCount += cartItems[item][color];
      }
    }
    return totalCount;
  };

  // Get the count of items in the wishlist
  const getWishListCount = () => {
    let totalCount = 0;
    for (const itemId in wishListItems) {
      totalCount += wishListItems[itemId];
    }
    return totalCount;
  };

  // Update item quantity in the cart
  const updateQuantity = (itemId, color, quantity) => {
    let cartData = { ...cartItems };
    if (cartData[itemId] && cartData[itemId][color] > 0) {
      cartData[itemId][color] = quantity;
      setCartItems(cartData);
      toast.info("Quantity updated successfully", { autoClose: 1000 });
    }
  };
  // Get the total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);
      for (const color in cartItems[item]) {
        totalAmount += itemInfo.price * cartItems[item][color];
      }
    }
    return totalAmount;
  };

  // Check if the item is in the wishlist
  const isInWishlist = (itemId) => {
    return wishListItems[itemId] ? true : false;
  };

  // Remove item from the wishlist
  const removeFromWishList = (itemId) => {
    if (!wishListItems[itemId]) {
      toast.warn("Item not found in the wishlist", { autoClose: 3000 });
      return;
    }
    let updatedWishList = { ...wishListItems };
    delete updatedWishList[itemId];
    setWishListItems(updatedWishList);  // Update the state with the new wishlist
    toast.info("Item removed from your wishlist", { autoClose: 1000 });
  };

  useEffect(() => {}, [cartItems]);

  const value = {
    navigate,
    products,
    search,
    setSearch,
    currency,
    delivery_charges,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    addToWishList,
    updateQuantity,
    wishListItems,
    isInWishlist,
    setWishListItems,
    getWishListCount,
    removeFromWishList,  
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
