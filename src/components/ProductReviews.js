import { useState } from 'react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState(() => {
    const data = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
    return data;
  });
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      toast.error('Please fill all fields!');
      return;
    }
    const review = { ...newReview, date: new Date().toISOString().split('T')[0], id: Date.now() };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
    setNewReview({ name: '', comment: '', rating: 5 });
    setShowForm(false);
    toast.success('✅ Review added!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">⭐ Reviews</h3>
        {reviews.length > 0 && (
          <span className="text-yellow-400 text-xl font-bold">{averageRating} ★</span>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {reviews.length} review{reviews.length > 1 ? 's' : ''}
        </div>
      )}

      <button 
        onClick={() => setShowForm(!showForm)} 
        className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition"
      >
        {showForm ? '✕ Close' : '✍️ Write a Review'}
      </button>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <input type="text" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} placeholder="Your Name" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white mb-3 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          <div className="mb-3"><StarRating rating={newReview.rating} onRatingChange={(r) => setNewReview({...newReview, rating: r})} size="text-3xl" /></div>
          <textarea value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} placeholder="Write your review..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white mb-3 focus:ring-2 focus:ring-indigo-500 outline-none" rows="3" required />
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition">Submit Review</button>
        </motion.form>
      )}

      <div className="space-y-3">
        {reviews.slice(0, 5).map((review) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{review.name}</p>
                <StarRating rating={review.rating} size="text-lg" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{review.comment}</p>
          </motion.div>
        ))}
        {reviews.length > 5 && <p className="text-center text-gray-500 text-sm">+ {reviews.length - 5} more reviews</p>}
      </div>
    </div>
  );
}

export default ProductReviews;