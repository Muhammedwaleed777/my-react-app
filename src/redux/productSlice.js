import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { id: 1, name: 'Electronics', icon: '💻' },
    { id: 2, name: 'Accessories', icon: '🔌' },
    { id: 3, name: 'Fashion', icon: '👕' },
    { id: 4, name: 'Home & Living', icon: '🏠' },
    { id: 5, name: 'Gaming', icon: '🎮' },
    { id: 6, name: 'Books', icon: '📚' },
    { id: 7, name: 'Beauty', icon: '💄' },
    { id: 8, name: 'Sports', icon: '⚽' },
    { id: 9, name: 'Automotive', icon: '🚗' },
    { id: 10, name: 'Toys', icon: '🧸' },
  ],
  products: [
    // ===== Electronics =====
    { id: 1, name: 'MacBook Pro 16"', price: 250000, image: '💻', categoryId: 1 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 350000, image: '📱', categoryId: 1 },
    { id: 3, name: 'Samsung Galaxy S24', price: 280000, image: '📱', categoryId: 1 },
    { id: 4, name: 'iPad Pro 12.9"', price: 180000, image: '📱', categoryId: 1 },
    { id: 5, name: 'AirPods Pro 2', price: 55000, image: '🎧', categoryId: 1 },
    { id: 6, name: 'Sony WH-1000XM5', price: 65000, image: '🎧', categoryId: 1 },
    { id: 7, name: 'Canon EOS R6', price: 320000, image: '📷', categoryId: 1 },
    { id: 8, name: 'Sony A7 IV', price: 280000, image: '📷', categoryId: 1 },
    { id: 9, name: 'Apple Watch Ultra 2', price: 150000, image: '⌚', categoryId: 1 },
    { id: 10, name: 'Samsung Galaxy Watch 6', price: 120000, image: '⌚', categoryId: 1 },
    { id: 11, name: 'Dell XPS 16"', price: 220000, image: '💻', categoryId: 1 },
    { id: 12, name: 'HP Spectre x360', price: 200000, image: '💻', categoryId: 1 },
    { id: 13, name: 'Samsung QLED TV 65"', price: 320000, image: '📺', categoryId: 1 },
    { id: 14, name: 'Sonos Arc Soundbar', price: 150000, image: '🔊', categoryId: 1 },
    { id: 15, name: 'Dyson V15 Vacuum', price: 120000, image: '🧹', categoryId: 1 },

    // ===== Accessories =====
    { id: 16, name: 'Anker Power Bank', price: 8000, image: '🔋', categoryId: 2 },
    { id: 17, name: 'Samsung T7 SSD', price: 25000, image: '💾', categoryId: 2 },
    { id: 18, name: 'Logitech MX Master 3S', price: 18000, image: '🖱️', categoryId: 2 },
    { id: 19, name: 'Keychron K2 Keyboard', price: 22000, image: '⌨️', categoryId: 2 },
    { id: 20, name: 'Apple Magic Mouse', price: 15000, image: '🖱️', categoryId: 2 },
    { id: 21, name: 'Anker USB-C Hub', price: 12000, image: '🔌', categoryId: 2 },
    { id: 22, name: 'Apple 20W Adapter', price: 5000, image: '🔌', categoryId: 2 },
    { id: 23, name: 'Belkin USB-C Cable', price: 3000, image: '🔌', categoryId: 2 },
    { id: 24, name: 'Samsung Earbuds', price: 45000, image: '🎧', categoryId: 2 },
    { id: 25, name: 'Logitech Webcam', price: 12000, image: '📷', categoryId: 2 },

    // ===== Fashion =====
    { id: 26, name: 'Nike Air Max 270', price: 25000, image: '👟', categoryId: 3 },
    { id: 27, name: 'Adidas Ultraboost', price: 28000, image: '👟', categoryId: 3 },
    { id: 28, name: 'Puma RS-X', price: 20000, image: '👟', categoryId: 3 },
    { id: 29, name: "Levi's 501 Jeans", price: 12000, image: '👖', categoryId: 3 },
    { id: 30, name: "Levi's Jacket", price: 18000, image: '🧥', categoryId: 3 },
    { id: 31, name: 'Ray-Ban Sunglasses', price: 22000, image: '🕶️', categoryId: 3 },
    { id: 32, name: 'Gucci Belt', price: 45000, image: '👔', categoryId: 3 },
    { id: 33, name: 'Rolex Watch', price: 450000, image: '⌚', categoryId: 3 },
    { id: 34, name: 'Nike Backpack', price: 15000, image: '🎒', categoryId: 3 },
    { id: 35, name: 'Adidas Cap', price: 5000, image: '🧢', categoryId: 3 },
    { id: 36, name: 'Zara Jacket', price: 15000, image: '🧥', categoryId: 3 },
    { id: 37, name: 'H&M T-Shirt', price: 4000, image: '👕', categoryId: 3 },

    // ===== Home & Living =====
    { id: 38, name: 'Philips Air Fryer', price: 35000, image: '🍳', categoryId: 4 },
    { id: 39, name: 'Instant Pot Pro', price: 28000, image: '🍲', categoryId: 4 },
    { id: 40, name: 'Philips Hue Lights', price: 25000, image: '💡', categoryId: 4 },
    { id: 41, name: 'IKEA Desk', price: 35000, image: '🪑', categoryId: 4 },
    { id: 42, name: 'Memory Foam Pillow', price: 8000, image: '🛏️', categoryId: 4 },
    { id: 43, name: 'Dyson Vacuum', price: 120000, image: '🧹', categoryId: 4 },
    { id: 44, name: 'Sofa Set', price: 150000, image: '🛋️', categoryId: 4 },
    { id: 45, name: 'Dining Table', price: 80000, image: '🍽️', categoryId: 4 },
    { id: 46, name: 'Bed Frame', price: 60000, image: '🛏️', categoryId: 4 },

    // ===== Gaming =====
    { id: 47, name: 'PS5 Console', price: 180000, image: '🎮', categoryId: 5 },
    { id: 48, name: 'Xbox Series X', price: 160000, image: '🎮', categoryId: 5 },
    { id: 49, name: 'Nintendo Switch OLED', price: 120000, image: '🎮', categoryId: 5 },
    { id: 50, name: 'Steam Deck 512GB', price: 140000, image: '🎮', categoryId: 5 },
    { id: 51, name: 'Razer Kraken Headset', price: 25000, image: '🎧', categoryId: 5 },
    { id: 52, name: 'Logitech G Pro Mouse', price: 18000, image: '🖱️', categoryId: 5 },
    { id: 53, name: 'Corsair K70 Keyboard', price: 28000, image: '⌨️', categoryId: 5 },
    { id: 54, name: 'ASUS ROG Monitor 27"', price: 120000, image: '🖥️', categoryId: 5 },
    { id: 55, name: 'Gaming Chair', price: 60000, image: '🪑', categoryId: 5 },
    { id: 56, name: 'PS5 Controller', price: 25000, image: '🎮', categoryId: 5 },

    // ===== Books =====
    { id: 57, name: 'Atomic Habits', price: 2500, image: '📚', categoryId: 6 },
    { id: 58, name: 'Rich Dad Poor Dad', price: 2000, image: '📚', categoryId: 6 },
    { id: 59, name: 'Think and Grow Rich', price: 2200, image: '📚', categoryId: 6 },
    { id: 60, name: 'The Psychology of Money', price: 2800, image: '📚', categoryId: 6 },
    { id: 61, name: 'Sapiens', price: 3000, image: '📚', categoryId: 6 },
    { id: 62, name: 'The Alchemist', price: 1800, image: '📚', categoryId: 6 },
    { id: 63, name: '48 Laws of Power', price: 3500, image: '📚', categoryId: 6 },
    { id: 64, name: 'The Subtle Art', price: 2200, image: '📚', categoryId: 6 },

    // ===== Beauty =====
    { id: 65, name: 'Skincare Set', price: 8000, image: '🧴', categoryId: 7 },
    { id: 66, name: 'Perfume Gift Set', price: 12000, image: '🧴', categoryId: 7 },
    { id: 67, name: 'Makeup Kit', price: 15000, image: '💄', categoryId: 7 },
    { id: 68, name: 'Hair Dryer', price: 6000, image: '💇', categoryId: 7 },
    { id: 69, name: 'Straightener', price: 5000, image: '💇', categoryId: 7 },

    // ===== Sports =====
    { id: 70, name: 'Football', price: 5000, image: '⚽', categoryId: 8 },
    { id: 71, name: 'Basketball', price: 4000, image: '🏀', categoryId: 8 },
    { id: 72, name: 'Tennis Racket', price: 12000, image: '🎾', categoryId: 8 },
    { id: 73, name: 'Yoga Mat', price: 3000, image: '🧘', categoryId: 8 },
    { id: 74, name: 'Dumbbell Set', price: 15000, image: '🏋️', categoryId: 8 },
    { id: 75, name: 'Cycling Helmet', price: 8000, image: '🚴', categoryId: 8 },

    // ===== Automotive =====
    { id: 76, name: 'Car Cover', price: 8000, image: '🚗', categoryId: 9 },
    { id: 77, name: 'Phone Holder', price: 3000, image: '📱', categoryId: 9 },
    { id: 78, name: 'Car Vacuum', price: 5000, image: '🧹', categoryId: 9 },
    { id: 79, name: 'Air Freshener', price: 1000, image: '🌹', categoryId: 9 },
    { id: 80, name: 'Tyre Inflator', price: 6000, image: '🔧', categoryId: 9 },

    // ===== Toys =====
    { id: 81, name: 'LEGO Set', price: 8000, image: '🧱', categoryId: 10 },
    { id: 82, name: 'RC Car', price: 6000, image: '🚗', categoryId: 10 },
    { id: 83, name: 'Doll Set', price: 5000, image: '🎎', categoryId: 10 },
    { id: 84, name: 'Puzzle Board', price: 3000, image: '🧩', categoryId: 10 },
    { id: 85, name: 'Toy Train', price: 4000, image: '🚂', categoryId: 10 },
  ],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productSlice.reducer;