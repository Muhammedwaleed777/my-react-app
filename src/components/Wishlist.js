import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">❤️</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Wishlist is Empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Add items to your wishlist.</p>
        <Link to="/products" className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">❤️ My Wishlist</h1>
      <button onClick={() => { dispatch(clearWishlist()); toast.error('Wishlist cleared!'); }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mb-4">
        Clear All
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-3">{item.image}</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{item.name}</h3>
            <p className="text-2xl font-bold text-green-600">Rs. {item.price}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => { dispatch(addToCart(item)); toast.success(`✅ ${item.name} added to cart!`); }} className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
                🛒 Add to Cart
              </button>
              <button onClick={() => { dispatch(removeFromWishlist(item)); toast.error(`❌ ${item.name} removed from wishlist!`); }} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition">
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;