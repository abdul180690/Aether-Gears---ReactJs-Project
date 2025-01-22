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
// import LoadingPage from '../components/LoadingPage';
import { ClimbingBoxLoader } from 'react-spinners';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Initial state is loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Update state after 2 seconds
    }, 1500);

    return () => {
      clearTimeout(timer); // Cleanup timer when component unmounts
    };
  }, []);

  // Conditional rendering
  if (isLoading) {
    return (<>
    <div className='flexCenter h-screen w-full bg-gray-800'>
          <ClimbingBoxLoader color="#f79825" loading={isLoading} size={30} />
        </div>
    </>
    )
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
