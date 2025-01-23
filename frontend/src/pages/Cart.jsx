import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FaMinus, FaPlus, FaRegWindowClose } from 'react-icons/fa';
import CartTotal from '../components/CartTotal';
import emptyCart from '../assets/empty-cart.mp4';


const Cart = () => {
  const { navigate, products, currency, cartItems, getCartCount, updateQuantity } = useContext(ShopContext);

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

  return (
    <section className='mt-16'>
      <div className=" ">
        <div className="max-padd-container bg-white py-10">
          

          {/* Empty Cart Message */}
          {getCartCount() === 0 ? (
            <div className="flex flex-col items-center justify-center py-5 bg-white">
                <video
                  src={emptyCart}
                  className=" w-40 h-40 object-cover "
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                ></video>
                <h4 className="text-2xl font-semibold text-gray-600">Your Cart is Empty</h4>
                <p className="text-gray-500 mt-2">
                  Looks like you haven't added anything to your cart yet.
                </p>
              <button
                onClick={() => navigate('/collection')}
                className="btn-secondary mt-4 hover:bg-slate-800 duration-300"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
                <div className="flex items-center">
                  <Title 
                  title1="My "
                  title2="Cart"
                  titleStyles="h3"
                  />
                  <h5 className=" relative bottom-2 pl-3 text-gray-500">
                  ({getCartCount()} Items)
                  </h5>
                </div>
              <div className='sm:flex-wrap'>
                {/* Cart Items */}
                <div className="mt-1 w-full  ">
                  {cartData.map((item, i) => {
                    const productData = products.find((product) => product._id === item._id);
                    const key = `${item._id}-${item.color}`;
                    if (!productData) return null; // Handle missing product data

                    return (
                      <div key={i} className="bg-primary p-2 mb-3 rounded-lg">
                        <div className="flex items-center gap-x-3">
                          {/* Product Image */}
                          <div className="flex items-start gap-6">
                            <img
                              src={productData.image[0]}
                              alt="productImg"
                              className="w-28 sm:w-18 rounded"
                            />
                          </div>
                          {/* Product Details */}
                          <div className="flex flex-col w-full">
                            <div className="flexBetween">
                              <h5 className="h5 !my-0 line-clamp-1">{productData.name}</h5>
                              <FaRegWindowClose
                                onClick={() => updateQuantity(item._id, item.color, 0)}
                                className="cursor-pointer text-secondary"
                              />
                            </div>
                            <p className="bold-14 my-0.5">{item.color}</p>
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
                      </div>
                    );
                  })}
                </div>
                {/* Cart Summary */}
                <div className="flex my-10">
                  <div className="bg-primary p-5 rounded-2xl w-full sm:w-[450px]">
                    <CartTotal className=""/>
                    <button
                      onClick={() => navigate('/place-order')}
                      className="btn-secondary hover:bg-slate-700  mt-5"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
