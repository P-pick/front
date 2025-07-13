import { tourQueries } from '@/pages/tour/service';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface TourSlideImagesProps {
  contentId: string;
}
export default function TourSlideImages({ contentId }: TourSlideImagesProps) {
  const { data: images } = useSuspenseQuery(
    tourQueries.detailImages(contentId),
  );

  return (
    <Swiper
      direction="horizontal"
      modules={[Pagination]}
      className="w-full h-full relative my-swiper"
      pagination={{ clickable: true }}
    >
      {images.map((img, index) => (
        <SwiperSlide key={img.serialnum}>
          <img
            src={img.originimgurl || undefined}
            alt={img.imgname}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
