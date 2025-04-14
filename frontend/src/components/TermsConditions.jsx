import React from "react";
import Title from "../components/Title";

const TermsConditions = () => {
  return (
    <div className="max-padd-container py-16 px-10  text-black">
      <Title title1={"Terms & "} title2={"Conditions"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 text-center mb-6">
        Please read these terms and conditions carefully before using our website.
      </p>

      {/* Section 1: Introduction */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-400">
          Welcome to Aether Gears. By accessing our website and purchasing our products, 
          you agree to abide by these terms and conditions. If you do not agree with any part of these terms, 
          please do not use our services.
        </p>
      </section>

      {/* Section 2: Use of the Website */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Use of the Website</h2>
        <p className="text-gray-400">
          You agree to use this website for lawful purposes only. Any misuse, including 
          unauthorized access, data mining, or fraudulent transactions, is strictly prohibited.
        </p>
      </section>

      {/* Section 3: Account & Security */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Account & Security</h2>
        <p className="text-gray-400">
          When creating an account, you must provide accurate information and ensure the security of your credentials. 
          We are not responsible for any unauthorized account activity.
        </p>
      </section>

      {/* Section 4: Orders & Payments */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Orders & Payments</h2>
        <p className="text-gray-400">
          All orders are subject to availability. We reserve the right to cancel or refuse any order. 
          Payment must be made in full before the shipment of products.
        </p>
      </section>

      {/* Section 5: Shipping & Returns */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Shipping & Returns</h2>
        <p className="text-gray-400">
          Our shipping policies, including estimated delivery times and return policies, 
          are outlined in our <a href="/shipping-policy" className="text-blue-400 hover:underline">Shipping Policy</a>.
        </p>
      </section>

      {/* Section 6: Intellectual Property */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
        <p className="text-gray-400">
          All content, including logos, images, and designs, is the property of Aether Gears. 
          Unauthorized use or reproduction is prohibited.
        </p>
      </section>

      {/* Section 7: Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p className="text-gray-400">
          We are not liable for any direct or indirect damages resulting from the use of our website or products.
        </p>
      </section>

      {/* Section 8: Changes to Terms */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p className="text-gray-400">
          We reserve the right to modify these terms at any time. Updates will be posted on this page, and continued use of the website constitutes acceptance of the revised terms.
        </p>
      </section>

      {/* Footer */}
      <p className="text-gray-500 text-sm text-center mt-6">
        If you have any questions, please contact our{" "}
        <a href="/contact" className="text-blue-400 hover:underline">Customer Support</a>.
      </p>
    </div>
  );
};

export default TermsConditions;
