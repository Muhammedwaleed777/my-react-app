import { useState, useEffect } from 'react';
import { getActivityLog } from '../utils/activity';

function UserActivityLog() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setActivities(getActivityLog().slice(0, 10));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🕐 Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center">No activity yet</p>
      ) : (
        <div className="space-y-2">
          {activities.map((act, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span className="text-gray-800 dark:text-white">{act.action}</span>
              <span className="text-sm text-gray-500">{act.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserActivityLog;