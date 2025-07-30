interface TourReviewProps {
  contentId: string;
}

export default function TourReview({ contentId }: TourReviewProps) {
  return (
    <div className="text-black px-5 pb-6">
      <h2 className="text-lg font-bold mb-4">Tour Review</h2>
      <p className="text-sm">
        This is where the tour reviews will be displayed for content ID:{' '}
        {contentId}.
      </p>
    </div>
  );
}
