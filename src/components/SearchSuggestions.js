import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchSuggestions({ query, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    setSuggestions(filtered);
  }, [query]);

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
      {suggestions.map((item) => (
        <Link
          key={item.id}
          to={`/product/${item.id}`}
          onClick={() => onSelect(item)}
          className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition border-b border-gray-100 dark:border-gray-700 last:border-0"
        >
          <span className="text-2xl">{item.image}</span>
          <div>
            <p className="font-bold text-gray-800 dark:text-white">{item.name}</p>
            <p className="text-green-600 font-bold text-sm">Rs. {item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchSuggestions;