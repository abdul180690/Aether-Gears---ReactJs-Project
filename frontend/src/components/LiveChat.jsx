import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! How can we assist you today?" },
    { sender: "bot", text: "Here are some common topics:\n📦 Order Tracking\n🔄 Returns & Refunds\n💳 Payment Issues\n🚚 Shipping Info\n👤 Account Help\nType your question below!"},
  ]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (input) => {
    const message = input.toLowerCase();

    if (message.includes("track") || message.includes("order")) {
      return "🔍 You can track your order in the 'Order Tracking' section. Visit: [Order Tracking](#)";
    }
    if (message.includes("return") || message.includes("refund")) {
      return "🔄 We offer a 30-day return policy. Visit: [Returns & Refunds](#) for details.";
    }
    if (message.includes("payment") || message.includes("card")) {
      return "💳 We accept credit/debit cards, net banking, UPI, and Cash on Delivery. Need help? Visit: [Payment Help](#)";
    }
    if (message.includes("shipping") || message.includes("delivery")) {
      return "🚚 Standard shipping takes 3-7 business days. Check more details here: [Shipping Info](#)";
    }
    if (message.includes("account") || message.includes("login")) {
      return "👤 You can manage your account settings here: [Account Help](#)";
    }
    if (message.includes("discount") || message.includes("promotion")) {
      return "🎉 Check out our latest deals and promo codes here: [Promotions & Discounts](#)";
    }
    if (message.includes("support") || message.includes("help")) {
      return "📞 You can contact our support team here: [Contact Us](#)";
    }

    return "🤖 I'm not sure about that. Try asking about Order Tracking, Returns, Payment, Shipping, or Account Help.";
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Simulated bot response
    setTimeout(() => {
      const botReply = getBotResponse(userInput);
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 flex flex-col items-end">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <BsChatDotsFill className="mr-2 text-xl" /> Live Chat
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-80 bg-white border border-gray-300 shadow-xl rounded-lg flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Live Support</span>
            <button onClick={() => setIsOpen(false)}>
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition">
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
