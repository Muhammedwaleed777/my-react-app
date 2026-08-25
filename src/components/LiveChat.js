import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '👋 Hello! Welcome to ShopApp Support. How can I help you today?', time: getCurrentTime() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ===== AUTO RESPONSES =====
  const getAutoResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return '👋 Hello! How can I assist you today?';
    }
    if (msg.includes('order') || msg.includes('delivery') || msg.includes('shipping')) {
      return '📦 For order inquiries, please go to "Order History" page. You can track your order status there.';
    }
    if (msg.includes('return') || msg.includes('refund')) {
      return '🔄 For returns and refunds, please visit the "Return Request" page. Our team will assist you within 24 hours.';
    }
    if (msg.includes('product') || msg.includes('item')) {
      return '🛍️ You can browse all our products on the "Products" page. Use the search bar to find specific items.';
    }
    if (msg.includes('payment') || msg.includes('pay')) {
      return '💳 We accept Card, EasyPaisa, JazzCash, and Wallet payments. All transactions are secure.';
    }
    if (msg.includes('price') || msg.includes('cost')) {
      return '💰 All prices are in Pakistani Rupees (Rs.) and are inclusive of taxes. Check product pages for details.';
    }
    if (msg.includes('thank') || msg.includes('thanks')) {
      return '🙏 You\'re welcome! Thank you for shopping with ShopApp. Have a great day!';
    }
    if (msg.includes('wallet') || msg.includes('balance')) {
      return '💰 You can check your wallet balance in the "Wallet" section. Add money easily through Card or EasyPaisa.';
    }
    if (msg.includes('help') || msg.includes('support')) {
      return '🆘 I\'m here to help! You can ask me about orders, products, payments, returns, or anything else.';
    }
    if (msg.includes('bye') || msg.includes('goodbye')) {
      return '👋 Goodbye! Thank you for visiting ShopApp. Have a wonderful day!';
    }
    
    return '🤖 I\'m not sure about that. Please contact our support team at support@shopapp.com or call 0348-4974289.';
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: getCurrentTime(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getAutoResponse(userMessage.text);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: getCurrentTime(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const quickReplies = [
    { text: '📦 Order Status', action: 'I want to check my order status' },
    { text: '🔄 Return Request', action: 'I want to return a product' },
    { text: '💳 Payment Help', action: 'I need help with payment' },
    { text: '🛍️ Products', action: 'Tell me about your products' },
    { text: '💰 Wallet', action: 'How do I add money to wallet?' },
  ];

  const handleQuickReply = (text) => {
    setInput(text);
    setTimeout(() => {
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        text: text,
        time: getCurrentTime(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = getAutoResponse(text);
        const botMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          time: getCurrentTime(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800 + Math.random() * 800);
    }, 100);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-xl transition z-50 flex items-center justify-center text-2xl hover:scale-110"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold">ShopApp Support</h3>
                  <p className="text-xs text-white/70">Online • Usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-2 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-1">
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(qr.action)}
                  className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition"
                >
                  {qr.text}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LiveChat;