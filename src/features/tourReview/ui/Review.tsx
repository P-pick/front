import type { ReviewResponse } from '@/entities/review';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Review(review: ReviewResponse) {
  return (
    <div className="flex flex-col gap-2 p-2 border-b border-gray-300">
      <div className="flex justify-start gap-2 items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={review.user.photoURL}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span>{review.user.displayName}</span>
          <span>{review.rating}</span>
        </div>
      </div>
      {review.images && review.images?.length > 0 && (
        <Swiper
          direction="horizontal"
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView="auto"
          className="px-2 cursor-grab flex w-full justify-start items-center"
        >
          {review.images?.map((image, index) => (
            <SwiperSlide
              key={index}
              className="mx-2 min-w-60 max-w-60 max-h-30 h-30 bg-gray-300"
            >
              <img
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-between items-center gap-2 px-2 my-3">
        <p className="flex-1 text-sm">{review.contents}</p>
        <span className="text-xs">{review.createdAt.slice(0, 10)}</span>
      </div>
    </div>
  );
}
