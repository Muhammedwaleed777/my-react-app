import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ReturnRequest({ orderId }) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!reason) { toast.error('Please select a reason'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('✅ Return request submitted!');
      setReason('');
    }, 1500);
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
      <h4 className="font-bold text-gray-800 dark:text-white mb-2">🔄 Return Request</h4>
      <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white mb-2 focus:ring-2 focus:ring-indigo-500 outline-none">
        <option value="">Select reason</option>
        <option value="damaged">Damaged product</option>
        <option value="wrong">Wrong product</option>
        <option value="not-satisfied">Not satisfied</option>
        <option value="other">Other</option>
      </select>
      <motion.button whileHover={{ scale: 1.02 }} onClick={handleSubmit} disabled={loading} className="w-full bg-yellow-500 text-white py-2 rounded-xl font-bold hover:bg-yellow-600 transition disabled:opacity-50">
        {loading ? 'Submitting...' : 'Submit Return'}
      </motion.button>
    </div>
  );
}

export default ReturnRequest;