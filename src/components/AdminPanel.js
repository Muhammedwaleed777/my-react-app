import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus, deleteOrder } from '../utils/orders';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import AdminCharts from './AdminCharts';  // ← YAHAN SE IMPORT

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '📱',
    categoryId: 1,
  });

  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Accessories' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Home & Living' },
    { id: 5, name: 'Gaming' },
    { id: 6, name: 'Books' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      const defaultProducts = [
        { id: 1, name: 'MacBook Pro', price: 250000, image: '💻', categoryId: 1 },
        { id: 2, name: 'iPhone 15', price: 350000, image: '📱', categoryId: 1 },
        { id: 3, name: 'AirPods Pro', price: 55000, image: '🎧', categoryId: 1 },
        { id: 4, name: 'Sony Headphones', price: 65000, image: '🎧', categoryId: 2 },
        { id: 5, name: 'Nike Shoes', price: 25000, image: '👟', categoryId: 3 },
        { id: 6, name: 'Gaming Chair', price: 60000, image: '🪑', categoryId: 5 },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    setOrders(getAdminOrders());
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please fill all fields!');
      return;
    }
    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      image: newProduct.image,
      categoryId: Number(newProduct.categoryId),
    };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('✅ Product added successfully!');
    setNewProduct({ name: '', price: '', image: '📱', categoryId: 1 });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('🗑️ Product deleted!');
  };

  const handleUpdateOrder = (orderId, status) => {
    updateOrderStatus(orderId, status);
    setOrders(getAdminOrders());
    toast.success(`✅ Order status updated to ${status}`);
  };

  const handleDeleteOrder = (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    deleteOrder(orderId);
    setOrders(getAdminOrders());
    toast.success('🗑️ Order deleted!');
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Unknown';
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-white">⚙️ Admin Panel</h1>
        <p className="text-white/80 mt-2">Manage products, orders, and users</p>
      </div>

      {/* ===== ADMIN CHARTS - YAHAN SHOW HO RAHA HAI ===== */}
      <AdminCharts orders={orders} />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 mt-6">
        <button onClick={() => setActiveTab('products')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'products' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
          📦 Products
        </button>
        <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'orders' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
          📋 Orders ({orders.length})
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">➕ Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              <select value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="💻">💻 Laptop</option>
                <option value="📱">📱 Phone</option>
                <option value="🎧">🎧 Headphones</option>
                <option value="⌚">⌚ Watch</option>
                <option value="📷">📷 Camera</option>
                <option value="👟">👟 Shoes</option>
              </select>
              <select value={newProduct.categoryId} onChange={(e) => setNewProduct({ ...newProduct, categoryId: Number(e.target.value) })} className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <button onClick={handleAddProduct} className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">➕ Add Product</button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📦 All Products ({products.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map(p => (
                <div key={p.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600 text-center">
                  <span className="text-3xl">{p.image}</span>
                  <p className="font-bold text-gray-800 dark:text-white text-sm">{p.name}</p>
                  <p className="text-green-600 font-bold text-sm">Rs. {p.price}</p>
                  <p className="text-gray-400 text-xs">{getCategoryName(p.categoryId)}</p>
                  <button onClick={() => handleDeleteProduct(p.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition w-full">❌ Delete</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📋 All Orders ({orders.length})</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-2 text-gray-600 dark:text-gray-400">Order ID</th>
                    <th className="pb-2 text-gray-600 dark:text-gray-400">User</th>
                    <th className="pb-2 text-gray-600 dark:text-gray-400">Items</th>
                    <th className="pb-2 text-gray-600 dark:text-gray-400">Total</th>
                    <th className="pb-2 text-gray-600 dark:text-gray-400">Status</th>
                    <th className="pb-2 text-gray-600 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 text-gray-800 dark:text-white font-bold">#{order.id}</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">{order.userEmail}</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">{order.items}</td>
                      <td className="py-2 text-green-600 font-bold">Rs. {order.total}</td>
                      <td className="py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'delivered' ? 'bg-green-500 text-white' :
                          order.status === 'shipping' ? 'bg-blue-500 text-white' :
                          order.status === 'pending' ? 'bg-yellow-500 text-white' :
                          order.status === 'cancelled' ? 'bg-red-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2">
                        <div className="flex flex-wrap gap-2">
                          <select value={order.status} onChange={(e) => handleUpdateOrder(order.id, e.target.value)} className="p-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                            <option value="pending">Pending</option>
                            <option value="shipping">Shipping</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => handleDeleteOrder(order.id)} className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-red-600 transition">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;