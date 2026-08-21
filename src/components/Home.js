import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">✦ Welcome to ShopApp</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Discover amazing products at the best prices.</p>
          <Link to="/products" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition inline-block">
            🛍️ Start Shopping
          </Link>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Fast Delivery</h3>
            <p className="text-gray-500 dark:text-gray-400">24 hour delivery</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Secure Payment</h3>
            <p className="text-gray-500 dark:text-gray-400">100% encrypted</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-3">💯</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Quality Products</h3>
            <p className="text-gray-500 dark:text-gray-400">Premium brands</p>
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export default Home;