import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ReviewResponse } from '@/entities/review';
import { getAuth } from 'firebase/auth';
import { useRemoveReviewMutation } from '../model';

interface ReviewProps {
  contentId: string;
  review: ReviewResponse;
}

export default function Review({ contentId, review }: ReviewProps) {
  const auth = getAuth();

  const removeMutate = useRemoveReviewMutation({
    contentId,
  });

  const handlerDeleteReview = () => {
    removeMutate.mutate({
      contentId,
      reviewId: review.id,
      prevImages: review.images,
    });
  };

  return (
    <div className="flex flex-col gap-2 border-b border-gray-300">
      <div className="flex justify-between items-center px-3">
        <div className="flex justify-start gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={review.user.photoURL}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span>{review.user.displayName}</span>
            <span className="align-middle text-sm">
              ⭐&nbsp;{review.rating}
            </span>
          </div>
        </div>
        <div>
          {auth.currentUser?.uid === review.user.uid && (
            <div className="flex">
              <button className="border-1 border-gray-300 rounded-lg px-2 py-1 mr-2 hover:bg-gray-100">
                수정
              </button>
              <button
                className="border-1 border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-100 text-(--color-primary-red)"
                onClick={handlerDeleteReview}
              >
                삭제
              </button>
            </div>
          )}
        </div>
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
              className="mx-3 min-w-60 max-w-60 bg-gray-300 rounded-2xl"
            >
              <img
                src={image.imageUrl}
                alt={`${image.name}-이미지`}
                className="w-full h-auto object-cover p-3"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-between items-end gap-2 p-3">
        <p className="flex-1 text-sm">{review.contents}</p>
        <span className="text-xs">{review.createdAt.slice(0, 10)}</span>
      </div>
    </div>
  );
}
