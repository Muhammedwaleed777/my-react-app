import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function Cart() {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center pt-24">
        <div className="text-6xl mb-4 animate-bounce">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Start shopping to add items to your cart.</p>
        <Link to="/products" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition inline-block">
          🛍️ Start Shopping
        </Link>
      </div>
    );
  }

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
    toast.error(`❌ Removed ${item.name} from cart!`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error('🗑️ Cart cleared!');
  };

  // ===== PROCEED TO CHECKOUT - FIXED =====
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">🛒 Your Cart</h1>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Items: </span>
          <span className="font-bold text-gray-800 dark:text-white">{totalQuantity}</span>
        </div>
        <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Total: </span>
          <span className="font-bold text-green-600">Rs. {totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handleClearCart}
        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition mb-6"
      >
        🗑️ Clear Cart
      </button>

      {/* Cart Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{item.image}</span>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">Rs. {item.price} x {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-green-600">Rs. {item.price * item.quantity}</span>
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== PROCEED TO CHECKOUT BUTTON - FIXED ===== */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={handleCheckout}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition"
        >
          ✅ Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;