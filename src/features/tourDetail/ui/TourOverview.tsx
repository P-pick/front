import { useSuspenseQuery } from '@tanstack/react-query';

import { commonSVG } from '@/assets';

import { BookmarkButtonContainer } from '@/features/bookmark';
import { tourQueries } from '@/entities/tour';
import { TourTypeBadge, DistanceTimeInfo, getCopyClipBoard } from '@/shared';

interface TourCardProps {
  distance: string;
  tourContentId: string;
}

export default function TourOverview({
  distance,
  tourContentId,
}: TourCardProps) {
  const detailCommon = useSuspenseQuery(
    tourQueries.detailCommon(tourContentId),
  ).data;

  return (
    <section>
      <div className="py-6 px-5 flex">
        <div className="flex-grow">
          <div className="flex gap-2 mb-2 items-center">
            <h1 className="font-bold text-2xl">{detailCommon.title}</h1>
            <TourTypeBadge contenttypeid={detailCommon.contenttypeid} />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <DistanceTimeInfo
              dist={distance}
              className="text-primary-red font-bold"
              iconFill="text-primary-red "
            />
            <span className="flex flex-wrap">{detailCommon.addr1}</span>
          </div>
          <div className="flex items-center gap-4 mt-4 bg-white">
            <BookmarkButtonContainer contentId={tourContentId} />
            <commonSVG.ShareIcon
              className="cursor-pointer"
              onClick={() => getCopyClipBoard(window.location.href)}
            />
          </div>
        </div>
      </div>
      <div className="rounded-[5px] overflow-hidden w-full h-full p-2">
        <img
          src={detailCommon.firstimage}
          className="w-full h-full object-cover"
          alt="tourDetailImage"
        />
      </div>
    </section>
  );
}
