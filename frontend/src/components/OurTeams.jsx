import React from "react";
import Title from "../components/Title";

const teamMembers = [
  {
    name: "John Doe",
    role: "Chief Executive Officer",
    image: "https://via.placeholder.com/150", // Replace with actual image
    bio: "John leads Aether Gears with a vision for innovation and excellence, bringing over 15 years of experience in the tech and fashion industries.",
  },
  {
    name: "Jane Smith",
    role: "Chief Marketing Officer",
    image: "https://via.placeholder.com/150", // Replace with actual image
    bio: "Jane oversees brand strategy and marketing, ensuring Aether Gears reaches global audiences with a strong presence.",
  },
  {
    name: "Michael Brown",
    role: "Head of Product Development",
    image: "https://via.placeholder.com/150", // Replace with actual image
    bio: "Michael drives product design and development, focusing on cutting-edge technology and premium craftsmanship.",
  },
  {
    name: "Emily White",
    role: "Customer Experience Manager",
    image: "https://via.placeholder.com/150", // Replace with actual image
    bio: "Emily ensures top-tier customer service and satisfaction, making every interaction with Aether Gears seamless and enjoyable.",
  },
  {
    name: "David Lee",
    role: "Lead Software Engineer",
    image: "https://via.placeholder.com/150", // Replace with actual image
    bio: "David architects and maintains our eCommerce platform, ensuring a smooth and secure shopping experience.",
  },
];

const OurTeams = () => {
  return (
    <div className="max-padd-container py-16 ">
      <Title title1={"Meet our "} title2={"Team"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-300 text-center mb-6">
        The passionate minds behind Aether Gears, dedicated to innovation and excellence.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-slate-300 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full border-2 border-gray-400 mb-3"
            />
            <h2 className="text-lg font-semibold">{member.name}</h2>
            <p className="text-gray-400 text-sm">{member.role}</p>
            <p className="text-gray-300 mt-2">{member.bio}</p>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-6">
        Want to join us? Check out our <a href="/jobs" className="text-blue-400 hover:underline">careers page</a>.
      </p>
    </div>
  );
};

export default OurTeams;
