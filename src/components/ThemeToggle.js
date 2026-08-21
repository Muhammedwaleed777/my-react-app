import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {darkMode ? <span className="text-2xl">☀️</span> : <span className="text-2xl">🌙</span>}
    </motion.button>
  );
}

export default ThemeToggle;