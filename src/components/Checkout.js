import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { addOrder } from '../utils/orders';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentGateway from './PaymentGateway';

function Checkout() {
  const { user, isLoggedIn, isGuest } = useContext(AuthContext);
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  // Check cart empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your Cart is Empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Add items to checkout.</p>
        <button onClick={() => navigate('/products')} className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          🛍️ Browse Products
        </button>
      </div>
    );
  }

  // If not logged in
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Please Login or Continue as Guest</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">You need to login or continue as guest to place an order.</p>
        <button onClick={() => navigate('/login')} className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
          🔐 Login
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Payment successful
    const order = {
      userEmail: formData.email,
      userName: formData.name,
      items: items.length,
      total: totalPrice,
      products: items,
      shipping: formData,
      paymentMethod: paymentMethod,
      paymentStatus: 'completed',
    };

    addOrder(order);
    dispatch(clearCart());
    toast.success('🎉 Order placed successfully!');
    navigate('/order-history');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">💳 Checkout</h1>

      {isGuest && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl border border-yellow-200 dark:border-yellow-800 mb-4">
          <p className="text-yellow-700 dark:text-yellow-400 text-sm text-center">
            👤 You are checking out as a guest. Please fill your details below.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-fit sticky top-24">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📦 Order Summary</h3>
          <p className="text-gray-600 dark:text-gray-400">Items: {items.length}</p>
          <p className="text-2xl font-bold text-green-600">Total: Rs. {totalPrice.toLocaleString()}</p>
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 py-1">
                <span>{item.name} x{item.quantity}</span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📍 Shipping Information</h3>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">ZIP Code</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">💳 Payment</h3>

                {/* ===== PAYMENT GATEWAY ADDED ===== */}
                <PaymentGateway 
                  amount={totalPrice} 
                  onSuccess={handlePlaceOrder} 
                />

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-300 transition">
                    ← Back
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Checkout;