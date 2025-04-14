import React from "react";
import Title from "../components/Title";

const Press = () => {
  return (
    <div className="max-padd-container py-16 ">
      <Title title1={"Aether Gears "} title2={"in the Press"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 text-center mb-6">
        Stay updated with the latest media coverage, announcements, and industry highlights featuring Aether Gears.
      </p>

      {/* Featured Press Articles */}
      <div className="space-y-6">
        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🚀 "Aether Gears: Revolutionizing Wearable Tech" - Tech Daily</h2>
          <p className="text-gray-800">
            Our latest smart gear collection is making waves in the industry! Read the full article <a href="#" className="text-blue-400 hover:underline">here</a>.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🎤 CEO Interview with Future Trends Magazine</h2>
          <p className="text-gray-800">
            Our CEO shares insights on the future of smart accessories and the role of AI in wearable technology. Watch the full interview <a href="#" className="text-blue-400 hover:underline">here</a>.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">🏆 "Best Innovation in Fashion-Tech" Award</h2>
          <p className="text-gray-800">
            Aether Gears has been recognized as a leader in innovative wearable tech solutions. Read more <a href="#" className="text-blue-400 hover:underline">here</a>.
          </p>
        </div>
      </div>

      {/* Press Kit & Media Contacts */}
      <div className="mt-8 space-y-6">
        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">📂 Download Our Press Kit</h2>
          <p className="text-gray-800">
            Get high-resolution images, company information, and brand assets for media use. <a href="#" className="text-blue-400 hover:underline">Download here</a>.
          </p>
        </div>

        <div className="bg-slate-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">📩 Media Contact</h2>
          <p className="text-gray-800">
            For press inquiries, interviews, or collaborations, reach out to our media team at <a href="mailto:press@aethergears.com" className="text-blue-400 hover:underline">press@aethergears.com</a>.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <p className="text-gray-500 text-sm text-center mt-6">
        Stay connected with our latest news by following us on <a href="#" className="text-blue-400 hover:underline">LinkedIn</a> and <a href="#" className="text-blue-400 hover:underline">Twitter</a>.
      </p>
    </div>
  );
};

export default Press;
