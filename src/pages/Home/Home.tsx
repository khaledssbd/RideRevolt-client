import HeroSection from '@/pages/Home/HeroSection';
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import LatestProducts from './LatestProducts';
import Carousel from './Carousel';
import LoadingSpinner from '@/components/LoadingSpinner';
import SwiperSlides from './SwiperSlides';

const Home = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  return (
    <div>
      <HeroSection />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <LatestProducts products={products?.data} />
          <Carousel products={products?.data} />
          <SwiperSlides products={products?.data} />
        </>
      )}
    </div>
  );
};

export default Home;
