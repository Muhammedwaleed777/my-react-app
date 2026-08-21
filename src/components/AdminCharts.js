import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function AdminCharts({ orders }) {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    monthlyData: [],
  });

  useEffect(() => {
    if (orders.length > 0) {
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      const pending = orders.filter(o => o.status === 'pending').length;
      const delivered = orders.filter(o => o.status === 'delivered').length;
      
      // Monthly data
      const months = {};
      orders.forEach(o => {
        const month = new Date(o.date).toLocaleString('default', { month: 'short' });
        months[month] = (months[month] || 0) + 1;
      });
      
      setStats({
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders: pending,
        deliveredOrders: delivered,
        monthlyData: Object.entries(months).map(([month, count]) => ({ month, count })),
      });
    }
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📊 Analytics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-green-600">Rs. {stats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Revenue</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.deliveredOrders}</p>
          <p className="text-sm text-gray-500">Delivered</p>
        </div>
      </div>

      {/* Monthly Chart */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Monthly Orders</p>
        <div className="flex items-end gap-2 h-32">
          {stats.monthlyData.map((item, i) => {
            const max = Math.max(...stats.monthlyData.map(d => d.count), 1);
            const height = (item.count / max) * 100;
            return (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg relative"
                style={{ height: `${Math.max(height, 5)}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">{item.count}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          {stats.monthlyData.map((item, i) => (
            <span key={i} className="text-xs text-gray-400">{item.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminCharts;