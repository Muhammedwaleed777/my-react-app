import { getStock } from '../utils/stock';

function StockBadge({ productId }) {
  const stock = getStock(productId);
  
  if (stock <= 0) {
    return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">Out of Stock</span>;
  } else if (stock <= 5) {
    return <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">{stock} left</span>;
  } else {
    return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">In Stock</span>;
  }
}

export default StockBadge;