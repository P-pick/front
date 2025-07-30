import { useSuspenseQuery } from '@tanstack/react-query';

import { tourQueries } from '@/entities/tour';

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

  const getImageSrc = (index: number): string => {
    if (images.length === 0) return '/common/fallback.webp';
    const image = images[index];
    if (!image || typeof image.originimgurl !== 'string') {
      return '/common/fallback.webp';
    }
    return image.originimgurl;
  };

  return (
    <figure className="w-full aspect-[3/2]">
      <div className="flex gap-0.5 h-full">
        <img
          src={getImageSrc(0)}
          className="w-3/5 h-full object-cover rounded-l-lg aspect-square"
          alt={title}
        />

        <div className="flex flex-col w-2/5 gap-0.5 h-full">
          <img
            src={getImageSrc(1)}
            className="h-1/2 w-full object-cover rounded-tr-lg  aspect-[2/1]"
            alt={`${title} 썸네일 1`}
          />
          <img
            src={getImageSrc(2)}
            className="h-1/2 w-full object-cover rounded-br-lg  aspect-[2/1]"
            alt={`${title} 썸네일 2`}
          />
        </div>
      </div>
    </figure>
  );
}
