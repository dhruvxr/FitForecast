

import React from 'react';
import ItemList from './item-list'; 

console.log("DEBUG: ItemList =", ItemList);

const Page = () => {
  return (
    <div>
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping List</h1>
      <ItemList />
    </main>
    </div>
  );
};

export default Page;
