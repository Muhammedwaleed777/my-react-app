import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { 
  getWalletBalance, 
  addToWallet, 
  getWalletTransactions, 
  getTotalDeposits 
} from '../utils/wallet';

function UserWallet() {
  const { user, isLoggedIn, isGuest } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  
  // ===== User Specific Wallet State =====
  const [balance, setBalance] = useState(() => {
    return getWalletBalance(user?.email);
  });
  const [transactions, setTransactions] = useState(() => {
    return getWalletTransactions(user?.email);
  });
  const [totalDeposits, setTotalDeposits] = useState(() => {
    return getTotalDeposits(user?.email);
  });

  const [amount, setAmount] = useState('');
  const [showBalance, setShowBalance] = useState(() => {
    return localStorage.getItem('showWalletBalance') !== 'false';
  });
  const [activeTab, setActiveTab] = useState('balance');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });
  const [mobilePayment, setMobilePayment] = useState({
    phoneNumber: '',
    transactionId: '',
  });
  const [showCardForm, setShowCardForm] = useState(false);

  // Save show balance preference
  useEffect(() => {
    localStorage.setItem('showWalletBalance', String(showBalance));
  }, [showBalance]);

  // Update wallet data when user changes
  useEffect(() => {
    if (user) {
      setBalance(getWalletBalance(user.email));
      setTransactions(getWalletTransactions(user.email));
      setTotalDeposits(getTotalDeposits(user.email));
    }
  }, [user]);

  // Quick Amounts
  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  // Handle Card Input Change
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }
    if (name === 'cvv') {
      if (value.length > 3) return;
      formattedValue = value.replace(/\D/g, '');
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  // Handle Mobile Payment Change
  const handleMobileChange = (e) => {
    const { name, value } = e.target;
    setMobilePayment({ ...mobilePayment, [name]: value });
  };

  // ===== HANDLE TOP UP =====
  const handleTopUp = () => {
    const amountToAdd = selectedAmount || parseInt(amount);
    
    if (!amountToAdd || amountToAdd <= 0) {
      toast.error('Please select or enter a valid amount');
      return;
    }
    if (amountToAdd < 100) {
      toast.error('Minimum amount is Rs. 100');
      return;
    }

    if (paymentMethod === 'card') {
      const cardNum = cardDetails.cardNumber.replace(/\s/g, '');
      if (cardNum.length < 16) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      if (cardDetails.expiry.length < 5) {
        toast.error('Please enter valid expiry date (MM/YY)');
        return;
      }
      if (cardDetails.cvv.length < 3) {
        toast.error('Please enter valid 3-digit CVV');
        return;
      }
      if (!cardDetails.cardName.trim()) {
        toast.error('Please enter card holder name');
        return;
      }
    }

    if (paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') {
      if (!mobilePayment.phoneNumber || mobilePayment.phoneNumber.length < 10) {
        toast.error('Please enter a valid phone number');
        return;
      }
      if (!mobilePayment.transactionId) {
        toast.error('Please enter transaction ID');
        return;
      }
    }

    setIsLoading(true);
    
    setTimeout(() => {
      // Add to wallet using user email
      const newBalance = addToWallet(amountToAdd, user?.email);
      setBalance(newBalance);
      setTransactions(getWalletTransactions(user?.email));
      setTotalDeposits(getTotalDeposits(user?.email));
      
      const methodNames = {
        card: '💳 Card',
        easypaisa: '📱 EasyPaisa',
        jazzcash: '📱 JazzCash',
      };

      toast.success(`✅ Rs. ${amountToAdd.toLocaleString()} added via ${methodNames[paymentMethod]}!`);
      
      setAmount('');
      setSelectedAmount(null);
      setCardDetails({ cardNumber: '', expiry: '', cvv: '', cardName: '' });
      setMobilePayment({ phoneNumber: '', transactionId: '' });
      setShowCardForm(false);
      setIsLoading(false);
      
    }, 2000);
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
    toast.success(showBalance ? '👁️ Balance hidden' : '👁️ Balance visible');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // If not logged in
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Please Login</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Login to view your wallet.</p>
      </div>
    );
  }

  // Guest cannot access wallet
  if (isGuest) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Guest User</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Please register to access wallet features.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {isAdmin ? '⚙️ Admin Wallet' : '💰 My Wallet'}
          </h1>
          <button
            onClick={toggleBalanceVisibility}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {showBalance ? '👁️' : '🙈'}
          </button>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`rounded-2xl p-8 text-white mb-6 shadow-xl ${
            isAdmin 
              ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500'
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
          }`}
        >
          <p className="text-white/80 text-sm">{isAdmin ? 'Admin Balance' : 'Available Balance'}</p>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-5xl font-bold">
              {showBalance ? `Rs. ${balance.toLocaleString()}` : '••••••'}
            </p>
            <button
              onClick={toggleBalanceVisibility}
              className="bg-white/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/30 transition"
            >
              {showBalance ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 px-4 py-2 rounded-xl">
              <p className="text-sm text-white/80">Total Deposits</p>
              <p className="font-bold">{showBalance ? `Rs. ${totalDeposits.toLocaleString()}` : '••••••'}</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-xl">
              <p className="text-sm text-white/80">Transactions</p>
              <p className="font-bold">{transactions.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'balance', icon: '💰', label: 'Balance' },
            { id: 'add', icon: '➕', label: 'Top Up' },
            { id: 'transactions', icon: '📋', label: 'History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ===== TOP UP TAB ===== */}
        {activeTab === 'add' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Amount Buttons */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">Quick Select Amount</p>
              <div className="flex flex-wrap gap-3">
                {quickAmounts.map((val) => (
                  <motion.button
                    key={val}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAmount(val);
                      setAmount('');
                    }}
                    className={`px-6 py-3 rounded-xl font-bold transition ${
                      selectedAmount === val
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Rs. {val.toLocaleString()}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">Custom Amount</p>
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rs.</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount (min Rs. 100)"
                  className="w-full pl-12 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg"
                  min="100"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">Select Payment Method</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => { setPaymentMethod('card'); setShowCardForm(true); }}
                  className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <span className="text-3xl">💳</span>
                  <p className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>Card</p>
                </button>
                <button
                  onClick={() => { setPaymentMethod('easypaisa'); setShowCardForm(false); }}
                  className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'easypaisa'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <span className="text-3xl">📱</span>
                  <p className={`text-sm font-bold ${paymentMethod === 'easypaisa' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>EasyPaisa</p>
                </button>
                <button
                  onClick={() => { setPaymentMethod('jazzcash'); setShowCardForm(false); }}
                  className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'jazzcash'
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <span className="text-3xl">📱</span>
                  <p className={`text-sm font-bold ${paymentMethod === 'jazzcash' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>JazzCash</p>
                </button>
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && showCardForm && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">💳 Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Card Number</label>
                    <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} placeholder="1234 5678 9012 3456" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-lg" maxLength="19" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Card Holder Name</label>
                    <input type="text" name="cardName" value={cardDetails.cardName} onChange={handleCardChange} placeholder="John Doe" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Expiry Date</label>
                      <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} placeholder="MM/YY" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" maxLength="5" />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">CVV</label>
                      <input type="password" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} placeholder="123" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" maxLength="3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* EasyPaisa / JazzCash Form */}
            {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-xl border ${
                paymentMethod === 'easypaisa' 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className={`font-bold ${paymentMethod === 'easypaisa' ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
                      {paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}
                    </p>
                    <p className={`text-sm ${paymentMethod === 'easypaisa' ? 'text-green-600 dark:text-green-300' : 'text-orange-600 dark:text-orange-300'}`}>
                      Send payment to: <strong>0348-4974289</strong>
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Phone Number</label>
                    <input type="text" name="phoneNumber" value={mobilePayment.phoneNumber} onChange={handleMobileChange} placeholder="03XX-XXXXXXX" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Transaction ID</label>
                    <input type="text" name="transactionId" value={mobilePayment.transactionId} onChange={handleMobileChange} placeholder="Enter transaction ID" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Top Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTopUp}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `💰 Top Up Rs. ${(selectedAmount || parseInt(amount) || 0).toLocaleString()}`
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Balance Tab */}
        {activeTab === 'balance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Current Balance</p>
                <p className="text-3xl font-bold text-green-600">
                  {showBalance ? `Rs. ${balance.toLocaleString()}` : '••••••'}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Deposits</p>
                <p className="text-3xl font-bold text-purple-600">
                  {showBalance ? `Rs. ${totalDeposits.toLocaleString()}` : '••••••'}
                </p>
              </div>
            </div>
            <button onClick={() => setActiveTab('add')} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
              💰 Top Up Wallet
            </button>
          </motion.div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-h-80 overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500 text-lg">No transactions yet</p>
                <button onClick={() => setActiveTab('add')} className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition">💰 Top Up Now</button>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx, index) => (
                  <motion.div key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">{tx.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(tx.date)}</p>
                      {tx.method && <span className="text-xs text-blue-500">{tx.method}</span>}
                    </div>
                    <div className="text-right">
                      <span className={`font-bold text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'credit' ? '+' : '-'} Rs. {tx.amount.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default UserWallet;