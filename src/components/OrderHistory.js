import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserOrders, updateOrderStatus } from '../utils/orders';
import { isAdmin } from '../utils/roles';
import PDFInvoice from './InvoicePDF';
import OrderCancel from './OrderCancel';
import OrderStatusTimeline from './OrderStatusTimeline';
import { motion } from 'framer-motion';

function OrderHistory() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.email);
      setOrders(userOrders);
      setLoading(false);
    }
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Please Login</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Login to view your orders.</p>
        <Link to="/login" className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          🔐 Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">No Orders Yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Start shopping to see your orders here.</p>
        <Link to="/products" className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          🛍️ Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📦 My Orders</h1>
        <span className="text-gray-500 text-sm">{orders.length} orders</span>
      </div>
      
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-4"
        >
          <div className="flex flex-wrap justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Order #{order.id}</p>
              <p className="text-gray-800 dark:text-white font-bold">{order.items} items</p>
              <p className="text-green-600 font-bold text-lg">Rs. {order.total.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                order.status === 'delivered' ? 'bg-green-500 text-white' :
                order.status === 'shipping' ? 'bg-blue-500 text-white' :
                order.status === 'pending' ? 'bg-yellow-500 text-white' :
                order.status === 'cancelled' ? 'bg-red-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <p className="text-gray-400 text-sm mt-1">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-4">
            <OrderStatusTimeline status={order.status} />
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="font-bold text-gray-800 dark:text-white text-sm mb-2">Products:</p>
            <div className="flex flex-wrap gap-2">
              {order.products?.map((item) => (
                <span key={item.id} className="bg-white dark:bg-gray-600 px-3 py-1 rounded-full text-sm">
                  {item.image} {item.name} x{item.quantity}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {/* ===== PDF INVOICE ADDED ===== */}
            <PDFInvoice order={order} />
            <OrderCancel orderId={order.id} currentStatus={order.status} />
            
            {order.shipping && (
              <button
                onClick={() => alert(`Address: ${order.shipping.address}, ${order.shipping.city}`)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                📍 Address
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default OrderHistory;