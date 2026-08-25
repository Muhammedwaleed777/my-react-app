import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function ProductCarousel({ products }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">{products[current].name}</h2>
            <p className="text-white/80 text-lg">Rs. {products[current].price}</p>
            <Link to={`/product/${products[current].id}`} className="inline-block mt-4 bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold hover:shadow-lg transition">
              Shop Now
            </Link>
          </div>
          <div className="text-8xl">{products[current].image}</div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex gap-2 justify-center mt-4">
        {products.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-white w-6' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;