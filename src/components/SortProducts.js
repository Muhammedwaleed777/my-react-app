import { useState } from 'react';

function SortProducts({ onSort }) {
  const [sortBy, setSortBy] = useState('default');

  const handleSort = (value) => {
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-gray-700 dark:text-gray-300 font-medium">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}

export default SortProducts;