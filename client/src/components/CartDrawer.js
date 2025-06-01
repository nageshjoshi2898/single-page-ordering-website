import React from "react";
import { useProducts } from "@/app/context/ProductContext";
import {
  MinusIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, decreaseQty, increaseQty } = useProducts();
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity z-40"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Slide-over drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-screen max-w-md transform transition-transform duration-500 ease-in-out bg-white shadow-xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-over-title"
      >
        <div className="flex h-full flex-col overflow-y-scroll">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2
                className="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                Shopping cart
              </h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart?.map((item) => (
                    <li key={item._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item["Image Src"]}
                          alt={item.Title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{item.Title}</a>
                            </h3>
                            <p className="ml-4">
                              ${item["Variant Price"].toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item["Variant SKU"]}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => decreaseQty(item._id)}
                              className="p-1 rounded hover:bg-gray-200"
                            >
                              <MinusIcon className="h-5 w-5" />
                            </button>
                            <p className="text-gray-500">{item.qty}</p>

                            <button
                              onClick={() => increaseQty(item._id)}
                              className="p-1 rounded hover:bg-gray-200"
                            >
                              <PlusIcon className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => removeFromCart(item._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
