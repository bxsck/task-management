
const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
    </div>
  );
};

export default LoadingSkeleton;