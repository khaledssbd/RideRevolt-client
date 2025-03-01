const AllProductsSkeleton = () => {
  return (
    <div className="w- mx-auto animate-pulse">
      {/* Search & Filter Skeleton */}
      <div className="flex justify-around items-center my-6">
        <div className="w-1/4 h-12 bg-gray-300 dark:bg-gray-900 rounded-md"></div>
        <div className="w-24 h-12 bg-gray-300 dark:bg-gray-900 rounded-md"></div>
      </div>

      {/* Heading Skeleton */}
      <div className="h-10 w-1/3 mx-auto bg-gray-300 dark:bg-gray-900 rounded mb-4"></div>
      <div className="h-6 w-1/3 mx-auto bg-gray-300 dark:bg-gray-900 rounded mb-8"></div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-full shadow-md rounded-lg overflow-hidden border border-gray-300 dark:border-gray-900"
          >
            <div className="relative">
              <div className="w-full h-52 bg-gray-300 dark:bg-gray-900"></div>
              <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 dark:bg-gray-900 rounded"></div>
              <div className="absolute bottom-2 right-3 w-20 h-6 bg-gray-300 dark:bg-gray-900 rounded"></div>
            </div>
            <div className="p-6">
              <div className="h-8 w-3/4 mx-auto bg-gray-300 dark:bg-gray-900 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-900 rounded mb-2"></div>
              <div className="h-12 bg-gray-300 dark:bg-gray-900 rounded mb-4"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-6 w-2/3 mx-auto bg-gray-300 dark:bg-gray-900 rounded"
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-32 h-10 mx-auto my-6 bg-gray-300 dark:bg-gray-900 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsSkeleton;
