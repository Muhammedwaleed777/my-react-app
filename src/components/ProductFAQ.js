import { useState } from 'react';
import { motion } from 'framer-motion';

function ProductFAQ({ productId }) {
  const [faqs, setFaqs] = useState([
    { q: 'Is this product original?', a: 'Yes, we guarantee 100% original products.' },
    { q: 'What is the warranty?', a: '1 year warranty on all electronic products.' },
    { q: 'Can I return this product?', a: 'Yes, you can return within 30 days.' },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">❓ Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-3">
            <p className="font-bold text-gray-800 dark:text-white">{faq.q}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFAQ;