import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAuth } from 'firebase/auth';
import { FreeMode } from 'swiper/modules';

import { useCreateReviewMutation } from '@/features/tourReview';

interface TourDetailCreateReviewProps {
  contentId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TourDetailCreateReviewState {
  rating: number;
  contents: string;
  images: File[];
  blobUrls: string[];
}

export default function TourDetailCreateReview({
  contentId,
  setIsOpen,
}: TourDetailCreateReviewProps) {
  const [newReview, setNewReview] = useState<TourDetailCreateReviewState>({
    rating: 5,
    contents: '',
    images: [],
    blobUrls: [],
  });

  const auth = getAuth();

  const mutation = useCreateReviewMutation({ contentId });

  const newReviewHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview({
      ...newReview,
      contents: e.target.value,
    });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewReview({
      ...newReview,
      rating: Number(e.target.value),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const blobUrls = files.map(file => URL.createObjectURL(file));
    setNewReview({
      ...newReview,
      images: [...newReview.images, ...files],
      blobUrls: [...newReview.blobUrls, ...blobUrls],
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...newReview.images];
    const updatedBlobUrls = [...newReview.blobUrls];
    updatedImages.splice(index, 1);
    updatedBlobUrls.splice(index, 1);
    setNewReview({
      ...newReview,
      images: updatedImages,
      blobUrls: updatedBlobUrls,
    });
  };

  const handleCreateReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('로그인이 필요합니다.');
    }
    mutation.mutate(
      {
        user: auth,
        contentId,
        rating: newReview.rating,
        contents: newReview.contents,
        images: newReview.images,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <form className="w-full h-full" onSubmit={handleCreateReview}>
      <div className="bg-white rounded-lg p-5 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">리뷰 작성</h2>
        <textarea
          value={newReview.contents}
          onChange={newReviewHandler}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="리뷰 내용을 입력하세요."
        />
        <div>
          <label className="block mb-2">
            평점:
            <select
              value={newReview.rating}
              onChange={handleRatingChange}
              className="ml-2 border border-gray-300 rounded-lg p-2"
            >
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>
                  {rating}점
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block mb-2">
            이미지 업로드:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              id="image-upload"
              hidden
            />
          </label>
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            direction="horizontal"
            className="cursor-grab flex w-full justify-start items-center"
          >
            {newReview.blobUrls.map((url, index) => (
              <SwiperSlide key={index} className="min-w-20 max-w-20 mr-2">
                <img
                  src={url}
                  alt={`업로드된 이미지 ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                  onClick={() => handleRemoveImage(index)}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide className="min-w-20 max-w-20">
              <label
                htmlFor="image-upload"
                className="w-20 h-20 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <span className="text-gray-500">+</span>
              </label>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="bg-gray-300 text-black rounded-lg px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-(--color-primary) text-white rounded-lg px-4 py-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '리뷰 업로드 중...' : '리뷰 작성'}
          </button>
        </div>
      </div>
    </form>
  );
}
