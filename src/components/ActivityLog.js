import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ActivityLog({ user }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (user) {
      const log = JSON.parse(localStorage.getItem(`activity_${user.email}`) || '[]');
      setActivities(log.slice(0, 10));
    }
  }, [user]);

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-500">No activity yet</p>
      </div>
    );
  }

  const getIcon = (action) => {
    if (action.includes('Login')) return '🔐';
    if (action.includes('Order')) return '📦';
    if (action.includes('Review')) return '⭐';
    if (action.includes('Wishlist')) return '❤️';
    return '📌';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🕐 Recent Activity</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {activities.map((act, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xl">{getIcon(act.action)}</span>
              <span className="text-gray-800 dark:text-white">{act.action}</span>
            </div>
            <span className="text-sm text-gray-500">{act.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ActivityLog;