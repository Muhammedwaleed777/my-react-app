import { useState } from 'react';
import { motion } from 'framer-motion';

function StarRating({ rating, onRatingChange, size = 'text-2xl' }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none"
        >
          <span className={`${size} ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
            ⭐
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default StarRating;