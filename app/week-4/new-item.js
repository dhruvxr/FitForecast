"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4 text-black">Select Quantity</h2>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          onClick={decrement}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-lg font-medium text-black">{quantity}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={increment}
          disabled={quantity === 20}
        >
          +
        </button>
      </div>
    </div>
  );
}
