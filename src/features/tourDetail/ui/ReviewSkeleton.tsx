export default function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col justify-center">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
