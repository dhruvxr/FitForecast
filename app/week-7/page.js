"use client";

import NewItem from './new-item';
import ItemList from './item-list';
import itemsData from './items.json'; 
import { useState } from 'react';
import './styles.css';

export default function Page() {
  
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (item) => {
    
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
