const CheckoutSkeleton = () => {
  return (
    <div className="w-4/5 rounded-lg mx-auto animate-pulse">
      {/* col-1: name & brand skeleton */}
      <div className="w-1/3 h-8 mx-auto my-5 bg-gray-300 dark:bg-gray-900 rounded"></div>

      {/* col-2: image & item button skeleton */}
      <div className="flex justify-around items-center gap-4">
        <div className="w-1/3 h-40 bg-gray-300 dark:bg-gray-900 rounded"></div>
        <div className="text-base font-medium">
          <div className="h-6 w-16 mx-auto bg-gray-300 dark:bg-gray-900 rounded"></div>
          <div className="flex items-center gap-5 mt-3">
            <div className="w-10 h-8 bg-gray-300 dark:bg-gray-900 rounded"></div>
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-900 rounded"></div>
            <div className="w-10 h-8 bg-gray-300 dark:bg-gray-900 rounded"></div>
          </div>
        </div>
        <div className="w-1/5 h-6 bg-gray-300 dark:bg-gray-900 rounded"></div>
      </div>

      {/* col-3: form skeleton */}
      <div className="w-1/2 mx-auto my-20">
        <div className="h-8 w-2/3 mx-auto bg-gray-300 dark:bg-gray-900 rounded mb-4"></div>
        <div className="space-y-3 flex flex-col justify-center items-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2/3 md:w-full">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-900 rounded mb-2"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-900 rounded"></div>
            </div>
          ))}
          <div className="my-5 h-10 w-32 bg-gray-300 dark:bg-gray-900 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
