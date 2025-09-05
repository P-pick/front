interface NotFoundReviewProps {
  handleOpenReviewModal: () => void;
}

export default function NotFoundReview({
  handleOpenReviewModal,
}: NotFoundReviewProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full m-10 text-sm">
      <p>아직 리뷰가 없습니다😭</p>
      <p>
        장소를
        <span className="text-3xl font-bold text-(--color-primary-red)">
          Pick
        </span>
        하고 리뷰를 남겨주세요!❤️
      </p>
      <button
        className="text-(--color-primary-red)"
        onClick={handleOpenReviewModal}
      >
        리뷰 작성하러 가기 ↗️
      </button>
    </div>
  );
}
