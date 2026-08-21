import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import StockBadge from './StockBadge';
import StarRating from './StarRating';
import SearchSuggestions from './SearchSuggestions';
import DailyDeals from './DailyDeals';
import { addRecentlyViewed } from '../utils/recentlyViewed';

function ProductList() {
  const products = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  const handleAddToCart = (p) => {
    dispatch(addToCart(p));
    toast.success(`✅ ${p.name} added to cart!`);
  };

  const handleWishlist = (p) => {
    if (isInWishlist(p.id)) {
      dispatch(removeFromWishlist(p));
      toast.error(`❌ ${p.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(p));
      toast.success(`❤️ ${p.name} added to wishlist`);
    }
  };

  const handleProductClick = (p) => {
    addRecentlyViewed(p);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      
      {/* ===== DAILY DEALS ===== */}
      <DailyDeals />

      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">🛍️ Products</h1>
      
      {/* ===== SEARCH WITH SUGGESTIONS ===== */}
      <div className="max-w-md mx-auto mb-8 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="🔍 Search products..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {showSuggestions && <SearchSuggestions query={search} onSelect={() => setShowSuggestions(false)} />}
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition hover:-translate-y-2">
            
            <Link to={`/product/${p.id}`} onClick={() => handleProductClick(p)}>
              <div className="text-6xl mb-3">{p.image}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{p.name}</h3>
            </Link>
            
            <p className="text-2xl font-bold text-green-600">Rs. {p.price}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{p.category}</p>
            
            <div className="flex justify-center my-2">
              <StarRating rating={4} size="text-sm" />
            </div>
            
            {/* ===== STOCK BADGE ===== */}
            <StockBadge productId={p.id} />
            
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleAddToCart(p)} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
                🛒 Add
              </button>
              <button onClick={() => handleWishlist(p)} className={`px-4 py-2 rounded-xl font-bold transition ${isInWishlist(p.id) ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;