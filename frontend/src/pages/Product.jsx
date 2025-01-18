// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext'
// import { FaCheck, FaHeart, FaStar, FaStarHalfStroke, FaTruckFast } from 'react-icons/fa6'
// import { TbShoppingBagPlus } from 'react-icons/tb'

// const Product = () => {
// const {productId} = useParams()
// const {products, currency} = useContext(ShopContext)
// const [product, setProduct] = useState(null)
// const [image, setImage] = useState("")
// const [color, setColor] = useState("")

// const fetchProductData = async () => {
//     const selectedProduct = products.find((item)=> item._id === productId)
//     if(selectedProduct){
//         setProduct(selectedProduct)
//         setImage(selectedProduct.image[0])
//         console.log(selectedProduct)
//     }
// }

// useEffect (() => {
//     fetchProductData()
// }, [productId, products])

// if(!product){
//     return <div>...Loading</div>
// }

//   return (
//     <div>
//         <div className='max-padd-container'>
//             <div className='flex gap-10 flex-col xl:flex-row rounded-2xl p-3 mb-6'>
//                 <div className='flex flex-1 gap-x-2 max-w[477px]'> 
//                     <div className='flex-1 flexCenter flex-col gap-[5px] flex-wrap'>
//                         {product.image.map((item, i)=> (
//                             <img  
//                                 key={i}
//                                 src={item}
//                                 alt="prdctImg"
//                                 onClick={() => setImage(item)} // Update the selected image
//                                 className={`object-cover aspect-square rounded-lg cursor-pointer ${
//                                 image === item ? "border-2 border-primary" : ""
//                                 }`}
//                             />
//                         ))}
//                     </div>
//                     <div className='flex-[4] flex items-center'>
//                         <img src={image} alt="prdctImg" className='rounded-xl'/>
//                     </div>
//                 </div>
//                 <div className='flex-[1.5] rounded-2xl px-5 py-3 bg-primary'>
//                     <h3 className='h3 leading-none'>{product.name}</h3>
//                     <div className='flex items-baseline gp-x-5'>
//                         <div className='flex items-center gap-x-2 text-secondary'>
//                             <div className='flex gap-x-2 text-secondary'>
//                                 <FaStar />
//                                 <FaStar />
//                                 <FaStar />
//                                 <FaStar />
//                                 <FaStarHalfStroke />
//                             </div>
//                             <span className='medium-14'>(123)</span>
//                         </div>
//                     </div>
//                     <h4 className='h4 my-2'>
//                         {currency}{product.price}.00
//                     </h4>
//                     <p className='max-w-[555px]'>{product.description}</p>
//                     <div>
//                         <div className='flex my-5'>
//                             {[...product.colors].map((item, i)=> (
//                                 <button
//                                 key={i}
//                                 onClick={() => setColor(item)}
//                                 className={`h-9 w-9 rounded-full flexCenter cursor-pointer ${
//                                   color === item ? "ring-2 ring-offset-2 ring-primary" : ""
//                                 }`}
//                                 style={{ backgroundColor: item }}
//                               >
//                                 {item === color && (
//                                   <FaCheck className={item === "White" ? "text-black" : "text-white"} />
//                                 )}
//                               </button>
//                             ))}
//                         </div>
//                     </div>
//                     <div className='my-5'>
//                         <button onClick={()=> {}} className='btn-secondary !rounded-lg sm:w-1/2 flexCenter gap-x-2 capitalize'>
//                             Add to Cart <TbShoppingBagPlus />
//                         </button>
//                         <button className="btn-white !rounded-lg !py-3.5"><FaHeart /></button>
//                     </div>
//                     <div>
//                         <FaTruckFast className='text-lg'/>
//                         <span className='medium-14'>Free Delivery on orders over ₹500</span>
//                     </div>
//                     <hr className='my-3 w-2/3'/>
//                     <div>
//                         <p>Authencity You Can Trust</p>
//                         <p>Enjoy Cash On Delivery for your Convenience</p>
//                         <p>Easy Returns and Exchange Within 7 Days</p>
//                     </div>
//                 </div>
//             </div>
//         </div> 
//     </div>
//   )
// }

// export default Product

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaCheck, FaHeart, FaStar, FaStarHalfStroke, FaTruckFast } from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [hovered, setHovered] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const fetchProductData = () => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image,
      color,
      quantity: 1,
    };
    console.log("Added to Cart:", cartItem);
    // Add the cartItem to your cart state or context here
  };

  return (
    <div>
      <div className="max-padd-container">
        <div className="flex gap-10 flex-col xl:flex-row rounded-2xl p-3 mb-6">
          {/* Image Section */}
          <div className="flex flex-1 gap-x-2 max-w-[477px]">
            <div className="flex-1 flexCenter flex-col gap-[7px] flex-wrap">
              {product.image.map((item, i) => (
                <img
                  key={i}
                  src={item}
                  alt={`Thumbnail of ${product.name}`}
                  onClick={() => setImage(item)}
                  className={`object-cover aspect-square rounded-lg cursor-pointer ${
                    image === item ? "border-2 border-primary" : ""
                  }`}
                />
              ))}
            </div>
            <div
              className="flex-[4] flex items-center relative"
            >
              <img
                src={image}
                alt={`Main view of ${product.name}`}
                className="rounded-xl w-full object-cover"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={handleMouseMove}
              />
              {hovered && (
                <>
                  {/* Large Image View */}
                  <div className="absolute top-0 left-[110%] w-[500px] h-[450px] border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={image}
                      alt="Zoomed Product"
                      className="w-full h-full object-cover"
                      style={{
                        transform: `translate(-${zoomPosition.x}%, -${zoomPosition.y}%) scale(2)`,
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                  
                  {/* Magnifying Box */}
                  <div
                    className="absolute pointer-events-none border-2 border-gray-400 rounded-md"
                    style={{
                      top: `${zoomPosition.y}%`,
                      left: `${zoomPosition.x}%`,
                      width: "75px",
                      height: "75px",
                      background: `url(${image})`,
                    //   backgroundSize: "100%",
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Product Details Section */}
          <div className="flex-[1.5] rounded-2xl px-5 py-3 bg-primary">
            <h3 className="h3 leading-none">{product.name}</h3>
            <div className="flex items-baseline gap-x-5">
              <div className="flex items-center gap-x-2 text-secondary">
                <div className="flex gap-x-2 text-secondary">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>
                <span className="medium-14">(123)</span>
              </div>
            </div>
            <h4 className="h4 my-2">
              {currency}
              {product.price}.00
            </h4>
            <p className="max-w-[555px]">{product.description}</p>

            {/* Color Selection */}
            <div className="mt-4">
              <h4 className="medium-14 mb-2">Select Color:</h4>
              <div className="flex gap-x-2">
                {product.colors.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(item)}
                    className={`h-9 w-9 rounded-full flexCenter cursor-pointer ${
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

            {/* Buttons */}
            <div className="flex gap-x-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="btn-secondary !rounded-lg sm:w-1/2 flexCenter gap-x-2 capitalize"
              >
                Add to Cart <TbShoppingBagPlus />
              </button>
              <button className="btn-white !rounded-lg !py-3.5">
                <FaHeart />
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6">
              <FaTruckFast className="text-lg" />
              <span className="medium-14">Free Delivery on orders over ₹500</span>
            </div>
            <hr className="my-3 w-2/3" />
            <div>
              <p>Authenticity You Can Trust</p>
              <p>Enjoy Cash On Delivery for your Convenience</p>
              <p>Easy Returns and Exchange Within 7 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
