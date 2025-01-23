// import React, { createContext, useEffect, useState } from 'react'
// import { products } from '../assets/data';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export const ShopContext = createContext()

// const ShopContextProvider = (props) => {
//   const [search, setSearch] = useState("")
//   const navigate = useNavigate()
//   const currency = "₹"
//   const delivery_charges = 50
//   const [cartItems, setCartItems] = useState({})
//   const [wishListItems, setwishListItems] = useState({})

  

//   const addToCart = async (itemId, color) => {
//     if(!color) {
//       toast.error("Please select the color first", {autoClose: 3000});
//       return;
//     }

//     try {
//       toast.success("Item added to cart successfully", { autoClose: 1000 });
//     } catch (error) {
//       toast.error("Failed to add item to cart. Please try again.", { autoClose: 3000 });
//     }

//     let cartData = structuredClone(cartItems);
//     if(cartData[itemId]){
//       if(cartData[itemId][color]){
//         cartData[itemId][color] += 1;
//       }
//       else{
//         cartData[itemId][color] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][color] = 1;
//     }
//     setCartItems(cartData);
//   };

//   const addToWishList = async (itemId, color) => {
//     if(!color) {
//       toast.error("Please select the color first", {autoClose: 3000});
//       return;
//     }

//     try {
//       toast.success("Item added to wishlist successfully", { autoClose: 1000 });
//     } catch (error) {
//       toast.error("Failed to add item to wishlist. Please try again.", { autoClose: 3000 });
//     }

//     let wishListData = structuredClone(wishList);
//     if(wishListData[itemId]){
//       if(wishListData[itemId][color]){
//         wishListData[itemId][color] += 1;
//       }
//       else{
//         wishListData[itemId][color] = 1;
//       }
//     } else {
//       wishListData[itemId] = {};
//       wishListData[itemId][color] = 1;
//     }
//     setWishList(wishListData);
//   }

//   const getCartCount = () => {
//     let totalCount = 0
//     for (const items in cartItems){
//       for(const item in cartItems[items]){
//         try {
//           if(cartItems[items][item] > 0){
//             totalCount += cartItems[items][item]
//           }
//         } catch (error) {

//         }
//       }
//     }
//     return totalCount;
//   };

//   const getWishListCount = () => {
//     let totalCount = 0
//     for (const items in wishList){
//       for(const item in wishList[items]){
//         try {
//           if(wishList[items][item] > 0){
//             totalCount += wishList[items][item]
//           }
//         } catch (error) {

//         }
//       }
//     }
//   }

//   const updateQuantity = (itemId, color, quantity) => {
//     let cartData = structuredClone(cartItems)
//     cartData[itemId][color] = quantity
//     setCartItems(cartData)
//     toast.info("Quantity updated successfully", {autoClose: 1000}) 
//   }

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for(const items in cartItems){
//       let itemInfo = products.find((product) => product._id === items)
//       for(const item in cartItems[items]){
//         try {
//           if(cartItems[items][item] > 0){
//             totalAmount += itemInfo.price * cartItems[items][item]
//           }
//         } catch(error) {}
//       }
//     }
//     return totalAmount;
//   }

//   useEffect(() =>{}, [cartItems]);

//   const value = {
//     navigate,
//     products, 
//     search, 
//     setSearch, 
//     currency, 
//     delivery_charges, 
//     cartItems, 
//     setCartItems, 
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount, 

//     addToWishList, 
//     setwishList,
//     getWishListCount,
//   };
  
//   return (
//       <ShopContext.Provider value={value}>
//           {props.children}
//       </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider




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
  const [wishListItems, setWishListItems] = useState({});  // Corrected state name

  // Add item to the cart
  const addToCart = async (itemId, color) => {
    if (!color) {
      toast.error("Please select the color first", { autoClose: 3000 });
      return;
    }

    try {
      toast.success("Item added to cart successfully", { autoClose: 1000 });
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

  // Add item to the wishlist
  const addToWishList = (itemId, color) => {
    if (!color) {
      toast.error("Please select the color first", { autoClose: 3000 });
      return;
    }

    try {
      toast.success("Item added to wishlist successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error("Failed to add item to wishlist. Please try again.", { autoClose: 3000 });
    }

    let wishListData = { ...wishListItems };  // Using the correct state name
    if (wishListData[itemId]) {
      if (wishListData[itemId][color]) {
        wishListData[itemId][color] += 1;
      } else {
        wishListData[itemId][color] = 1;
      }
    } else {
      wishListData[itemId] = { [color]: 1 };
    }
    setWishListItems(wishListData);  // Update wishlist state
  };

  // Get the count of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  // Get the count of items in the wishlist
  const getWishListCount = () => {
    let totalCount = 0;
    for (const items in wishListItems) {
      for (const item in wishListItems[items]) {
        if (wishListItems[items][item] > 0) {
          totalCount += wishListItems[items][item];
        }
      }
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
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  // Remove item from the wishlist
  const removeFromWishList = (itemId) => {
    let updatedWishList = { ...wishListItems };
    delete updatedWishList[itemId];
    setWishListItems(updatedWishList);  // Update the state with the new wishlist
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
    updateQuantity,
    getCartAmount,
    addToWishList,
    wishListItems,
    setWishListItems,
    getWishListCount,
    removeFromWishList,  // Added removeFromWishList
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
