import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import StockBadge from './StockBadge';
import StarRating from './StarRating';
import ReviewWithImage from './ReviewWithImage';
import ProductRecommendations from './ProductRecommendations';
import { addRecentlyViewed } from '../utils/recentlyViewed';
import toast from 'react-hot-toast';

function ProductDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      addRecentlyViewed(found);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Product not found</h2>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`✅ ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
      toast.error(`❌ ${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`❤️ ${product.name} added to wishlist`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-9xl">{product.image}</div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{product.category}</p>
            
            <div className="flex items-center gap-2 my-2">
              <StarRating rating={4} size="text-2xl" />
              <span className="text-gray-500 text-sm">(24 reviews)</span>
            </div>
            
            <p className="text-4xl font-bold text-green-600 my-4">Rs. {product.price}</p>
            
            <StockBadge productId={product.id} />
            
            <div className="flex gap-3 mt-4">
              <button onClick={handleAddToCart} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition">
                🛒 Add to Cart
              </button>
              <button onClick={handleWishlist} className={`px-6 py-3 rounded-xl font-bold transition ${isInWishlist ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}>
                ❤️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== REVIEWS WITH IMAGES ADDED ===== */}
      <div className="mt-8">
        <ReviewWithImage productId={product.id} />
      </div>

      {/* ===== PRODUCT RECOMMENDATIONS ADDED ===== */}
      <ProductRecommendations currentProduct={product} allProducts={products} />
    </div>
  );
}

export default ProductDetails;