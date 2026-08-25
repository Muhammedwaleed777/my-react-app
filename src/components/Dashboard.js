import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getOrders, getUserOrders } from '../utils/orders';
import { getWalletBalance } from '../utils/wallet';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ActivityLog from './ActivityLog';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletAmount, setWalletAmount] = useState('');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    if (user) {
      let userOrders = [];
      if (user.role === 'admin') {
        userOrders = getOrders();
      } else {
        userOrders = getUserOrders(user.email);
      }
      setOrders(userOrders);
      const balance = getWalletBalance(user.email);
      setWalletBalance(balance);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleRefresh = () => {
    toast.loading('Refreshing...');
    loadData();
    setTimeout(() => {
      toast.dismiss();
      toast.success('✅ Refreshed!');
    }, 500);
  };

  const handleAddMoney = () => {
    if (!walletAmount || parseInt(walletAmount) <= 0) {
      toast.error('Enter valid amount');
      return;
    }
    const amount = parseInt(walletAmount);
    const newBalance = walletBalance + amount;
    if (user?.role === 'admin') {
      localStorage.setItem('adminWalletBalance', String(newBalance));
    } else {
      localStorage.setItem(`walletBalance_${user.email}`, String(newBalance));
    }
    setWalletBalance(newBalance);
    const txKey = user?.role === 'admin' ? 'adminWalletTransactions' : `walletTransactions_${user.email}`;
    const transactions = JSON.parse(localStorage.getItem(txKey) || '[]');
    transactions.unshift({
      id: Date.now(),
      type: 'credit',
      amount: amount,
      description: `💰 Added money to wallet`,
      date: new Date().toISOString(),
      status: 'completed',
    });
    localStorage.setItem(txKey, JSON.stringify(transactions));
    toast.success(`💰 Rs. ${amount} added!`);
    setWalletAmount('');
    setShowAddMoney(false);
  };

  const stats = [
    { icon: '📦', label: 'Orders', value: orders.length, color: 'from-blue-500 to-cyan-500' },
    { icon: '❤️', label: 'Wishlist', value: JSON.parse(localStorage.getItem('wishlist') || '{"items":[]}').items?.length || 0, color: 'from-pink-500 to-rose-500' },
    { icon: '⭐', label: 'Reviews', value: '24', color: 'from-yellow-500 to-orange-500' },
    { icon: '💰', label: 'Wallet', value: `Rs. ${walletBalance.toLocaleString()}`, color: 'from-green-500 to-emerald-500' },
  ];

  const recentOrders = orders.slice(0, 5).map(order => ({
    id: `#${order.id}`,
    product: order.products?.[0]?.name || 'Product',
    date: new Date(order.date).toLocaleDateString(),
    status: order.status,
    amount: `Rs. ${order.total.toLocaleString()}`,
  }));

  const getStatusColor = (status) => {
    const colors = {
      'delivered': 'bg-green-500 text-white',
      'shipping': 'bg-blue-500 text-white',
      'pending': 'bg-yellow-500 text-white',
      'cancelled': 'bg-red-500 text-white',
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const getUserName = () => {
    if (user?.role === 'admin') return 'Muhammad Waleed';
    return user?.name || 'User';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Welcome back, {getUserName()}! 👋
            </h1>
            <p className="text-white/90 mt-2 text-lg">You have {orders.length} orders.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 flex-wrap">
            <button onClick={handleRefresh} className="bg-white/20 text-white px-4 py-2 rounded-xl font-bold hover:bg-white/30 transition flex items-center gap-2">
              🔄 Refresh
            </button>
            <Link to="/profile" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition shadow-lg">
              👤 Profile
            </Link>
            <button onClick={logout} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 hover:scale-105 transition shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-xl hover:scale-105 transition duration-300`}>
            <div className="text-4xl mb-1">{s.icon}</div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-white/90 text-sm font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Wallet */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">💰 Wallet</h3>
            <p className="text-3xl font-bold text-green-600">Rs. {walletBalance.toLocaleString()}</p>
          </div>
          <button onClick={() => setShowAddMoney(!showAddMoney)} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
            ➕ Add Money
          </button>
        </div>
        {showAddMoney && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-wrap gap-3">
            <input type="number" value={walletAmount} onChange={(e) => setWalletAmount(e.target.value)} placeholder="Enter amount" className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button onClick={handleAddMoney} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition">Add</button>
            <button onClick={() => setShowAddMoney(false)} className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-3 rounded-xl font-bold hover:bg-gray-400 transition">Cancel</button>
          </motion.div>
        )}
      </div>

      {/* ===== ACTIVITY LOG ADDED ===== */}
      <div className="mb-6">
        <ActivityLog user={user} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Overview', 'Orders', 'Wishlist', 'Settings'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`px-5 py-3 rounded-xl font-bold text-lg transition ${activeTab === tab.toLowerCase() ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">📋 Recent Orders</h3>
            <span className="text-sm text-gray-500">{orders.length} total orders</span>
          </div>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">No orders yet</p>
              <Link to="/products" className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition">🛍️ Start Shopping</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-gray-600 dark:text-gray-400 font-bold text-lg">Order ID</th>
                    <th className="pb-3 text-gray-600 dark:text-gray-400 font-bold text-lg">Product</th>
                    <th className="pb-3 text-gray-600 dark:text-gray-400 font-bold text-lg">Date</th>
                    <th className="pb-3 text-gray-600 dark:text-gray-400 font-bold text-lg">Status</th>
                    <th className="pb-3 text-gray-600 dark:text-gray-400 font-bold text-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="py-3 text-gray-800 dark:text-white text-lg font-bold">#{order.id}</td>
                      <td className="py-3 text-gray-800 dark:text-white text-lg">{order.products?.[0]?.name || 'Product'}</td>
                      <td className="py-3 text-gray-500 dark:text-gray-400 text-lg">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)} shadow-md`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 text-gray-800 dark:text-white font-bold text-lg">Rs. {order.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📦 All Orders</h3>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex flex-wrap justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <div>
                    <p className="text-gray-800 dark:text-white font-bold text-lg">{order.products?.[0]?.name || 'Product'}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">#{order.id} • {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)} shadow-md`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-gray-800 dark:text-white font-bold text-lg">Rs. {order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">❤️ Wishlist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {['MacBook Pro', 'iPhone 15', 'AirPods Pro', 'Sony Headphones', 'Apple Watch', 'iPad Pro'].map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-600 hover:border-pink-500/50 transition hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="text-4xl mb-2">🛍️</div>
                <p className="text-gray-800 dark:text-white font-bold text-sm">{item}</p>
                <button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-pink-600 transition text-sm shadow-md">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚙️ Settings</h3>
          <div className="space-y-3">
            <button className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition flex justify-between items-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-800 dark:text-white text-lg font-bold">🔐 Change Password</span>
              <span className="text-gray-400 text-xl">→</span>
            </button>
            <button className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition flex justify-between items-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-800 dark:text-white text-lg font-bold">🔔 Notification Settings</span>
              <span className="text-gray-400 text-xl">→</span>
            </button>
            <button className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition flex justify-between items-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-800 dark:text-white text-lg font-bold">🛡️ Privacy Settings</span>
              <span className="text-gray-400 text-xl">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;