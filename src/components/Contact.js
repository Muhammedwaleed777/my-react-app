function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center gradient-text mb-8">📞 Contact Us</h1>
      <div className="card p-8 space-y-4">
        <p><span className="font-bold text-gray-800 dark:text-white">📧 Email:</span> <span className="text-gray-600 dark:text-gray-400">waleed777@gmail.com</span></p>
        <p><span className="font-bold text-gray-800 dark:text-white">📱 Phone:</span> <span className="text-gray-600 dark:text-gray-400">+92 348 4974289</span></p>
        <p><span className="font-bold text-gray-800 dark:text-white">📍 Location:</span> <span className="text-gray-600 dark:text-gray-400">Sahiwal, Pakistan</span></p>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Send a Message</h3>
          <input className="input" placeholder="Your Name" />
          <input className="input mt-3" placeholder="Your Email" />
          <textarea className="input mt-3" rows="4" placeholder="Your Message"></textarea>
          <button className="btn-primary w-full mt-3">Send Message</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;