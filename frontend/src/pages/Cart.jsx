import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FaMinus, FaPlus, FaRegWindowClose, FaCheck } from 'react-icons/fa';
import { MdShoppingCartCheckout } from "react-icons/md";
import emptyCart from '../assets/empty-cart.mp4';
import { motion } from 'framer-motion';
import PairWithYourCart from '../components/PairWithYourCart';
import Header from '../components/Header';

const Cart = () => {
  const { navigate, products, currency, cartItems, getCartCount, updateQuantity, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState([]);

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
  };

  const decrement = (id, color) => {
    const key = `${id}-${color}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, [key]: newValue }));
      updateQuantity(id, color, newValue);
    }
  };

  const handleNavigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const firstProduct = cartData[0] ? products.find(product => product._id === cartData[0]._id) : null;

  return (
    <>
      <Header />
      <section className="bg-white">
        <div className="max-padd-container py-10">
          {/* Empty Cart Message */}
          {getCartCount() === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-5 bg-white h-screen"
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
              <div className="flex items-center">
                <Title title1="Shopping " title2="Cart" titleStyles="h3" />
                <h5 className="relative bottom-2 pl-3 text-gray-500">({getCartCount()} Items)</h5>
              </div>
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
                        className="border-e-[30px] border-s-[30px] border-t border-b border-slate-600 hover:shadow-lg p-4 mb-5 rounded-md"
                        initial={{ opacity: 0, x: 500 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.750,
                        }}
                      >
                        <div className="flex items-center pl-5 gap-x-5">
                          {/* Product Image */}
                          <img
                            src={productData.image[0]}
                            alt="productImg"
                            className="w-24 sm:w-20 rounded cursor-pointer hover:scale-125 duration-300 xs:hover:scale-110"
                            onClick={() => handleNavigateToProduct(productData._id)}
                          />
                          {/* Product Details */}
                          <div className="flex flex-col w-full">
                            <div className="flexBetween">
                              <h5 className="h5 !my-0 line-clamp-1">{productData.name}</h5>
                              <FaRegWindowClose
                                onClick={() => updateQuantity(item._id, item.color, 0)}
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
                <div className=''>
                  <motion.div
                    className=" p-6 rounded-2xl w-full lg:w-[450px] bg-amber-200 shadow-lg"
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  >
                    {/* Progress Bar for Free Shipping */}
                    {
                      getCartAmount() < 1000 ? (
                        <div className="mb-4">
                          <p>Free Shipping on or above {currency}1000</p>
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
                            <span className='bold-15'> {currency}{1000 - getCartAmount()} </span> more to get free shipping
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
                      <h3 className='bold-24'>{currency}{getCartAmount()}</h3>
                    </div>
                    <button
                      onClick={() => navigate('/place-order')}
                      className="btn-secondary flexCenter hover:bg-slate-700 duration-300 mt-5 w-full"
                    >
                      Proceed to Checkout <MdShoppingCartCheckout className='ml-3 text-[20px]'/>
                    </button>
                  </motion.div>
                </div>
              </div>
              {/* Related Products Section */}
              {firstProduct && (
                <PairWithYourCart category={firstProduct.category} products={products} onNavigate={handleNavigateToProduct} />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
