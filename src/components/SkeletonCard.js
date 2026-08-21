function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
      <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-3"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
    </div>
  );
}

export default SkeletonCard;