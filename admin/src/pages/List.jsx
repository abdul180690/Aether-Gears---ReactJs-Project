import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai"; // Search icon
import { MdMic } from "react-icons/md"; // Microphone icon

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isListening, setIsListening] = useState(false); // State to manage mic status

  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Filter the list based on search term
  const filteredList = list.filter((item) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowercasedSearchTerm) ||
      item._id.toLowerCase().includes(lowercasedSearchTerm) ||
      item.category.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  // Function to start speech recognition
  const startListening = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onstart = () => {
        setIsListening(true); // Set listening state to true
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript); // Set the transcript to the search term
        setIsListening(false); // Set listening state to false
      };

      recognition.onerror = (event) => {
        toast.error("Error occurred during speech recognition: " + event.error);
        setIsListening(false); // Set listening state to false
      };
    } else {
      toast.error("Speech recognition is not supported in your browser.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="px-2 xs:py-5 xs:px-5 sm:px-8 sm:mt-6">
      {/* Search Input Box with Icons */}
      <div className="mb-4 relative shadow-lg">
        <input
          type="text"
          placeholder="Search here"
          className="w-full p-2 pl-10 pr-12 border border-gray-300 rounded-md sm:text-base text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        {/* Search Icon */}
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 sm:text-xl text-lg " />
        {/* Microphone Icon */}
        <MdMic
          onClick={startListening}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer sm:text-xl text-lg ${isListening ? "text-blue-500" : ""}`}
        />
      </div>

      <div className="flex flex-col ">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3.8fr_1.5fr_2.7fr_1.2fr_1fr] items-center py-1 px-2 bg-black bold-14 sm:bold-15 mb-1 rounded border-b border-gray-300">
          <h5 className="border-r border-gray-300 px-2 text-white text-center">Image</h5>
          <h5 className="border-r border-gray-300 px-2 text-white text-center">Product Name</h5>
          <h5 className="border-r border-gray-300 px-2 text-white text-center">Category</h5>
          <h5 className="border-r border-gray-300 px-2 text-white text-center">Product-Id</h5>
          <h5 className="border-r border-gray-300 px-2 text-white text-center">Price</h5>
          <h5 className="px-2 text-white text-center">Remove</h5>
        </div>

        {/* Render filtered list based on search */}
        {filteredList.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_4.2fr_1.5fr_2.7fr_1.2fr_1fr] items-center gap-2 p-2 bg-white rounded-se-lg border-b border-gray-400"
          >
            <img
              src={item.image[0]}
              alt="productImg"
              className="w-16 rounded-lg sm:w-18"
            />
            <h5 className="text-sm font-semibold sm:text-base text-left border-r border-gray-300 px-2">{item.name}</h5>
            <p className="text-sm font-semibold sm:text-base text-left border-r border-gray-300 px-2">{item.category}</p>
            <p className="text-sm font-semibold sm:text-base text-left border-r border-gray-300 px-2">{item._id}</p>
            <div className="text-sm font-semibold sm:text-base lg:text-right xs:text-left sm:text-right border-r border-gray-300 px-2">
              {currency}
              {item.price}
            </div>
            <div onClick={() => removeProduct(item._id)} className="flex sm:justify-end xs:justify-end lg:justify-center">
              <TbTrash className="text-right md:text-center cursor-pointer text-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
