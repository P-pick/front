export default function SkeletonCard() {
  return (
    <div className="w-full h-[230px]">
      <div className="flex gap-0.5 h-full">
        <div className="animate-pulse bg-gray-300 w-1/2 h-full flex-6/10" />
        <div className="flex flex-col gap-0.5 flex-4/10">
          <div className="animate-pulse bg-gray-300 h-1/2"></div>
          <div className="animate-pulse bg-gray-300 h-1/2"></div>
        </div>
      </div>
    </div>
  );
}
