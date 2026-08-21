import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendCode = () => {
    if (!email) { toast.error('Please enter email'); return; }
    toast.success('📧 Reset code sent to your email!');
    setStep(2);
  };

  const handleReset = () => {
    if (!code || !newPassword) { toast.error('Please fill all fields'); return; }
    toast.success('✅ Password reset successful!');
    setStep(1);
    setEmail('');
    setCode('');
    setNewPassword('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🔑 Reset Password</h3>
      
      {step === 1 && (
        <div className="space-y-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <motion.button whileHover={{ scale: 1.02 }} onClick={handleSendCode} className="w-full bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
            Send Reset Code
          </motion.button>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-3">
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-400 transition">Back</button>
            <motion.button whileHover={{ scale: 1.02 }} onClick={handleReset} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition">
              Reset
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;