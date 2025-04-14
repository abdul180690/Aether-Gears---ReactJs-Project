import React from "react";
import Title from "../components/Title";

const Jobs = () => {
  return (
    <div className="max-padd-container py-16 ">
      <Title title1={"🚀 Join "} title2={"Aether Gears"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 text-center mb-6">
        Be part of a team that's shaping the future of wearable technology and smart fashion!
      </p>

      {/* Job Listings */}
      <div className="space-y-6">
        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">👨‍💻 Frontend Developer</h2>
          <p className="text-gray-800">
            Looking for a passionate React.js developer to enhance our e-commerce platform.  
          </p>
          <p className="text-gray-500 text-sm mt-2">📍 Location: Remote | 📅 Full-Time</p>
          <a href="#" className="text-blue-400 hover:underline mt-2 inline-block">Apply Now</a>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">📦 Supply Chain Manager</h2>
          <p className="text-gray-800">
            Seeking an expert in logistics and inventory management to streamline our operations.
          </p>
          <p className="text-gray-500 text-sm mt-2">📍 Location: New York, USA | 📅 Full-Time</p>
          <a href="#" className="text-blue-400 hover:underline mt-2 inline-block">Apply Now</a>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">📱 Digital Marketing Specialist</h2>
          <p className="text-gray-800">
            Join our marketing team to create engaging campaigns and drive brand awareness.
          </p>
          <p className="text-gray-500 text-sm mt-2">📍 Location: Remote | 📅 Contract</p>
          <a href="#" className="text-blue-400 hover:underline mt-2 inline-block">Apply Now</a>
        </div>
      </div>

      {/* Why Join Us? */}
      <div className="mt-8 space-y-6">
        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🌟 Why Work With Us?</h2>
          <ul className="list-disc pl-5 text-gray-800">
            <li>Innovative & fast-growing tech company</li>
            <li>Remote-friendly work environment</li>
            <li>Competitive salary & benefits</li>
            <li>Collaborative & diverse culture</li>
          </ul>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">📩 How to Apply</h2>
          <p className="text-gray-800">
            Send your resume and portfolio to  
            <a href="mailto:careers@aethergears.com" className="text-blue-400 hover:underline"> careers@aethergears.com</a>.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <p className="text-gray-500 text-sm text-center mt-6">
        Follow us on <a href="#" className="text-blue-400 hover:underline">LinkedIn</a> for more job updates!
      </p>
    </div>
  );
};

export default Jobs;
