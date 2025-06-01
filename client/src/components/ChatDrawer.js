import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function ChatDrawer({ open, onClose }) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setChatInput("");

    // Simulate AI response and product fetch
    setTimeout(() => {
      const assistantMessage = {
        role: "assistant",
        content: `Showing results for: "${chatInput}"`,
      };

      const mockProducts = Array.from({ length: 50 }, (_, i) => ({
        id: `prod-${i + 1 + (page - 1) * 5}`,
        title: `Product ${i + 1 + (page - 1) * 5}`,
        image: "https://via.placeholder.com/100",
        price: (Math.random() * 100).toFixed(2),
      }));

      setMessages((prev) => [...prev, assistantMessage]);
      setProducts(mockProducts);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity z-40"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-3/4 transform transition-transform duration-500 ease-in-out bg-white shadow-xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Ask about products
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-3 py-2 rounded max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-indigo-100 text-indigo-800 self-end ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-500 italic px-3 py-2">
                Loading response...
              </div>
            )}
          </div>

          {/* Chat input */}
          <form onSubmit={handleChatSubmit} className="flex mt-auto">
            <input
              type="text"
              className="flex-1 rounded-l-md border border-gray-300 p-2 text-sm"
              placeholder="Search products..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
            >
              Ask
            </button>
          </form>

          {/* Product Carousel */}
          {!loading && products.length > 0 && (
            <>
              <h4 className="mt-4 mb-2 font-medium text-gray-700">Results:</h4>
              <div className="relative">
                <button
                  onClick={() =>
                    document
                      .getElementById("carousel")
                      .scrollBy({ left: -200, behavior: "smooth" })
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
                >
                  <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
                </button>
                <div
                  id="carousel"
                  className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-8"
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="min-w-[180px] flex-shrink-0 border rounded-lg p-3 flex flex-col items-center shadow-sm bg-white"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-24 w-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium text-center">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500">${product.price}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("carousel")
                      .scrollBy({ left: 200, behavior: "smooth" })
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
                >
                  <ArrowRightIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
