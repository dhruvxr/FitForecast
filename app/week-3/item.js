import React from "react";

const Item = ({ name, quantity, category }) => {
  return (
    <li className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border border-gray-200">
      <span className="font-semibold text-black">{name}</span> 
      <span className="text-black">Qty: {quantity}</span> 
      <span className="text-black capitalize">{category}</span>
    </li>
  );
};

export default Item;
