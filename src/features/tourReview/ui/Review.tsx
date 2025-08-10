import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  ControlButtonContainer,
  ModifyReview,
  ReviewActionModal,
} from '@/features/tourReview';

import type { ReviewProps } from '@/features/tourReview';
import { useToggleState } from '@/shared';
import ReviewSwiperImage from './ReviewSwiperImage';

export default function Review({ contentId, review }: ReviewProps) {
  const { isToggle, setIsToggle, enable } = useToggleState();

  return (
    <div className="flex flex-col gap-2 border-b border-gray-300">
      <div className="flex justify-between items-center px-3">
        <div className="flex justify-start gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {review.user.photoURL && (
              <img
                src={review.user.photoURL}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span>{review.user.displayName}</span>
            <span className="align-middle text-sm">
              ⭐&nbsp;{review.rating}
            </span>
          </div>
        </div>
        <ControlButtonContainer
          contentId={contentId}
          review={review}
          handleOpenModal={enable}
        />
      </div>
      {review.images && review.images?.length > 0 && (
        <Swiper
          direction="horizontal"
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView="auto"
          className="cursor-grab flex w-full justify-start items-center"
        >
          {review.images?.map((image, index) => (
            <SwiperSlide
              key={index}
              className="mx-3 max-w-60 max-h-30 border-1 border-gray-300 rounded-2xl"
            >
              <ReviewSwiperImage
                src={`tour/${contentId}/reviews/${review.id}/${image.name}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-between items-end gap-2 p-3">
        <p className="flex-1 text-sm">{review.contents}</p>
        <span className="text-xs">{review.createdAt.slice(0, 10)}</span>
      </div>
      <ReviewActionModal isOpen={isToggle} setIsOpen={setIsToggle}>
        <ModifyReview
          contentId={contentId}
          setIsOpen={setIsToggle}
          prevReview={review}
        />
      </ReviewActionModal>
    </div>
  );
}
