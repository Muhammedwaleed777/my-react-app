import { motion } from 'framer-motion';

function OrderStatusTimeline({ status }) {
  const steps = [
    { key: 'pending', label: 'Order Placed', icon: '📋' },
    { key: 'confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'shipping', label: 'Shipping', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', icon: '📦' },
  ];

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              i <= currentIndex ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
            }`}
          >
            {step.icon}
          </motion.div>
          <span className={`text-xs ${i <= currentIndex ? 'text-gray-800 dark:text-white font-bold' : 'text-gray-400'}`}>
            {step.label}
          </span>
          {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < currentIndex ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />}
        </div>
      ))}
    </div>
  );
}

export default OrderStatusTimeline;