import { useState } from 'react';
import { motion } from 'framer-motion';

function ProductFilters({ onFilter, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">🔍 Filters</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setSelectedCategory('all'); onFilter('all', priceRange); }} className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>All</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); onFilter(cat.id, priceRange); }} className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === cat.id ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{cat.icon} {cat.name}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Max Price: <span className="font-bold text-indigo-500">Rs. {priceRange[1]}</span></p>
        <input type="range" min="0" max="50000" step="1000" value={priceRange[1]} onChange={(e) => { setPriceRange([0, parseInt(e.target.value)]); onFilter(selectedCategory, [0, parseInt(e.target.value)]); }} className="w-full accent-indigo-500" />
      </div>
    </motion.div>
  );
}

export default ProductFilters;