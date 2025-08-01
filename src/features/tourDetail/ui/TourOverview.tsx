import { useSuspenseQueries } from '@tanstack/react-query';

import { commonSVG } from '@/assets';

import { tourQueries } from '@/entities/tour';
import { TourTypeBadge, DistanceTimeInfo } from '@/shared';
import { BookmarkButtonContainer } from '@/features/bookmark';
import { authOptions } from '@/entities/auth';

interface TourCardProps {
  distance: string;
  tourContentId: string;
}

export default function TourOverview({
  distance,
  tourContentId,
}: TourCardProps) {
  const data = useSuspenseQueries({
    queries: [tourQueries.detailCommon(tourContentId), authOptions.auth()],
  });

  const tourCommon = data[0].data;
  const user = data[1].data;

  return (
    <section>
      <div className="py-6 px-5 flex">
        <div className="flex-grow">
          <div className="flex gap-2 mb-2 items-center">
            <h1 className="font-bold text-2xl">{tourCommon.title}</h1>
            <TourTypeBadge contenttypeid={tourCommon.contenttypeid} />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <DistanceTimeInfo
              dist={distance}
              className="text-primary-red font-bold"
              iconFill="text-primary-red "
            />
            <span className="flex flex-wrap">{tourCommon.addr1}</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <BookmarkButtonContainer
              contentId={tourContentId}
              userId={user.uid}
            />
            <commonSVG.ShareIcon />
          </div>
        </div>
      </div>
      <div className="rounded-[5px] overflow-hidden w-full h-full p-2">
        <img
          src={tourCommon.firstimage}
          className="w-full h-full object-cover"
          alt="tourDetailImage"
        />
      </div>
    </section>
  );
}
