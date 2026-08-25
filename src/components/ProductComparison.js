import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ProductComparison({ products, onCompare }) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (product) => {
    if (selected.find(p => p.id === product.id)) {
      setSelected(selected.filter(p => p.id !== product.id));
    } else if (selected.length < 4) {
      setSelected([...selected, product]);
    } else {
      toast.error('Max 4 products to compare');
    }
  };

  const handleCompare = () => {
    if (selected.length < 2) {
      toast.error('Select at least 2 products');
      return;
    }
    onCompare(selected);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📊 Compare Products</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {products.slice(0, 8).map((p) => (
          <button key={p.id} onClick={() => handleSelect(p)} className={`px-3 py-2 rounded-xl text-sm font-bold transition ${selected.find(item => item.id === p.id) ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
            {p.name}
          </button>
        ))}
      </div>
      <motion.button whileHover={{ scale: 1.02 }} onClick={handleCompare} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">
        Compare ({selected.length}/4)
      </motion.button>
    </div>
  );
}

export default ProductComparison;