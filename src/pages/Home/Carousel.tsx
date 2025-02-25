import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';
import { TProductsProps } from '@/types';

const Carousel = ({ products }: TProductsProps) => {
  return (
    <div className="container px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={products?.[0].imageUrl} text={products?.[0].name} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={products?.[1].imageUrl} text={products?.[1].name} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={products?.[2].imageUrl} text={products?.[2].name} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
