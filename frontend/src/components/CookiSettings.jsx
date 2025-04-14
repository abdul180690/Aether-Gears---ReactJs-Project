import React, { useState } from "react";
import Title from "../components/Title";

const CookieSettings = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  const handleToggle = (category) => {
    if (category !== "necessary") {
      setPreferences((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));
    }
  };

  return (
    <div className="max-padd-container py-16 px-10">
      <Title title1={"Cookie "} title2={"Settings"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 text-center mb-6">
        Manage your cookie preferences below.
      </p>

      {/* Cookie Info Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Why We Use Cookies</h2>
        <p className="text-gray-400">
          We use cookies to enhance your experience, analyze site traffic, and
          serve relevant ads. You can adjust your cookie preferences at any
          time.
        </p>
      </section>

      {/* Cookie Preferences */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Preferences</h2>
        <div className="space-y-4">
          {/* Necessary Cookies */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              <strong>Necessary Cookies</strong> (Always Enabled)
            </p>
            <input
              type="checkbox"
              checked={preferences.necessary}
              disabled
              className="toggle-checkbox"
            />
          </div>
          <p className="text-gray-500 text-sm">
            These cookies are essential for the website to function properly
            and cannot be disabled.
          </p>

          {/* Analytics Cookies */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              <strong>Analytics Cookies</strong>
            </p>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => handleToggle("analytics")}
              className="toggle-checkbox"
            />
          </div>
          <p className="text-gray-500 text-sm">
            Helps us analyze site performance and improve user experience.
          </p>

          {/* Marketing Cookies */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              <strong>Marketing Cookies</strong>
            </p>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => handleToggle("marketing")}
              className="toggle-checkbox"
            />
          </div>
          <p className="text-gray-500 text-sm">
            Used to display personalized advertisements.
          </p>

          {/* Personalization Cookies */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              <strong>Personalization Cookies</strong>
            </p>
            <input
              type="checkbox"
              checked={preferences.personalization}
              onChange={() => handleToggle("personalization")}
              className="toggle-checkbox"
            />
          </div>
          <p className="text-gray-500 text-sm">
            Enables custom content based on your preferences.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          onClick={() => alert("Preferences Saved!")}
        >
          Save Preferences
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded"
          onClick={() =>
            setPreferences({
              necessary: true,
              analytics: false,
              marketing: false,
              personalization: false,
            })
          }
        >
          Reset to Default
        </button>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm text-center mt-4">
        <a href="/privacy-policy" className="text-blue-400 hover:underline">
          Read our full Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default CookieSettings;
