"use client";

import useDebouncedCartSync from "@/customHooks/useDebounceCartSync";
import { baseURL } from "@/lib/base";
import { getToken, getUserID } from "@/lib/localStore";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useDebouncedCartSync(cart);
  const debounceTimeout = useRef(null);

  const debounce = (fn) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(fn, 500);
  };

  const setSearchQueryDebounced = (q) => debounce(() => setSearchQuery(q));
  const setPageDebounced = (p) => debounce(() => setPage(p));
  const setLimitDebounced = (l) => debounce(() => setLimit(l));

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userId) {
        let usrId = getUserID();
        if (!usrId) {
          return;
        }
      }
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
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          router.replace("/login");
          setUserId(null);
        }
        const data = await res.json();
        setProducts(data?.products);
        setTotalPages(data?.pages);
        setTotal(data?.total);
      } catch (err) {
        console.error("Fetch failed:", err);
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, page, limit, userId]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) {
          let usrId = getUserID();
          if (!usrId) {
            return;
          }
        }
        const res = await fetch(`${baseURL}/cart/${getUserID()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json(); // expected: { items: [ {id, name, price, qty, image} ] }

        setCart(data.items);
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          router.replace("/login");
        }
      } catch (err) {
        console.error("Fetch cart error:", err);
      }
    };

    fetchCart();
  }, [userId]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          qty: updatedCart[existingItemIndex].qty + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQty = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (itemId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item._id === itemId ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0) // Remove item if qty becomes 0
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchQuery,
        page,
        setPage,
        limit,
        totalPages,
        cart,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        setSearchQueryDebounced,
        setPageDebounced,
        setLimitDebounced,
        decreaseQty,
        increaseQty,
        setUserId,
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
