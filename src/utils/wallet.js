// ===== WALLET UTILITIES =====

// Get user role from localStorage
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role || 'guest';
};

// Get current user email
const getUserEmail = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.email || 'guest@shopapp.com';
};

// ===== GET WALLET BALANCE (User Specific) =====
export const getWalletBalance = (email = null) => {
  const userEmail = email || getUserEmail();
  const role = getUserRole();
  
  // Admin gets admin wallet, User gets user wallet
  if (role === 'admin') {
    return parseInt(localStorage.getItem('adminWalletBalance') || '0');
  }
  return parseInt(localStorage.getItem(`walletBalance_${userEmail}`) || '0');
};

// ===== ADD TO WALLET (User Specific) =====
export const addToWallet = (amount, email = null) => {
  const userEmail = email || getUserEmail();
  const role = getUserRole();
  
  if (role === 'admin') {
    const current = parseInt(localStorage.getItem('adminWalletBalance') || '0');
    const newBalance = current + amount;
    localStorage.setItem('adminWalletBalance', String(newBalance));
    
    // Add admin transaction
    const transactions = JSON.parse(localStorage.getItem('adminWalletTransactions') || '[]');
    const newTransaction = {
      id: Date.now(),
      type: 'credit',
      amount: amount,
      description: `💰 Admin Top Up - Rs. ${amount.toLocaleString()}`,
      date: new Date().toISOString(),
      status: 'completed',
    };
    transactions.unshift(newTransaction);
    localStorage.setItem('adminWalletTransactions', JSON.stringify(transactions));
    return newBalance;
  }
  
  const current = parseInt(localStorage.getItem(`walletBalance_${userEmail}`) || '0');
  const newBalance = current + amount;
  localStorage.setItem(`walletBalance_${userEmail}`, String(newBalance));
  
  // Add user transaction
  const transactions = JSON.parse(localStorage.getItem(`walletTransactions_${userEmail}`) || '[]');
  const newTransaction = {
    id: Date.now(),
    type: 'credit',
    amount: amount,
    description: `💰 Top Up - Rs. ${amount.toLocaleString()}`,
    date: new Date().toISOString(),
    status: 'completed',
  };
  transactions.unshift(newTransaction);
  localStorage.setItem(`walletTransactions_${userEmail}`, JSON.stringify(transactions));
  return newBalance;
};

// ===== DEDUCT FROM WALLET (User Specific) =====
export const deductFromWallet = (amount, email = null) => {
  const userEmail = email || getUserEmail();
  const role = getUserRole();
  
  if (role === 'admin') {
    const current = parseInt(localStorage.getItem('adminWalletBalance') || '0');
    if (current < amount) return false;
    const newBalance = current - amount;
    localStorage.setItem('adminWalletBalance', String(newBalance));
    return true;
  }
  
  const current = parseInt(localStorage.getItem(`walletBalance_${userEmail}`) || '0');
  if (current < amount) return false;
  const newBalance = current - amount;
  localStorage.setItem(`walletBalance_${userEmail}`, String(newBalance));
  return true;
};

// ===== GET TRANSACTIONS (User Specific) =====
export const getWalletTransactions = (email = null) => {
  const userEmail = email || getUserEmail();
  const role = getUserRole();
  
  if (role === 'admin') {
    return JSON.parse(localStorage.getItem('adminWalletTransactions') || '[]');
  }
  return JSON.parse(localStorage.getItem(`walletTransactions_${userEmail}`) || '[]');
};

// ===== GET TOTAL DEPOSITS (User Specific) =====
export const getTotalDeposits = (email = null) => {
  const transactions = getWalletTransactions(email);
  return transactions
    .filter(tx => tx.type === 'credit')
    .reduce((sum, tx) => sum + tx.amount, 0);
};