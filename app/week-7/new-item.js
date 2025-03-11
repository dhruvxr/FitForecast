import { useState } from 'react';

export default function NewItem({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity starts at 1
  const [category, setCategory] = useState('Produce');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!itemName || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new item object
    const newItem = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: itemName,
      quantity: quantity,
      category: category,
    };

    // Call the onAddItem function passed as a prop
    onAddItem(newItem);

    // Clear form fields after submission
    setItemName('');
    setQuantity(1); // Reset quantity to 1 after submission
    setCategory('Produce');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        placeholder="Quantity"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Baker">Baker</option>
        <option value="Meat">Meat</option>
        <option value="Frozen Foods">Frozen Foods</option>
        <option value="Canned Goods">Canned Goods</option>
        <option value="Dry Goods">Dry Goods</option>
        <option value="Beverages">Beverages</option>
        <option value="Snacks">Snacks</option>
        <option value="Household">Household</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
}
