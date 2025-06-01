"use client";
import { useState } from "react";
import {
  ShoppingCartIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import CartDrawer from "./CartDrawer";
import { useProducts } from "@/app/context/ProductContext";
import { useRouter } from "next/navigation";

export default function Navbar({ onSearch }) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setSearchQueryDebounced } = useProducts();
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-gray-800">SPA Lab</div>
        <div className="flex-1 mx-4">
          <input
            type="text"
            onChange={(e) => {
              console.log("Search", e.target.value);
              setSearchQueryDebounced(e.target.value);
            }}
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setDrawerOpen(true);
              console.log("Show");
            }}
            className="cursor-pointer hover:text-blue-600"
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              router.replace("/login");
            }}
            className="hover:text-blue-600"
          >
            <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-gray-700" />
          </button>
          {/* 
        <button onClick={onLogoutClick} className="hover:text-blue-600">
          <ChatBubbleBottomCenterIcon className="w-6 h-6 text-gray-700 rotate-180" />
        </button> */}
        </div>
      </nav>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
