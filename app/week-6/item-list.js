"use client";

import React, { useState } from 'react';
import Item from './item'; // Correct the path to Item component
import items from './items.json'; // Correct path for the JSON file

const ItemList = () => {
  const [sortBy, setSortBy] = useState('name');

  // Sorting the items based on the selected sort criteria
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div style={styles.itemListContainer}>
      <div style={styles.sortButtons}>
        <button
          onClick={() => setSortBy('name')}
          style={{
            ...styles.sortButton,
            backgroundColor: sortBy === 'name' ? '#3B82F6' : '#E5E7EB',
            color: sortBy === 'name' ? 'white' : 'black',
          }}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy('category')}
          style={{
            ...styles.sortButton,
            backgroundColor: sortBy === 'category' ? '#3B82F6' : '#E5E7EB',
            color: sortBy === 'category' ? 'white' : 'black',
          }}
        >
          Sort by Category
        </button>
      </div>

      <ul style={styles.itemList}>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
};

const styles = {
  itemListContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  sortButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  sortButton: {
    padding: '10px 20px',
    marginRight: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  itemList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
};

export default ItemList;
