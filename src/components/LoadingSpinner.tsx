const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-14 h-14 border-8 border-amber-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
