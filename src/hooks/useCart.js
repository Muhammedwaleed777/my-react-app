import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  const addItem = (product) => {
    dispatch(addToCart(product));
    toast.success(`✅ ${product.name} added to cart!`);
  };

  const removeItem = (product) => {
    dispatch(removeFromCart(product));
    toast.error(`❌ ${product.name} removed!`);
  };

  const clearAll = () => {
    dispatch(clearCart());
    toast.error('🗑️ Cart cleared!');
  };

  return { items, totalQuantity, totalPrice, addItem, removeItem, clearAll };
};