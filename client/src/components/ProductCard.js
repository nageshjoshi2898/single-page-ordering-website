import { useProducts } from "@/app/context/ProductContext";
import React, { useMemo } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const { cart, increaseQty, decreaseQty } = useProducts();

  const cartItem = useMemo(
    () => {
      return cart.find((item) => item._id === product._id);
    },
    [cart],
    product._id
  );

  return (
    <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
      <div>
        <img
          className="object-cover h-64 w-full"
          src={product["Image Src"] || "./fall-back.png"}
          alt={product.Title}
        />
      </div>

      <div className="flex flex-col gap-1 mt-4 px-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
          {product.Title || "Unknown"}
        </h2>
        <span className="font-normal text-gray-600 dark:text-gray-300">
          {product.description}
        </span>
        <span className="font-semibold text-gray-800 dark:text-gray-50">
          ${product["Variant Price"]}
        </span>
        <span className="font-semibold text-gray-800 dark:text-gray-50">
          Vairant SKU {product["Variant SKU"]}
        </span>
      </div>

      <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
        {!cartItem ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
          >
            <span className="text-base">Add to Cart</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={() => decreaseQty(product._id)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                />
              </svg>
            </button>

            <p className="text-base text-gray-800 dark:text-gray-50 font-medium">
              {cartItem.qty}
            </p>

            <button
              onClick={() => increaseQty(product._id)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
