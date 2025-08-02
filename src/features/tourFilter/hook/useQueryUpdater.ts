import { useSearchParams } from 'react-router-dom';

import type { AroundContentTypeId } from '@/entities/tour';
import type { Distance } from '@/features/tourFilter';

type updateType = {
  tourType: AroundContentTypeId;
  distance: Distance;
};

export const useQueryUpdater = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = ({ tourType, distance }: updateType) => {
    searchParams.set('tour-type', tourType);
    searchParams.set('distance', String(distance * 1000));
    // searchParams.set('sort', sortOption);
    setSearchParams(searchParams, { replace: true });
  };

  const defaultValue = {
    tourType: searchParams.get('tour-type') as AroundContentTypeId,
    distance: (Number(searchParams.get('distance')) / 1000) as Distance,
    // sortOption: searchParams.get('sort') as SortOption,
  };

  return { searchParams, updateQuery, defaultValue };
};
