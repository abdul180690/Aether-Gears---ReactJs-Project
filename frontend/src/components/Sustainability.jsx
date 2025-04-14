import React from "react";
import Title from "../components/Title";

const Sustainability = () => {
  return (
    <div className="max-padd-container py-16">
      <Title title1={"Our Commitment to "} title2={"Sustainability"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 text-center mb-6">
        At Aether Gears, we are dedicated to reducing our environmental footprint and promoting sustainable practices in fashion and technology.
      </p>

      {/* Sustainability Sections */}
      <div className="space-y-6">
        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">♻️ Eco-Friendly Materials</h2>
          <p className="text-gray-800">
            We use recycled, organic, and ethically sourced materials to create high-quality products without harming the planet.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🌍 Carbon Footprint Reduction</h2>
          <p className="text-gray-800">
            Our production facilities focus on reducing energy consumption, and we offset our carbon footprint through reforestation programs.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">📦 Sustainable Packaging</h2>
          <p className="text-gray-800">
            We use biodegradable, recyclable, and minimal packaging to ensure a greener shopping experience.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🚛 Ethical & Sustainable Supply Chain</h2>
          <p className="text-gray-800">
            We work with suppliers who share our values, ensuring fair wages, ethical labor, and sustainable manufacturing.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🌱 Giving Back to Nature</h2>
          <p className="text-gray-800">
            A portion of our profits goes toward environmental conservation efforts, including tree planting and ocean cleanup initiatives.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <p className="text-gray-500 text-sm text-center mt-6">
        Join us in making a difference. Learn more about our sustainability initiatives or explore our <a href="/eco-friendly-collection" className="text-blue-400 hover:underline">eco-friendly collection</a>.
      </p>
    </div>
  );
};

export default Sustainability;
