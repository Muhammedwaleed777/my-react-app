import { useSelector } from 'react-redux';

function CategoryList({ selectedCategory, setSelectedCategory }) {
  const categories = useSelector((state) => state.products.categories);

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 rounded-full transition ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
            : 'bg-white/10 text-white/70 hover:text-white'
        }`}
      >
        ✦ All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
            selectedCategory === cat.id
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
              : 'bg-white/10 text-white/70 hover:text-white'
          }`}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;