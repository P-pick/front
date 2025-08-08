import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAuth } from 'firebase/auth';
import { FreeMode } from 'swiper/modules';

import { useModifiedReviewMutation } from '@/features/tourReview';
import type { ImageType, ReviewResponse } from '@/entities/review';

interface TourDetailModifyReviewProps {
  contentId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prevReview: ReviewResponse;
}

interface ModifyReview {
  rating: number;
  contents: string;
  existingImages: ImageType[]; // 기존 이미지
  newImages: File[]; // 새로 추가한 이미지
  deletedImages: ImageType[]; // 삭제할 기존 이미지
}

export default function TourDetailModifyReview({
  contentId,
  setIsOpen,
  prevReview,
}: TourDetailModifyReviewProps) {
  const [modifyReview, setModifyReview] = useState<ModifyReview>({
    rating: prevReview.rating || 5,
    contents: prevReview.contents || '',
    existingImages: prevReview.images || [],
    newImages: [],
    deletedImages: [],
  });

  const auth = getAuth();
  const mutation = useModifiedReviewMutation({ contentId });

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyReview(prev => ({
      ...prev,
      contents: e.target.value,
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModifyReview(prev => ({
      ...prev,
      rating: Number(e.target.value),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setModifyReview(prev => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  // 기존 이미지 삭제
  const handleRemoveExistingImage = (index: number) => {
    const imageToRemove = modifyReview.existingImages[index];
    setModifyReview(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
      deletedImages: [...prev.deletedImages, imageToRemove],
    }));
  };

  // 새로 추가한 이미지 삭제
  const handleRemoveNewImage = (index: number) => {
    setModifyReview(prev => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  const handleCreateReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    mutation.mutate(
      {
        reviewId: prevReview.id,
        contentId,
        rating: modifyReview.rating,
        contents: modifyReview.contents,
        remainingImages: modifyReview.existingImages,
        newImages: modifyReview.newImages,
        deletedImages: modifyReview.deletedImages,
      },
      {
        onSuccess: () => setIsOpen(false),
      },
    );
  };

  return (
    <form className="w-full h-full" onSubmit={handleCreateReview}>
      <div className="bg-white rounded-lg p-5 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">리뷰 수정</h2>
        <textarea
          value={modifyReview.contents}
          onChange={handleContentsChange}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="리뷰 내용을 입력하세요."
        />
        <div>
          <label className="block mb-2">
            평점:
            <select
              value={modifyReview.rating}
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
            {modifyReview.existingImages.map((image, index) => (
              <SwiperSlide key={image.name} className="min-w-20 max-w-20 mr-2">
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`업로드된 이미지 ${image.name}`}
                  className="w-20 h-20 object-cover rounded-lg"
                  onClick={() => handleRemoveExistingImage(index)}
                />
              </SwiperSlide>
            ))}
            {modifyReview.newImages.map((url, index) => (
              <SwiperSlide key={index} className="min-w-20 max-w-20 mr-2">
                <img
                  src={URL.createObjectURL(url)}
                  alt={`업로드된 이미지 ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                  onClick={() => handleRemoveNewImage(index)}
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
