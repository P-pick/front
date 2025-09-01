import { tourQueries } from '@/entities/tour';
import { TourTypeBadge } from '@/shared';
import { useSuspenseQueries } from '@tanstack/react-query';
import { A11y, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { truncate } from '@/shared/lib';

interface BookmarkCardProps {
  contentId: string;
}

export default function BookmarkCard({ contentId }: BookmarkCardProps) {
  const tourResponse = useSuspenseQueries({
    queries: [
      tourQueries.detailCommon(contentId),
      tourQueries.detailImages(contentId),
    ],
  });
  const images = tourResponse[1].data;
  const tourCommon = tourResponse[0].data;

  return (
    <li className="flex w-full p-3">
      <Swiper
        direction="horizontal"
        modules={[Pagination, Navigation, A11y, EffectFade]}
        freeMode={true}
        pagination={{ clickable: true }}
        className="w-35 h-35 !ml-0 !mr-0"
      >
        {images.map(image => (
          <SwiperSlide key={image.serialnum}>
            <img
              src={image.originimgurl}
              className="w-35 h-35 object-cover rounded-lg m-0"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col p-3">
        <span className="flex items-center">
          <h1 className="font-bold text-lg  mr-2">{tourCommon.title}</h1>
          <TourTypeBadge contenttypeid={tourCommon.contenttypeid} />
        </span>
        <p className="w-100">
          {truncate(tourCommon.overview || '', { length: 90 })}
        </p>
      </div>
    </li>
  );
}
