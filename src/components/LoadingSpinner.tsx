
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      <span className="ml-3 text-orange-700">Searching for delicious recipes...</span>
    </div>
  );
};

export default LoadingSpinner;
