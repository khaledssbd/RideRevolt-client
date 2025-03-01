import { cn } from '@/lib/utils';
import { Button } from '../../components/ui/button';
import bike from '@/assets/Images/trek-marlin-7.png';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-indigo-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:py-32">
        {/* Content */}
        <div className="flex-1 space-y-8 text-center md:text-left mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white dark:text-amber-500 sm:text-5xl md:text-6xl">
            Explore 🏍️ the World Through
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}
              Us
            </span>{' '}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            Discover insightful journey, thought-provoking enjoyments, and best
            experience on technology, lifestyle, and innovation.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            {/* <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-amber-500 dark:bg-white dark:text-amber-600"
            >
              Get Offer
            </Button> */}
            <Link to="/all-products">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg dark:text-white dark:bg-amber-500 dark:hover:bg-black dark:hover:text-amber-500"
              >
                Explore More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary dark:text-white">
                10K+
              </div>
              <div className="text-sm text-gray-400 dark:text-amber-500">
                Satisfied customers
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary dark:text-white">
                30+
              </div>
              <div className="text-sm text-gray-400 dark:text-amber-500">
                Expert Sellers
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary dark:text-white">
                10M+
              </div>
              <div className="text-sm text-gray-400 dark:text-amber-500">
                Online Reactions
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-0">
          <div
            className={cn(
              'relative mx-auto h-auto w-4/5 rounded-2xl overflow-hidden',
              'bg-gradient-to-br from-white/5 to-transparent',
              'border border-primary/20 backdrop-blur-lg',
              'shadow-2xl shadow-indigo-500/10'
            )}
          >
            <img src={bike} alt="Revolt RV1+" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
