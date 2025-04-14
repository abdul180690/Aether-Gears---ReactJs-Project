import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import NewArrivals from '../components/NewArrivals';
import PopularProducts from '../components/PopularProducts';
import Banner from '../components/Banner';
import About from '../components/About';
import Blog from '../components/Blog';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-section"); // Select all sections with class 'scroll-section'
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom >= 0) {
          section.classList.add("in-view"); // Add 'in-view' when the section is in view
        } else {
          section.classList.remove("in-view"); // Remove 'in-view' when the section is out of view
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger scroll check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
        <Hero />
        <Features />
      <div className="scroll-section">
        <NewArrivals />
      </div>
      <div className="scroll-section">
        <PopularProducts />
      </div>
      <div className="scroll-section">
        <Banner />
      </div>
      <div className="scroll-section">
        <About />
      </div>
      <div className="scroll-section">
        <Blog />
      </div>
      <NewsLetter />
    </>
  );
};

export default Home;
