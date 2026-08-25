function About() {
  const team = [
    { name: 'Muhammad Waleed', role: 'CEO & Founder', icon: '👨‍💼' },
    { name: 'Sara Ahmed', role: 'CTO', icon: '👩‍💻' },
    { name: 'Usman Malik', role: 'Head of Design', icon: '🎨' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center gradient-text mb-8">About ShopApp</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="card p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">🎯 Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400">To provide seamless online shopping with best prices and fastest delivery.</p>
        </div>
        <div className="card p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">🌟 Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-400">To become Pakistan's most trusted e-commerce platform.</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Meet Our Team</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {team.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl">{m.icon}</div>
              <p className="font-bold text-gray-800 dark:text-white mt-2">{m.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;