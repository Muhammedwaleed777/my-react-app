import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductTags({ productId }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const allTags = JSON.parse(localStorage.getItem('productTags') || '{}');
    setTags(allTags[productId] || ['new', 'popular']);
  }, [productId]);

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, i) => (
        <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold ${tag === 'new' ? 'bg-green-500 text-white' : tag === 'popular' ? 'bg-yellow-500 text-white' : tag === 'sale' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}>
          #{tag}
        </span>
      ))}
    </div>
  );
}

export default ProductTags;