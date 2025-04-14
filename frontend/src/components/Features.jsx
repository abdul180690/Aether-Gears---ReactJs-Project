import React, { useEffect } from 'react'
import { PiCurrencyInrBold } from "react-icons/pi";
import { TbTruckDelivery } from 'react-icons/tb'
import { BiSupport } from 'react-icons/bi'

const Features = () => {
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
    <section className='max-padd-container mt-16'>
        <div className=' flexBetween flex-wrap gap-1 rounded-2xl '>
            <div className='flexCenter gap-x-3 bg-[#FFA725] p-3 rounded-xl shadow-md mb-4 scroll-section'>
                <PiCurrencyInrBold className='text-4xl p-2 bg-white rounded-full'/>
                <div>
                    <h4 className='medium-15 text-white'>MONEY-BACK GUARANTEE</h4>
                    <p className='text-slate-800'>100% refund guaranteed if you're not satisfied.</p>
                </div>
            </div>
            <div className='flexCenter gap-x-3 bg-[#FFA725] p-3 rounded-xl shadow-md mb-4 scroll-section'>
                <TbTruckDelivery className='text-4xl p-2 bg-white rounded-full'/>
                <div>
                    <h4 className='medium-15 text-white'>FREE SHIPPING & RETURNS</h4>
                    <p className='text-slate-800'>Free shipping available on all orders above ₹1000.</p>
                </div>
            </div>
            <div className='flexCenter gap-x-3 bg-[#FFA725] p-3 rounded-xl shadow-md mb-4 scroll-section'>
                <BiSupport className='text-4xl p-2 bg-white rounded-full'/>
                <div>
                    <h4 className='medium-15 text-white'>24/7 ONLINE SUPPORT</h4>
                    <p className='text-slate-800'>Our team is here to assist you round the clock.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features