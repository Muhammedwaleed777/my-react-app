import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ProductExport() {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      let csv = 'ID,Name,Price,Category\n';
      products.forEach(p => {
        csv += `${p.id},${p.name},${p.price},${p.category}\n`;
      });
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products.csv';
      a.click();
      URL.revokeObjectURL(url);
      
      setLoading(false);
      toast.success('📊 Products exported!');
    }, 1000);
  };

  return (
    <motion.button whileHover={{ scale: 1.05 }} onClick={handleExport} disabled={loading} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition disabled:opacity-50">
      {loading ? 'Exporting...' : '📊 Export Products'}
    </motion.button>
  );
}

export default ProductExport;