import React from "react";

const Imprint = () => {
  return (
    <div className="max-padd-container py-16 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Imprint</h1>
      <p className="text-gray-400 text-center mb-6">
        Legal information and company details as required by law.
      </p>

      {/* Section 1: Company Details */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Company Information</h2>
        <p className="text-gray-400">
          <strong>Aether Gears Ltd.</strong><br />
          123 Tech Street, Innovation City<br />
          California, USA<br />
          <strong>Phone:</strong> +1 (800) 123-4567<br />
          <strong>Email:</strong> <a href="mailto:info@aethergears.com" className="text-blue-400 hover:underline">info@aethergears.com</a><br />
          <strong>Website:</strong> <a href="https://www.aethergears.com" className="text-blue-400 hover:underline">www.aethergears.com</a>
        </p>
      </section>

      {/* Section 2: Legal Representatives */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Legal Representatives</h2>
        <p className="text-gray-400">
          Aether Gears Ltd. is legally represented by:<br />
          <strong>John Doe (CEO)</strong><br />
          <strong>Jane Smith (CFO)</strong>
        </p>
      </section>

      {/* Section 3: Registration Details */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Company Registration</h2>
        <p className="text-gray-400">
          <strong>Company Registration Number:</strong> 9876543210<br />
          <strong>VAT Identification Number:</strong> US123456789<br />
          <strong>Trade Register:</strong> California Business Registry
        </p>
      </section>

      {/* Section 4: Responsible for Content */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Responsible for Website Content</h2>
        <p className="text-gray-400">
          <strong>John Doe</strong><br />
          Aether Gears Ltd.<br />
          123 Tech Street, Innovation City, California, USA<br />
          Email: <a href="mailto:content@aethergears.com" className="text-blue-400 hover:underline">content@aethergears.com</a>
        </p>
      </section>

      {/* Section 5: Dispute Resolution */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Dispute Resolution</h2>
        <p className="text-gray-400">
          The European Commission provides an online dispute resolution (ODR) platform, which can be accessed at: 
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> https://ec.europa.eu/consumers/odr</a>.
        </p>
      </section>

      {/* Section 6: Liability Disclaimer */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Liability Disclaimer</h2>
        <p className="text-gray-400">
          The contents of this website have been created with the utmost care. However, we do not guarantee the accuracy, 
          completeness, or timeliness of the information. Aether Gears Ltd. is not liable for any direct or indirect 
          damages arising from the use of this website.
        </p>
      </section>

      {/* Footer */}
      <p className="text-gray-500 text-sm text-center mt-6">
        Need further details? Contact us at <a href="mailto:support@aethergears.com" className="text-blue-400 hover:underline">support@aethergears.com</a>.
      </p>
    </div>
  );
};

export default Imprint;
