export const generateInvoiceHTML = (order) => {
  return `
    <html>
      <head><title>Invoice #${order.id}</title></head>
      <body style="font-family: Arial, sans-serif; padding: 40px;">
        <h1>🛒 ShopApp Invoice</h1>
        <hr/>
        <p><strong>Order ID:</strong> #${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <hr/>
        <h3>Items</h3>
        ${order.products?.map(p => `<p>${p.name} x${p.quantity} - Rs. ${(p.price * p.quantity).toLocaleString()}</p>`).join('')}
        <hr/>
        <h3>Total: Rs. ${order.total.toLocaleString()}</h3>
        <p>Thank you for shopping with ShopApp!</p>
      </body>
    </html>
  `;
};