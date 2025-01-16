import React, { useState }from 'react'
import { Link } from 'react-router-dom'

const Item = ({product}) => {
const [hovered, setHovered] = useState(false)
  return (
    <div className='overflow-hidden border border-slate-200 p-1 rounded-xl'>
        <Link to={`/product/${product._id}`} 
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}
        className='flexCenter p-2 bg-[#f5f5f5] overflow-hidden relative rounded-xl hover:scale-95 duration-300'
        >
            <img 
                src={
                    product.image.length > 1 && hovered 
                        ? product.image[1] 
                        : product.image[0]
                    } 
                alt="productImg" 
                className='transition-all duration-300' 
            />
        </Link>
        <div className='p-3'>
            <h4 className='bold-15 line-clamp-1 !py-0'>{product.name}</h4>
            <div className='flexBetween pt-1'>
                <p className='h5 me-2'>{product.category}</p>
                <h5 className='h5 '>₹{product.price}</h5>
            </div>
            <p className='line-clamp-2 py-1'>{product.description}</p>
            {/* <button className='btn p-2 my-2 border rounded-full bg-yellow-100 text-xs '>Add To Cart</button> */}
        </div>
    </div>
  )
}

export default Item