// Recently Viewed Products
export const getRecentlyViewed = () => {
  const data = localStorage.getItem('recentlyViewed');
  return data ? JSON.parse(data) : [];
};

export const addRecentlyViewed = (product) => {
  let items = getRecentlyViewed();
  items = items.filter(item => item.id !== product.id);
  items.unshift(product);
  if (items.length > 10) items.pop();
  localStorage.setItem('recentlyViewed', JSON.stringify(items));
  return items;
};

export const clearRecentlyViewed = () => {
  localStorage.removeItem('recentlyViewed');
  return [];
};