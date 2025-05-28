export default function CartDrawer({ open, onClose }) {
    return (
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>
        <div className="p-4">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      </div>
    );
  }
  