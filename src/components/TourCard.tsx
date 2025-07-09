import { commonSVG } from '@/assets';
import { TourTypeBadge, DistanceTimeInfo } from './';
import type { AroundContentTypeId } from '@/pages/types';

interface TourCardProps {
  title: string;
  distance: string;
  imgUrl: string;
  tourTypeId: AroundContentTypeId;
}
export default function TourCard({
  title,
  distance,
  imgUrl,
  tourTypeId,
}: TourCardProps) {
  return (
    <section>
      <div className="py-6 px-5 flex">
        <div className="mr-5">
          <div className="flex  gap-1.5 mb-2 items-center">
            <h1 className="font-bold text-[24px] w-38">{title}</h1>
            <TourTypeBadge contenttypeid={tourTypeId} className="text-center" />
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            <DistanceTimeInfo
              dist={distance}
              className="text-primary-red font-bold"
              iconFill="text-primary-red "
            />
            <span>서울 용산구</span>
          </div>
          <span>곧 영업 종료 20:00 에 영엄 종료</span>
          <div className="flex items-center gap-4 mt-7">
            <commonSVG.HeartIcon />
            <commonSVG.ShareIcon />
          </div>
        </div>
        <div className="w-[130px] h-[130px] rounded-[5px] overflow-hidden">
          <img src={imgUrl} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
    </section>
  );
}
