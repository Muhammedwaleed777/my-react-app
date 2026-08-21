import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  if (paths.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
      <Link to="/" className="hover:text-indigo-600">Home</Link>
      {paths.map((p, i) => (
        <span key={i}> / <span className="text-indigo-600">{p.charAt(0).toUpperCase() + p.slice(1)}</span></span>
      ))}
    </div>
  );
}

export default Breadcrumb;