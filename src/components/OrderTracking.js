import { useState } from 'react';
import { motion } from 'framer-motion';

function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) return;
    setTracking({
      status: 'shipped',
      steps: [
        { label: 'Order Placed', date: '2026-08-20 10:30 AM', completed: true },
        { label: 'Order Confirmed', date: '2026-08-20 02:00 PM', completed: true },
        { label: 'Shipped', date: '2026-08-21 09:00 AM', completed: true },
        { label: 'Out for Delivery', date: '2026-08-22 08:00 AM', completed: false },
        { label: 'Delivered', date: '2026-08-22 06:00 PM', completed: false },
      ],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">📦 Track Order</h1>
      <form onSubmit={handleTrack} className="flex gap-4 mb-8">
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter Order ID (e.g., #1234)" className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
        <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">Track</button>
      </form>
      {tracking && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Order #{orderId}</h3>
          <div className="space-y-4">
            {tracking.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    {step.completed ? '✓' : '○'}
                  </div>
                  {index < tracking.steps.length - 1 && <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>}
                </div>
                <div>
                  <p className={`font-semibold ${step.completed ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default OrderTracking;