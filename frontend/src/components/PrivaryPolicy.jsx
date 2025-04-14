import React from "react";
import Title from "../components/Title";


const PrivacyPolicy = () => {
  return (
    <div className="max-padd-container py-16 px-10 text-black ">
      <Title title1={"Privary "} title2={"Policy"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-500 text-center mb-6">
        Last Updated: March 2025
      </p>

      {/* Introduction */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-gray-400">
          Welcome to **Aether Gears**! We value your privacy and are committed to
          protecting your personal data. This policy explains how we collect, use, and safeguard your
          information.
        </p>
      </section>

      {/* Data Collection */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. What Data We Collect</h2>
        <p className="text-gray-400">
          We collect the following types of data when you use our website:
        </p>
        <ul className="list-disc pl-5 text-gray-400">
          <li>Personal Information (e.g., name, email, phone number)</li>
          <li>Payment Details (encrypted and processed securely)</li>
          <li>Order History & Purchase Data</li>
          <li>Website Usage Data (cookies, IP address, browsing behavior)</li>
        </ul>
      </section>

      {/* How Data is Used */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Data</h2>
        <p className="text-gray-400">
          Your data is used for the following purposes:
        </p>
        <ul className="list-disc pl-5 text-gray-400">
          <li>Processing and fulfilling your orders</li>
          <li>Personalizing your shopping experience</li>
          <li>Providing customer support and responding to inquiries</li>
          <li>Sending order confirmations, updates, and promotional offers</li>
          <li>Improving website functionality and security</li>
        </ul>
      </section>

      {/* Data Protection */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. How We Protect Your Data</h2>
        <p className="text-gray-400">
          We implement strong security measures to protect your data:
        </p>
        <ul className="list-disc pl-5 text-gray-400">
          <li>End-to-end encryption for transactions</li>
          <li>Strict access controls and data protection policies</li>
          <li>Regular security audits and vulnerability checks</li>
        </ul>
      </section>

      {/* Third-Party Sharing */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Data Sharing & Third Parties</h2>
        <p className="text-gray-400">
          We do not sell your personal data. However, we may share it with:
        </p>
        <ul className="list-disc pl-5 text-gray-400">
          <li>Trusted payment providers for secure transactions</li>
          <li>Shipping companies for order fulfillment</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </section>

      {/* Cookies Policy */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Cookies & Tracking Technologies</h2>
        <p className="text-gray-400">
          We use cookies to enhance your experience. By using our site, you agree to our{" "}
          <a href="/cookie-policy" className="text-blue-400 hover:underline">
            Cookie Policy
          </a>.
        </p>
      </section>

      {/* User Rights */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
        <p className="text-gray-400">
          You have the right to:
        </p>
        <ul className="list-disc pl-5 text-gray-400">
          <li>Access, update, or delete your personal data</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of the data we store about you</li>
        </ul>
      </section>

      {/* Contact & Support */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p className="text-gray-400">
          If you have any questions about this Privacy Policy, contact us at:
        </p>
        <p className="text-blue-400">support@aethergears.com</p>
      </section>

      {/* Footer */}
      <p className="text-gray-500 text-sm text-center mt-4">
        © 2025 Aether Gears. All rights reserved.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
