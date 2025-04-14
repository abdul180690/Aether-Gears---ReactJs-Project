import React from "react";
import Title from "../components/Title";

const Cancellation = () => {
  return (
    <div className="max-padd-container py-16  ">
      <Title title1={"Cancellation "} title2={"Policy"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-400 text-center mb-6">
        Learn about our cancellation process and policies before placing an order.
      </p>

      {/* Section 1: Cancellation Eligibility */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Order Cancellation Eligibility</h2>
        <p className="text-gray-400">
          You can cancel your order before it has been processed for shipment. Once the order has been dispatched, 
          cancellation requests cannot be accepted. In such cases, you may return the item after delivery.
        </p>
      </section>

      {/* Section 2: How to Request a Cancellation */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How to Request a Cancellation</h2>
        <p className="text-gray-400">
          To cancel your order, please contact our support team through:
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li>Email: <a href="mailto:support@aethergears.com" className="text-blue-400 hover:underline">support@aethergears.com</a></li>
          <li>Phone: <span className="text-gray-300">+1 (800) 123-4567</span></li>
          <li>Live Chat: Available in the Help Center</li>
        </ul>
      </section>

      {/* Section 3: Refund Process */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Refund Process</h2>
        <p className="text-gray-400">
          If your cancellation is approved, the refund will be processed within <strong>5-7 business days</strong>. 
          Refunds will be credited to the original payment method used during checkout.
        </p>
      </section>

      {/* Section 4: Non-Cancellable Items */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Non-Cancellable Items</h2>
        <p className="text-gray-400">
          The following items cannot be canceled once ordered:
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li>Customized or personalized products</li>
          <li>Gift cards and digital downloads</li>
          <li>Clearance or final sale items</li>
        </ul>
      </section>

      {/* Section 5: Changes to Orders */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Changes to Orders</h2>
        <p className="text-gray-400">
          If you need to modify your order instead of canceling, please contact our support team as soon as possible. 
          Once the order is processed, changes cannot be made.
        </p>
      </section>

      {/* Section 6: Policy Updates */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Policy Updates</h2>
        <p className="text-gray-400">
          Aether Gears reserves the right to update this cancellation policy at any time. Any changes will be reflected 
          on this page.
        </p>
      </section>

      {/* Footer */}
      <p className="text-gray-500 text-sm text-center mt-6">
        Need help? Visit our <a href="/helpcenter" className="text-blue-400 hover:underline">Help Center</a> or 
        contact our <a href="/contact" className="text-blue-400 hover:underline">Customer Support</a>.
      </p>
    </div>
  );
};

export default Cancellation;
