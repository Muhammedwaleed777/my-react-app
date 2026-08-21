import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ProductShare({ product }) {
  const url = window.location.href;
  const text = `Check out ${product.name} at ShopApp! 🛍️`;

  const shareLinks = [
    { name: 'WhatsApp', icon: '💬', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}` },
    { name: 'Facebook', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { name: 'Copy Link', icon: '📋', url: '#', onClick: () => { navigator.clipboard.writeText(url); toast.success('✅ Link copied!'); } },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {shareLinks.map((link, i) => (
        <motion.a
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={link.onClick}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-1 text-sm"
        >
          <span>{link.icon}</span>
          <span className="hidden sm:inline">{link.name}</span>
        </motion.a>
      ))}
    </div>
  );
}

export default ProductShare;