import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function EmailVerification({ email }) {
  const [verified, setVerified] = useState(localStorage.getItem(`verified_${email}`) === 'true');

  const handleVerify = () => {
    toast.loading('Sending verification email...');
    setTimeout(() => {
      toast.dismiss();
      localStorage.setItem(`verified_${email}`, 'true');
      setVerified(true);
      toast.success('✅ Email verified!');
    }, 2000);
  };

  if (verified) {
    return <span className="text-green-500 font-bold">✅ Verified</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-yellow-500">⚠️ Not verified</span>
      <motion.button whileHover={{ scale: 1.05 }} onClick={handleVerify} className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-600 transition">
        Verify Email
      </motion.button>
    </div>
  );
}

export default EmailVerification;