// Get all orders
export const getOrders = () => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

// Save orders
export const saveOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Get user orders (by email)
export const getUserOrders = (userEmail) => {
  const orders = getOrders();
  return orders.filter(order => order.userEmail === userEmail);
};

// Get admin orders (sab orders)
export const getAdminOrders = () => {
  return getOrders();
};

// Add new order
export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    id: Date.now(),
    ...order,
    status: 'pending',
    date: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders();
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, status } : order
  );
  saveOrders(updatedOrders);
};

// Get order by ID
export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};

// Cancel order
export const cancelOrder = (orderId) => {
  const orders = getOrders();
  const updatedOrders = orders.map(order =>
    order.id === orderId ? { ...order, status: 'cancelled' } : order
  );
  saveOrders(updatedOrders);
  return updatedOrders;
};

// Delete order (Admin only)
export const deleteOrder = (orderId) => {
  const orders = getOrders();
  const updatedOrders = orders.filter(order => order.id !== orderId);
  saveOrders(updatedOrders);
  return updatedOrders;
};