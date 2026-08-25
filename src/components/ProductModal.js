import { useEffect } from 'react';
import toast from 'react-hot-toast';

function ProductModal({ product, onClose, onAddToCart }) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`✅ ${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="float-right text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        {/* Product Image */}
        <div className="text-8xl text-center my-4">{product.image}</div>

        {/* Product Details */}
        <h2 className="text-3xl font-bold text-center text-gray-800">{product.name}</h2>
        <p className="text-gray-500 text-center text-sm">{product.category}</p>

        <div className="mt-4 space-y-2">
          <p className="text-4xl font-bold text-center text-green-600">
            Rs. {product.price}
          </p>
          <p className="text-gray-600 text-center">⭐ In Stock</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-bold"
          >
            🛒 Add to Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;