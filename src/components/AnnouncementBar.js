import { useState, useEffect } from 'react';

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 py-2 px-4 text-center relative">
      <p className="text-sm font-medium">
        🎉 Special Offer: Free shipping on orders over Rs. 5000! Use code: <span className="font-bold bg-white/20 px-2 py-0.5 rounded">SHOPAPP10</span>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800/60 hover:text-gray-800"
      >
        ✕
      </button>
    </div>
  );
}

export default AnnouncementBar;