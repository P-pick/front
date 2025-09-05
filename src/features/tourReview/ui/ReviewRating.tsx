export default function ReviewRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? 'text-yellow-500' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
}
