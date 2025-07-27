export default function SkeletonCard() {
  return (
    <div className="w-full aspect-[3/2]">
      <div className="flex gap-0.5 h-full">
        <div className="animate-pulse bg-gray-300 w-3/5 h-full object-cover rounded-l-lg aspect-square" />
        <div className="flex flex-col w-2/5 gap-0.5 h-full">
          <div className="animate-pulse bg-gray-300 h-1/2 w-full rounded-tr-lg  aspect-[2/1]" />
          <div className="animate-pulse bg-gray-300 h-1/2 w-full rounded-br-lg  aspect-[2/1]" />
        </div>
      </div>
    </div>
  );
}
