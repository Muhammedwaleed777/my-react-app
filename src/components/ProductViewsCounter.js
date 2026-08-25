import { useState, useEffect } from 'react';

function ProductViewsCounter({ productId }) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const allViews = JSON.parse(localStorage.getItem('productViews') || '{}');
    setViews(allViews[productId] || 0);
  }, [productId]);

  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      👁️ {views} views
    </div>
  );
}

export default ProductViewsCounter;