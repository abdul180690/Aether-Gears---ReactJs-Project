import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { offersData } from '../assets/data'; 
import Title from '../components/Title'
import Header from '../components/Header';

const defaultImage = 'https://via.placeholder.com/150';

const ProductCard = ({ product }) => {
  const { addToWishList, removeFromWishList, addToCart, isInWishlist } = useContext(ShopContext);

  const [hovered, setHovered] = useState(false); // Hover state for each product
  const [isHighlighted, setIsHighlighted] = useState(isInWishlist(product._id)); // Check if in wishlist
  const [color, setColor] = useState('');
  
  useEffect(() => {
    setIsHighlighted(isInWishlist(product._id));
  }, [product._id, isInWishlist]);
  
  const handleWishlistClick = () => {
    if (isHighlighted) {
      removeFromWishList(product._id);
      setIsHighlighted(false);
    } else {
      addToWishList(product._id);
      setIsHighlighted(true);
    }
  };

  return (
    <div
      className="relative bg-white overflow-hidden border border-slate-300 p-2 rounded-xl hover:shadow-lg duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="flexCenter relative">
        <Link
          to={`/product/${product?._id || '#'}`}
          aria-label={`View details of ${product?.name}`}
          className="flexCenter p-2 bg-[#f5f5f5] overflow-hidden relative rounded-xl hover:scale-105 duration-300"
        >
          <img
            src={product?.image?.length > 1 && hovered ? product.image[1] : product?.image?.[0] || defaultImage}
            alt={product?.name || 'Product Image'}
            className="transition-all duration-300"
          />
        </Link>
        <div className="absolute top-2 right-2 rounded-full">
          <TiHeartFullOutline
            onClick={handleWishlistClick}
            className={`cursor-pointer text-amber-400 scale-75 rounded-full bold-28 duration-300 hover:scale-90 transition-transform ${
              isHighlighted ? 'text-red-500 animate-pulse' : ''
            }`}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h4 className="bold-15 line-clamp-1 !py-0">{product?.name || 'Unnamed Product'}</h4>
        <div className="flexBetween pt-1">
          <p className="h5 me-2">{product?.category || 'Uncategorized'}</p>
          <h5 className="h5">₹{product?.price || 'N/A'}</h5>
        </div>
        <p className="line-clamp-2 py-1">{product?.description || 'No description available.'}</p>
      </div>

      {/* Hover Effect: Select Color & Add to cart */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-slate-600 bg-opacity-50 backdrop-blur-sm p-4 rounded-t-xl transform ${
          hovered ? 'translate-y-3 opacity-100 duration-300' : 'translate-y-52 opacity-0 duration-1000'
        } transition-all duration-400 ease-in-out`}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Select Color Buttons */}
          <div className="mt-4 xs:mt-1">
            <h4 className="medium-14 mb-2 text-white text-center">Select Color</h4>
            <div className="flex gap-x-2">
              {product.colors.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setColor(item)}
                  className={`h-9 w-9 rounded-full flexCenter cursor-pointer border border-gray-400 hover:ring-2 ring-slate-400 duration-300 ${
                    color === item ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  style={{ backgroundColor: item }}
                >
                  {color === item && (
                    <FaCheck className={item === 'White' ? 'text-black' : 'text-white'} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart Button */}
          <div className="flex gap-x-4 mt-6 xs:mt-2">
            <button
              onClick={() => {
                if (color) {
                  addToCart(product._id, color); // Add product to cart logic here
                } else {
                  toast.error('Please select a color.', { autoClose: 1000 });
                }
              }}
              className="btn-secondary flexCenter w-full hover:bg-slate-700 duration-300 text-nowrap"
            >
              Add To Cart <TbShoppingBagPlus className="ml-2 text-xl animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OfferSection = ({ title, description, products }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-lg text-gray-600 mb-6">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

const Offers = () => {
  return (
    <>
        <Header />
        <div className="max-padd-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Title 
            title1={'Our '} 
            title2={'Latest Offers'} 
            titleStyles={'h1 pb-2 text-slate-900'} 
        />
        {offersData.map((offer) => (
            <OfferSection
              key={offer.id}
              title={offer.title}
              description={offer.description}
              products={offer.products}
              className={'shadow-lg'}
            />
        ))}
        </div>
    </>
  );
};

export default Offers;
