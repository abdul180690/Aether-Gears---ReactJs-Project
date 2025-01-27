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
      {/* Section: About Us */}
      <section className="pb-6 bg-amber-100 ">
        <div className="flex flex-col lg:flex-row gap-6 px-6 lg:px-10 scroll-section">
          <div className="my-5">
            <h3 className="text-secondary py-5 text-xl lg:text-2xl font-semibold uppercase">
              About Us
            </h3>
            <h1 className="text-lg lg:text-xl text-justify text-slate-900 ">
              At <strong>Aether Gears</strong>, we are passionate about
              delivering the best technology products that are designed to
              enhance your life. With a
              commitment to quality, we ensure that each product is tailored to
              meet the needs of our diverse customers.
            </h1>
          </div>
          <div className="my-5 p-6 lg:p-10">
            <p className="text-secondary text-lg lg:text-xl leading-8">
              Aether Gears is your one-stop online destination for all your
              electronic needs. Whether you're looking for the latest mobile
              phones, high-quality headphones, powerful speakers, stylish
              watches, or other electronic gadgets, Aether Gears has got you
              covered. With a wide range of products from top brands, you can
              find everything you need to stay connected, entertained, and
              on-trend.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Our Mission */}
      <section className="bg-amber-200 py-12 px-6 lg:px-10 ">
        <div className="scroll-section">
            <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6 ">
            Our Mission
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed ">
            Our mission is simple: to provide cutting-edge technology at an
            affordable price without compromising quality. We believe in creating
            long-lasting relationships with our customers by offering superior
            products, exceptional customer service, and unparalleled value.
            </p>
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="text-center py-20 bg-amber-100">
        <div className="max-padd-container scroll-section">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Why Choose Aether Gears?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-10">
            <div className="bg-amber-300 p-6 rounded-xl shadow-lg text-center">
                <MdWorkspacePremium className="text-secondary bg-amber-100 p-1 rounded-full text-4xl mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                Premium Quality
                </h4>
                <p className="text-lg text-gray-600">
                We offer only the best quality products, rigorously tested to
                ensure durability and performance.
                </p>
            </div>
            <div className="bg-amber-300 p-6 rounded-xl shadow-lg text-center">
                <PiCurrencyInrBold className="text-secondary bg-amber-100 p-1 rounded-full text-4xl mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                Affordable Prices
                </h4>
                <p className="text-lg text-gray-600">
                Get the best value for your money with our competitive pricing on
                all tech products.
                </p>
            </div>
            <div className="bg-amber-300 p-6 rounded-xl shadow-lg text-center">
                <MdOutlineSupportAgent className="text-secondary bg-amber-100 p-1 rounded-full text-4xl mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                Excellent Support
                </h4>
                <p className="text-lg text-gray-600">
                Our customer service team is always ready to assist you with any
                questions or concerns.
                </p>
            </div>
            </div>
        </div>
      </section>

      {/* Section: Our Team */}
      <section className="bg-amber-200 py-12 px-6 lg:px-10 ">
        <div className="scroll-section">
            <h1 className="mt-5 mb-3 text-center text-2xl font-semibold">
            THE TEAM BEHIND
            </h1>
            <h1 className="mb-3 text-center text-xl">Our Team Experts</h1>
            <p className="mx-10 mb-3 text-center text-secondary text-lg">
            At Aether Gears, we pride ourselves on having a dedicated and
            passionate team that works tirelessly to provide you with the best
            shopping experience. Our team consists of experts in various fields,
            including electronics, customer service, logistics, and marketing.
            </p>
            <div className="flex flex-wrap gap-5 justify-center items-center my-10">
            {/* Map through team members */}
            {[
                { name: "Richard", role: "Creative Head", img: creative_lead },
                { name: "Mathew", role: "Manager", img: manager },
                { name: "Lisa", role: "SEO", img: seo },
                { name: "Robert", role: "Programming Guru", img: programming_guru },
                { name: "Yuki", role: "Programming Guru", img: programming_guru_2 },
                { name: "Manasa", role: "Programming Guru", img: programming_guru_3 }
            ].map((member, idx) => (
                <div
                key={idx}
                className="flex mx-5 p-3 bg-primary rounded-2xl justify-center items-center w-full sm:w-5/12 md:w-4/12 lg:w-3/12 shadow-lg scroll-section"
                >
                <img src={member.img} alt={member.name} className="w-1/2" />
                <div className="text-left mx-3">
                    <h3 className="mt-3 text-xl font-semibold">{member.name}</h3>
                    <h6 className="text-gray-500 text-md text-nowrap ">{member.role}</h6>
                    <p className="mt-3 text-gray-700">
                    Lorem ipsum dolor sit, amet consectetur. Magni, maiores.
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* NewsLetter */}
      <section className="bg-amber-100  scroll-section">
        <NewsLetter />
      </section>

      {/* Our Brand Partners */}
      <section className="pb-10 bg-amber-100 ">
        <div className="max-padd-container scroll-section">
          <h1 className="text-center h1 text-slate-900 mb-20">
            Our Brand Partners
          </h1>
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
