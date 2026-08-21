import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProfilePicture from './ProfilePicture';
import EmailVerification from './EmailVerification';

function Profile() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    phone: '+92 348 4974289',
    address: 'Sahiwal, Pakistan',
    bio: user?.role === 'admin' ? '🔐 Admin Account' : 'Frontend Developer & React Specialist'
  });

  const stats = [
    { icon: '📦', label: 'Orders', value: '12' },
    { icon: '❤️', label: 'Wishlist', value: '8' },
    { icon: '⭐', label: 'Reviews', value: '24' },
    { icon: '🏆', label: 'Points', value: '1,450' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-24">
        <div className="text-7xl mb-4 animate-bounce">🔒</div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Not Logged In</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Please login to view your profile.</p>
        <Link to="/login" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition hover:scale-105 inline-block">
          🔐 Login
        </Link>
      </div>
    );
  }

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    toast.success('✅ Profile updated successfully!');
  };
  const handleCancel = () => setIsEditing(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getRoleBadge = () => {
    if (user?.role === 'admin') {
      return <span className="bg-yellow-500 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">🔐 Admin</span>;
    } else if (user?.role === 'guest') {
      return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">👤 Guest</span>;
    } else {
      return <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">👤 User</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-5xl">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* ===== PROFILE PICTURE ADDED ===== */}
          <ProfilePicture user={user} />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {formData.name}
            </h1>
            <p className="text-white/80 text-lg">{formData.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center justify-center md:justify-start">
              {getRoleBadge()}
              <EmailVerification email={formData.email} />
            </div>
            <p className="text-white/60 text-sm mt-1">Member since August 2026</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 hover:scale-105 transition shadow-lg">
                  💾 Save
                </button>
                <button onClick={handleCancel} className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 hover:scale-105 transition shadow-lg">
                  ❌ Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition shadow-lg">
                ✏️ Edit Profile
              </button>
            )}
            <button onClick={logout} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 hover:scale-105 transition shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition">
            <div className="text-4xl mb-1">{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{s.value}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📋 Profile Information</h3>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-medium mb-1">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Full Name</span>
              <span className="text-gray-800 dark:text-white font-bold">{formData.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Email</span>
              <span className="text-gray-800 dark:text-white font-bold">{formData.email}</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Phone</span>
              <span className="text-gray-800 dark:text-white font-bold">{formData.phone}</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Address</span>
              <span className="text-gray-800 dark:text-white font-bold">{formData.address}</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Role</span>
              <span className="text-gray-800 dark:text-white font-bold">{getRoleBadge()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Account Actions */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚙️ Account Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition flex justify-between items-center border border-gray-200 dark:border-gray-600">
            <span className="text-gray-800 dark:text-white font-medium">🔐 Change Password</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition flex justify-between items-center border border-gray-200 dark:border-gray-600">
            <span className="text-gray-800 dark:text-white font-medium">🔔 Notifications</span>
            <span className="text-gray-400">→</span>
          </button>
          <button className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition flex justify-between items-center border border-gray-200 dark:border-gray-600">
            <span className="text-gray-800 dark:text-white font-medium">🛡️ Privacy</span>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;