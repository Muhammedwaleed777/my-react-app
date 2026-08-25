import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SocialLogin({ onLogin }) {
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    toast.loading(`Connecting to ${provider}...`);
    setTimeout(() => {
      toast.dismiss();
      const userData = {
        name: `${provider} User`,
        email: `${provider.toLowerCase()}@user.com`,
        role: 'user',
      };
      onLogin(userData);
      toast.success(`✅ Logged in with ${provider}!`);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm">Or continue with</p>
      <div className="flex gap-3 justify-center">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSocialLogin('Google')} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition flex-1 justify-center">
          <span className="text-2xl">🔴</span> Google
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSocialLogin('Facebook')} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition flex-1 justify-center">
          <span className="text-2xl">📘</span> Facebook
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSocialLogin('Apple')} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition flex-1 justify-center">
          <span className="text-2xl">🍎</span> Apple
        </motion.button>
      </div>
    </div>
  );
}

export default SocialLogin;