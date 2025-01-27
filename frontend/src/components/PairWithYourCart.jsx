import React, { useContext, useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { TbShoppingBagPlus } from "react-icons/tb";
import { toast } from "react-toastify"; 
import { ShopContext } from "../context/ShopContext";

const PairWithYourCart = ({ products, onNavigate }) => {
  const { cartItems, addToCart } = useContext(ShopContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [color, setColor] = useState("");
  const [relatedItems, setRelatedItems] = useState([]);

  // Helper function to get unique categories from cart items
  const getCartCategories = () => {
    const categories = [];
    Object.keys(cartItems).forEach((itemId) => {
      const product = products.find((product) => product._id === itemId);
      if (product && !categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  };

  // Function to filter products based on categories in the cart
  const getRelatedProducts = () => {
    const categories = getCartCategories();
    let filteredProducts = products.filter(
      (product) => !Object.keys(cartItems).includes(product._id) // Exclude cart items
    );

    if (categories.length === 1) {
      // Show 3 products from the same category as the single cart item
      const categoryProducts = filteredProducts.filter(
        (product) => product.category === categories[0]
      );
      setRelatedItems(categoryProducts.slice(0, 3));
    } else if (categories.length === 2) {
      // Show 2 products from the first category, 1 from the second
      const category1Products = filteredProducts.filter(
        (product) => product.category === categories[0]
      );
      const category2Products = filteredProducts.filter(
        (product) => product.category === categories[1]
      );
      setRelatedItems([
        ...category1Products.slice(0, 2),
        ...category2Products.slice(0, 1),
      ]);
    } else if (categories.length >= 3) {
      // Show 1 product from each of the first 3 unique categories
      const uniqueCategories = categories.slice(0, 3);
      const related = uniqueCategories.map((category) => {
        const categoryProducts = filteredProducts.filter(
          (product) => product.category === category
        );
        return categoryProducts[0]; // Pick the first product from each category
      });
      setRelatedItems(related);
    }
  };

  // UseEffect hook to run the filtering logic when cart items or products change
  useEffect(() => {
    getRelatedProducts();
  }, [cartItems, products]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Pair with your cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedItems.map((product, index) => (
          <motion.div
            key={product._id}
            className="relative border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 cursor-pointer"
              onClick={() => onNavigate(product._id)}
            />
            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">₹ {product.price}/-</span>
            </div>

            {/* Show color selection when hovered */}
            {hoveredIndex === index && (
              <div className="absolute bottom-0 left-0 right-0 bg-slate-600 bg-opacity-50 backdrop-blur-sm py-2 rounded-t-xl transform translate-y-0 opacity-100 transition-all duration-400 ease-in-out">
                <div className="flex flex-col items-center gap-1">
                  {/* Select Color Buttons */}
                  <div className="mt-4 xs:mt-1">
                    <h4 className="medium-14 mb-2 text-white">Select Color:</h4>
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

                  {/* Add to Cart Button */}
                  <div className="flex gap-x-4 mt-6 xs:mt-2">
                    <button
                      onClick={() => {
                        if (color) {
                          addToCart(product._id, color); // This will add the product to the cart with the selected color
                        } else {
                          toast.error("Please select a color.", { autoClose: 1000 });
                        }
                      }}
                      className="btn-secondary flexCenter w-full hover:bg-slate-700 duration-300 text-nowrap"
                    >
                      Add To Cart <TbShoppingBagPlus className="ml-2 text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PairWithYourCart;
