import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-9xl font-bold gradient-text">404</div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-block">🏠 Go Home</Link>
    </div>
  );
}

export default NotFound;