import { Link } from 'react-router-dom';

type PSlide = {
  image: string | undefined;
  text: string | undefined;
};

const Slide = ({ image, text }: PSlide) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[20rem] md:h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex flex-col items-center justify-between w-full h-full bg-gray-900/20">
        <div className="text-center mt-10 ">
          <h1 className="text-3xl font-semibold text-amber-500 dark:text-white lg:text-4xl">
            {text}
          </h1>
        </div>
        <Link
          to="/all-products"
          className="w-full px-5 py-4 mb-10 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-amber-500 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
        >
          All Products
        </Link>
      </div>
    </div>
  );
};

export default Slide;
