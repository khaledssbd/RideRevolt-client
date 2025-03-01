const ProductDetailsSkeleton = () => {
  return (
    <article className="w-4/5 mx-auto animate-pulse p-5">
      {/* Title */}
      <div className="h-10 w-2/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Image */}
      <div className="w-full h-32 sm:h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mt-5"></div>

      {/* Meta Info */}
      <div className="flex justify-between items-center mt-5">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Description */}
      <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-md mt-5"></div>

      {/* Button */}
      <div className="w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-10"></div>
    </article>
  );
};

export default ProductDetailsSkeleton;
