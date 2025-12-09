import { TouristContentsTypeFilter } from '@/shared/ui';

import { useLocalStorage } from '@/shared';
import type { TourInjected } from '@/features/tour/types';

export default function TouristFilterQueryUpdater() {
  const [tourInfo, setTourInfo] = useLocalStorage('tourInfo', {
    distance: '20000',
    contentTypeId: '12',
  } as TourInjected);

  return (
    <>
      <TouristContentsTypeFilter
        contentTypeId={tourInfo.contentTypeId}
        setContentTypeId={setTourInfo}
      />
    </>
  );
}
