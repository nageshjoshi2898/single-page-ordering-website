import { baseURL } from "@/lib/base";
import { getToken } from "@/lib/localStore";
import { useEffect, useRef } from "react";

const useDebouncedCartSync = (cart) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId || !cart) return;

    clearTimeout(timeoutRef.current);
    const token = getToken();

    timeoutRef.current = setTimeout(() => {
      fetch(`${baseURL}/cart/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map(({ _id, qty }) => ({
            productId: _id,
            quantity: qty,
          })),
        }),
      }).catch((err) => console.error("Cart sync failed:", err));
    }, 3000); // debounce 3 seconds

    return () => clearTimeout(timeoutRef.current);
  }, [cart]);
};

export default useDebouncedCartSync;
