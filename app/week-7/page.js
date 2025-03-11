"use client";

import NewItem from './new-item';
import ItemList from './item-list';
import itemsData from './items.json'; // Make sure this contains the initial items
import { useState } from 'react';
import './styles.css';

export default function Page() {
  // Initialize state with the initial items from itemsData
  const [items, setItems] = useState(itemsData);

  // Function to handle adding new items
  const handleAddItem = (item) => {
    // Prepend the new item to the list (adds at the top)
    setItems((prevItems) => [item, ...prevItems]);
  };

  return (
    <div className="container">
      <h1>Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </div>
  );
}
