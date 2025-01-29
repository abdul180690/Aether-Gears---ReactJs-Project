import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaSearch } from "react-icons/fa";
import { MdMic } from "react-icons/md";

const Search = () => {
  const { search, setSearch } = useContext(ShopContext);

  // Initialize the SpeechRecognition API (Web Speech API)
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = recognition ? new recognition() : null;

  const handleMicClick = () => {
    if (speechRecognition) {
      // Set the recognition parameters
      speechRecognition.lang = "en-US"; // Language set to English
      speechRecognition.interimResults = false; // Don't show partial results
      speechRecognition.maxAlternatives = 1; // Only the best match

      // Start listening
      speechRecognition.start();

      // Event listener for when speech is recognized
      speechRecognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript; // Get recognized text
        setSearch(speechToText); // Update the input field with recognized text
      };

      // Handle errors if any
      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      // Handle when the speech recognition ends
      speechRecognition.onend = () => {
        console.log("Speech recognition ended.");
      };
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  };

  return (
    <section className="max-padd-container pb-5">
      <div className="flexCenter">
        <div className="flex items-center justify-center bg-slate-200 lg:w-4/12 w-10/12 md:w-8/12 sm:w-full rounded-full">
          <div>
            <FaSearch className="text-[25px] p-1 mx-3 cursor-pointer" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            className="bg-slate-200 border-none outline-none py-2 text-sm w-full text-center md:text-lg"
          />
          <div>
            <MdMic
              className="text-[23px] cursor-pointer mx-3"
              onClick={handleMicClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
