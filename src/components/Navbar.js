import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { isAdmin } from '../utils/roles';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../utils/language';

function Navbar() {
  const { isLoggedIn, logout, user, isGuest } = useContext(AuthContext);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const { t } = useLanguage();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-2">
        <Link to="/" className="text-2xl font-bold">✦ ShopApp</Link>
        
        <div className="flex items-center gap-4 flex-wrap">
          <Link to="/" className="hover:text-white/80 transition text-sm">{t('home')}</Link>
          <Link to="/products" className="hover:text-white/80 transition text-sm">{t('products')}</Link>
          <Link to="/wishlist" className="hover:text-white/80 transition text-sm relative">
            ❤️ {t('wishlist')}
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="hover:text-white/80 transition text-sm relative">
            🛒 {t('cart')}
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-6 bg-yellow-400 text-gray-800 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* ===== ADDRESS BOOK LINK ===== */}
          {isLoggedIn && !isGuest && (
            <Link to="/address-book" className="hover:text-white/80 transition text-sm flex items-center gap-1 bg-blue-500/20 px-3 py-1 rounded-lg">
              📍 {t('address') || 'Address'}
            </Link>
          )}

          {isLoggedIn && !isGuest && (
            <Link to="/wallet" className="hover:text-white/80 transition text-sm flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-lg">
              💰 {t('wallet')}
            </Link>
          )}

          {isLoggedIn ? (
            <>
              {isGuest && (
                <span className="bg-green-500/30 px-3 py-1 rounded-lg text-xs font-bold">{t('guest')}</span>
              )}
              {!isGuest && isAdmin() && (
                <Link to="/admin" className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg font-bold text-sm hover:bg-yellow-300 transition">
                  ⚙️ {t('admin')}
                </Link>
              )}
              {!isGuest && (
                <>
                  <Link to="/dashboard" className="hover:text-white/80 transition text-sm">{t('dashboard')}</Link>
                  <Link to="/profile" className="hover:text-white/80 transition text-sm">{t('profile')}</Link>
                  <Link to="/order-history" className="hover:text-white/80 transition text-sm">{t('orders')}</Link>
                  <Link to="/track-order" className="hover:text-white/80 transition text-sm">{t('track')}</Link>
                  
                  {/* ===== RETURN REQUEST LINK ===== */}
                  <Link to="/return-request" className="hover:text-white/80 transition text-sm">🔄 Return</Link>
                </>
              )}
              <button onClick={logout} className="bg-red-500/20 px-4 py-1 rounded-lg hover:bg-red-500/30 transition text-sm">
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white/80 transition text-sm">{t('login')}</Link>
              <Link to="/register" className="bg-white text-indigo-600 px-4 py-1 rounded-lg font-semibold hover:bg-gray-100 transition text-sm">
                {t('getStarted')}
              </Link>
            </>
          )}
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;