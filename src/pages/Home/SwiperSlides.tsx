import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// npm i swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import { TProductsProps } from '@/types';

const SwiperSlides = ({ products }: TProductsProps) => {
  return (
    <div className='my-20'>
      <h4
        className="font-play text-xl md:text-3xl font-medium my-10 md:my-16"
        // data-aos="zoom-out" ---> issue= it enlarges x-axis size of where it is used
      >
        Our products
      </h4>
      <div className="swiper-wrapper mb-20">
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1 }}
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}
        >
          {products?.map((product, index) => (
            <SwiperSlide key={index}>
              <img
                src={product.imageUrl}
                className="rounded-2xl px-1 w-full h-52 md:h-96"
                alt={product.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlides;
