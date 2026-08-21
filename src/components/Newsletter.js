import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email!'); return; }
    setIsLoading(true);
    setTimeout(() => {
      toast.success('✅ Subscribed successfully!');
      setEmail('');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 mt-8">
      <div className="container mx-auto px-4 text-center text-white">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-2">📧 Subscribe to Our Newsletter</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/80 mb-6">Get the latest updates and exclusive offers directly in your inbox.</motion.p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 p-3 rounded-xl text-gray-800 bg-white/20 backdrop-blur-sm border border-white/30 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" required />
          <button type="submit" disabled={isLoading} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition disabled:opacity-50">
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;