import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ProfilePicture({ user, onUpdate }) {
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem(`avatar_${user?.email}`) || null;
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setAvatar(imageUrl);
      localStorage.setItem(`avatar_${user?.email}`, imageUrl);
      toast.success('✅ Profile picture updated!');
      if (onUpdate) onUpdate(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setAvatar(null);
    localStorage.removeItem(`avatar_${user?.email}`);
    toast.success('Profile picture removed');
    if (onUpdate) onUpdate(null);
  };

  return (
    <div className="relative group inline-block">
      {avatar ? (
        <img 
          src={avatar} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-3xl text-white font-bold border-4 border-indigo-500 shadow-lg">
          {user?.name?.charAt(0) || 'U'}
        </div>
      )}
      
      <div className="absolute -bottom-1 -right-1 flex gap-1">
        <label className="bg-indigo-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-indigo-600 transition shadow-lg">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          📷
        </label>
        {avatar && (
          <button onClick={handleRemove} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-lg text-xs">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;