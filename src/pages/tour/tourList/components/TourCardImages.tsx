import { tourQueries } from '@/pages/tour/service';
import { useSuspenseQuery } from '@tanstack/react-query';

interface TourCardImagesProps {
  contentId: string;
  title: string;
}
export default function TourCardImages({
  contentId,
  title,
}: TourCardImagesProps) {
  const { data: images } = useSuspenseQuery(
    tourQueries.detailImages(contentId),
  );

  return (
    <figure className="w-full h-[150px]">
      <div className="flex gap-0.5 h-full flex-6/10">
        <div className="relative">
          <img
            src={images[0].originimgurl}
            className="h-full object-cover aspect-square rounded"
            alt={title}
          />
        </div>
        <div className="flex flex-col gap-0.5 h-full flex-4/10">
          <div className="relative h-1/2">
            <img
              src={images[0].originimgurl}
              className="object-cover h-full w-full"
              alt={`${title} 썸네일 1`}
            />
          </div>
          <div className="relative h-1/2">
            <img
              src={images[0].originimgurl}
              className="object-cover h-full w-full"
              alt={`${title} 썸네일 2`}
            />
          </div>
        </div>
      </div>
    </figure>
  );
}
