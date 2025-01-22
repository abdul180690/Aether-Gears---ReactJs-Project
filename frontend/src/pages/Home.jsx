// import React from 'react'
// import Hero from '../components/Hero'
// import Features from '../components/Features'
// import NewArrivals from '../components/NewArrivals'
// import PopularProducts from '../components/PopularProducts'
// import Banner from '../components/Banner'
// import About from '../components/About'
// import Blog from '../components/Blog'
// import NewsLetter from '../components/NewsLetter'


// const Home = () => {
//   return (
//     <>
//     <Hero />
//     <Features />
//     <NewArrivals />
//     <PopularProducts />
//     <Banner />
//     <About />
//     <Blog />
//     <NewsLetter />
//     </>
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import NewArrivals from '../components/NewArrivals';
import PopularProducts from '../components/PopularProducts';
import Banner from '../components/Banner';
import About from '../components/About';
import Blog from '../components/Blog';
import NewsLetter from '../components/NewsLetter';
import LoadingPage from '../components/LoadingPage';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Initial state is loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Update state after 2 seconds
    }, 2000);

    return () => {
      clearTimeout(timer); // Cleanup timer when component unmounts
    };
  }, []);

  // Conditional rendering
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Hero />
      <Features />
      <NewArrivals />
      <PopularProducts />
      <Banner />
      <About />
      <Blog />
      <NewsLetter />
    </>
  );
};

export default Home;
