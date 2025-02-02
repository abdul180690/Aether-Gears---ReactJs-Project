import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(``);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currency = "₹";
  const delivery_charges = 100;
  const [wishListItems, setWishListItems] = useState({});

  // Add item to the cart with color option
  const addToCart = async (itemId, color) => {
    if (!token) {
      toast.error("Please login to add items to the cart", { autoClose: 3000 });
      return;
    }
    
    if (!color) {
      toast.error("Please select the color first", { autoClose: 3000 });
      return;
    }

    try {
      toast.success("Added to your Cart", { autoClose: 1000 });
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.", {
        autoClose: 3000,
      });
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

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, color },
          { headers: { token } }
        );
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
    }
  };

  // // Add item to the wishlist without color option
  // const addToWishList = (itemId) => {
  //   if (wishListItems[itemId]) {
  //     toast.info("Item already in the wishlist", { autoClose: 3000 });
  //     return;
  //   }

  //   try {
  //     toast.success("Added to your Wishlist", { autoClose: 1000 });
  //   } catch (error) {
  //     toast.error("Failed to add to your Wishlist. Please try again.", {
  //       autoClose: 3000,
  //     });
  //   }

  //   let wishListData = { ...wishListItems }; // Using the correct state name
  //   if (wishListData[itemId]) {
  //     wishListData[itemId] += 1;
  //   } else {
  //     wishListData[itemId] = 1;
  //   }
  //   setWishListItems(wishListData); // Update wishlist state
  // };

   // Add item to the wishlist
   const addToWishList = async (itemId) => {
    if (!token) {
      toast.error("Please login to add items to your wishlist", { autoClose: 3000 });
      return;
    }

    if (wishListItems[itemId]) {
      toast.info("Item already in the wishlist", { autoClose: 3000 });
      return;
    }

    try {
      toast.success("Added to your Wishlist", { autoClose: 1000 });
      let updatedWishList = { ...wishListItems, [itemId]: 1 };
      setWishListItems(updatedWishList);

      // Send API request to backend
      if (token) {
        await axios.post(
          backendUrl + "/api/wishlist/add",
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      toast.error("Failed to add to your Wishlist. Please try again.", {
        autoClose: 3000,
      });
    }
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
  const updateQuantity = async (itemId, color, quantity) => {
    let cartData = { ...cartItems };
    if (cartData[itemId] && cartData[itemId][color] > 0) {
      cartData[itemId][color] = quantity;
      setCartItems(cartData);
      toast.info("Quantity updated successfully", { autoClose: 1000 });
      if(token){
        try {
          await axios.post(backendUrl + "/api/cart/update", {itemId, color, quantity}, {headers: {token}})

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
  };

  // // Get the total cart amount
  // const getCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     let itemInfo = products.find((product) => product._id === item);
  //     for (const color in cartItems[item]) {
  //       try {
  //         if(cartItems[items][item] > 0){
  //           totalAmount += itemInfo.price * cartItems[item][color];
  //         }
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   }
  //   return totalAmount;
  // };

  // Get the total cart amount
  const getCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        const itemTotal = Object.keys(cartItems[itemId]).reduce(
          (itemTotal, color) => itemTotal + itemInfo.price * cartItems[itemId][color],
          0
        );
        total += itemTotal;
      }
      return total;
    }, 0);
  };

  // Check if the item is in the wishlist
  const isInWishlist = (itemId) => {
    return wishListItems[itemId] ? true : false;
  };

  // // Remove item from the wishlist
  // const removeFromWishList = (itemId) => {
  //   if (!wishListItems[itemId]) {
  //     toast.warn("Item not found in the wishlist", { autoClose: 3000 });
  //     return;
  //   }
  //   let updatedWishList = { ...wishListItems };
  //   delete updatedWishList[itemId];
  //   setWishListItems(updatedWishList); // Update the state with the new wishlist
  //   toast.info("Item removed from your wishlist", { autoClose: 1000 });
  // };

   // Remove item from the wishlist
   const removeFromWishList = async (itemId) => {
    if (!wishListItems[itemId]) {
      toast.warn("Item not found in the wishlist", { autoClose: 3000 });
      return;
    }

    try {
      let updatedWishList = { ...wishListItems };
      delete updatedWishList[itemId];
      setWishListItems(updatedWishList);

      // Send API request to remove from wishlist on the backend
      if (token) {
        await axios.post(
          backendUrl + "/api/wishlist/remove",
          { itemId },
          { headers: { token } }
        );
      }
      toast.info("Item removed from your wishlist", { autoClose: 1000 });
    } catch (error) {
      toast.error("Failed to remove from Wishlist. Please try again.", {
        autoClose: 3000,
      });
    }
  };


  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  // Getting user Cart
  const getUserCart = async (token)=> {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);      
    }
  }

  // Getting user WishList
  const getUserWishList = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/wishlist/get', {}, {headers: {token}})
      if (response.data.success) {
        setWishListItems(response.data.wishListData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'));
      getUserWishList(localStorage.getItem('token'));
    }
    getProductData();
  }, [token]);

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
    token,
    setToken,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
