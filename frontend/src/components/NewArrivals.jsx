import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ShopContext } from "../context/ShopContext";
import Item from "./Item";

const NewArrivals = () => {
  const { products } = useContext(ShopContext);
  const [PopularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const data = products.slice(0, 8); // Fetching only the first 7 products
      setPopularProducts(data);
    }
  }, [products]);

  return (
    <section className="max-padd-container pt-16 ">
      <Title
        title1="New "
        title2="Arrivals"
        titleStyles="pb-14 text-slate-900"
        paraStyles="!block"
      />

      {/* Swiper for product slides */}
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay]}
        className="max-h-full"
      >
        {PopularProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;