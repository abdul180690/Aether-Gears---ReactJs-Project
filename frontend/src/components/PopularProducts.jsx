import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Title from "./Title";
import Item from "./Item";
import { ShopContext } from "../context/ShopContext";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const { products } = useContext(ShopContext);

  // Fetch popular products
  useEffect(() => {
    if (products && products.length > 0) {
      const data = products.filter((item) => item.popular);
      setPopularProducts(data.slice(0, 10));
    }
  }, [products]);

  return (
    <section className="max-padd-container py-10">
      <Title
        title1={"Popular "}
        title2={"Products"}
        titleStyles={"pb-14 text-slate-900"}
        paraStyles={"!block"}
      />
      {/* Swiper for product slides */}
      <Swiper
        autoplay={{
          delay: 3000,
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay]}
        className="h-[390px] "
      >
      {popularProducts.map((product) => (
        <SwiperSlide key={product._id} >
          <Item product={product} />
        </SwiperSlide>
      ))}
      </Swiper>
    </section>
  );
};

export default PopularProducts;
