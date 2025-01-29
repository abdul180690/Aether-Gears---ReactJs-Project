import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaCheck, FaHeart, FaStar, FaStarHalfStroke, FaTruckFast } from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import RelatedProducts from "../components/RelatedProducts";
import cod from '../assets/cod2.png'
import { CiZoomIn } from "react-icons/ci";
import Header from "../components/Header";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, addToWishList } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [hovered, setHovered] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const fetchProductData = async () => {
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

  return (
    <>
      <Header />
      <div className="max-padd-container bg-white">
        <div className=" ">
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
                    className={`object-cover aspect-square rounded-lg cursor-pointer border border-slate-400/50 ${
                      image === item ? "border border-slate-400/50" : ""
                    }`}
                  />
                ))}
              <p className="text-center mt-1">Hover on image to zoom </p>
              </div>
              <div
                className="flex-[4] flex items-center relative"
              >
                <img
                  src={image}
                  alt={`Main view of ${product.name}`}
                  className="rounded-xl w-full object-cover border border-slate-400/50 cursor-zoom-in"
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
                        width: "175px",
                        height: "175px",
                        background: `url(${image})`,
                        backgroundSize: "350%", 
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
            <div className="flex-[1.5] rounded-2xl px-5 py-3 bg-primary border border-slate-400/50">
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
                {product.price}/-
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
                      className={`h-9 w-9 rounded-full flexCenter cursor-pointer border border-gray-400 hover:ring-2 ring-slate-400 duration-300 ${
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
                  onClick={() => addToCart(product._id, color)}
                  className="btn-secondary !rounded-2xl sm:w-1/2 flexCenter gap-x-2 capitalize hover:bg-slate-700 duration-300"
                >
                  Add to Cart <TbShoppingBagPlus className="text-lg" />
                </button>
                <button onClick={() => addToWishList(product._id)}
                  className="btn-secondary !rounded-2xl  flexCenter gap-x-2 capitalize hover:bg-slate-700 duration-300"
                >
                  <FaHeart className="text-amber-400 hover:scale-150 duration-300"/>
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 flex">
                <FaTruckFast className="text-lg me-3" />
                <span className="medium-14">Free Delivery on orders over ₹1000</span>
              </div>
              <img src={cod} alt="" className="w-12"/>
              <hr className="my-3 w-2/3" />
              <div className="mt-2 flex flex-col gap-1 text-gray-30 transitions">
                <p>Authenticity You Can Trust</p>
                <p>Enjoy Cash On Delivery for your Convenience</p>
                <p>Easy Returns and Exchange Within 7 Days</p>
              </div>
            </div>
          </div>
          <ProductDescription />
          <ProductFeatures />
          <RelatedProducts category={product.category} />
        </div>
      </div>
    </>
  );
};

export default Product;
