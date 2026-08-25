import { motion } from 'framer-motion';

function UserCharts({ orders }) {
  const totalOrders = orders.length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const shipping = orders.filter(o => o.status === 'shipping').length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: 'Total Orders', value: totalOrders, color: 'bg-indigo-500' },
    { label: 'Delivered', value: delivered, color: 'bg-green-500' },
    { label: 'Pending', value: pending, color: 'bg-yellow-500' },
    { label: 'Shipping', value: shipping, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📊 Order Analytics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className={`text-2xl font-bold ${s.color.replace('bg-', 'text-')}`}>{s.value}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
      
      <div>
        <p className="text-gray-700 dark:text-gray-300">Total Spent: <span className="font-bold text-green-600">Rs. {totalSpent.toLocaleString()}</span></p>
      </div>
    </div>
  );
}

export default UserCharts;