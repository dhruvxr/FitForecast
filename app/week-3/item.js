import React from "react";

const Item = ({ name, quantity, category }) => {
  return (
    <li className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border border-gray-200">
      <span className="font-semibold">{name}</span>
      <span className="text-gray-600">Qty: {quantity}</span>
      <span className="text-blue-500 capitalize">{category}</span>
    </li>
  );
};

export default Item;
