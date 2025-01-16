import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; 
import { ShopContext } from '../context/ShopContext'; 
import Item from './Item';



const NewArrivals = () => {
  const {products} = useContext(ShopContext)
  const [PopularProducts, setPopularProducts] = useState([])

  useEffect(()=> {
  const data = products.slice(0, 7);
  setPopularProducts(data)
  }, [products])

  return (
    <section className='max-padd-container pt-16'>
      <Title 
        title1={'New'} 
        title2={' Arrivals'} 
        titleStyles={'pb-10'} 
        paraStyles={'!block'} 
      />
      
      <Swiper
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        300:{
          slidesPerView: 2,
          spaceBetween:30,
        },
        666:{
          slidesPerView: 3,
          spaceBetween:30,
        },
        900:{
          slidesPerView: 4,
          spaceBetween:30,
        },
        1300:{
          slidesPerView: 5,
          spaceBetween:30,
        },
      }}
        modules={[Autoplay]}
        className="h-[399px]"
      >
        {PopularProducts.map((product)=>(
        <SwiperSlide key={product._id}>
          <Item product={product}/>
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default NewArrivals