import { useState } from 'react';
import toast from 'react-hot-toast';

function InvoicePDF({ order }) {
  const [loading, setLoading] = useState(false);

  const generateInvoice = () => {
    setLoading(true);
    setTimeout(() => {
      const invoice = `
╔══════════════════════════════════════════════════════════╗
║                    🛒 SHOPAPP INVOICE                    ║
╠══════════════════════════════════════════════════════════╣
║ Order ID: #${order.id}                                   ║
║ Date: ${new Date(order.date).toLocaleDateString()}        ║
║ Status: ${order.status.toUpperCase()}                    ║
╠══════════════════════════════════════════════════════════╣
║ Customer: ${order.userName || 'Guest'}                   ║
║ Email: ${order.userEmail}                               ║
╠══════════════════════════════════════════════════════════╣
║ ITEMS                                                    ║
${order.products?.map(p => 
  `║ ${p.name} x${p.quantity}                    Rs. ${(p.price * p.quantity).toLocaleString()}`
).join('\n')}
╠══════════════════════════════════════════════════════════╣
║ Total:                                  Rs. ${order.total.toLocaleString()} ║
║ Payment: ${order.paymentMethod || 'N/A'}                ║
╠══════════════════════════════════════════════════════════╣
║ Shipping: ${order.shipping?.address || 'N/A'}           ║
║ City: ${order.shipping?.city || 'N/A'}                  ║
╠══════════════════════════════════════════════════════════╣
║ Thank you for shopping with ShopApp!                    ║
╚══════════════════════════════════════════════════════════╝
      `;
      
      const blob = new Blob([invoice], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice_${order.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setLoading(false);
      toast.success('📄 Invoice downloaded!');
    }, 800);
  };

  return (
    <button 
      onClick={generateInvoice} 
      disabled={loading}
      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition disabled:opacity-50"
    >
      {loading ? '⏳ Downloading...' : '📄 Download Invoice'}
    </button>
  );
}

export default InvoicePDF;