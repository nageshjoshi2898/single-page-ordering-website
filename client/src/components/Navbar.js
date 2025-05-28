import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import CartDrawer from './CartDrawer';

export default function Navbar({ onSearch }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="text-xl font-bold">🛍️ ShopEasy</div>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search products..."
          className="border rounded p-2 w-1/2"
        />
        <button onClick={() => setDrawerOpen(true)}>
          <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
        </button>
      </nav>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
