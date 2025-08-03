import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import { useCreateReviewMutation } from '@/features/tourReview';

interface TourDetailCreateReviewProps {
  contentId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TourDetailCreateReview({
  contentId,
  setIsOpen,
}: TourDetailCreateReviewProps) {
  const [newReview, setNewReview] = useState({
    rating: 5,
    contents: '',
    images: [],
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
    const imageUrls = files.map(file => URL.createObjectURL(file));
    console.log(imageUrls); //이미지 만들어지기 전까지 콘솔로 확인
  };

  const handleCreateReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('로그인이 필요합니다.');
    }
    mutation.mutate({
      user: auth,
      contentId,
      rating: newReview.rating,
      contents: newReview.contents,
      images: newReview.images || [],
    });
    setIsOpen(false);
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
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
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
          >
            리뷰 작성
          </button>
        </div>
      </div>
    </form>
  );
}
