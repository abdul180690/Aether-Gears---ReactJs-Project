import React, { useState } from "react";

const FAQs = () => {
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const faqData = [
    {
      question: "📦 How can I track my order?",
      answer: "You can track your order in the 'Order Tracking' section by entering your order ID and email address. Once shipped, you will receive a tracking number via email.",
    },
    {
      question: "🚚 What are the shipping options available?",
      answer: "We offer Standard (5-7 days), Express (2-3 days), and Same-day delivery (in select cities). Shipping costs vary depending on your location and selected shipping method.",
    },
    {
      question: "💳 What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, PayPal, UPI, Net Banking, and Cash on Delivery (COD) for eligible locations.",
    },
    {
      question: "🔄 Can I change or cancel my order after placing it?",
      answer: "You can modify or cancel your order within 1 hour of placing it. After that, it will be processed and cannot be changed. For assistance, contact support immediately.",
    },
    {
      question: "📅 How long do refunds take to process?",
      answer: "Refunds are processed within 5-7 business days after receiving the returned item. The amount is credited to your original payment method.",
    },
    {
      question: "🎟️ Do you offer discounts or promo codes?",
      answer: "Yes! Subscribe to our newsletter or visit our 'Deals & Offers' section for ongoing discounts and promotions.",
    },
    {
      question: "📞 How can I contact customer support?",
      answer: "You can reach us via Live Chat, email at support@example.com, or call our toll-free number (123) 456-7890.",
    },
    {
      question: "🔐 Is my personal information secure?",
      answer: "Yes, we use advanced encryption technology to protect your data. Your personal details are never shared with third parties.",
    },
  ];

  return (
    <div className="py-16 max-padd-container text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">❓ Frequently Asked Questions (FAQs)</h1>
      <p className="text-gray-500 text-center mb-6">Find answers to the most commonly asked questions about our services.</p>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b pb-3">
            <h2 className="text-lg font-semibold cursor-pointer text-blue-500 hover:underline" onClick={() => setSelectedFAQ(faq)}>
              {faq.question}
            </h2>
          </div>
        ))}
      </div>

      {/* Contact Support Button */}
      <div className="text-center mt-6">
        <p className="text-gray-600">Still have questions? Contact our support team for assistance.</p>
        <a href="/contact" className="inline-block mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
          Contact Support
        </a>
      </div>

      {/* FAQ Modal */}
      {selectedFAQ && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-2">{selectedFAQ.question}</h2>
            <p className="text-gray-600">{selectedFAQ.answer}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => setSelectedFAQ(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;
