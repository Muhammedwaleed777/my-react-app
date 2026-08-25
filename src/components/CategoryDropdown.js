import { useState } from 'react';

function CategoryDropdown({ categories, onSelect }) {
  const [selected, setSelected] = useState('all');

  const handleChange = (e) => {
    setSelected(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-gray-700 dark:text-gray-300 font-medium">Category:</label>
      <select value={selected} onChange={handleChange} className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;