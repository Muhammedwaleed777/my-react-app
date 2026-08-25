import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function UserAvatar({ size = 'md' }) {
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || null);

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-4xl',
  };

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
  const colorIndex = user?.name ? user.name.length % colors.length : 0;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target.result);
      localStorage.setItem('userAvatar', event.target.result);
      toast.success('✅ Avatar uploaded!');
    };
    reader.readAsDataURL(file);
  };

  if (avatar) {
    return <img src={avatar} alt="Avatar" className={`${sizes[size]} rounded-full object-cover border-2 border-indigo-500 shadow-lg`} />;
  }

  return (
    <div className="relative group">
      <div className={`${sizes[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-bold shadow-lg transition hover:scale-105`}>
        {user?.name?.charAt(0) || 'U'}
      </div>
      <motion.label whileHover={{ scale: 1.1 }} className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full cursor-pointer shadow-lg hover:bg-indigo-600 transition">
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        📷
      </motion.label>
    </div>
  );
}

export default UserAvatar;