import React, { useState }from 'react'
import { Link } from 'react-router-dom'


const Item = ({ product }) => {
    const [hovered, setHovered] = useState(false);
    const defaultImage = "https://via.placeholder.com/150"; 
  
    return (
      <div className=" bg-primary overflow-hidden border border-slate-300 p-2 rounded-xl hover:shadow-lg duration-300">
        <Link
          to={`/product/${product?._id || "#"}`}
          aria-label={`View details of ${product?.name}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flexCenter p-2 bg-[#f5f5f5] overflow-hidden relative rounded-xl hover:scale-105 duration-300"
        >
          <img
            src={
              product?.image?.length > 1 && hovered
                ? product.image[1]
                : product?.image?.[0] || defaultImage
            }
            alt={product?.name || "Product Image"}
            className="transition-all duration-300"
          />
        </Link>
        <div className="p-3">
          <h4 className="bold-15 line-clamp-1 !py-0">
            {product?.name || "Unnamed Product"}
          </h4>
          <div className="flexBetween pt-1">
            <p className="h5 me-2">{product?.category || "Uncategorized"}</p>
            <h5 className="h5">₹{product?.price || "N/A"}</h5>
          </div>
          <p className="line-clamp-2 py-1">
            {product?.description || "No description available."}
          </p>
        </div>
      </div>
    );
  };
  

export default Item