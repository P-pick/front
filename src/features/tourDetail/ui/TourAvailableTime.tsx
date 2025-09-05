import { tourDetailSVG } from '@/assets';

import { SafeHtmlRenderer } from '@/shared';

export default function TourAvailableTime({ useTime }: { useTime: string }) {
  return (
    <div className="flex">
      <tourDetailSVG.TimeIcon />
      <SafeHtmlRenderer html={useTime} />
    </div>
  );
}
