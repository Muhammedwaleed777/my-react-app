import { useState, useEffect } from 'react';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 gradient-bg text-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition text-2xl"
    >
      ⬆
    </button>
  ) : null;
}

export default BackToTop;