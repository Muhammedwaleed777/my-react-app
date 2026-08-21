import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Coupon({ onApply }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const coupons = {
    'SAVE10': { discount: 10, label: '10% OFF' },
    'SAVE20': { discount: 20, label: '20% OFF' },
    'FREESHIP': { discount: 0, label: 'Free Shipping' },
  };

  const handleApply = () => {
    if (!code) { toast.error('Please enter a coupon code!'); return; }
    const coupon = coupons[code.toUpperCase()];
    if (coupon) {
      setIsLoading(true);
      setTimeout(() => {
        toast.success(`✅ Coupon "${code.toUpperCase()}" applied! ${coupon.label}`);
        if (onApply) onApply(coupon);
        setCode('');
        setIsLoading(false);
      }, 800);
    } else {
      toast.error('❌ Invalid coupon code!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">🎫 Apply Coupon</h3>
      <div className="flex gap-3">
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter coupon code" className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none uppercase" />
        <button onClick={handleApply} disabled={isLoading} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition disabled:opacity-50">
          {isLoading ? 'Applying...' : 'Apply'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">Try: SAVE10, SAVE20, FREESHIP</span>
      </div>
    </div>
  );
}

export default Coupon;