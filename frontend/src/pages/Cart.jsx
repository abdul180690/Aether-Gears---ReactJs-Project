import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FaMinus, FaPlus, FaCheck } from 'react-icons/fa';
import { ImBin } from "react-icons/im";
import { MdShoppingCartCheckout } from "react-icons/md";
import emptyCart from '../assets/empty-cart.mp4';
import { motion } from 'framer-motion';
import PairWithYourCart from '../components/PairWithYourCart';
import { toast } from 'react-toastify';

const Cart = () => {
  const { navigate, products, currency, cartItems, getCartCount, updateQuantity, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [itemToRemove, setItemToRemove] = useState(null); 

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const initialQuantities = {};
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              color: item,
              quantity: cartItems[items][item],
            });
            initialQuantities[`${items}-${item}`] = cartItems[items][item];
          }
        }
      }
      setCartData(tempData);
      setQuantities(initialQuantities);
    }
  }, [cartItems, products]);

  const increment = (id, color) => {
    const key = `${id}-${color}`;
    const newValue = quantities[key] + 1;
    setQuantities((prev) => ({ ...prev, [key]: newValue }));
    updateQuantity(id, color, newValue);
    toast.info("Quantity updated successfully", { autoClose: 1000 });
  };

  const decrement = (id, color) => {
    const key = `${id}-${color}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: newValue }));
      updateQuantity(id, color, newValue);
      toast.info("Quantity updated successfully", { autoClose: 1000 });
    }
    if(quantities[key] === 1) {
      toast.info("Minimum quantity selected", { autoClose: 3000 });
    }
  };

  const handleNavigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const firstProduct = cartData[0] ? products.find(product => product._id === cartData[0]._id) : null;

  return (
    <>
      <section className="bg-white">
        <div className="max-padd-container">
          {/* Empty Cart Message */}
          {getCartCount() === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-screen"
            >
              <video
                src={emptyCart}
                className="w-40 h-40 object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              ></video>
              <h4 className="text-2xl font-semibold text-gray-600">Your Cart is Empty</h4>
              <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
              <button
                onClick={() => navigate('/collection')}
                className="btn-secondary mt-4 hover:bg-slate-700 duration-300"
              >
                Shop Now
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, x: -100, scale: 0}}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.30,
                }}
                className="flex items-center"
              >
                <Title title1="Shopping " title2="Cart" titleStyles="h3 mt-10" />
                <h5 className="relative -bottom-3 pl-3 text-gray-500">({getCartCount()} Items)</h5>
              </motion.div>
              <div className="flex flex-wrap lg:flex-nowrap gap-8 mt-5">
                {/* Cart Items on Left */}
                <div className="flex-1">
                  {cartData.map((item, i) => {
                    const productData = products.find((product) => product._id === item._id);
                    const key = `${item._id}-${item.color}`;
                    if (!productData) return null;

                    return (
                      <motion.div
                        key={i}
                        className="border border-slate-300 shadow-md px-4 py-2 mb-5 rounded-lg bg-white "
                        initial={{  y: 500, scale:0 }}
                        animate={{  y: 0, scale:1 }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.50,
                        }}
                      >
                        <div className="flex items-center  gap-x-5 overflow-hidden">
                          {/* Product Image */}
                          <img
                            src={productData.image[0]}
                            alt="productImg"
                            className="w-20 sm:w-20 rounded cursor-pointer hover:scale-125 hover:rotate-12 duration-300 "
                            onClick={() => handleNavigateToProduct(productData._id)}
                          />
                          {/* Product Details */}
                          <div className="flex flex-col w-full">
                            <div className="flexBetween">
                              <h5 className="h5 !my-0 line-clamp-1">{productData.name}</h5>
                              <ImBin
                                onClick={() => {
                                  setItemToRemove(item); 
                                  setShowModal(true);
                                }}
                                className="cursor-pointer text-secondary"
                              />
                            </div>
                            <p className="bold-14 my-1">{item.color}</p>
                            <div className="flexBetween">
                              {/* Quantity Control */}
                              <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
                                <button
                                  onClick={() => decrement(item._id, item.color)}
                                  className="p-1.5 bg-white text-secondary rounded-full shadow-md"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <p className="px-2">{quantities[key]}</p>
                                <button
                                  onClick={() => increment(item._id, item.color)}
                                  className="p-1.5 bg-white text-secondary rounded-full shadow-md"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>
                              {/* Product Price */}
                              <h4 className="h4">
                                {currency} {(quantities[key] * productData.price).toFixed(2)}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {/* Subtotal on Right */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }} 
                    className='bg-amber-300/80 border border-slate-700/20 shadow-lg p-5 rounded-lg xs:w-full lg:w-[450px]'>
                  <h1 className='text-center h3 underline'>Subtotal</h1>
                  <div>
                    {/* Progress Bar for Free Shipping */}
                    {
                      getCartAmount() < 1000 ? (
                        <div className="mb-5">
                          <h3 className="text-gray-900 text-sm mb-1.5">Add more for free shipping</h3>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full flex bg-green-500 rounded-full"
                              style={{
                                width: `${Math.min((getCartAmount() / 1000) * 100, 100)}%`, // Calculate percentage based on cartAmount
                              }}
                            >
                            </div>
                          </div>
                          <p className="text-sm text-gray-900 mt-1.5">
                            <span className='bold-15'> {currency}{1000 - getCartAmount()} </span> more to get FREE SHIPPING
                          </p>
                        </div>
                      ) 
                      : (
                        <div className="mb-4 flexCenter">
                          <FaCheck className='me-3 bg-green-600 text-white text-3xl p-1 rounded-full'/> 
                          <h3 className=" bold-18 text-green-600">Your order is eligible for FREE Delivery.</h3>
                        </div>
                      )
                      
                    }

                    <div className='flex justify-between items-center'>
                      <h1>Subtotal <span>({getCartCount()} Items)</span></h1>
                      <h3 className='bold-24'>{currency} {getCartAmount()}/-</h3>
                    </div>
                    <button
                      onClick={() => navigate('/place-order')}
                      className="flexCenter w-1/2 mx-auto mt-6 text-nowrap relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-gray-800 rounded-md py-2.5 px-1 text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:rounded-md before:border-2 before:border-gray-800 before:-z-100 before:transition-all"
                    >
                      Proceed to Checkout <MdShoppingCartCheckout className='ml-3 '/>
                    </button>
                  </div>
                </motion.div>
              </div>
              {/* Pair with you cart Section */}
              {firstProduct && (
                <PairWithYourCart category={firstProduct.category} products={products} onNavigate={handleNavigateToProduct} />
              )}
            </>
          )}
        </div>
      </section>
      {/* Modal Confirmation Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:2/4 xs:w-3/4 ">
            <h3 className="text-lg font-semibold">Are you sure you want to remove this item from your cart?</h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  updateQuantity(itemToRemove._id, itemToRemove.color, 0);
                  toast.info("Item removed from your cart", { autoClose: 1000 });
                  setShowModal(false); // Close the modal
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
