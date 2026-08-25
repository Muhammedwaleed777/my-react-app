import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductRecommendations({ currentProduct, allProducts }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (currentProduct && allProducts.length > 0) {
      const related = allProducts
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
      setRecommendations(related);
    }
  }, [currentProduct, allProducts]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔄 You May Also Like</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recommendations.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <Link to={`/product/${p.id}`}>
              <div className="text-4xl">{p.image}</div>
              <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{p.name}</p>
              <p className="text-green-600 font-bold">Rs. {p.price}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ProductRecommendations;