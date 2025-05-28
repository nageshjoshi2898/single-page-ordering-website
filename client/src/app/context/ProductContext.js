"use client";

import { getToken } from "@/lib/localStore";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const [cart, setCart] = useState([]);

  const debounceTimeout = useRef(null);

  const debounce = (fn) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(fn, 500);
  };

  const setSearchQueryDebounced = (q) => debounce(() => setSearchQuery(q));
  const setPageDebounced = (p) => debounce(() => setPage(p));
  const setLimitDebounced = (l) => debounce(() => setLimit(l));

  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          page: String(page),
          limit: String(limit),
        });
        const token = getToken();
        const res = await fetch(`${baseURL}/products?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- add token here
          },
        });
        const data = await res.json();
        setProducts(data?.products);
        setTotalPages(data?.pages)
      } catch (err) {
        console.error("Fetch failed:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, page, limit]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchQuery,
        page,
        limit,
        totalPages,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        setSearchQueryDebounced,
        setPageDebounced,
        setLimitDebounced,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
