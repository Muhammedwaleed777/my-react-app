import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">🛒 ShopApp</h3>
              <p className="text-gray-400 text-sm">Your one-stop shop for everything!</p>
              <p className="text-gray-500 text-xs mt-2">Built with ❤️ in Pakistan</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white hover:underline transition">🏠 Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white hover:underline transition">🛍️ Products</Link></li>
                <li><Link to="/wishlist" className="text-gray-400 hover:text-white hover:underline transition">❤️ Wishlist</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white hover:underline transition">📖 About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white hover:underline transition">📞 Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 text-lg">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white hover:underline transition">🔐 Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white hover:underline transition">📝 Register</Link></li>
                <li><Link to="/order-history" className="text-gray-400 hover:text-white hover:underline transition">📦 Orders</Link></li>
                <li><Link to="/track-order" className="text-gray-400 hover:text-white hover:underline transition">📦 Track</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 text-lg">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition">📧 waleed777@gmail.com</li>
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition">📱 +92 348 4974289</li>
                <li className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition">📍 Sahiwal, Pakistan</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-sm">
            <p>© 2026 ShopApp. All rights reserved. | Made with ❤️</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;