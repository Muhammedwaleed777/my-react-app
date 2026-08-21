import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ReviewWithImage({ productId }) {
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(`reviews_img_${productId}`) || '[]');
  });
  const [form, setForm] = useState({ name: '', rating: 5, comment: '', image: '' });
  const [showForm, setShowForm] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast.error('Image size should be less than 1MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setForm({ ...form, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.name || !form.comment) {
      toast.error('Please fill all fields');
      return;
    }
    const newReview = { ...form, id: Date.now(), date: new Date().toISOString() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_img_${productId}`, JSON.stringify(updated));
    setForm({ name: '', rating: 5, comment: '', image: '' });
    setShowForm(false);
    toast.success('✅ Review added!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">⭐ Reviews</h3>
        <button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          {showForm ? '✕ Close' : '✍️ Write Review'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl mb-4">
          <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your Name" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white mb-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map((star) => (
              <button key={star} onClick={() => setForm({...form, rating: star})} className="text-3xl focus:outline-none">
                <span className={star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
              </button>
            ))}
          </div>
          <textarea value={form.comment} onChange={(e) => setForm({...form, comment: e.target.value})} placeholder="Write your review..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white mb-3 focus:ring-2 focus:ring-indigo-500 outline-none" rows="3" />
          <div className="flex gap-3">
            <label className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-300 transition">
              📷 Add Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {form.image && <img src={form.image} alt="Review" className="w-12 h-12 rounded object-cover" />}
          </div>
          <button onClick={handleSubmit} className="mt-3 bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition">Submit Review</button>
        </motion.div>
      )}

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {reviews.map((r) => (
          <div key={r.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{r.name}</p>
                <div className="flex gap-1">{Array(r.rating).fill('⭐')}</div>
              </div>
              <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{r.comment}</p>
            {r.image && <img src={r.image} alt="Review" className="mt-2 w-20 h-20 rounded object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewWithImage;