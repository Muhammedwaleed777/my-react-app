import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateOrderStatus } from '../utils/orders';
import toast from 'react-hot-toast';

function OrderCancel({ orderId, currentStatus }) {
  const [loading, setLoading] = useState(false);

  if (currentStatus === 'delivered' || currentStatus === 'cancelled') {
    return null;
  }

  const handleCancel = () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setLoading(true);
    setTimeout(() => {
      updateOrderStatus(orderId, 'cancelled');
      setLoading(false);
      toast.success('✅ Order cancelled!');
    }, 1000);
  };

  return (
    <motion.button whileHover={{ scale: 1.05 }} onClick={handleCancel} disabled={loading} className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600 transition disabled:opacity-50">
      {loading ? 'Cancelling...' : '❌ Cancel Order'}
    </motion.button>
  );
}

export default OrderCancel;