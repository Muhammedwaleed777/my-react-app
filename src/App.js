import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import OrderTracking from './components/OrderTracking';
import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel';
import AdminRoute from './components/AdminRoute';
import UserWallet from './components/UserWallet';
import AddressBook from './components/AddressBook';
import LiveChat from './components/LiveChat';
import ReturnRequest from './components/ReturnRequest';
import NotFound from './components/NotFound';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                  },
                  success: {
                    iconTheme: { primary: '#22c55e', secondary: '#fff' },
                  },
                  error: {
                    iconTheme: { primary: '#ef4444', secondary: '#fff' },
                  },
                }}
              />
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/track-order" element={<OrderTracking />} />
                    <Route path="/wallet" element={<UserWallet />} />
                    <Route path="/address-book" element={<AddressBook />} />
                    <Route path="/return-request" element={<ReturnRequest />} />
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminPanel />
                      </AdminRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Footer />
              </div>
              {/* ===== LIVE CHAT - SAB PAGES PAR ===== */}
              <LiveChat />
            </BrowserRouter>
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;