import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function PaymentGateway({ amount, onSuccess }) {
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    phoneNumber: '',
    transactionId: '',
  });

  const paymentMethods = [
    { id: 'card', icon: '💳', name: 'Card', color: 'indigo' },
    { id: 'easypaisa', icon: '📱', name: 'EasyPaisa', color: 'green' },
    { id: 'jazzcash', icon: '📱', name: 'JazzCash', color: 'orange' },
    { id: 'wallet', icon: '💰', name: 'Wallet', color: 'purple' },
  ];

  const handlePayment = () => {
    if (method === 'card') {
      if (form.cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Enter valid 16-digit card number');
        return;
      }
    }
    if (method === 'easypaisa' || method === 'jazzcash') {
      if (!form.phoneNumber || !form.transactionId) {
        toast.error('Fill all payment details');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('✅ Payment successful!');
      if (onSuccess) onSuccess();
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">💳 Payment</h3>
      <p className="text-2xl font-bold text-green-600 mb-4">Amount: Rs. {amount.toLocaleString()}</p>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {paymentMethods.map((m) => (
          <button key={m.id} onClick={() => setMethod(m.id)} className={`p-3 rounded-xl border-2 transition ${method === m.id ? `border-${m.color}-500 bg-${m.color}-50 dark:bg-${m.color}-900/20` : 'border-gray-300 dark:border-gray-600'}`}>
            <div className="text-2xl">{m.icon}</div>
            <p className={`text-xs font-bold ${method === m.id ? `text-${m.color}-600` : 'text-gray-500'}`}>{m.name}</p>
          </button>
        ))}
      </div>

      {method === 'card' && (
        <div className="space-y-3">
          <input type="text" placeholder="Card Number" onChange={(e) => setForm({...form, cardNumber: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <div className="flex gap-3">
            <input type="text" placeholder="MM/YY" onChange={(e) => setForm({...form, expiry: e.target.value})} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input type="password" placeholder="CVV" onChange={(e) => setForm({...form, cvv: e.target.value})} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" maxLength="3" />
          </div>
        </div>
      )}

      {(method === 'easypaisa' || method === 'jazzcash') && (
        <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <p className="text-green-700 dark:text-green-400 text-sm">Send payment to: <strong>0348-4974289</strong></p>
          <input type="text" placeholder="Phone Number" onChange={(e) => setForm({...form, phoneNumber: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input type="text" placeholder="Transaction ID" onChange={(e) => setForm({...form, transactionId: e.target.value})} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
      )}

      {method === 'wallet' && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <p className="text-purple-700 dark:text-purple-400">💰 Wallet Balance: Rs. {parseInt(localStorage.getItem('walletBalance') || '0').toLocaleString()}</p>
        </div>
      )}

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handlePayment} disabled={loading} className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 transition">
        {loading ? 'Processing...' : '✅ Pay Now'}
      </motion.button>
    </div>
  );
}

export default PaymentGateway;