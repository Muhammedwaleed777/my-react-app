import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function DailyDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const discounted = products.slice(0, 4).map(p => ({
      ...p,
      originalPrice: p.price,
      discount: Math.floor(Math.random() * 30) + 10,
      price: Math.floor(p.price * (1 - (Math.random() * 0.3 + 0.1))),
    }));
    setDeals(discounted);
  }, []);

  if (deals.length === 0) return null;

  // Handle Shop Now Click
  const handleShopNow = (product) => {
    // Product details page par redirect
    window.location.href = `/product/${product.id}`;
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔥 Daily Deals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {deals.map((deal, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border-2 border-red-500 text-center relative"
          >
            <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              {deal.discount}% OFF
            </span>
            <div className="text-4xl">{deal.image}</div>
            <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{deal.name}</p>
            <p className="text-green-600 font-bold">Rs. {deal.price}</p>
            <p className="text-gray-400 text-xs line-through">Rs. {deal.originalPrice}</p>
            
            {/* ===== SHOP NOW BUTTON - FIXED ===== */}
            <Link
              to={`/product/${deal.id}`}
              className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition w-full"
            >
              🛒 Shop Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DailyDeals;