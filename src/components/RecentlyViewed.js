import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecentlyViewed, clearRecentlyViewed } from '../utils/recentlyViewed';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function RecentlyViewed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">👀 Recently Viewed</h2>
        <button onClick={() => { clearRecentlyViewed(); setItems([]); toast.error('Cleared'); }} className="text-sm text-red-500 hover:text-red-600">Clear</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <motion.div key={item.id} whileHover={{ scale: 1.05 }} className="min-w-[150px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <Link to={`/product/${item.id}`}>
              <div className="text-4xl">{item.image}</div>
              <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{item.name}</p>
              <p className="text-green-600 font-bold text-sm">Rs. {item.price}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;