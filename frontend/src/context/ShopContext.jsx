import React, { createContext, useEffect, useState } from 'react'
import { products } from '../assets/data';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const currency = "₹"
  const delivery_charges = 50
  const [cartItems, setCartItems] = useState({})

  

  const addToCart = async (itemId, color) => {
    if(!color) {
      toast.error("Please select the color first");
      return;
    }

    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      if(cartData[itemId][color]){
        cartData[itemId][color] += 1;
      }
      else{
        cartData[itemId][color] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][color] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] > 0){
            totalCount += cartItems[items][item]
          }
        } catch (error) {

        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, color, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][color] = quantity
    setCartItems(cartData)
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product) => product._id === items)
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] > 0){
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch(error) {}
      }
    }
    return totalAmount;
  }

  useEffect(() =>{}, [cartItems]);

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
  };
  
  return (
      <ShopContext.Provider value={value}>
          {props.children}
      </ShopContext.Provider>
    )
}

export default ShopContextProvider