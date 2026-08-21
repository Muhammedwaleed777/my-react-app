// Stock Management
const STOCK_KEY = 'productStock';

export const getStock = (productId) => {
  const stock = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
  return stock[productId] !== undefined ? stock[productId] : 10;
};

export const updateStock = (productId, quantity) => {
  const stock = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
  stock[productId] = Math.max(0, (stock[productId] || 10) - quantity);
  localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
  return stock[productId];
};

export const setStock = (productId, quantity) => {
  const stock = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
  stock[productId] = quantity;
  localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
  return stock[productId];
};