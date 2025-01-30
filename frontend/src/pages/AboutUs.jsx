import React, { useEffect } from "react";
import { MdWorkspacePremium, MdOutlineSupportAgent } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import creative_lead from "../assets/team/1.png";
import manager from "../assets/team/2.png";
import programming_guru from "../assets/team/3.png";
import seo from "../assets/team/4.png";
import programming_guru_2 from "../assets/team/5.png";
import programming_guru_3 from "../assets/team/6.png";
import sony from "../assets/partner_brands/sony.png";
import apple from "../assets/partner_brands/apple.png";
import boat from "../assets/partner_brands/boat.png";
import dell from "../assets/partner_brands/dell.png";
import oppo from "../assets/partner_brands/oppo.png";
import vivo from "../assets/partner_brands/vivo.png";
import logitech from "../assets/partner_brands/logitech.png";
import skullcandy from "../assets/partner_brands/skullcandy.png";
import NewsLetter from "../components/NewsLetter";
import Header from "../components/Header";
import Title from "../components/Title";
import about_hero from '../assets/about-hero.png'


const AboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-section");
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < windowHeight * 0.75 && rect.bottom >= 0) {
          section.classList.add("in-view");
        } else {
          section.classList.remove("in-view");
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
      <Header />
      {/* Section: About Us as Hero Section */}
      <section className="min-h-screen">
      <div className="relative h-[450px] flex items-center justify-center mb-10 overflow-hidden ">
          <img
            src={about_hero}
            alt="Customer Support"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0  rounded-lg "></div>
          <div className="relative text-center text-slate-800">
            <Title 
              title1={"About "}
              title2={"Us"}
              titleStyles={""}
            />
            <h1 className="text-lg lg:text-xl/10 text-center mt-5 mx-60 ">
            At <strong className="">Aether Gears</strong>, we are passionate
            about delivering the best technology products that are designed to
            enhance your life. With a commitment to quality, we ensure that each
            product is tailored to meet the needs of our diverse customers.
          </h1>
          </div>
        </div>
      </section>

      {/* Section: Our Mission */}
      <section className=" py-12 px-6 lg:px-10">
        <div className="scroll-section">
          <Title 
            title1={"Our "}
            title2={"Mission"}
            title1Styles={"text-center"}
          />
          <p className="text-xl text-gray-700  mx-auto text-center leading-[3]">
            Our mission is simple: to provide cutting-edge technology at an
            affordable price without compromising quality. We believe in
            creating long-lasting relationships with our customers by offering
            superior products, exceptional customer service, and unparalleled
            value.
          </p>
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="text-center py-10">
        <div className="max-padd-container scroll-section">
        <Title 
            title1={"Why Choose "}
            title2={"Aether Gears"}
            title1Styles={"text-center mb-10"}
        />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-10">
            <div className="bg-amber-300 p-6 rounded-xl shadow-lg text-center">
              <MdWorkspacePremium className="text-secondary bg-amber-50 p-1 rounded-full text-4xl mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Premium Quality
              </h4>
              <p className="text-lg text-gray-600 leading-8">
                We offer only the best quality products, rigorously tested to
                ensure durability and performance.
              </p>
            </div>
            <div className="bg-amber-300 p-6 rounded-xl shadow-lg text-center">
              <PiCurrencyInrBold className="text-secondary bg-amber-50 p-1 rounded-full text-4xl mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Affordable Prices
              </h4>
              <p className="text-lg text-gray-600  leading-8">
                Get the best value for your money with our competitive pricing
                on all tech products.
              </p>
            </div>
            <div className="bg-amber-300 p-6 rounded-xl shadow-lg text-center">
              <MdOutlineSupportAgent className="text-secondary bg-amber-50 p-1 rounded-full text-4xl mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Excellent Support
              </h4>
              <p className="text-lg text-gray-600  leading-8">
                Our customer service team is always ready to assist you with any
                questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Team */}
      <section className="py-12 px-6 lg:px-10 ">
        <div className="scroll-section">
          <Title 
            title1={"THE TEAM "}
            title2={"BEHIND"}
            title1Styles={"text-center"}
          />
          <h1 className="mb-3 text-center h3">Our Team Experts</h1>
          <p className="mx-10 mb-3 text-center text-secondary text-xl/10">
            At Aether Gears, we pride ourselves on having a dedicated and
            passionate team that works tirelessly to provide you with the best
            shopping experience. Our team consists of experts in various fields,
            including electronics, customer service, logistics, and marketing.
          </p>
          <div className="flex flex-wrap gap-10 justify-center items-center mt-10">
            {/* Map through team members */}
            {[
              { name: "Richard", role: "Creative Head", img: creative_lead },
              { name: "Mathew", role: "Manager", img: manager },
              { name: "Lisa", role: "SEO", img: seo },
              { name: "Robert", role: "Programming Guru", img: programming_guru },
              { name: "Yuki", role: "Programming Guru", img: programming_guru_2 },
              { name: "Monisha", role: "Programming Guru", img: programming_guru_3 },
            ].map((member, idx) => (
              <div
                key={idx}
                className="flex relative mx-5 pb-18 bg-white rounded-2xl justify-center items-center w-full sm:w-5/12 md:w-4/12 lg:w3/12 h-5/6 shadow-xl scroll-section group"
              >
                <img src={member.img} alt={member.name} className="" />
                <div className="flex-col absolute inset-0 bg-red-900 bg-opacity-10 justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <div className="mt-40 inline-block bg-orange-600 bg-opacity-90  rounded-xl px-4 py-1">
                    <h1 className="text-4xl font-semibold ">{member.name}</h1>
                    <h2 className="mt-1 text-xl text-nowrap ">
                      {member.role}
                    </h2>
                    <p className="mt-1 text-md text-white">
                      Lorem ipsum dolor sit, amet consectetur. Magni, maiores.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NewsLetter */}
      <section className="scroll-section">
        <NewsLetter />
      </section>

      {/* Our Brand Partners */}
      <section className="pb-10">
        <div className="max-padd-container scroll-section">
          <Title 
            title1={"Our "}
            title2={"Brand Partners"}
            title1Styles={"text-center mb-20"}
          />
          <div className="wrapper my-5">
            <div className="item item1 me-1">
              <img src={sony} alt="Partner 1" />
            </div>
            <div className="item item2 me-1">
              <img src={boat} alt="Partner 2" />
            </div>
            <div className="item item3 me-1">
              <img src={apple} alt="Partner 3" />
            </div>
            <div className="item item4 me-1">
              <img src={dell} alt="Partner 4" />
            </div>
            <div className="item item5 me-1">
              <img src={oppo} alt="Partner 5" />
            </div>
            <div className="item item6 me-1">
              <img src={vivo} alt="Partner 6" />
            </div>
            <div className="item item7 me-1">
              <img src={logitech} alt="Partner 7" />
            </div>
            <div className="item item8 me-1">
              <img src={skullcandy} alt="Partner 8" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
