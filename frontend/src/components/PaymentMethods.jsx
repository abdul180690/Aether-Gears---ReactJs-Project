import React from "react";
import { Link } from "react-router-dom";
import cards from "../assets/cards.png";
import Title from "../components/Title";
import netbanking from "../assets/netbanking.png";
import cod from "../assets/cod.png";
import upi from "../assets/upi.png";
import paypal from "../assets/paypal.png";

const PaymentMethods = () => {
  return (
    <div className="max-padd-container py-16 px-10 text-black ">
      <Title title1={"Payment "} title2={"Methods"} titleStyles={"mb-4 text-center"} />
      <p className="text-gray-500 text-center mb-6">
        We offer multiple secure payment options to make your shopping experience seamless.
      </p>

      {/* Accepted Payment Methods */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Accepted Payment Methods</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-center">
          <div className="flex flex-col items-center">
            <img src={cards} alt="Credit/Debit Cards" className="w-26 h-20" />
            <p className="mt-2 text-gray-400">Credit/Debit Cards</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={upi} alt="UPI" className="w-80 h-32" />
            <p className="mt-2 text-gray-400">UPI (Google Pay, PhonePe, Paytm)</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={netbanking} alt="Net Banking" className="w-40 h-30" />
            <p className="mt-2 text-gray-400">Net Banking</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={paypal} alt="PayPal" className="w-30 h-20" />
            <p className="mt-2 text-gray-400">PayPal</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={cod} alt="Cash on Delivery" className="w-30 h-40" />
            <p className="mt-2 text-gray-400">Cash on Delivery (COD)</p>
          </div>
        </div>
      </div>

      {/* Payment Security */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Payment Security</h2>
        <p className="text-gray-400">
          We use **SSL encryption** and **secure payment gateways** to ensure your transactions are safe.
          Your card details are never stored on our servers, and all payments are processed securely.
        </p>
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          <li className="border-b pb-2">
            <strong>Is my payment information secure?</strong>
            <p className="text-gray-400">
              Yes! We use industry-standard encryption and do not store payment details.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>Do you accept international cards?</strong>
            <p className="text-gray-400">
              Yes, we accept international credit and debit cards, as well as PayPal.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>Can I pay in installments?</strong>
            <p className="text-gray-400">
              We support EMI options for eligible credit cards. Check with your bank for details.
            </p>
          </li>
          <li className="border-b pb-2">
            <strong>Why was my payment declined?</strong>
            <p className="text-gray-400">
              This could be due to insufficient funds, incorrect card details, or bank restrictions. Please contact your bank for assistance.
            </p>
          </li>
        </ul>
      </div>

      {/* Support Links */}
      <div className="flex justify-center gap-4">
        <Link to="/contact" className="bg-blue-500 hover:bg-blue-600 p-3 rounded text-center">
          Contact Support
        </Link>
        <Link to="/faqs" className="bg-green-500 hover:bg-green-600 p-3 rounded text-center">
          More FAQs
        </Link>
      </div>
    </div>
  );
};

export default PaymentMethods;
